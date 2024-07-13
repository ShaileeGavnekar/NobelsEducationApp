import mongoose from 'mongoose'
import studentDataOperations from './student.db.operations'
import classDataOperations from '../Class/class.db.operations'
import courseDataOperations from '../Course/course.db.operations'
import { CreateStudentRequest, UpdateStudentRequest } from './student.type'
import User, { Role } from '../models/User'
import courseService from '../Course/course.service'
import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import { nanoid } from 'nanoid'
import { isError } from '../Subject/subject.service'
import zoomMeetingsService from '../ZoomMeetings/zoomMeetings.service'
import crypto from 'crypto'
import { isUndefined } from 'lodash'
import { s3 } from '../Upload/upload'
import teacherService from '../Teacher/teacher.service'
import classService from '../Class/class.service'
import moment from 'moment'
import { sendMail2 } from '../utils'
import jwt from 'jsonwebtoken'
import { genPassword } from '../services/passport.config'
import leadsService from '../Leads/leads.service'
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
})

class StudentService {
  async forgotPasswordMail(email: string) {
    const u = await User.find({ email: email })
    if (!Boolean(u) || isUndefined(u) || u.length === 0) {
      return { errors: ['No user found with this email'] }
    }
    const dataCode = jwt.sign(
      {
        data: u[0]._id
      },
      'secret',
      { expiresIn: '15m' }
    )
    console.log(dataCode)
    const url = 'https://nobels.in/resetPassword?token=' + dataCode
    sendMail2(u[0].name, email, url)
    return u
  }

  async updatePassword(dataCode: string, password: string) {
    try {
      const decoded: any = jwt.verify(dataCode, 'secret')
      const user = await User.findById(decoded.data)
      if (!Boolean(user)) {
        return {
          errors: [' User does not exist']
        }
      }
      const u = await User.findByIdAndUpdate(decoded.data, {
        password: genPassword(password).hash
      })
      console.log('test')
      return u?._id
    } catch (e) {
      console.log('here')
      return { errors: ['Link is expired or already been used'] }
    }
  }
  async createStudentR(createStudentRequest: CreateStudentRequest) {
    const std = await studentDataOperations.getStudentByUserId(
      createStudentRequest.userId
    )
    if (Boolean(std)) {
      return { errors: ['Student With this email id already exists'] }
    }
    const user = await User.findById(createStudentRequest.userId)
    if (!Boolean(user)) {
      return { errors: ['invalid userId'] }
    }
    const newStudent = await studentDataOperations.createStudent(
      createStudentRequest
    )
    return newStudent
  }

  async uploadProfileImage({ avatar, _id }: { avatar: string; _id: string }) {
    const user = await User.findById(_id)

    if (!Boolean(user)) {
      return { errors: ['User not found'] }
    }
    if (!isUndefined(user) && !isUndefined(user?.avatar)) {
      await s3
        .deleteObject({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: user?.avatar as string
        })
        .promise()
    }

    const u = await User.findByIdAndUpdate(_id, {
      $set: { avatar: avatar }
    }).exec()

    return { ...u, password: '' }
  }

  async initializeStudent(createStudentRequest: CreateStudentRequest) {
    try {
      const session = (await mongoose.startSession()) as mongoose.ClientSession
      await session.withTransaction(async () => {
        const _s = await this.createStudentR(createStudentRequest)
        const _u = await User.findByIdAndUpdate(
          { _id: createStudentRequest.userId },
          { $set: { initialized: true } },
          { session: session }
        )
      })

      session.endSession()
      return await this.getStudentByEmail(createStudentRequest.email)
    } catch (err) {
      return { errors: [err] }
    }
  }

  async getStudentById(studentId: string) {
    const user = await studentDataOperations.getStudentById(studentId)
    if (!Boolean(user)) {
      return { errors: ['Student Not Found'] }
    }
    return user
  }

  async getStudentByEmail(email: string) {
    const user = await studentDataOperations.getStudentByEmail(email)
    if (!Boolean(user)) {
      return { error: ['Student Not Found'] }
    }
    return user
  }

  async getStudentCourse(studentId: string) {
    const user = await studentDataOperations.getStudentById(studentId)
    const userCourses = user?.coursesEnrolled
    console.log('userCourses->', userCourses)
    console.log('user->', user)
    console.log(studentId)
    const detailedCourses = await courseDataOperations.getCourses(userCourses!)
    return detailedCourses
  }

  async getStudentFromCourses(courseId: string) {
    const students = await studentDataOperations.getStudentsFromCourses(
      courseId
    )
    return students
  }

  async updateStudentInfo(req: UpdateStudentRequest) {
    const user = await studentDataOperations.getStudentById(req._id)
    if (!Boolean(user)) {
      return { errors: ['unable  find student'] }
    }
    const updatedUser = await studentDataOperations.updateStudent(req)
    if (!Boolean(updatedUser)) {
      return { errors: ['unable block student'] }
    }
    return updatedUser
  }

  async deleteStudentById(studentId: string) {
    const user = await studentDataOperations.deleteStudent(studentId)
    return user
  }

  async getStudentWithUserId(userId: string) {
    const user = await studentDataOperations.getStudentByUserId(userId)
    return user
  }

  async getStudentClasses(studentId: string) {
    const courses = await this.getStudentCourse(studentId)
    console.log('course->', courses)
    if (courses.length === 0) return []
    const classes = await classDataOperations.getClassesByBatchIds(
      courses.map((c) => c._id.toString())
    )

    return classes
  }

  async getAllCourses() {
    const courses = courseService.getAllCourses()
    return courses
  }

  async addMeInClass(
    studentName: string,
    studentEmail: string,
    meetingId: string,
    apiKey: string
  ) {
    const meetingDetails = await zoomMeetingsService.addParticipant(
      studentEmail,
      studentName,
      meetingId
    )

    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(apiKey + meetingId + timestamp + 0).toString(
      'base64'
    )
    const hash = crypto
      .createHmac('sha256', process.env.ZOOM_SECRET!)
      .update(msg)
      .digest('base64')
    const signature = Buffer.from(
      `${apiKey}.${meetingId}.${timestamp}.${0}.${hash}`
    ).toString('base64')

    return { meetingDetails, signature }
  }

  async createOrder(courseId: string) {
    const course: any = await courseService.getAllCoursesByIds([courseId])
    if (isError(course)) {
      return { errors: ['No courses in db'] }
    }
    const options = {
      amount: course[0].price * 100,
      currency: 'INR',
      receipt: nanoid(),
      payment: {
        capture: 'automatic',
        capture_options: {
          automatic_expiry_period: 12,
          manual_expiry_period: 7200,
          refund_speed: 'optimum'
        }
      }
    }
    const response = await razorpay.orders.create(options)
    return {
      id: response.id,
      currency: response.currency,
      amount: response.amount
    }
  }

  async createLead(name: string, phoneNumber: string) {
    try {
      const lead = await leadsService.createLead({ name, phoneNumber })
      return lead
    } catch {
      return { errors: ['Something went wrong'] }
    }
  }

  async getCourseDetails(courseId: string) {
    const course = await courseService.getCourse(courseId)
    if (isError(course)) {
      return course
    }
    const teachers = await teacherService.getAllTeachers()
    if (isError(course)) {
      return teachers
    }
    const allClasses = await classService.getAllClasses()
    if (isError(allClasses)) {
      return allClasses
    }
    // const courseClasses = allClasses
    //   .filter((cls) => cls.courseId === course?._id.toString())
    //   .filter((c) => {
    //     return moment(c.startTime).isBefore(moment(new Date()))
    //   })

    const detailedCourses = {
      _id: course?._id,
      avatar: course?.avatar,
      name: course?.name,
      description: course?.description,
      subHeader: course?.subHeader,
      numberOfClasses: course?.numberOfClasses,
      tags: course?.tags,
      teacherIds: course?.teacherIds,
      curriculum: course?.curriculum,
      price: course?.price,
      discount: course?.discount,
      ageGroup: course?.ageGroup,
      courseProgress: course?.courseProgress,
      courseLevel: course?.courseLevel,
      starred: course?.starred,
      courseTimeline: course?.courseTimeline,
      // classesCompleted: courseClasses.length,
      teacherDetails: course?.teacherIds?.map((c) => {
        const teacher = teachers.find((t) => t._id.toString() === c.toString())
        if (Boolean(teacher)) {
          return {
            _id: teacher?._id,
            name: teacher?.name,
            email: teacher?.email
          }
        }
        return {}
      })
    }
    return detailedCourses
  }
  async getAllStudents() {
    const teachers = await User.find({ role: Role.STUDENT })
    return teachers
  }

  async payOrder(
    courseId: string,
    studentId: string,
    paymentId: string,
    batchId: string
  ) {
    try {
      const course = await courseService.getAllCoursesByIds([courseId])
      if (isError(course)) {
        return { errors: ['No courses in db'] }
      }
      console.log('here1')
      const price: any = course[0]?.price
      const res = await razorpay.payments.capture(paymentId, price * 100, 'INR')
      console.log(res)
      if (!res.captured) {
        return { errors: ['Payment was not completed, please try again'] }
      }
      console.log('ites here 2')
      console.log(batchId)
      const _user = await studentDataOperations.enrollStudent(
        courseId,
        studentId,
        batchId
      )
      return { paymentSuccessful: true }
    } catch (e) {
      console.log(e)
      return { errors: ['Payment was not completed, please try again'] }
    }
  }

  async resetPassword(email: string) {
    const u = await User.findOne({ email: email })
    if (!Boolean(u)) {
      return { errors: ['invalid email id'] }
    }
    const dataCode = jwt.sign(
      {
        data: u?._id
      },
      'secret',
      { expiresIn: '15m' }
    )
    sendMail2(u?.name!, u?.email!, dataCode, true)
    return u
  }

  async changeBatch(userId: string, oldBatchId: string, newBatchId: string) {
    try {
      console.log('are we here')
      const modifiedStudent = await studentDataOperations.updateStudentBatch(
        userId,
        oldBatchId,
        newBatchId
      )

      return modifiedStudent
    } catch (e) {
      console.log(e)
      return { errors: ['something went wrong'] }
    }
  }
}

export default new StudentService()
