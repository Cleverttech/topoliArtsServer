const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: String,
  image: {
    type: String,
    default:
      "https://www.searchpng.com/wp-content/uploads/2019/02/Men-Profile-Image.png",
  },
  role: {
    type: String,
    default: "student",
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: "Portfolio",
  },
});

const User = model("User", userSchema);

module.exports = User;
