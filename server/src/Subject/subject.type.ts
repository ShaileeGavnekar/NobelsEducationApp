export type CreateSubjectRequest = {
  name: string
  description?: string
}

export type UpdateSubjectRequest = CreateSubjectRequest & { _id: string }
