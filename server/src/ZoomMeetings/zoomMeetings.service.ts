import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import rp from 'request-promise'
dotenv.config()

const payload = {
  iss: process.env.ZOOM_KEY,
  exp: new Date().getTime() + 123123
}
const token = jwt.sign(payload, process.env.ZOOM_SECRET!)
class ZoomService {
  async createMeeting(
    startTime: string,
    topic: string,
    agenda: String,
    password: string
  ) {
    console.log(startTime, topic, agenda, password)
    try {
      const options = {
        uri: 'https://api.zoom.us/v2/users/me/meetings',
        qs: {
          status: 'active'
        },
        method: 'POST',
        headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: {
          topic,
          type: '2',
          pre_schedule: 'false',
          start_time: startTime,
          duration: '60',
          timezone: 'Asia/Kolkata',
          default_password: 'false',
          agenda,
          password
        },
        json: true
      }
      const meetingDetails = await rp(options)
      return meetingDetails
    } catch (err) {
      console.log(err)
      return { errors: [err] }
    }
  }
  async updateMeeting(
    meetingId: String,
    startTime: string,
    topic: string,
    agenda: string
  ) {
    try {
      const options = {
        uri: `https://api.zoom.us/v2/meetings/${meetingId}`,
        qs: {
          status: 'active'
        },
        method: 'PATCH',
        headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: {
          topic: topic,
          type: '2',
          pre_schedule: 'false',
          start_time: startTime,
          duration: '60',
          timezone: 'Asia/Kolkata',
          default_password: 'false',
          agenda
        },
        json: true
      }
      const meetingDetails = await rp(options)
      return meetingDetails
    } catch (err) {
      return { errors: [err] }
    }
  }
  async deleteMeeting(meetingId: string) {
    try {
      const options = {
        uri: `https://api.zoom.us/v2/meetings/${meetingId}`,
        qs: {
          status: 'active'
        },
        method: 'DELETE',
        headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        json: true
      }
      const meetingDetails = await rp(options)
      return meetingDetails
    } catch (err) {
      return { errors: [err] }
    }
  }
  async getMeeting(meetingId: string) {
    try {
      const options = {
        uri: `https://api.zoom.us/v2/meetings/${meetingId}`,
        qs: {
          status: 'active'
        },
        method: 'GET',
        headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        json: true
      }
      const meetingDetails = await rp(options)
      return meetingDetails
    } catch (err) {
      return { errors: [err] }
    }
  }
  async addBatchParticipants(
    studentInfo: Array<{ email: string; first_name: string }>,
    meetingId: string
  ) {
    try {
      const options = {
        uri: `https://api.zoom.us/v2/meetings/${meetingId}/batch_registrants`,
        qs: {
          status: 'active'
        },
        method: 'POST',
        headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: { registrants: studentInfo },
        json: true
      }
      const meetingDetails = await rp(options)
      return meetingDetails
    } catch (err) {
      return { errors: [err] }
    }
  }
  async addParticipant(studentEmail: string, name: string, meetingId: string) {
    try {
      const options = {
        uri: `https://api.zoom.us/v2/meetings/${meetingId}/registrants`,
        qs: {
          status: 'active'
        },
        method: 'POST',
        headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: {
          email: studentEmail,
          first_name: name
        },
        json: true
      }
      const meetingDetails = await rp(options)
      return meetingDetails
    } catch (err) {
      return { errors: [err] }
    }
  }
  async removeParticipant(registrantId: string, meetingId: string) {
    try {
      const options = {
        uri: `https://api.zoom.us/v2/meetings/${meetingId}/registrants/${registrantId}`,
        qs: {
          status: 'active'
        },
        method: 'DELETE',
        headers: {
          'User-Agent': 'Zoom-api-Jwt-Request',
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        json: true
      }
      const meetingDetails = await rp(options)
      return meetingDetails
    } catch (err) {
      return { errors: [err] }
    }
  }
}

export default new ZoomService()
