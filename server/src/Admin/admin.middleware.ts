import express from 'express'

class AdminMiddleware {
  checkBlockStudentRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (Boolean(req.body.studentId)) {
      next()
    } else {
      res.status(401).send({
        errors: ['Please provide student id']
      })
    }
  }

  checkCreateOrUpdateCourseRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (Boolean(req.body.name) && Boolean(req.body.numberOfClasses)) {
      next()
    } else {
      res.status(401).send({
        errors: ['name and no. of classes are required']
      })
    }
  }

  checkDeleteCourseRequest(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (Boolean(req.body.courseId)) {
      next()
    } else {
      res.status(401).send({
        errors: ['courseId is required']
      })
    }
  }
}

export default new AdminMiddleware()
