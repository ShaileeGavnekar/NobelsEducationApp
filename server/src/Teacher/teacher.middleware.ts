import express, { NextFunction } from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: `${__dirname}/uploads/`,
  filename: (
    req: express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const q = req
    const filename = `${Date.now()}${path.extname(file.originalname)}`
    cb(null, filename)
  }
})

class TeacherMiddleware {
  uploadImage() {
    return function (next: NextFunction) {
      multer({ storage }).single('file')
      next()
    }
  }
}

export default new TeacherMiddleware()
