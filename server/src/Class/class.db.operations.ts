import mongoose from 'mongoose'
import debug from 'debug'
import { CreateClassRequest, UpdateClassRequest } from './class.type'

const log: debug.IDebugger = debug('app:Classs-dao')

export interface IClass {
  batchId: string
  subjectId: string
  startTime: string
  endTime: string
  meetingId: string
  passCode: string
  meetingLink: string
  attachments: string
  courseName: string
  courseId: string
  batchName: string
}

interface IClassDoc extends IClass, mongoose.Document {}

class ClassDataOperations {
  ClassSchema = new mongoose.Schema(
    {
      courseName: String,
      batchName: String,
      batchId: String,
      subjectId: String,
      startTime: String,
      endTime: String,
      meetingId: String,
      passCode: String,
      meetingLink: String,
      classNumber: Number,
      duration: Number,
      courseId: String,
      topic: String,
      description: String,
      attachments: String
    },
    {
      timestamps: true
    }
  )

  Class = mongoose.model<IClassDoc>('Class', this.ClassSchema)

  constructor() {
    log('Created new instance of Class')
  }

  async createClass(ClassReq: CreateClassRequest) {
    try {
      console.log(ClassReq)
      const Class = new this.Class({ ...ClassReq })
      return await Class.save()
    } catch (err) {
      return { errors: [err] }
    }
  }

  async addAttachements(key: string, _id: string) {
    return await this.Class.findByIdAndUpdate(
      { _id },
      { $set: { attachments: key } }
    ).exec()
  }

  async getClass(ClassId: string) {
    return await this.Class.findOne({ _id: ClassId }).exec()
  }

  async getAllClasses() {
    return await this.Class.find().exec()
  }

  async updateClass(updateClassReq: UpdateClassRequest) {
    return await this.Class.findOneAndUpdate(
      { _id: updateClassReq._id },
      { $set: updateClassReq }
    ).exec()
  }

  async deleteClass(ClassId: string) {
    return await this.Class.findByIdAndDelete({ _id: ClassId }).exec()
  }

  async getClassesByBatchIds(batchIds: Array<string>) {
    const allClasses = await this.Class.find()
      // .where('bacth')
      // .in(batchIds)
      .exec()
    const requiredClasses = allClasses.filter((cls) => {
      console.log(cls, batchIds)
      return batchIds.includes(cls?.courseId)
    })
    return requiredClasses
  }

  async getClassesByBatchId(batchId: string) {
    return await this.Class.find({ batchId: batchId }).exec()
  }

  async batchDeleteClasses(classIds: Array<string>) {
    return await this.Class.deleteMany({ _id: { $in: classIds } }).exec()
  }

  async getClassesByTeacherId(teacherId: string) {
    return await this.Class.find({
      startTime: { $gt: new Date().toISOString() }
    })
      .where('teacherIds')
      .in([teacherId])
      .exec()
  }
  //TODO:IMPLEMEnt
  async isTimeAvailable(_startTime: string) {
    return true
  }
}

export default new ClassDataOperations()
