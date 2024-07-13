import subjectDbOperations from './subject.db.operations'
import SubjectDataOperations, { ISubjectDoc } from './subject.db.operations'
import { CreateSubjectRequest } from './subject.type'

export function isError<Type>(
  inputType:
    | Type
    | {
        errors: string[]
      }
): inputType is {
  errors: string[] | any[]
} {
  return (<
      {
        errors: string[] | any[]
      }
    >inputType).errors !== undefined
}

class CourseService {
  async createSubject(createSubReq: CreateSubjectRequest) {
    const sub = await SubjectDataOperations.createSubject(createSubReq)
    if (!Boolean(sub)) {
      return { errors: ['unable to create subject'] }
    }
    return sub
  }
  async updateSubject() {}
  async deleteSubject() {}
  async getAllSubjects() {
    const allSubjects = await SubjectDataOperations.getAllSubjects()
    if (!Boolean(allSubjects)) {
      return { errors: ['No subjects found'] }
    }
    return allSubjects
  }

  async getAllSubjectsWithIds(subjectIds: Array<string>) {
    const savedSubjects = await this.getAllSubjects()
    let error = null
    if (isError<(ISubjectDoc & { _id: any })[]>(savedSubjects)) {
      return { errors: ['No subjects found'] }
    }
    const savedSubjectsIds = savedSubjects.map((s) => s._id)
    subjectIds.forEach((sId) => {
      if (!savedSubjectsIds.includes(sId)) {
        error = ['invalid subject id']
      }
    })
    if (Boolean(error)) {
      return { errors: error }
    }
    const subWithIds = await subjectDbOperations.getAllSubjectWithIds(
      subjectIds
    )

    if (!subWithIds) {
      return { errors: 'No Subject exists with given ids' }
    }
    return subWithIds
  }
}

export default new CourseService()
