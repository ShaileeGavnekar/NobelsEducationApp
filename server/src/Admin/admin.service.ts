import classService from '../Class/class.service'
import courseService from '../Course/course.service'
import { CreateCourseRequest, UpdateCourseRequest } from '../Course/course.type'
import User, { Role, Strategy } from '../models/User'
import studentService from '../Student/student.service'
import { UpdateStudentRequest } from '../Student/student.type'
import { isError } from '../Subject/subject.service'
import teacherService from '../Teacher/teacher.service'
import zoomMeetingsService from '../ZoomMeetings/zoomMeetings.service'
import jwt from 'jsonwebtoken'
import { sendMail2 } from '../utils'
import { isUndefined, update } from 'lodash'
import moment from 'moment'
import shortId from 'shortid'
import leadsService from '../Leads/leads.service'
import batchService from '../Batch/batch.service'
import { CreateBatchRequest, UpdateBatchRequest } from '../Batch/batch.type'

type InviteTeacherRequest = {
  name: string
  email: string
  age: string
  phoneNumber: string
}

class AdminService {
  async addCourseAvatar({ key, courseId }: { key: string; courseId: string }) {
    const c = courseService.addAvatar({ key, courseId })
    if (isError(c)) {
      return { errors: ['Something went wrong'] }
    }
    return c
  }
  async blockStudent(studentId: string) {
    const student = await studentService.getStudentById(studentId)
    if (!Boolean(student)) {
      return { errors: ['Invalid student id'] }
    }
    const updateStudentReq: UpdateStudentRequest = {
      _id: studentId,
      status: 'BLOCKED'
    }
    const updatedStudent = await studentService.updateStudentInfo(
      updateStudentReq
    )
    if (!Boolean(updatedStudent) || Boolean(updatedStudent?.errors)) {
      return { errors: ['unable to block student'] }
    }
    return updatedStudent
  }
  async createCourse(createCourse: CreateCourseRequest) {
    const course = await courseService.createCourse(createCourse)
    if (isError(course)) {
      return course.errors
    }
    return course
  }
  async updateCourse(updateCourseReq: UpdateCourseRequest) {
    const updatedCourse = await courseService.updateCourse(updateCourseReq)
    if (isError(updatedCourse)) {
      return updatedCourse.errors
    }
    return updatedCourse
  }
  async deleteCourse(courseId: string) {
    const allClasses = await classService.getAllClasses()
    const deletedCourse = await courseService.deleteCourse(courseId)
    const courseClasses = allClasses
      .filter((c) => c.batchId === courseId)
      .map((c) => c._id)
    await classService.batchDeleteClasses(courseClasses)
    if (isError(deletedCourse)) {
      return deletedCourse.errors
    }
    return deletedCourse
  }

  async sendInviteTeacherMail(inviteTeacherRequest: InviteTeacherRequest) {
    const newUser = new User({
      email: inviteTeacherRequest.email,
      hash: '',
      password: '',
      role: Role.TEACHER,
      initialized: false,
      strategy: Strategy.LOCAL,
      name: inviteTeacherRequest.name
    })

    const u = await newUser.save()
    const dataCode = jwt.sign(
      {
        data: u._id
      },
      'secret',
      { expiresIn: '15m' }
    )
    const url = 'https:/nobels.in/resetTeacherPassword?token=' + dataCode
    sendMail2(inviteTeacherRequest.name, inviteTeacherRequest.email, url)
    return u
  }

  async reSendInviteTeacherMail({ _id }: { _id: string }) {
    const u = await User.findById(_id).exec()
    if (!Boolean(u) || u?.initialized) {
      return {
        errors: ['User does not exist or has been already initialized']
      }
    }
    const dataCode = jwt.sign(
      {
        data: u?._id
      },
      'secret',
      { expiresIn: '15m' }
    )
    console.log(dataCode)
    sendMail2(u?.name!, u?.email!, dataCode)
    return u
  }

  async createClass(
    courseId: string,
    startTime: string,
    duration: number,
    topic: string,
    _passCode: string,
    description: string,
    courseName: string,
    batchName: string,
    batchId: string
  ) {
    try {
      const isAvailable = await classService.isSlotAvailable(startTime)
      if (!isAvailable) {
        return {
          errors: ['Time is already occupied,Please book on other time']
        }
      }
      const batch = await batchService.getBatch(batchId)
      if ((Boolean(batch) && isError(batch)) || !batch) {
        return {
          errors: ['Invalid Batch Id']
        }
      }

      const cls = await classService.createClass({
        batchId: batchId,
        startTime: startTime,
        description: description,
        duration: duration,
        password: shortId.generate(),
        topic: topic,
        courseName: courseName,
        batchName: batchName,
        courseId: courseId
      })

      return cls
    } catch (e) {
      console.log('here is error', e)
      return { errors: [e] }
    }
  }

  async getStudentDetails(studentId: string) {
    const student = await studentService.getStudentWithUserId(studentId)
    console.log('here', student)
    if (isError(student) || !Boolean(student) || isUndefined(student)) {
      return { errors: ['Student not found!'] }
    }
    const u = await User.findById(studentId).exec()
    const courses = await courseService.getAllCourses()
    const batches = await batchService.getAllBatchs()

    if (isError(courses) || !Boolean(u) || isError(batches)) {
      return { errors: ['something went wrong'] }
    }
    const courseIds = courses.map((c) => c._id.toString())

    const coursesPurchased = student?.coursesEnrolled
      .filter((c) => courseIds.includes(c))
      .map((purchasedCourse) => {
        console.log('purhasedCourse', purchasedCourse)
        const course = courses.find(
          (c) => c._id.toString() === purchasedCourse.toString()
        )
        const batch = batches.find((b) =>
          student?.batchesEnrolled?.includes(b._id.toString())
        )
        console.log(batches)
        console.log(batch)
        return {
          courseId: course?._id,
          courseName: course?.name,
          price: course?.price,
          batchName: batch?.name,
          batchId: batch?._id
        }
      })

    return {
      _id: u?._id,
      name: u?.name,
      email: u?.email,
      initailized: u?.initialized,
      dob: '',
      contactNumber: u?.mobileNumber,
      address: `${u?.address} ${u?.city} ${u?.country}`,
      joinedOn: '',
      coursesPurchased
    }
  }

  async getTeacherDetails(teachersId: string) {
    const u = await User.findById({ _id: teachersId }).exec()

    const courses = await courseService.getAllCourses()
    console.log('user=>', u, courses)
    if (isError(courses) || !Boolean(u)) {
      return { errors: ['something went wrong'] }
    }

    const coursesEnrolled = courses
      .filter((c) => c.teacherIds.includes(teachersId))
      .map((crs) => {
        return {
          courseName: crs?.name,
          price: crs?.price
        }
      })

    return {
      _id: u?._id,
      name: u?.name,
      email: u?.email,
      initailized: u?.initialized,
      dob: '',
      contactNumber: u?.mobileNumber,
      address: `${u?.address} ${u?.city} ${u?.country}`,
      joinedOn: '',
      coursesEnrolled
    }
  }

  async getAllTeachers() {
    const teachers = await teacherService.getAllTeachers()
    return teachers
  }

  async getAllStudents() {
    const teachers = await studentService.getAllStudents()
    return teachers
  }

  async getAllCourses() {
    const courses = await courseService.getAllCourses()
    const batches = await batchService.getAllBatchs()
    console.log(batches)
    if (isError(courses)) {
      return { errors: ['Something went wrong'] }
    }
    if (isError(batches)) {
      return { errors: ['Something went wrong'] }
    }
    const courseWithBatches = courses.map((c) => {
      const courseBatches = batches.filter(
        //@ts-ignore
        (b) => b.course._id.toString() === c._id.toString()
      )
      return {
        _id: c._id,
        ageGroup: c.ageGroup,
        courseLevel: c.courseLevel,
        courseProgress: c.courseProgress,
        courseTimeline: c.courseTimeline,
        curriculum: c.curriculum,
        description: c.description,
        name: c.name,
        numberOfClasses: c.numberOfClasses,
        price: c.price,
        stared: c.starred,
        subHeader: c.subHeader,
        tags: c.tags,
        teacherIds: c.teacherIds,
        batches: courseBatches
      }
    })

    return courseWithBatches
  }

  async getAllLeads() {
    const leaads = await leadsService.getAllLeads()
    return leaads
  }

  async getAllClasses() {
    const classes = await classService.getAllClasses()
    return classes
  }

  async getClassDetails(classId: string) {
    const clss: any = await classService.getClassById(classId)
    const [course, batch, participants, allClasses] = await Promise.all([
      courseService.getCourse(clss?.courseId!),
      batchService.getBatch(clss?.batchId),
      studentService.getStudentFromCourses(clss?.courseId!),
      classService.getAllClasses()
    ])
    const c: any = course
    const b: any = batch
    const courseClasses = allClasses
      .filter((cls) => cls.batchId === c?._id.toString())
      .filter((c) => {
        return moment(c.startTime).isBefore(moment(clss?.startTime))
      })

    const [teacher, students] = await Promise.all([
      User.findById(c?.teacherIds[0]),
      User.find().exec()
    ])

    const courseStudents: any = participants.map((c) => {
      const s = students.find(
        (st) => st._id.toString() === c?.userId?.toString()
      )
      if (Boolean(s)) return s
      else return {}
    })
    return {
      topic: clss?.topic,
      description: clss?.description,
      startTime: clss?.startTime,
      batchName: b?.name,
      durations: clss?.duration,
      courseName: c.name,
      courseId: c._id,
      lectureNo: courseClasses?.length + 1,
      meetingId: clss?.meetingId,
      password: clss?.passCode,
      teacher: {
        email: teacher?.email,
        name: teacher?.name,
        _id: teacher?._id
      },
      participants: courseStudents.map((p: any) => {
        return {
          _id: p?._id,
          name: p?.name,
          email: p?.email,
          avatar: p?.avatar
        }
      })
    }
  }

  async updateClass(
    startTime: string,
    topic: string,
    duration: number,
    description: string,
    meetingId: string,
    _id: string,
    batchName: string,
    courseName: string,
    courseId: string
  ) {
    try {
      const isAvailable = await classService.isSlotAvailable(startTime)
      if (!isAvailable) {
        return {
          errors: ['Time is already occupied,Please book on other time']
        }
      }
      const course = await courseService.getCourse(courseId)
      if (isError(course)) {
        return {
          errors: ['Invalid Course Id']
        }
      }
      const teacherIds = course?.teacherIds
      const batchId = ''
      const cls = await classService.updateClass({
        startTime,
        topic,
        description,
        batchId,
        password: shortId.generate(),
        duration,
        _id,
        meetingId,
        batchName,
        courseName,
        courseId
      })

      return cls
    } catch (e) {
      return { errors: [e] }
    }
  }
  async deleteClass(meetingId: string, classId: string) {
    try {
      const _delMeeting = await zoomMeetingsService.deleteMeeting(meetingId)
      const deletedClass = await classService.deleteClass(classId)
      if (isError(deletedClass)) {
        console.log(deletedClass)
        return { errors: ['error in deleting class'] }
      }
      return deletedClass
    } catch (e) {
      return { errors: [e] }
    }
  }

  async getAllBatches() {
    try {
      const batches = batchService.getAllBatchs()
      if (isError(batches)) {
        return { errors: ['error in batches'] }
      }
      return batches
    } catch (e) {
      return { errors: [e] }
    }
  }

  async createBatch(createBatchInput: CreateBatchRequest) {
    const batch = await batchService.createBatch(createBatchInput)
    if (isError(batch)) {
      return batch.errors
    }
    return batch
  }

  async deleteBatch(batchId: string) {
    const allClasses = await classService.getAllClasses()
    const deletedBatch = await batchService.deleteBatch(batchId)
    const batchClasses = allClasses
      .filter((c) => c.batchId === batchId)
      .map((c) => c._id)
    await classService.batchDeleteClasses(batchClasses)
    if (isError(deletedBatch)) {
      return deletedBatch.errors
    }
    return deletedBatch
  }
  async updateBatch(updateBatchReq: UpdateBatchRequest) {
    const updatedBatch = await batchService.updateBatch(updateBatchReq)
    if (isError(updatedBatch)) {
      return updatedBatch.errors
    }
    return updatedBatch
  }

  async modifyStudentBatch(updateStudentBatchReq: {
    userId: string
    newBatchId: string
    oldBatchId: string
  }) {
    console.log('tettst', updateStudentBatchReq)
    const updatedBatch = await studentService.changeBatch(
      updateStudentBatchReq.userId,
      updateStudentBatchReq.oldBatchId,
      updateStudentBatchReq.newBatchId
    )
    if (isError(updatedBatch)) {
      return updatedBatch
    }
    return updatedBatch
  }
}

export default new AdminService()
