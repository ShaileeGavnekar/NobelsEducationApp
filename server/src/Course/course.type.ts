export type CreateCourseRequest = {
  name: string
  description?: string
  numberOfClasses: number
  price: number
  teacherIds: Array<string>
  tags: Array<string>
  subHeader: string
  curriculum: Array<string>
  discount: number
  ageGroup: string
  courseProgress: string
  courseLevel: string
  starred: boolean
}

export type UpdateCourseRequest = CreateCourseRequest & { _id: string }
