import Mongoose from "mongoose";
import Question from "models/Question";
// import AuthService from "services/auth";
// import User from "models/User";

let db;

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
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

  try {
    const question = await Question.findOne({ _id: req.query.id });

    if (!question) {
      throw new Error("Cannot vote on that question.");
    }

    const votes = new Set(question.votes);

    if (votes.has(req.query.voter)) {
      votes.delete(req.query.voter);
    } else {
      votes.add(req.query.voter);
    }

    question.votes = Array.from(votes);

    return res.json((await question.save()).toObject());
  } catch (error) {
    return res.status(400).end(error.message || "Error accessing question.");
  }
};
