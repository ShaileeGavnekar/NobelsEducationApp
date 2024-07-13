import { CommonRoutesConfig } from '../Common/Common.routes.config'
import express from 'express'
import commonMiddleware from '../Common/common.middleware'
import adminController from './admin.controller'
import adminMiddleware from './admin.middleware'
import { Role } from '../models/User'
import { uploadMainFile } from '../Upload/upload'

export class AdminRoutes extends CommonRoutesConfig {
  role: Role
  constructor(app: express.Application) {
    super(app, 'AdminRoutes')
    this.role = Role.ADMIN
  }

  configureRoutes(): express.Application {
    this.app.put(
      'admin/blockStudent',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminMiddleware.checkBlockStudentRequest,
      adminController.blockStudent
    )

    this.app.get(
      '/admin/getAllTeachers',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.getAllTeachers
    )

    this.app.get(
      '/admin/getAllStudents',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.getAllStudents
    )

    this.app.get(
      '/admin/getAllClass',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.getAllClasses
    )

    this.app.get(
      '/admin/getClassDetails',
      commonMiddleware.authenticate,
      adminController.getClassDetails
    )

    this.app.post(
      '/admin/createCourse',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminMiddleware.checkCreateOrUpdateCourseRequest,
      adminController.createCourse
    )

    this.app.put(
      '/admin/updateCourse',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminMiddleware.checkCreateOrUpdateCourseRequest,
      adminController.updateCourse
    )

    this.app.put(
      '/admin/updateClass',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.updateClass
    )

    this.app.post(
      '/admin/invite',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.sendInviteTeacherMail
    )

    this.app.delete(
      '/admin/deleteCourse',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.deleteCourse
    )

    this.app.delete(
      '/admin/deleteClass',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.deleteClass
    )

    this.app.post(
      '/admin/createClass',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.createClass
    )

    this.app.delete(
      '/admin/deleteClass',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.deleteClass
    )

    this.app.get(
      '/admin/getAllCourses',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.getAllCourses
    )

    this.app.get(
      '/admin/getStudentDetails',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.getStudentDetails
    )

    this.app.get(
      '/admin/getTeacherDetails',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.getTeacherDetails
    )

    this.app.get(
      '/admin/getAllLeads',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.getAllLeads
    )
    this.app.get(
      '/admin/getAllBatches',
      commonMiddleware.authenticate,
      adminController.getAllBatches
    )

    this.app.put(
      '/admin/addCourseAvatar',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.TEACHER),
      uploadMainFile.single('avatar'),
      adminController.addCourseAvatar
    )

    this.app.post(
      '/admin/createBatch',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.createBatch
    )

    this.app.put(
      '/admin/updateBatch',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.createBatch
    )

    this.app.post(
      '/admin/changeBatch',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.updateStudentBatch
    )

    this.app.delete(
      '/admin/deleteBatch',
      commonMiddleware.authenticate,
      commonMiddleware.isAuthorized(Role.ADMIN),
      adminController.deleteClass
    )

    return this.app
  }
}
