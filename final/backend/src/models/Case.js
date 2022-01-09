import mongoose from "mongoose";

const Schema = mongoose.Schema;
const CaseSchema = new Schema({
  postId: { type: String, unique: true },
  name: String,
  subject: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others'],
  },
  description: String,
  lowPrice: Number,
  highPrice: Number,
  timestamp: Date
});
const CaseModel = mongoose.model("Case", CaseSchema);

export default CaseModel;