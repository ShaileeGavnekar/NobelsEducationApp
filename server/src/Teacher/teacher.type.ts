export type CreateTeacherRequest = {
  userId: string
  expertiseCourse: string[]
}

export type UpdateTeacherRequest = CreateTeacherRequest & { _id: string }
