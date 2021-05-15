const express = require("express");
const router = express.Router();

const UserModel = require("../models/User.model");

router.get("/artists", (req, res, next) => {
  UserModel.find()
    .populate("courses")
    .populate("portfolio")
    .then((users) => {
      // FILTER user roles--to return main & admin roles
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: "No Artists found",
        message: err,
      });
    });
});

module.exports = router;
