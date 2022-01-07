import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ResumeSchema = new Schema({
  name: String,
  subject: String,
  content: String,
  price: Number,
  dueDate: Date
});
const ResumeModel = mongoose.model("Resume", ResumeSchema);

export default ResumeModel;