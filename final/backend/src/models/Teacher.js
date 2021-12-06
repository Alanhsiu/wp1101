import mongoose from "mongoose";

const Schema = mongoose.Schema;
const TeacherSchema = new Schema({
  name: String,
  subject: Array,
  price: Number,
});
const Teacher = mongoose.model("Teacher", TeacherSchema);

export default Teacher;