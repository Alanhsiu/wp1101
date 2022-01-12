import mongoose from "mongoose";

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


const UserModel = mongoose.model("User", UserSchema);

export default ResumeModel;