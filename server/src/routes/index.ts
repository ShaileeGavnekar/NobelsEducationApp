import { Router } from 'express'
import passport from 'passport'
import { genPassword } from '../services/passport.config'
import User, { Strategy } from '../models/User'
import { Role } from '../models/User'
import STATUS from 'http-status-codes'
import studentService from '../Student/student.service'
import { CreateStudentRequest } from '../Student/student.type'
import commonMiddleware from '../Common/common.middleware'
import teacherService from '../Teacher/teacher.service'
import crypto from 'crypto'
// import { Buffer } from 'buffer'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const router: Router = Router()

router.post('/logout', function (req, res) {
  req.logout()
  res.status(200).clearCookie('connect.sid', {
    path: '/'
  })
  req.session.destroy((err) => console.log(err))
  return res.status(200).send({ message: 'logout true' })
})

router.get('/getUser', async (req, res) => {
  if (req.isAuthenticated() && Boolean(req?.user)) {
    const user: any = req.user
    const role = user.role
    if (role === 'STUDENT') {
      const s = await studentService.getStudentWithUserId(user?._id)
      return res
        .status(STATUS.OK)
        .send({ user: { ...user._doc, password: '' }, student: s })
    } else if (role === 'ADMIN') {
      return res
        .status(STATUS.OK)
        .send({ user: { ...user._doc, password: '' } })
    } else {
      const teacher = await teacherService.getTeacherById(user._id)
      return res
        .status(200)
        .send({ user: { ...user._doc, password: '' }, teacher })
    }
  } else {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send({ errors: ['NOT AUTHENTICATED'] })
  }
})

router.get('/generateSignature', (req, res) => {
  if (req.isAuthenticated()) {
    //@ts-ignore
    const role = req.user?.role === 'ADMIN' ? 1 : 0
    const timestamp = new Date().getTime() - 30000
    const msg = Buffer.from(
      req.body.apiKey + req.body.meetingNumber + timestamp + role
    ).toString('base64')
    const hash = crypto
      .createHmac('sha256', process.env.ZOOM_SECRET!)
      .update(msg)
      .digest('base64')
    const signature = Buffer.from(
      `${req.body.apiKey}.
      ${req.body.meetingNumber}.
      ${timestamp}.
      ${role}.
      ${hash}`
    ).toString('base64')
    return res.status(STATUS.OK).send({ signature })
  } else {
    return res
      .status(STATUS.UNAUTHORIZED)
      .send({ errors: ['NOT AUTHENTICATED'] })
  }
})

router.post('/local-login', passport.authenticate('local'), (_req, res) => {
  console.log('hitting')
  res.status(200).send({ login: true })
})

router.post(
  '/google-login',

  passport.authenticate('google', { scope: ['email', 'name'] }),
  (_req, res) => {
    console.log('here')
    res.status(200).send({ login: true })
  }
)

router.post(
  '/facebook-login',
  passport.authenticate('facebook', { scope: ['email', 'name'] }),
  (_req, res) => {
    res.status(200).send({ login: true })
  }
)

router.get('/send-otp', async (req, res) => {
  try {
    const { mobileNumber }: any = req.query

    const details: any = await axios.get(
      `http://2factor.in/API/V1/${process?.env?.SMS_API_KEY}/SMS/${mobileNumber}/AUTOGEN`
    )

    return res.status(200).send({ smsSessionId: details.data })
  } catch (e) {
    console.log(e, 'here')
    return res.status(400).send({ errors: [e] })
  }
})

router.post('/register-local', async (req, res) => {
  try {
    const {
      email,
      password,
      name,
      address,
      pinCode,
      state,
      country,
      Details,
      otp
    } = req.body
    const u = await User.find({ email: email })
    const details: any = await axios.get(
      `https://2factor.in/API/V1/${process?.env?.SMS_API_KEY}/SMS/VERIFY/${Details}/${otp}`
    )
    console.log(u)
    if (Boolean(u?.length > 0)) {
      res.status(400).json({ error: 'Email already existed' })
      return
    }
    if (Boolean(details?.data?.Status != 'Success')) {
      res.status(400).json({ error: 'Invalid OTP' })
      return
    }
    if (!Boolean(email) || !Boolean(password)) {
      res.status(400).json({ error: 'Email and password required' })
      return
    }

    const saltHash = genPassword(req.body.password)

    const hash = saltHash.hash

    const newUser = new User({
      email: req.body.email,
      hash: hash,
      password: hash,
      role: Role.STUDENT,
      initialized: false,
      strategy: Strategy.LOCAL,
      address,
      pinCode,
      state,
      country,
      name
    })

    newUser
      .save()
      .then((user) => {
        if (Boolean(user)) {
          const s: CreateStudentRequest = {
            userId: user._id,
            name: name,
            status: 'ACTIVE',
            email: user.email,
            coursesEnrolled: []
          }
          studentService
            .createStudentR(s)
            .then(() => {
              res.json({ registered: true })
            })
            .catch((err) => {
              res.status(500).json({ registered: false, error: err })
            })
        }
      })
      .catch((err) => {
        console.log(err)
        if (Boolean(err)) {
          res.status(500).json({ registered: false, error: err })
        }
      })

    // res.status(200)
    return
  } catch (e) {
    console.log(e)
    res.status(500).json({ registered: false, errors: ['invalid otp'] })
  }
})

router.put('/updateUser', commonMiddleware.authenticate, (req, res) => {
  const {
    name,
    address,
    country,
    state,
    mobileNumber,
    city,
    age,
    parentsName,
    pinCode,
    class: userClass
  } = req.body
  //@ts-ignore
  const id: any = req?.user?.id
  User.findByIdAndUpdate(
    id,
    {
      name,
      country,
      pinCode,
      address,
      city,
      state,
      mobileNumber,
      parentsName,
      age,
      class: userClass
    },
    (err: Error, user: any) => {
      if (Boolean(err)) {
        res.status(500).send({ errors: ['something went wrong'] })
      } else {
        res.status(200).send(user)
      }
    }
  )

  return
})

export default router
