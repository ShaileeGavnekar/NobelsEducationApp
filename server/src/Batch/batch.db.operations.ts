import mongoose from 'mongoose'
import debug from 'debug'
import { CreateBatchRequest, UpdateBatchRequest } from './batch.type'

const log: debug.IDebugger = debug('app:Batchs-dao')

export interface IBatch {
  name: string
  BatchId: string
  course: mongoose.Schema.Types.ObjectId
  age: Array<Number>
  description: string
  upperLimit: number
  currentStrength: number
}

export interface IBatchDoc extends IBatch, mongoose.Document {}

class BatchDataOperations {
  BatchSchema = new mongoose.Schema({
    name: String,
    description: String,
    age: [{ type: Number }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    upperLimit: Number,
    currentStrength: Number
  })

  Batch = mongoose.model<IBatchDoc>('Batch', this.BatchSchema)

  constructor() {
    log('Created new instance of Batch')
  }

  async createBatch(BatchReq: CreateBatchRequest) {
    const Batch = new this.Batch({ ...BatchReq, currentStrength: 0 })
    return await Batch.save()
  }

  async getBatch(BatchId: string) {
    console.log('batchId', BatchId)
    const c = await this.Batch.findOne({ _id: BatchId })
      .populate('course')
      .exec()
    return c
  }

  async updateBatch(updateBatchReq: UpdateBatchRequest) {
    return await this.Batch.findOneAndUpdate(
      { _id: updateBatchReq._id },
      { $set: updateBatchReq }
    )
      .populate('course')
      .exec()
  }

  async deleteBatch(BatchId: string) {
    return await this.Batch.findByIdAndDelete({ _id: BatchId })
      .populate('course')
      .exec()
  }

  async getAllBatches() {
    return await this.Batch.find().populate('course').exec()
  }

  async getBatches(BatchIds: Array<String>) {
    return await this.Batch.find()
      .populate('course')
      .where('_id')
      .in(BatchIds)
      .exec()
  }

  async getBatchesByCourseId(courseId: string) {
    return await this.Batch.find({ 'course._id': courseId })
      .populate('course')
      .exec()
  }
}

export default new BatchDataOperations()
