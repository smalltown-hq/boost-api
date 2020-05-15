import Mongoose from "mongoose";
import AuthService from "services/auth";
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

  try {
    const { id } = await AuthService.verify(req);

    const events = await Event.find({ createdBy: id });

    res.json(events);
  } catch (error) {
    return res.status(401).end(error.message || "Error creating event.");
  }
};
