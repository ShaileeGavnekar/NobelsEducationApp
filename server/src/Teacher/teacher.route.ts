import { CommonRoutesConfig } from '../Common/Common.routes.config'
import express from 'express'
import commonMiddleware from '../Common/common.middleware'
import teacherController from './teacher.controller'
import multer from 'multer'
import { Role } from '../models/User'
import { uploadMainFile } from '../Upload/upload'

const storage = multer.diskStorage({
  destination: 'uploads/'
})
const uploadImage = multer({ storage }).single('attachment')
export class TeacherRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'TeacherRoutes')
  }
  role: any = 'TEACHER'
  configureRoutes(): express.Application {
    this.app.get(
      '/teacher/courses',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.TEACHER),
      teacherController.getTeachersCourses
    )
    this.app.get(
      '/teacher/classes',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.TEACHER),
      teacherController.getTeachersClasses
    )
    this.app.get(
      '/teacher/getDetailsUsingToken',
      teacherController.getTeacherDetailsUsingToken
    )

    this.app.post('/teacher/savePassword', teacherController.updatePassword)

    this.app.put(
      '/teacher/uploadAttachment',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.TEACHER),
      uploadMainFile.single('attachment'),
      teacherController.uploadAttachment
    )

    this.app.delete(
      '/teacher/removeAttachments',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.TEACHER),
      teacherController.removeAttachment
    )

    this.app.get(
      '/teacher/attachment',
      commonMiddleware.authenticate,
      teacherController.getAttachment
    )

    return this.app
  }
}
