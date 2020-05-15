import Mongoose from "mongoose";
import AuthService from "services/auth";
import User from "models/User";
import Event from "models/Event";

let db;

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { body } = req;

  if (!db) {
    db = await Mongoose.connect(`${process.env.MONGO_URL}/boost`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    const { id } = await AuthService.verify(req);

    let user = await User.findOne({ _id: id });

    if (!user) {
      throw new Error("Cannot find user.");
    }

    const event = new Event({
      name: body.name,
      createdBy: user._id,
    });

    res.end((await event.save())._id.toString());
  } catch (error) {
    return res.status(401).end("Error creating event.");
  }
};
