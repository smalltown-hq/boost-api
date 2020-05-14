import Mongoose from "mongoose";
import AuthService from "services/auth";
import User from "models/User";
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

  res.setHeader("Access-Control-Allow-Credentials", true);

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

    await event.save();

    res.setHeader("Access-Control-Allow-Credentials", true);
    res.end(event._id.toString());
  } catch (error) {
    console.log({ error });
    return res.status(401).end("Error creating event.");
  }
};
