import classDataOperations from '../Class/class.db.operations'
import { CreateClassRequest } from '../Class/class.type'
import User, { Role } from '../models/User'
import studentService from '../Student/student.service'
import TeacherDataOperations from './teacher.db.operations'
import jwt from 'jsonwebtoken'
import courseService from '../Course/course.service'
import { isError } from '../Subject/subject.service'
import classService from '../Class/class.service'
import moment from 'moment'
import { genPassword } from '../services/passport.config'

class TeacherService {
  async addTeacher(userId: string, expertiseSubjects: Array<string>) {
    const teacher = await TeacherDataOperations.createTeacher({
      userId: userId,
      expertiseCourse: expertiseSubjects
    })

    return teacher
  }

  async updateTeacherPassword(dataCode: string, password: string) {
    try {
      const decoded: any = jwt.verify(dataCode, 'secret')
      const user = await User.findById(decoded.data)
      if (!Boolean(user) || user?.initialized) {
        return {
          errors: ['Password is already been saved or else User does not exist']
        }
      }
      const u = await User.findByIdAndUpdate(decoded.data, {
        password: genPassword(password).hash,
        initialized: true
      })
      const t = await this.addTeacher(u?._id, [])
      return t
    } catch (e) {
      return { errors: ['Link is expired or already been used'] }
    }
  }

  async getTeacherById(teacherId: string) {
    const user = await TeacherDataOperations.getTeacher(teacherId)
    if (!Boolean(user)) {
      return { error: ['Teacher Not Found'] }
    }
    return user
  }
  async getAllTeachers() {
    const teachers = await User.find({ role: Role.TEACHER })
    return teachers
  }
  async getTeacherByUserId(teacherId: string) {
    const user = await TeacherDataOperations.getTeacher(teacherId)
    if (!Boolean(user)) {
      return { error: ['Teacher Not Found'] }
    }
    return user
  }

  async createClass(createClassInput: CreateClassRequest) {
    const newClass = await classDataOperations.createClass(createClassInput)
    if (!Boolean(newClass)) {
      return { error: ['Could not create Class'] }
    }
    return newClass
  }

  async getTeacherCourses(teacherId: string) {
    const allCourses = await courseService.getAllCourses()
    if (isError(allCourses)) {
      return { errors: ['something went wrong'] }
    }
    const tch = await User.findById(teacherId).exec()
    const allClasses = await classService.getAllClasses()
    if (isError(allClasses)) {
      return allClasses
    }
    // const courseClasses =

    const teachersCourses = allCourses
      ?.filter((c) => {
        return c?.teacherIds?.includes(teacherId.toString())
      })
      .map((course) => {
        return {
          _id: course?._id,
          avatar: course?.avatar,
          name: course?.name,
          description: course?.description,
          subHeader: course?.subHeader,
          numberOfClasses: course?.numberOfClasses,
          tags: course?.tags,
          teacherIds: course?.teacherIds,
          curriculum: course?.curriculum,
          price: course?.price,
          discount: course?.discount,
          ageGroup: course?.ageGroup,
          courseProgress: course?.courseProgress,
          courseLevel: course?.courseLevel,
          starred: course?.starred,
          // classesCompleted: allClasses
          //   .filter((cls) => cls.courseId === course?._id.toString())
          //   .filter((c) => {
          //     return moment(c.startTime).isBefore(moment(new Date()))
          //   }).length,
          teacherDetails: [
            { name: tch?.name, _id: teacherId, emai: tch?.email }
          ]
        }
      })

    return teachersCourses
  }

  async getTeacherClasses(teacherId: string) {
    const teacherCourses = await this.getTeacherCourses(teacherId)
    if (!Boolean(teacherCourses) || isError(teacherCourses)) {
      return { error: ['Could not get  courses associated to given teachId'] }
    }
    const courseIds = teacherCourses.map((a) => a._id.toString())
    const allClasses = await classService.getAllClasses()
    const filteredClasses = allClasses.filter((c) =>
      courseIds.includes(c.batchId)
    )
    return filteredClasses
  }

  async getStudentsFromCourse(courseId: string) {
    const students = await studentService.getStudentFromCourses(courseId)
    if (!students) {
      return { error: ['No student enrolled'] }
    }
    return students
  }

  async getTeacherDetailsFromToken(token: string) {
    try {
      const decoded: any = jwt.verify(token, 'secret')
      const u = await User.findById(decoded.data as string)
      return u
    } catch (err) {
      return { errors: [err] }
    }
  }
}

export default new TeacherService()
