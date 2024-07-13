import express from 'express'
import classService from '../Class/class.service'
import { isError } from '../Subject/subject.service'
import { getFileStream, s3 } from '../Upload/upload'
import teacherDbOperations from './teacher.db.operations'
import teacherService from './teacher.service'
import httpStatusCodes from 'http-status-codes'
import HttpStatusCodes from 'http-status-codes'

class TeacherController {
  async getTeacherById(req: express.Request, res: express.Response) {
    if (!req.body.teacherId) {
      res.status(400).send({ errors: ['Teacher id required'] })
      return
    }
    const user = await teacherDbOperations.getTeacher(req.body.teacherId)
    res.status(200).send(user)
  }

  async updatePassword(req: express.Request, res: express.Response) {
    const { dataCode, password } = req.body
    const t = await teacherService.updateTeacherPassword(dataCode, password)
    if (isError(t)) {
      return res.status(httpStatusCodes.NOT_ACCEPTABLE).send(t)
    }
    return res.status(200).send(t)
  }

  async uploadFiles(req: any, res: express.Response) {
    console.log(req.file)

    if (req.file)
      return res.status(200).send({ msg: 'file uploaded successfully' })
    return res.status(400).send({ errors: 'upload file failed' })
  }

  async getTeachersCourses(req: express.Request, res: express.Response) {
    const user: any = req.user
    const courses = await teacherService.getTeacherCourses(user?._id)
    return res.status(200).send(courses)
  }

  async getTeachersClasses(req: express.Request, res: express.Response) {
    const user: any = req.user
    const courses = await teacherService.getTeacherClasses(user?._id)
    return res.status(200).send(courses)
  }

  async uploadAttachment(req: any, res: express.Response) {
    await classService.addAttachment(req.file.key, req.body.classId)
    if (req.file)
      return res.status(200).send({ msg: 'file uploaded successfully' })
    return res.status(400).send({ errors: 'upload file failed' })
  }

  async removeAttachment(req: express.Request, res: express.Response) {
    const c = await classService.addAttachment('', req.query.classId as string)
    const fileKey = req.query.fileKey

    await s3
      .deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileKey as string
      })
      .promise()
    return res.status(200).send({ ...c, msg: 'done' })
  }

  async getAttachment(req: express.Request, res: express.Response) {
    try {
      const key: string = req.query.key as string
      if (!Boolean(key)) {
        res
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

  async getTeacherDetailsUsingToken(
    req: express.Request,
    res: express.Response
  ) {
    const token: string = req.query.dataCode as string

    const userDetails = await teacherService.getTeacherDetailsFromToken(token)
    if (isError(userDetails)) {
      return res
        .status(httpStatusCodes.NOT_ACCEPTABLE)
        .send({ errors: userDetails.errors })
    }
    return res.status(200).send({ userDetails })
  }

  async updateTeacherPassword(req: express.Request, res: express.Response) {
    const { token, password } = req.body
    const teacher: any = await teacherService.updateTeacherPassword(
      token,
      password
    )
    return res.status(200).send({ ...teacher, password: '' })
  }
}

export default new TeacherController()
