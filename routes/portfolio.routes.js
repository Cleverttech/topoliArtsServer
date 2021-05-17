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
  const { title, description, cover, images } = req.body;
  const mentor = req.session.loggedInUser._id;

  PortfolioModel.create({ mentor, title, description, cover, images })
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
