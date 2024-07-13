

// //completed
// export const createCourse = (req: Request, res: Response) => {
//   const { name, description, amount } = req.body

//   if (!Boolean(name) || !Boolean(amount) || !isNumber(amount)) {
//     res.status(412)
//     res.json({ error: 'Name and Amount are required' })
//     return
//   }

//   const newCourse = new Course({
//     name,
//     description,
//     amount
//   })

//   newCourse
//     .save()
//     .then((course) => {
//       res.status(200).json(course)
//     })
//     .catch((error) => {
//       res.status(405).json({ error })
//     })

//   return
// }

// //completed
// export const createSubject = (req: Request, res: Response) => {
//   const { name, description, courseIds, teachers } = req.body

//   if (!Boolean(name) || !Boolean(isArray(courseIds)) || !isArray(teachers)) {
//     res.status(412)
//     res.json({ error: 'precondition failed' })
//     return
//   }

//   const newSubject = new Subject({
//     name,
//     description,
//     courseIds,
//     teachers
//   })

//   newSubject
//     .save()
//     .then((subject) => {
//       res.status(200).json(subject)
//     })
//     .catch((error) => {
//       res.status(405).json({ error })
//     })

//   return
// }

// export const updateCourse = (req: Request, res: Response) => {
//   const { name, description, amount } = req.body

//   if (!Boolean(name) || !Boolean(amount) || !isNumber(amount)) {
//     res.status(412)
//     res.json({ error: 'Name and Amount are required' })
//     return
//   }

//   const newCourse = new Course({
//     name,
//     description,
//     amount
//   })

//   newCourse
//     .save()
//     .then((course) => {
//       res.status(200).json(course)
//     })
//     .catch((error) => {
//       res.status(405).json({ error })
//     })

//   return
// }

// export const admitStudentInCourse = (_req: Request, _res: Response) => {
//   // const { studentId, courseId } = req.body

//   // if (!Boolean(name) || !Boolean(amount) || !isNumber(amount)) {
//   //   res.status(412)
//   //   res.json({ error: 'Name and Amount are required' })
//   //   return
//   // }

//   // const newCourse = new Course({
//   //   name,
//   //   description,
//   //   amount
//   // })

//   // newCourse
//   //   .save()
//   //   .then((course) => {
//   //     res.status(200).json(course)
//   //   })
//   //   .catch((error) => {
//   //     res.status(405).json({ error })
//   //   })

//   return
// }

// export const updateSubject = (req: Request, res: Response) => {
//   const { name, description, amount } = req.body

//   if (!Boolean(name) || !Boolean(amount) || !isNumber(amount)) {
//     res.status(412)
//     res.json({ error: 'Name and Amount are required' })
//     return
//   }

//   const newCourse = new Course({
//     name,
//     description,
//     amount
//   })

//   newCourse
//     .save()
//     .then((course) => {
//       res.status(200).json(course)
//     })
//     .catch((error) => {
//       res.status(405).json({ error })
//     })

//   return
// }
