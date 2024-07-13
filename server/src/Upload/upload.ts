import dotenv from 'dotenv'
import S3 from 'aws-sdk/clients/s3'
import fs from 'fs'
import multer from 'multer'
import multerS3 from 'multer-s3'

dotenv.config()

type FILE = {
  path: string
  filename: string
}

const bucketName = process.env.AWS_BUCKET_NAME
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

export const s3 = new S3({
  region: 'ap-south-1',
  accessKeyId,
  secretAccessKey
})

export const uploadMainFile = multer({
  storage: multerS3({
    s3: s3,
    bucket: bucketName!,
    metadata: function (_req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (_req, _file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

// export function uploadFile(file: FILE) {
//   const fileStream = fs.createReadStream(file.path)

//   const uploadParams = {
//     Bucket: bucketName!,
//     Body: fileStream,
//     Key: file.filename
//   }

//   return s3.upload(uploadParams).promise()
// }

export function getFileStream(fileKey: string) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName!
    }

    return s3
      .getObject(downloadParams)
      .createReadStream()
      .on('error', (e) => {
        console.log(e)
      })
    // handle error from unzip
  } catch (e) {
    console.log(e)
    return 'something went wrong'
  }
}
