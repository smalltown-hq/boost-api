import Mongoose from "mongoose";

const eventSchema = new Mongoose.Schema({
  name: String,
  createdBy: { type: Mongoose.Schema.Types.ObjectId, index: true },
  createdAt: { type: Date, default: Date.now },
  questions: [Mongoose.Schema.Types.ObjectId],
  reactions: { type: Mongoose.Schema.Types.Mixed, default: {} },
  liveViewers: { type: Number, default: 0 },
});

const Event = Mongoose.models.Event || Mongoose.model("Event", eventSchema);

Event.createIndexes();

export default Event;
