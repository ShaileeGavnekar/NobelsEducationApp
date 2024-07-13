import express from 'express'
import courseDbOperations from '../Course/course.db.operations'
import zoomMeetingsService from '../ZoomMeetings/zoomMeetings.service'
import classDbOperations from './class.db.operations'
import { CreateClassRequest, UpdateClassRequest } from './class.type'

class ClassService {
  async isSlotAvailable(startTime: string) {
    return await classDbOperations.isTimeAvailable(startTime)
  }

  async createClass({
    startTime,
    topic,
    description,
    batchId,
    password,
    duration,
    courseName,
    batchName,
    courseId
  }: {
    startTime: string
    topic: string
    description: string
    batchId: string
    password: string
    duration: number
    courseName: string
    batchName: string
    courseId: string
  }) {
    try {
      const zoomMeeting = await zoomMeetingsService.createMeeting(
        startTime,
        topic,
        description,
        password
      )
      const { id, join_url } = zoomMeeting

      const createClassReq: CreateClassRequest = {
        batchId,
        startTime,
        passCode: password,
        meetingId: id,
        meetingLink: join_url,
        duration,
        topic,
        description,
        courseName,
        batchName,
        courseId
      }
      const cls = await classDbOperations.createClass(createClassReq)
      return cls
    } catch (err) {
      return { errors: [err] }
    }
  }

  async updateClass({
    startTime,
    topic,
    description,
    batchId,
    password,
    duration,
    _id,
    meetingId,
    batchName,
    courseName,
    courseId
  }: {
    startTime: string
    topic: string
    description: string
    batchId: string
    password: string
    duration: number
    _id: string
    meetingId: string
    batchName: string
    courseName: string
    courseId: string
  }) {
    const zoomMeeting = await zoomMeetingsService.updateMeeting(
      meetingId,
      startTime,
      topic,
      description
    )
    const { id, join_url } = zoomMeeting

    const updateClassReq: UpdateClassRequest = {
      batchId,
      startTime,
      passCode: password,
      courseId,
      meetingId: id,
      meetingLink: join_url,
      duration,
      topic,
      description,
      batchName,
      courseName,
      _id
    }
    const clss = await classDbOperations.updateClass(updateClassReq)
    return clss
  }

  // async getClassDetails(classId: string) {}

  async getAllClasses() {
    const allClasses = await classDbOperations.getAllClasses()
    // const allCourses = await courseDbOperations.getAllCourses()
    // const finalClasses = allClasses.map((c) => {
    //   return {
    //     ...c,
    //     courseName: allCourses.find(
    //       (course) => course._id.toString() === c.courseId
    //     )
    //   }
    // })
    return allClasses
  }

  async getClassById(classId: string) {
    const cls = await classDbOperations.getClass(classId)
    return cls
  }

  async batchDeleteClasses(classIds: Array<string>) {
    const deletedClasses = await classDbOperations.batchDeleteClasses(classIds)
    return deletedClasses
  }

  async addAttachment(key: string, _id: string) {
    const attachment = await classDbOperations.addAttachements(key, _id)
    return attachment
  }

  async deleteClass(classId: string) {
    console.log(classId)
    try {
      const delClass = await classDbOperations.deleteClass(classId)
      return delClass
    } catch (e) {
      return { errors: [e] }
    }
  }
}

export default new ClassService()
