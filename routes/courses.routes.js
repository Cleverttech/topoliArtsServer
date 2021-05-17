const express = require("express");
const router = express.Router();

const CoursesModel = require("../models/Courses.model");

const isLoggedIn = (req, res, next) => {
  if (req.session.loggedInUser) {
    //calls whatever is to be executed after the isLoggedIn function is over
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

router.get("/courses", (req, res, next) => {
  CoursesModel.find()
    .populate("mentor")
    .then((courses) => {
      res.status(200).json(courses);
    })
    .catch((err) => {
      res.status(500).json({
        error: "No courses found",
        message: err,
      });
    });
});

router.post("/courses/create", isLoggedIn, (req, res) => {
  const { name, description, price, image } = req.body;
  const mentor = req.session.loggedInUser._id;
  console.log(mentor);

  CoursesModel.create({ mentor, name, description, price, image })
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

//check this before
router.get("/courses/:courseId", isLoggedIn, (req, res) => {
  CoursesModel.findById()
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

//used for payment
router.post("/courses/:courseId", isLoggedIn, (req, res) => {
  CoursesModel.findById()
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

router.delete("/courses/:courseId", isLoggedIn, (req, res) => {
  CoursesModel.findByIdAndDelete(req.params.courseId)
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
