const express = require("express");
const router = express.Router();

// include CLOUDINARY:
const uploader = require("../config/cloudinary.config.js");

const customMiddle = (req, res, next) => {
  console.log(req.body);
  console.log(req);
  // if (req.body == "singleImage") {
  //   uploader.single("imageUrl");
  // } else {
  //   uploader.multiple("imageUrl");
  // }
};

router.post("/uploadmultiple", uploader.array("imageUrl"), (req, res, next) => {
  console.log("Here manish", req.files);

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
