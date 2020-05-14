import Mongoose from "mongoose";

const userSchema = new Mongoose.Schema({
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  did: String,
});

const User = Mongoose.models.User || Mongoose.model("User", userSchema);

User.createIndexes();

export default User;
