import Mongoose from "mongoose";
import AuthService from "services/auth";
import User from "models/User";

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

  // get the decentralized ID from the authorization header
  const did = AuthService.parseAuthorizationHeader(req.headers.authorization);

  try {
    // get the user data from Magic Link using the decentralized Id and use it
    // to create a user in our database
    const { publicAddress, email } = await AuthService.verifyMagicLink(did);

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, did: publicAddress });

      await user.save();
    }

    res.end(await AuthService.sign({ id: user._id }));
  } catch (error) {
    return res.status(401).end("Error creating user.");
  }
};
