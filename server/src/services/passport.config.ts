import passport from 'passport'
import LocalStrategy from 'passport-local'
import GoogleStrategy from 'passport-google-oauth20'
import FacebookStrategy from 'passport-facebook'
import User, { Role, Strategy } from '../models/User'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

export function genPassword(password: string) {
  var salt = process.env.PASSWORD_HASH!
  var genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  return {
    salt: salt,
    hash: genHash
  }
}

function validPassword(password: string, hash: string, salt: string) {
  var hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return hash === hashVerify
}

const verifyCallback = (
  username: string,
  password: string,
  done: (err: any, user?: false | Express.User | null | undefined) => void
) => {
  User.find({ email: username.trim() })
    .then((user) => {
      if (user.length === 0) {
        return done('NO USER FOUND WITH THIS EMAIL', false)
      }

      const isValid = validPassword(
        password,
        user[0].password,
        process.env.PASSWORD_HASH!
      )
      console.log('inCB', user[0])
      if (isValid) {
        return done(null, user[0])
      } else {
        return done('INVALID PASSWORD', false)
      }
    })
    .catch((err) => {
      done(err)
    })
}

const verifyCallbackGoogle = async (
  _accessToken: string,
  _refreshToken: string,
  profile: GoogleStrategy.Profile,
  done: GoogleStrategy.VerifyCallback
) => {
  try {
    const user = await User.findOne({
      email: profile?.emails?.[0].value!
    }).exec()
    if (!Boolean(user)) {
      const newUser = new User({
        email: profile?.emails?.[0].value!,
        role: Role.STUDENT,
        strategy: Strategy.GOOGLE,
        providerId: profile.id
      })
      const u = await newUser.save()
      done(null, u)
    } else {
      done(null, user!)
    }
  } catch (err: any) {
    done(err)
  }
}

const verifyCallbackFacebook = async (
  _accessToken: string,
  _refreshToken: string,
  profile: FacebookStrategy.Profile,
  done: (error: any, user?: any, info?: any) => void
) => {
  try {
    const user = await User.findOne({
      email: profile?.emails?.[0].value!
    }).exec()
    if (!Boolean(user)) {
      const newUser = new User({
        email: profile?.emails?.[0].value!,
        role: Role.STUDENT,
        strategy: Strategy.FACEBOOK,
        providerId: profile.id
      })
      const u = await newUser.save()
      done(null, u)
    } else {
      done(null, user!)
    }
  } catch (err) {
    done(err)
  }
}

const googleOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: 'http://localhost:3000/'
}

const facebookOptions = {
  clientID: 'process.env.GOOGLE_CLIENT_ID',
  clientSecret: 'GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://www.example.com/auth/google/callback'
}

const localStrategy = new LocalStrategy.Strategy(verifyCallback)
const googleStrategy = new GoogleStrategy.Strategy(
  googleOptions,
  verifyCallbackGoogle
)
const facebookStrategy = new FacebookStrategy.Strategy(
  facebookOptions,
  verifyCallbackFacebook
)

passport.use(localStrategy)
passport.use(googleStrategy)
passport.use(facebookStrategy)

passport.serializeUser((user: any, done) => {
  done(null, user._id)
})

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      console.log('de', user)
      done(null, user)
    })
    .catch((err) => {
      console.log('err', err)
      done(err)
    })
})
