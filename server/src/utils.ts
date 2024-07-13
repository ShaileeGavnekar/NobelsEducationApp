import env from 'dotenv'
import sgMail from '@sendgrid/mail'
import nodemailer from 'nodemailer'

env.config()

export const sendMail = (name: string, email: string, url: string) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL_ID!,
    subject: `Confirmation Email for registering to Version Beta 4.0 Workshop`,
    text: `Hi ${name}, You are invited as Teacher, go to ${url} to setup you password`
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error: any) => {
      console.error(error)
    })
}

export const sendMail2 = async (
  name: string,
  email: string,
  url: string,
  forgot?: boolean
) => {
  try {
    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'kdevanshsharma23@gmail.com',
        pass: process.env.PW
      }
    })
    let info = await transporter.sendMail({
      from: 'kdevanshsharma23@gmail.com',
      to: email,
      subject: 'Password Setting Email',
      text: Boolean(forgot)
        ? `Hi ${name},  go to ${url} to update your password`
        : `Hi ${name}, You are invited as Teacher, go to ${url} to setup you password` // plain text body
    })

    console.log('Message sent: %s', info.messageId)
  } catch (e) {
    console.log(e)
  }
}
