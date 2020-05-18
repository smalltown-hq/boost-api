import Mongoose from "mongoose";
import AuthService from "services/auth";
import User from "models/User";

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
    // read and decrypt the cookie
    const { id } = await AuthService.verify(req);

    let user = await User.findOne({ _id: id }, { did: 0, email: 0 });

    if (!user) {
      throw new Error("Could not find user");
    }

    return res.json(user.toObject());
  } catch (error) {
    return res.status(401).end("Error accessing user.");
  }
};
