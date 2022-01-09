import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CaseSchema = new Schema({
  postId: { type: String, unique: true },
  name: String,
  subject: String,
  description: String,
  price: Number,
  timestamp: Date
});
const CaseModel = mongoose.model("Case", CaseSchema);

export default CaseModel;