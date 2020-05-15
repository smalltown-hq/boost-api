import Mongoose from "mongoose";
import Question from "models/Question";

let db;

export default async (req, res) => {
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

  res.json(question?.toObject() || {});
};
