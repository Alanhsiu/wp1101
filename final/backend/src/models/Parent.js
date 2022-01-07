import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ResumeModel = new Schema({
  id: ID,
  name: String,
  subjects: Array,
  price: Int,
  content: String,
  dueDate: Date,
});
const ResumeModel = mongoose.model("Parent", ParentSchema);

export default ResumeModel;