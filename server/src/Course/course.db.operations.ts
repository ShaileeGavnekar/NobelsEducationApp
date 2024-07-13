import mongoose from 'mongoose'
import debug from 'debug'
import { CreateCourseRequest, UpdateCourseRequest } from './course.type'
import { s3 } from '../Upload/upload'
import { isUndefined } from 'lodash'

const log: debug.IDebugger = debug('app:courses-dao')

export interface ICourse {
  avatar: string
  name: string
  description: string
  subHeader: string
  numberOfClasses: Number
  tags: Array<string>
  teacherIds: Array<string>
  curriculum: Array<string>
  price: Number
  discount: Number
  ageGroup: string
  courseProgress: string
  courseTimeline: string
  courseLevel: string
  starred: boolean
}

export interface ICourseDoc extends ICourse, mongoose.Document {}

class CourseDataOperations {
  courseSchema = new mongoose.Schema({
    avatar: String,
    name: String,
    subHeader: String,
    description: String,
    numberOfClasses: Number,
    tags: [{ type: String }],
    teacherIds: [{ type: String }],
    curriculum: [{ type: String }],
    courseTimeline: String,
    price: Number,
    discount: Number,
    ageGroup: String,
    courseProgress: String,
    courseLevel: String,
    starred: Boolean
  })

  Course = mongoose.model<ICourseDoc>('Course', this.courseSchema)

  constructor() {
    log('Created new instance of Course')
  }

  async addAvatar(key: string, _id: string) {
    const course = await this.Course.findById(_id)
    if (!Boolean(course)) {
      return { errors: ['Course not found'] }
    }
    if (
      !isUndefined(course) &&
      !isUndefined(course?.avatar) &&
      course?.avatar?.length! > 0
    ) {
      console.log('course AVATAR', course)
      await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: course?.avatar as string
        })
        .promise()
    }
    return await this.Course.findByIdAndUpdate(
      { _id },
      { $set: { avatar: key } }
    ).exec()
  }

  async createCourse(courseReq: CreateCourseRequest) {
    const course = new this.Course({ ...courseReq })
    return await course.save()
  }

  async getCourse(courseId: string) {
    const c = await this.Course.findOne({ _id: courseId }).exec()
    return c
  }

  async updateCourse(updateCourseReq: UpdateCourseRequest) {
    return await this.Course.findOneAndUpdate(
      { _id: updateCourseReq._id },
      { $set: updateCourseReq }
    ).exec()
  }

  async deleteCourse(courseId: string) {
    return await this.Course.findByIdAndDelete({ _id: courseId }).exec()
  }

  async getAllCourses() {
    return await this.Course.find().exec()
  }

  async getCourses(courseIds: Array<String>) {
    return await this.Course.find().where('_id').in(courseIds).exec()
  }
}

export default new CourseDataOperations()
