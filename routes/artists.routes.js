const express = require("express");
const router = express.Router();

const UserModel = require("../models/User.model");

router.get("/artists", (req, res, next) => {
  UserModel.find()
    .populate("portfolio")
    .then((result) => {
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
router.get("/artists/:artistId", (req, res, next) => {
  const { artistId } = req.params;

  UserModel.findById(artistId)
    .populate("portfolio")
    .then((result) => {
      console.log("results freaking data");
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
