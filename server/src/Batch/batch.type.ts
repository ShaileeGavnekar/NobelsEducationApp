import { mongoose } from '@typegoose/typegoose'

export type CreateBatchRequest = {
  name: string
  description?: string
  course: mongoose.Schema.Types.ObjectId
  age: Array<Number>
  upperLimit: Number
  currentStrength: Number
}

export type UpdateBatchRequest = CreateBatchRequest & { _id: string }
