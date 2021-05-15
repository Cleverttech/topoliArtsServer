const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const messagesSchema = new Schema({
        message: String,
        sender:  {
          type: Schema.Types.ObjectId,
          ref:'User',
        },
        conversationId:  {
          type: Schema.Types.ObjectId,
          ref:'Conversation',
        },
      },
      {
        timestamp: true,
      }
);

const Messages = model("Messages", messagesSchema);

module.exports = Messages;