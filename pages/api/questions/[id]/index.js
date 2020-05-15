import Mongoose from "mongoose";
import Question from "models/Question";

let db;

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  process.env.NODE_ENV === "production" &&
    res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res.status(405).end();
  }

  if (!db) {
    db = await Mongoose.connect(`${process.env.MONGO_URL}/boost`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const question = await Question.findOne({ _id: req.query.id });

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.json(question.toObject());
};
