const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const portfolioSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  images: { type: [String] },
});

const Portfolio = model("Portfolio", portfolioSchema);

module.exports = Portfolio;
