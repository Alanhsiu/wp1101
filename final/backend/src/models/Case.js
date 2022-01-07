import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CaseSchema = new Schema({
  name: String,
  subject: String,
  content: String,
  price: Number,
  dueDate: Date
});
const CaseModel = mongoose.model("Case", CaseSchema);

export default CaseModel;