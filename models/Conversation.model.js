const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const conversationSchema = new Schema({
  participants:[
    {
      type: Schema.Types.ObjectId,
      ref: "User" 
    },
  ],
});

const Conversation = model("Conversation", conversationSchema);

module.exports = Conversation;
