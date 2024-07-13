import express from 'express'

class StudentMiddleware {
  async studentAuthenticated(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.isAuthenticated()) {
      res.status(400).send({
        errors: ['Not Authenticated']
      })
    } else {
      next()
    }
  }

  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.email && req.body.password) {
      next()
    } else {
      res.status(400).send({
        errors: ['Missing required fields: email and password']
      })
    }
  }
}

export default new StudentMiddleware()
