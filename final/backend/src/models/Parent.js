import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ParentSchema = new Schema({
  name: String,
  subject: Array,
  price: Number,
  experience : Number,
  addition : String
});
const Parent = mongoose.model("Parent", ParentSchema);

export default Parent;