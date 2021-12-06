import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CaseSchema = new Schema({
  subject: String,
  price: Number,
  experience: String,
});
const Case = mongoose.model("Case", CaseSchema);

export default Case;