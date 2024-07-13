// import mongoose from 'mongoose'
// import debug from 'debug'
// import { CreateCourseRequest, UpdateCourseRequest } from './course.type'

// const log: debug.IDebugger = debug('app:courses-dao')

// export interface ICourse {
//   name: string
//   description: string
//   numberOfClasses: Number
//   price: Number
// }

// export interface ICourseDoc extends ICourse, mongoose.Document {}

// class CourseDataOperations {
//   courseSchema = new mongoose.Schema({
//     name: String,
//     description: String,
//     numberOfClasses: Number,
//     price: Number
//   })

//   Course = mongoose.model<ICourseDoc>('Course', this.courseSchema)

//   constructor() {
//     log('Created new instance of Course')
//   }

//   async createCourse(courseReq: CreateCourseRequest) {
//     const course = new this.Course({ ...courseReq })
//     return await course.save()
//   }

//   async getCourse(courseId: string) {
//     return await this.Course.findOne({ _id: courseId }).exec()
//   }

//   async updateCourse(updateCourseReq: UpdateCourseRequest) {
//     return await this.Course.findOneAndUpdate(
//       { _id: updateCourseReq._id },
//       { $set: updateCourseReq }
//     ).exec()
//   }

//   async deleteCourse(courseId: string) {
//     return await this.Course.findByIdAndDelete({ id: courseId }).exec()
//   }

//   async getAllCourses() {
//     return await this.Course.find().exec()
//   }

//   async getCourses(courseIds: Array<String>) {
//     return await this.Course.find().where('_id').in(courseIds).exec()
//   }
// }

// export default new CourseDataOperations()
