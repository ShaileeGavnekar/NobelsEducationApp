import mongoose from 'mongoose'
import debug from 'debug'
import { CreateTeacherRequest, UpdateTeacherRequest } from './teacher.type'

const log: debug.IDebugger = debug('app:Teacher-dao')

export interface ITeacher {
  userId: string
  expertiseCourse: Array<string>
}

interface ITeacherDoc extends ITeacher, mongoose.Document {}

class TeacherDataOperations {
  TeacherSchema = new mongoose.Schema({
    userId: String,
    expertiseCourse: [{ type: 'String' }]
  })

  Teacher = mongoose.model<ITeacherDoc>('Teacher', this.TeacherSchema)

  constructor() {
    log('Created new instance of Teacher')
  }

  async createTeacher(courseReq: CreateTeacherRequest) {
    const Teacher = new this.Teacher({ ...courseReq })
    return await Teacher.save()
  }

  async getTeacher(TeacherId: string) {
    return await this.Teacher.findOne({ _id: TeacherId }).exec()
  }

  async getTeacherByUserId(id: string) {
    return await this.Teacher.findById(id).exec()
  }

  async getAllTeachers() {
    return await this.Teacher.find().exec()
  }

  async updateTeacher(updateTeacherReq: UpdateTeacherRequest) {
    return await this.Teacher.findOneAndUpdate(
      { _id: updateTeacherReq._id },
      { $set: updateTeacherReq }
    ).exec()
  }

  async deleteTeacher(TeacherId: string) {
    return await this.Teacher.findByIdAndDelete({ id: TeacherId }).exec()
  }

  async getAllTeacherWithIds(TeacherIds: Array<string>) {
    return await this.Teacher.find().where('_id').in(TeacherIds).exec()
  }
}

export default new TeacherDataOperations()
