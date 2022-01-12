import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  // userID: {
  //   type: String,
  //   required: true,
  //   immutable: true,
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   immutable: false,
  // },
  name: {
    type: String,
    required: true,
    immutable: false,
  },
});

const ChatBoxSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  messages: [{
    type: mongoose.Types.ObjectId,
    ref: "Message"
  }],
});

const MessageSchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  body: {
    type: String,
    required: true
  },
});

const UserModel = mongoose.model("User", UserSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);

export { UserModel, ChatBoxModel, MessageModel };