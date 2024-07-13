export type CreateClassRequest = {
  batchId: string
  startTime: string
  passCode?: string
  meetingId: string
  meetingLink: string
  duration: number
  topic: string
  description: string
  courseName: string
  batchName: string
  courseId: string
}

export type UpdateClassRequest = CreateClassRequest & { _id: string }
