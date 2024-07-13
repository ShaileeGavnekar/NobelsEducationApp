import express from 'express'
import adminService from './admin.service'
import HTTP_STATUS_CODE from 'http-status-codes'
import { isError } from '../Subject/subject.service'
import { getFileStream } from '../Upload/upload'

class AdminController {
  async blockStudent(req: express.Request, res: express.Response) {
    const blockedStudent = await adminService.blockStudent(req.body.studentId)
    if (blockedStudent?.errors) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(blockedStudent.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(blockedStudent)
  }
  async createCourse(req: express.Request, res: express.Response) {
    const course = await adminService.createCourse(req.body)
    if (isError(course)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(course.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(course)
  }

  async updateCourse(req: express.Request, res: express.Response) {
    const updatedCourse = await adminService.updateCourse(req.body)
    if (isError(updatedCourse)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(updatedCourse.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(updatedCourse)
  }
  async deleteCourse(req: express.Request, res: express.Response) {
    const deletedCourse = await adminService.deleteCourse(
      req.query.courseId as string
    )

    if (isError(deletedCourse)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(deletedCourse.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(deletedCourse)
  }

  async sendInviteTeacherMail(req: express.Request, res: express.Response) {
    console.log(req.body)
    const teacher = await adminService.sendInviteTeacherMail(req.body)
    return res.send(teacher)
  }
  async addCourseAvatar(req: any, res: express.Response) {
    try {
      const vars = {
        key: req.file.key as string,
        courseId: req.body.courseId as string
      }

      const a = await adminService.addCourseAvatar(vars)
      if (isError(a)) {
        res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(a)
      }
      return res.status(200).send(a)
    } catch (e) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ errors: [e] })
    }
  }

  async getAllTeachers(_req: express.Request, res: express.Response) {
    const teachers = await adminService.getAllTeachers()
    const response = teachers.map((t) => {
      return {
        _id: t.id,
        name: t.name,
        dob: '',
        phoneNumber: t.mobileNumber ?? '',
        email: t.email
      }
    })
    return res.status(HTTP_STATUS_CODE.OK).send(response)
  }
  async getAllStudents(_req: express.Request, res: express.Response) {
    const students = await adminService.getAllStudents()
    const response = students.map((t) => {
      return {
        _id: t._id,
        name: t.name,
        dob: '',
        phoneNumber: t.mobileNumber ?? '',
        email: t.email
      }
    })
    return res.status(HTTP_STATUS_CODE.OK).send(response)
  }
  async createClass(req: express.Request, res: express.Response) {
    const {
      batchId,
      startTime,
      duration,
      topic,
      passCode,
      description,
      courseName,
      batchName,
      courseId
    } = req.body
    const clas = await adminService.createClass(
      courseId,
      startTime,
      duration,
      topic,
      passCode,
      description,
      courseName,
      batchName,
      batchId
    )
    if (isError(clas)) {
      return res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).send(clas)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(clas)
  }

  async getAllCourses(_req: express.Request, res: express.Response) {
    const courses = await adminService.getAllCourses()
    return res.status(HTTP_STATUS_CODE.OK).send(courses)
  }

  async getAllClasses(_req: express.Request, res: express.Response) {
    const classes = await adminService.getAllClasses()
    return res.status(HTTP_STATUS_CODE.OK).send(classes)
  }
  async deleteClass(req: express.Request, res: express.Response) {
    const { classId, meetingId } = req.query
    const delClass = await adminService.deleteClass(
      meetingId as string,
      classId as string
    )
    return res.status(HTTP_STATUS_CODE.OK).send(delClass)
  }

  async getClassDetails(req: express.Request, res: express.Response) {
    const classId = req.query.classId
    const classDetails = await adminService.getClassDetails(classId as string)
    return res.status(HTTP_STATUS_CODE.OK).send(classDetails)
  }
  async updateClass(req: express.Request, res: express.Response) {
    const {
      courseId,
      startTime,
      topic,
      duration,
      description,
      meetingId,
      _id,
      batchName,
      courseName
    } = req.body
    const updatedClass = await adminService.updateClass(
      courseId,
      startTime,
      topic,
      duration,
      description,
      meetingId,
      _id,
      courseName,
      batchName
    )
    return res.status(HTTP_STATUS_CODE.OK).send(updatedClass)
  }

  async getStudentDetails(req: express.Request, res: express.Response) {
    const studentId: string = req.query.studentId as string
    const studentDetails = await adminService.getStudentDetails(studentId)
    if (isError(studentDetails)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ errors: ['something went wrong'] })
    }
    return res.status(200).send(studentDetails)
  }

  async getTeacherDetails(req: express.Request, res: express.Response) {
    const teachersId: string = req.query.teacherId as string
    const teachersDetails = await adminService.getTeacherDetails(teachersId)
    if (isError(teachersDetails)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send({ errors: ['something went wrong'] })
    }
    return res.status(200).send(teachersDetails)
  }

  async getAllLeads(_req: express.Request, res: express.Response) {
    const classes = await adminService.getAllLeads()
    return res.status(HTTP_STATUS_CODE.OK).send(classes)
  }
  async getAllBatches(_req: express.Request, res: express.Response) {
    const batches = await adminService.getAllBatches()
    return res.status(HTTP_STATUS_CODE.OK).send(batches)
  }

  async createBatch(req: express.Request, res: express.Response) {
    const batch = await adminService.createBatch(req.body)
    if (isError(batch)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(batch.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(batch)
  }

  async deleteBatch(req: express.Request, res: express.Response) {
    const deletedBatch = await adminService.deleteBatch(
      req.query.batchId as string
    )

    if (isError(deletedBatch)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(deletedBatch.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(deletedBatch)
  }

  async updateBatch(req: express.Request, res: express.Response) {
    const updatedBatch = await adminService.updateBatch(req.body)
    if (isError(updatedBatch)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(updatedBatch.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(updatedBatch)
  }
  async updateStudentBatch(req: express.Request, res: express.Response) {
    const updatedBatch = await adminService.modifyStudentBatch(req.body)
    if (isError(updatedBatch)) {
      return res
        .status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
        .send(updatedBatch.errors)
    }
    return res.status(HTTP_STATUS_CODE.OK).send(updatedBatch)
  }
}

export default new AdminController()
