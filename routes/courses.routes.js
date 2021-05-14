const express = require('express')
const router = express.Router()

const CoursesModel = require('../models/Courses.model')

router.get("/courses", (req, res, next) => {
  CoursesModel.find()
  .populate('mentor')
  .then((courses) => {
    res.status(200).json(courses)
  }).catch((err) => {
    res.status(500).json({
      error: 'No courses found',
      message: err
    })
  });
});

router.post('/courses/create', (req,res)=>{
  const {mentor, name, description, image, price} = req.body

  CoursesModel.create({mentor, name, description, image, price})
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(500).json({
         error: 'Something went wrong',
         message: err
    })
  })  
})

router.delete('/courses/:courseId', (req, res) => {
  TodoModel.findByIdAndDelete(req.params.courseId)
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(500).json({
      error: 'Something went wrong',
      message: err
    })
  })  
})


module.exports = router;

// router.post('/courses/:courseid/enroll', (req,res)=>{
//   const {fullname, email, telephone, message} = req.body

//   MessageModel.create({fullname, email, telephone, message})
//   .then((response) => {
//     res.status(200).json(response)
//   })
//   .catch((err) => {
//     res.status(500).json({
//          error: 'Something went wrong',
//          message: err
//     })
//   })  
// })