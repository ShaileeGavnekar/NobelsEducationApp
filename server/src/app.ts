import express from 'express'
import helmet from 'helmet'
import { urlencoded, json } from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http'
import session from 'express-session'
import router from './routes'
import passport from 'passport'
import { UserSessionStore } from './services/database/mongo'
import './services/passport.config'
import { CommonRoutesConfig } from './Common/Common.routes.config'
import { StudentRoutes } from './Student/student.route'
import { MongoError } from 'mongodb'
import HttpStatus from 'http-status-codes'
import { AdminRoutes } from './Admin/admin.route'
import { TeacherRoutes } from './Teacher/teacher.route'

dotenv.config()
const routes: Array<CommonRoutesConfig> = []
const app: express.Application = express()
app.use(urlencoded({ extended: true }))

app.use(function handleDatabaseError(
  error: Error,
  _request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  if (error instanceof MongoError) {
    if (error.code === 11000) {
      return response.status(HttpStatus.CONFLICT).json({
        httpStatus: HttpStatus.CONFLICT,
        type: 'MongoError',
        message: error.message
      })
    } else {
      return response.status(503).json({
        httpStatus: HttpStatus.SERVICE_UNAVAILABLE,
        type: 'MongoError',
        message: error.message
      })
    }
  }
  next(error)
  return
})

app.use(json())
app.set('trust proxy', 1)
app.use(helmet())
app.use(
  cors({
    credentials: true,
    // origin: 'https://education-app1.vercel.app'
    origin: 'nobels.in'
    // origin: 'http://localhost:3000'
  })
)

app.use(
  session({
    secret: 'process.env.SECRET'!,
    resave: false,
    saveUninitialized: true,
    store: UserSessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      // domain: 'test-2022-success.herokuapp.com',
      domain: 'nobels.in',
      sameSite: 'none',
      httpOnly: true
    }
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24
    // }
  })
)
app.use(passport.initialize())
app.use(passport.session())

routes.push(new StudentRoutes(app))
routes.push(new TeacherRoutes(app))
routes.push(new AdminRoutes(app))

const server: http.Server = new http.Server(app)
app.use('/api', router)
export default app
