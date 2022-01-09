import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ResumeSchema = new Schema({
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
}, {
  collection: 'Resume',
});
const ResumeModel = mongoose.model("Resume", ResumeSchema);

export default ResumeModel;