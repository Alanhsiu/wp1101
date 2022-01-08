import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ResumeSchema = new Schema({
  postId: { type: String, unique: true },
  name: String,
  subject: String,
  content: String,
  price: Number,
  timestamp: Date
}, {
  collection: 'post',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const ResumeModel = mongoose.model("Resume", ResumeSchema);

export default ResumeModel;