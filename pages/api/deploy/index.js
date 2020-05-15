import Mongoose from "mongoose";
import Deploy from "models/Deploy";

let db;

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  process.env.NODE_ENV === "production" &&
    res.setHeader("Access-Control-Allow-Origin", "getboost.app, now.sh");

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  if (!db) {
    db = await Mongoose.connect(`${process.env.MONGO_URL}/boost`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  try {
    let deploy = await Deploy.findOne();

    if (!deploy) {
      deploy = new Deploy();
    }

    deploy.count.push(Date.now());

    await deploy.save();

    res.end();
  } catch (error) {
    return res.status(400).end(error.message || "Error logging deploy");
  }
};
