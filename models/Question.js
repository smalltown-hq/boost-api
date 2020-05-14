import Mongoose from "mongoose";

const questionSchema = new Mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  content: String,
  // we can use a unique session id or user id
  votes: [String],
  comments: [
    {
      createdAt: { type: Date, default: Date.now },
      content: String,
    },
  ],
});

export default Mongoose.models.Question ||
  Mongoose.model("Question", questionSchema);
