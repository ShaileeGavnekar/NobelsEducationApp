import { string } from 'joi'
import mongoose from 'mongoose'
import { IStudent } from '../Student/student.db.operations'

export enum Role {
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN'
}

export enum Strategy {
  LOCAL = 'LOCAL',
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK'
}

export interface IUser {
  avatar: string
  password: string
  email: string
  role: Role
  strategy: Strategy
  providerId: string
  initialized: boolean
  city: string
  name: string
  country: string
  address: string
  pinCode: string
  parentsName: string
  mobileNumber: string
  age: number
  class: string
}

interface IUserDoc extends IUser, mongoose.Document {}

const userSchema = new mongoose.Schema({
  password: String,
  name: String,
  country: String,
  avatar: String,
  address: String,
  city: String,
  pinCode: String,
  email: { type: String, unique: true, required: true },
  strategy: { type: String, enum: Strategy },
  role: { type: String, enum: Role },
  providerId: String,
  initialized: Boolean,
  parentsName: String,
  mobileNumber: String,
  age: Number,
  class: String
})
const User = mongoose.model<IUserDoc>('User', userSchema)
export default User

export type StudentUserResponse = {
  user: Omit<IUser, 'password'>
  student: IStudent
}

export type AdminUserResponse = {
  user: Omit<IUser, 'password'>
}

export type UpdateUserRequest = {
  name: String
  country: String
  address: String
  city: String
  pinCode: String
  parentsName: String
  state: String
  mobileNumber: String
}

export type UpdateUserResponse = UpdateUserRequest
