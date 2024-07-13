import mongoose from 'mongoose'
import debug from 'debug'
import { CreateSubjectRequest, UpdateSubjectRequest } from './subject.type'

const log: debug.IDebugger = debug('app:subject-dao')

export interface ISubject {
  name: string
  description: string
}

export interface ISubjectDoc extends ISubject, mongoose.Document {}

class SubjectDataOperations {
  subjectSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String
  })

  Subject = mongoose.model<ISubjectDoc>('Subject', this.subjectSchema)

  constructor() {
    log('Created new instance of Subject')
  }

  async createSubject(courseReq: CreateSubjectRequest) {
    const subject = new this.Subject({ ...courseReq })
    return await subject.save()
  }

  async getSubject(subjectId: string) {
    return await this.Subject.findOne({ _id: subjectId }).exec()
  }

  async updateSubject(updateSubjectReq: UpdateSubjectRequest) {
    return await this.Subject.findOneAndUpdate(
      { _id: updateSubjectReq._id },
      { $set: updateSubjectReq }
    ).exec()
  }

  async deleteSubject(subjectId: string) {
    return await this.Subject.findByIdAndDelete({ id: subjectId }).exec()
  }

  async getAllSubjectWithIds(subjectIds: Array<string>) {
    return await this.Subject.find().where('_id').in(subjectIds).exec()
  }

  async getAllSubjects() {
    return await this.Subject.find().exec()
  }
}

export default new SubjectDataOperations()
