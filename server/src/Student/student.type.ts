export type CreateStudentRequest = {
  userId: string
  name: string
  coursesEnrolled: Array<string>
  status: 'ACTIVE' | 'BLOCKED'
  email: string
}

export type UpdateStudentRequest = Partial<
  Omit<CreateStudentRequest, 'userId' | 'coursesEnrolled' | 'email'>
> & { _id: string }
