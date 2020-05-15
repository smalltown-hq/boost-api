import Mongoose from "mongoose";
import Event from "models/Event";

let db;

export default async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  if (typeof req.query.reaction !== "string") {
    return res.status(400).end();
  }

  if (!db) {
    db = await Mongoose.connect(`${process.env.MONGO_URL}/boost`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  const event = await Event.findOne({ _id: req.query.id });

  if (!event.reactions) {
    event.reactions = {};
  }

  if (isNaN(+event.reactions[req.query.reaction])) {
    event.reactions[req.query.reaction] = 1;
  } else {
    event.reactions[req.query.reaction] += 1;
  }

  event.markModified("reactions");

  res.json((await event.save()).toObject());
};
