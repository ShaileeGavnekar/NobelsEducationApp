import BatchDbOperations, { IBatchDoc } from './batch.db.operations'
import { CreateBatchRequest, UpdateBatchRequest } from './batch.type'

class BatchService {
  async createBatch(BatchReq: CreateBatchRequest) {
    let errors = null

    const Batch = await BatchDbOperations.createBatch(BatchReq)
    if (!Boolean(Batch)) {
      return { errors: ['Unable to create Batch'] }
    }
    return Batch
  }

  async updateBatch(BatchReq: UpdateBatchRequest) {
    const updatedBatch = await BatchDbOperations.updateBatch(BatchReq)
    if (!updatedBatch) {
      return { errors: 'Unable to update the Batch' }
    }
    return updatedBatch
  }

  async deleteBatch(BatchId: string) {
    const deletedBatch = await BatchDbOperations.deleteBatch(BatchId)
    if (!deletedBatch) {
      return { errors: ['unable to delete the Batch'] }
    }
    return deletedBatch
  }

  async getAllBatchs() {
    const allBatchs = await BatchDbOperations.getAllBatches()
    if (!Boolean(allBatchs)) {
      return { errors: ['No Batchs in db'] }
    }
    return allBatchs
  }

  async getAllBatchesByCourseId(courseId: string) {
    const courseBatches = await BatchDbOperations.getBatchesByCourseId(courseId)
    if (!Boolean(courseBatches)) {
      return { errors: ['No Batches in course'] }
    }
    return courseBatches
  }

  async getAllBatchsByIds(BatchIds: Array<string>) {
    const allBatchs = await BatchDbOperations.getAllBatches()
    if (!Boolean(allBatchs)) {
      return { errors: ['No Batchs in db'] }
    }
    let returnBatchs: (IBatchDoc & {
      _id: any
    })[] = []
    allBatchs.map((c) => {
      if (BatchIds.includes(c._id.toString())) {
        returnBatchs.push(c)
      }
    })
    return returnBatchs
  }

  async getBatch(id: string) {
    try {
      const c = await BatchDbOperations.getBatch(id)
      return c
    } catch (e) {
      return { errors: [e] }
    }
  }
}

export default new BatchService()
