import Mongoose from "mongoose";
import Question from "models/Question";
// import AuthService from "services/auth";
// import User from "models/User";

let db;

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  process.env.NODE_ENV === "production" &&
    res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!db) {
    db = await Mongoose.connect(`${process.env.MONGO_URL}/boost`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  let body;

  try {
    body = JSON.parse(req.body);
  } catch (error) {
    return res.status(400).end("Malformed request body.");
  }

  try {
    const question = await Question.findOne({ _id: req.query.id });

    if (!question) {
      throw new Error("Cannot comment on that question.");
    }

    question.comments.push({ content: body.content });

    return res.json((await question.save()).toObject());
  } catch (error) {
    return res.status(400).end(error.message || "Error accessing question.");
  }
};
