import express, { NextFunction } from 'express'

class CommonMiddleware {
  async authenticate(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    console.log(req.isAuthenticated())
    if (req.isAuthenticated()) {
      // console.log(req.isAuthenticated())
      next()
    } else {
      res.status(401).send({
        errors: ['Unauthenticated']
      })
    }
  }

  isAuthorized(role: 'ADMIN' | 'TEACHER' | 'STUDENT') {
    return function (
      req: express.Request,
      res: express.Response,
      next: NextFunction
    ) {
      //@ts-ignore
      const userRoles = req?.user?.role
      console.log(role, 'role', userRoles)

      if (
        userRoles === role ||
        (userRoles === 'ADMIN' && (role === 'STUDENT' || role === 'TEACHER')) ||
        (userRoles === 'TEACHER' && role === 'STUDENT')
      ) {
        next()
      } else {
        res.status(400).send({ errors: ['Not allowed for this role'] })
        return
      }
    }
  }
}

export default new CommonMiddleware()
