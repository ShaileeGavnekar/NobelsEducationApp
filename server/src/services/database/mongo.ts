import mongoose from 'mongoose'
import dotenv from 'dotenv'

import MongoStore from 'connect-mongo'
dotenv.config()
const { NODE_ENV, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env
console.log('s' + DB_NAME)
// const dbURL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ixpyc.mongodb.net/educationApp?retryWrites=true&w=majority`
const dbURL = `mongodb+srv://srija:srija%40123@cluster0.r2gg9.mongodb.net/?retryWrites=true&w=majority`
const options: mongoose.ConnectOptions = {
  autoIndex: false
}

export const UserSessionStore = new MongoStore({
  mongoUrl: dbURL,
  dbName: 'UserSessions'
})

async function connectDB(): Promise<mongoose.Connection> {
  try {
    console.log('connecting')
    mongoose.set('debug', NODE_ENV === 'development')

    await mongoose.connect(dbURL, options)
    console.log('<<<< Connected to MongoDB >>>>')

    mongoose.Promise = global.Promise // Get Mongoose to use the global promise library
    const db: mongoose.Connection = mongoose.connection // Get the default connection
    return db
  } catch (error) {
    console.error('MongoDB Connection Error: ', error)
    process.exit(1)
  }
}

export default connectDB
