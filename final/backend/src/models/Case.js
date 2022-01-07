import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CaseSchema = new Schema({
  id: ID,
  name: String,
  subject: Subject,
  content: String,
  price: Int,
  dueDate: Date
});
const CaseModel = mongoose.model("Case", CaseSchema);

export default CaseModel;