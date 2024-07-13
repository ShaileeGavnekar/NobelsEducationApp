import 'reflect-metadata'
import http from 'http'
import https from 'https'
import app from './app'
import dotenv from 'dotenv'

import dbConnect from './services/database'
dotenv.config()
const { NODE_ENV, SERVER_PROTOCOL, SERVER_HOST, SERVER_PORT } = process.env
async function startServer(server: http.Server | https.Server): Promise<void> {
  server.listen(process.env.PORT || 4000, () => {
    const url = `${SERVER_PROTOCOL || 'http'}://${SERVER_HOST || 'localhost'}:${
      SERVER_PORT || 4000
    }`
    console.log(
      `API is now running on ${url} in ${NODE_ENV || 'development'} mode`
    )
  })
}

;(async () => {
  try {
    await dbConnect()
    await startServer(http.createServer(app))
  } catch (error) {
    throw Error(`>>>>> Server Connection Error: ${error}`)
  }
})()
