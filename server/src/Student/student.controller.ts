import express from 'express'
import studentService from './student.service'
import { isError } from '../Subject/subject.service'
import HttpStatusCodes from 'http-status-codes'
import { isUndefined } from 'lodash'
import { getFileStream } from '../Upload/upload'

class StudentController {
  async getStudentById(req: express.Request, res: express.Response) {
    const user = await studentService.getStudentById(req.body.studentId)
    res.status(200).send(user)
  }

  async getUploadedImageKey(req: any, res: express.Response) {
    return res.status(200).send({ key: req.file.key })
  }

  async getStudentCourse(req: express.Request, res: express.Response) {
    const user = await studentService.getStudentById(req.body.studentId)
    if (!Boolean(user) || isError(user)) {
      res.status(HttpStatusCodes.BAD_REQUEST).send({
        errors: ['Student no found with given id']
      })
      return
    }
    const courses = user?.coursesEnrolled
    if (courses?.length === 0 || isUndefined(courses)) {
      res.status(200).send([])
      return
    }

    const courseDetails = courses.map(async (courseId) => {
      const details = await studentService.getCourseDetails(courseId as string)
      return details
    })
    const data = await Promise.all(courseDetails)
    res.status(200).send(data)
  }

  async initializeStudent(req: express.Request, res: express.Response) {
    const student = await studentService.initializeStudent(req.body)
    if (isError(student)) {
      res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send({ errors: student.errors })
      return
    }

    res.status(HttpStatusCodes.OK).send(student)
  }

  async upsertStudentInfo(req: express.Request, res: express.Response) {
    const user = await studentService.getStudentById(req.body.studentId)
    res.status(200).send(user)
  }

  async deleteStudentById(req: express.Request, res: express.Response) {
    const user = await studentService.deleteStudentById(req.body.studentId)
    res.status(200).send(user)
  }

  async getStudentClasses(req: express.Request, res: express.Response) {
    const classes = await studentService.getStudentClasses(
      req.query.studentId as any
    )
    res.status(200).send(classes)
  }

  async updateProfile(req: express.Request, res: express.Response) {
    const classes = studentService.updateStudentInfo(req.body)
    res.status(200).send(classes)
  }

  async getAllCourses(_req: express.Request, res: express.Response) {
    const courses = await studentService.getAllCourses()
    res.status(200).send(courses)
  }

  async getStarredCourses(_req: express.Request, res: express.Response) {
    const courses = await studentService.getAllCourses()
    if (isError(courses)) {
      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(courses)
    }
    return res.status(200).send(courses.filter((c) => c.starred))
  }

  async createOrder(req: express.Request, res: express.Response) {
    const courses = await studentService.createOrder(req.body.courseId)
    res.status(200).send(courses)
  }
  async createLead(req: express.Request, res: express.Response) {
    const { name, phoneNumber } = req.body
    const lead = await studentService.createLead(name, phoneNumber)
    res.status(200).send(lead)
  }

  async payOrder(req: express.Request, res: express.Response) {
    const { courseId, paymentId, studentId, batchId } = req.body
    console.log(batchId)
    const orderStatus = await studentService.payOrder(
      courseId,
      studentId,
      paymentId,
      batchId
    )

    return res.status(200).send(orderStatus)
  }

  async getCourseDetails(req: express.Request, res: express.Response) {
    if (!Boolean(req?.body?.courseId)) {
      return res
        .status(HttpStatusCodes.PRECONDITION_FAILED)
        .send({ errors: ['CourseId is required'] })
    }
    const { courseId } = req.body
    const courseDetails = await studentService.getCourseDetails(courseId)

    if (isError(courseDetails)) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(courseDetails)
    }

    return res.status(200).send(courseDetails)
  }

  async addMeInClass(req: express.Request, res: express.Response) {
    const { name, email, meetingId, apiKey } = req.body
    const meetingDetails = await studentService.addMeInClass(
      name,
      email,
      meetingId,
      apiKey
    )
    return res.status(200).send(meetingDetails)
  }

  async addMyAvatar(req: any, res: express.Response) {
    const vars = {
      avatar: req.file.key as string,
      _id: req?.user?._id as string
    }
    const updatedStudent = await studentService.uploadProfileImage(vars)
    if (isError(updatedStudent)) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .send(updatedStudent)
    }
    console.log(updatedStudent)

    return res.status(HttpStatusCodes.OK).send({ key: req.file.key })
  }
  //@ts-ignore
  async getAvatar(req: express.Request, res: express.Response) {
    const key: string = req.query.Key as string
    try {
      console.log('here its get avatar', key, isUndefined(key), key.length)
      if (!Boolean(key) || isUndefined(key) || key === 'undefined') {
        console.log('here its get avatar 2 undefined passed', key)
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send({ errors: ['Invalid Key'] })
      } else {
        const readStream = getFileStream(key)
        if (typeof readStream === 'string') {
          res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: [readStream] })
        } else readStream.pipe(res)
      }
    } catch (e) {
      console.log(e)
      res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: [e] })
    }
  }

  //@ts-ignore
  async getCourseAvatar(req: express.Request, res: express.Response) {
    try {
      const key: string = req.query.key as string
      if (!Boolean(key) || isUndefined(key) || key === 'undefined') {
        return res
          .status(HttpStatusCodes.BAD_REQUEST)
          .send({ errors: ['Invalid Key'] })
      } else {
        const readStream = getFileStream(key)
        if (typeof readStream === 'string') {
          res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: [readStream] })
        } else readStream.pipe(res)
      }
    } catch (e) {
      console.log(e)
      res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: [e] })
    }
  }
  async resetPassword(req: express.Request, res: express.Response) {
    const email: string = req.body.email as string
    const m = studentService.forgotPasswordMail(email)
    console.log('m', m)
    if (isError(m)) {
      return res.status(400)
    }
    return res.status(200)
  }

  async updatePassword(req: express.Request, res: express.Response) {
    const dataCode: string = req.body.dataCode as string
    const password: string = req.body.password as string
    const m = studentService.updatePassword(dataCode, password)
    console.log('updated', m)
    if (isError(m)) {
      return res.status(400).send(m)
    }
    return res.status(200).send(m)
  }
}

export default new StudentController()
