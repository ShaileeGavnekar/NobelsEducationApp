import { isError } from '../Subject/subject.service'
import courseDbOperations, { ICourseDoc } from './course.db.operations'
import { CreateCourseRequest, UpdateCourseRequest } from './course.type'

class CourseService {
  async createCourse(courseReq: CreateCourseRequest) {
    let errors = null

    const course = await courseDbOperations.createCourse(courseReq)
    if (!Boolean(course)) {
      return { errors: ['Unable to create Course'] }
    }
    return course
  }

  async addAvatar({ key, courseId }: { key: string; courseId: string }) {
    const updatedCourse = await courseDbOperations.addAvatar(key, courseId)
    if (isError(updatedCourse)) {
      return { errrors: ['Something went wrong while adding avatar'] }
    }
    return updatedCourse
  }

  async updateCourse(courseReq: UpdateCourseRequest) {
    const updatedCourse = await courseDbOperations.updateCourse(courseReq)
    if (!updatedCourse) {
      return { errors: 'Unable to update the course' }
    }
    return updatedCourse
  }

  async deleteCourse(courseId: string) {
    const deletedCourse = await courseDbOperations.deleteCourse(courseId)
    if (!deletedCourse) {
      return { errors: ['unable to delete the course'] }
    }
    return deletedCourse
  }

  async getAllCourses() {
    const allCourses = await courseDbOperations.getAllCourses()
    if (!Boolean(allCourses)) {
      return { errors: ['No courses in db'] }
    }
    return allCourses
  }

  async getAllCoursesByIds(courseIds: Array<string>) {
    const allCourses = await courseDbOperations.getAllCourses()
    if (!Boolean(allCourses)) {
      return { errors: ['No courses in db'] }
    }
    let returnCourses: (ICourseDoc & {
      _id: any
    })[] = []
    allCourses.map((c) => {
      if (courseIds.includes(c._id.toString())) {
        returnCourses.push(c)
      }
    })
    return returnCourses
  }

  async getCourse(id: string) {
    try {
      const c = await courseDbOperations.getCourse(id)
      return c
    } catch (e) {
      return { errors: [e] }
    }
  }
}

export default new CourseService()
