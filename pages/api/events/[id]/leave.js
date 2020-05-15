import Mongoose from "mongoose";
import Event from "models/Event";

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

  const event = await Event.findOne({ _id: req.query.id });

  event.liveViewers = Math.max(event.liveViewers - 1, 0);

  await event.save();

  res.json(event.toObject());
};
