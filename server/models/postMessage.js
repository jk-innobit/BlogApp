import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  id: String,
  title: String,
  message: String,
  creatorName: String,
  creatorId: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  category: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

var PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
