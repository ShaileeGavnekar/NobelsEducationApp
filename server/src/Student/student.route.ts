import { CommonRoutesConfig } from '../Common/Common.routes.config'
import express from 'express'
import commonMiddleware from '../Common/common.middleware'
import studentController from './student.controller'
import { Role } from '../models/User'
import { uploadMainFile } from '../Upload/upload'

export class StudentRoutes extends CommonRoutesConfig {
  role = 'STUDENT' as any
  constructor(app: express.Application) {
    super(app, 'StudentRoutes')
  }

  configureRoutes(): express.Application {
    this.app.put(
      'student/updateMyProfile',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(this.role),
      studentController.updateProfile
    )
    this.app.post(
      '/student/uploadProfileImage',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.TEACHER),
      uploadMainFile.single('avatar'),
      studentController.getUploadedImageKey
    )

    this.app.post(
      '/student/initializeStudent',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized('STUDENT'),
      studentController.initializeStudent
    )

    this.app.post(
      '/student/getMyCourse',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.STUDENT),
      studentController.getStudentCourse
    )

    this.app.get(
      '/student/getMyClasses',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.STUDENT),
      studentController.getStudentClasses
    )

    this.app.post(
      '/student/getCourseDetails',
      studentController.getCourseDetails
    )
    this.app.post('/student/createLeads', studentController.createLead)

    this.app.get('/student/getAllCourse', studentController.getAllCourses)
    this.app.get('/student/resetPassword', studentController.resetPassword)
    this.app.post('/student/sendPwMail', studentController.resetPassword)
    this.app.post('/student/updatePw', studentController.updatePassword)
    this.app.get(
      '/student/getStarredCourse',
      studentController.getStarredCourses
    )

    this.app.post(
      '/student/createOrder',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.STUDENT),
      studentController.createOrder
    )

    this.app.post(
      '/student/payOrder',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.STUDENT),
      studentController.payOrder
    )

    this.app.post(
      '/student/addMeInClass',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.STUDENT),
      studentController.addMeInClass
    )

    this.app.put(
      '/student/addMyAvatar',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.STUDENT),
      uploadMainFile.single('avatar'),
      studentController.addMyAvatar
    )

    this.app.get('/student/getAvatar', studentController.getAvatar)
    this.app.get('/student/getCourseAvatar', studentController.getCourseAvatar)

    return this.app
  }
}
