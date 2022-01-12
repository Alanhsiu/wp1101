import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ResumeSchema = new Schema({
  postId: { type: String, unique: true },
  name: String,
  subject1: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others'],
  },
  subject2: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others'],
  },
  subject3: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others'],
  },
  subject4: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others'],
  },
  subject5: {
    type : String,
    enum : ['Math','English','Physics','Chemistry','Geography','Others'],
  },
  description: String,
  lowPrice: Number,
  highPrice: Number,
  education : String,
  mail : String,
  timestamp: Date
}, {
  collection: 'Resume',
});
const ResumeModel = mongoose.model("Resume", ResumeSchema);

export default ResumeModel;