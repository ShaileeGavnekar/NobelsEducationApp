import mongoose from 'mongoose'
import debug from 'debug'
import { CreateStudentRequest, UpdateStudentRequest } from './student.type'

const log: debug.IDebugger = debug('app:Student-dao')

export enum Status {
  ACTIVE = 'ACTIVE',
  BLOCKED = 'BLOCKED'
}

export interface IStudent {
  coursesEnrolled: Array<String>
  status: Status
  userId: string
  batchesEnrolled: Array<String>
}

export interface IStudentDoc extends IStudent, mongoose.Document {}

class StudentDataOperations {
  StudentSchema = new mongoose.Schema({
    coursesEnrolled: [{ type: 'String' }],
    status: { type: 'String', enum: Status, default: Status.ACTIVE },
    userId: { type: 'String', required: true },
    batchesEnrolled: [{ type: 'String' }]
  })

  Student = mongoose.model<IStudentDoc>('Student', this.StudentSchema)

  constructor() {
    log('Created new instance of Student')
  }

  async createStudent(courseReq: CreateStudentRequest) {
    const Student = new this.Student(courseReq)
    let s = Student.save()
    return s
  }

  async getStudentsFromCourses(courseId: string) {
    const students = await this.Student.find()
    return students.filter((std) => std?.coursesEnrolled?.includes(courseId))
  }

  async getStudentById(StudentId: string) {
    return await this.Student.findOne({ _id: StudentId }).exec()
  }

  async getStudentByEmail(email: string) {
    return await this.Student.findOne({ email: email }).exec()
  }

  async updateStudent(updateStudentReq: UpdateStudentRequest) {
    return await this.Student.findOneAndUpdate(
      { _id: updateStudentReq._id },
      { $set: updateStudentReq }
    ).exec()
  }

  async deleteStudent(StudentId: string) {
    return await this.Student.findByIdAndDelete({ id: StudentId }).exec()
  }

  async getAllStudents() {
    return await this.Student.find().exec()
  }

  async getStudentByUserId(userId: String) {
    return await this.Student.findOne({ userId: userId }).exec()
  }

  async enrollStudent(courseId: string, userId: String, batchId: string) {
    await this.Student.findByIdAndUpdate(userId, {
      $push: { coursesEnrolled: courseId }
    })
    console.log(batchId)
    const s = await this.Student.findByIdAndUpdate(userId, {
      $push: { batchesEnrolled: batchId }
    })
    return s
  }

  async updateStudentBatch(
    userId: String,
    oldBatchId: string,
    newBatchId: string
  ) {
    try {
      const user = await this.Student.findOne({ userId: userId }).exec()
      console.log(newBatchId, oldBatchId)
      const batches = user?.batchesEnrolled
      let newBatch = batches?.filter((b) => b != oldBatchId)
      newBatch?.push(newBatchId)
      console.log('test', user, batches, newBatch)
      const std = await this.Student.findByIdAndUpdate(user?._id, {
        $set: { batchesEnrolled: newBatch }
      })

      return { changed: true }
    } catch (e) {
      return { errors: [e] }
    }
  }

  // async enrollStudentInBatch(batchId: string, userId: String) {
  //   return await this.Student.findByIdAndUpdate(userId, {
  //     $push: { batchedEnrolled: batchId }
  //   })
  // }
}

export default new StudentDataOperations()
