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
  password: String,
  image: {
    type: String,
    default: 'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg'
  },
  role: {
    type: String,
    default: 'student',
  },
  courses: {
    type: Schema.Types.ObjectId,
    ref: 'Courses',
  },
  portfolio: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
});

const User = model("User", userSchema);

module.exports = User;
