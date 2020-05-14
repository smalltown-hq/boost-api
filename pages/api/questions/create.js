import Mongoose from "mongoose";
import Question from "models/Question";
import Event from "models/Event";

let db;

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  let body;

  try {
    body = JSON.parse(req.body);
  } catch (error) {
    return res.status(400).end("Malformed request body.");
  }

  if (!db) {
    db = await Mongoose.connect(`${process.env.MONGO_URL}/boost`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const event = await Event.findOne({ _id: req.query.event });

  if (!event) {
    return res.status(400).end("Cannot comment on that event.");
  }

  const question = new Question({
    content: body.content,
  });

  await question.save();

  event.questions.push(question._id);

  res.setHeader("Access-Control-Allow-Credentials", true);
  res.json((await event.save()).toObject());
};
