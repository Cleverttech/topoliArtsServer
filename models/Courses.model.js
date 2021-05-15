const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const coursesSchema = new Schema({
  mentor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  downloadables: {type: [String]},
  buyers:[{
    type: new Schema({
                userId: {
                  type: Schema.Types.Object,
                  ref: 'User',
                },
              },
              {timestamp: true},          
              ),
              
            }]

});

const Courses = model("Courses", coursesSchema);

module.exports = Courses;
