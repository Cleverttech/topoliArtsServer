const express = require('express');
const router  = express.Router();
const UserModel = require('../models/User.model')

// include CLOUDINARY:
const uploader = require("../config/cloudinary.config.js");

router.post("/uploadmultiple", uploader.array("imageUrl"), (req, res, next) => {
  

  if (!req.files) {
    next(new Error("No file uploaded!"));
    return;
  }

  let paths = req.files.map((el) => {
    return el.path;
  });

  res.status(200).json({
    images: paths,
  });
});

router.post("/upload", uploader.single("imageUrl"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.status(200).json({
    image: req.file.path,
  });
});

module.exports = router;
