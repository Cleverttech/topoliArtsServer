const express = require("express");
const router = express.Router();

const PortfolioModel = require("../models/Portfolio.model");

const isLoggedIn = (req, res, next) => {
  if (req.session.loggedInUser) {
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

// isLoggedIn
router.post("/portfolio/create", isLoggedIn, (req, res) => {
  const { title, description } = req.body;
  const mentor = req.session.loggedInUser._id;

  PortfolioModel.create({ mentor, title, description })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// //check this before
// router.get('/courses/:courseId', isLoggedIn,(req, res) => {
//   CoursesModel.findById()
//   .then((response) => {
//     res.status(200).json(response)
//   })
//   .catch((err) => {
//     res.status(500).json({
//       error: 'Something went wrong',
//       message: err
//     })
//   })
// })

// //used for payment
// router.post('/courses/:courseId', isLoggedIn,(req, res) => {
//   CoursesModel.findById()
//   .then((response) => {
//     res.status(200).json(response)
//   })
//   .catch((err) => {
//     res.status(500).json({
//       error: 'Something went wrong',
//       message: err
//     })
//   })
// })

// router.delete('/courses/:courseId', isLoggedIn,(req, res) => {
//   TodoModel.findByIdAndDelete(req.params.courseId)
//   .then((response) => {
//     res.status(200).json(response)
//   })
//   .catch((err) => {
//     res.status(500).json({
//       error: 'Something went wrong',
//       message: err
//     })
//   })
// })

// router.get("portfolio", (req, res, next) => {
//   CoursesModel.find()
//   .populate('mentor')
//   .then((courses) => {
//     res.status(200).json(courses)
//   }).catch((err) => {
//     res.status(500).json({
//       error: 'No courses found',
//       message: err
//     })
//   });
// });

module.exports = router;
