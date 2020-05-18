import Mongoose from "mongoose";
import AuthService from "services/auth";
import Event from "models/Event";

let db;
const PAGE = 10;

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

    const skip = (+req.query.page || 0) * PAGE;

    const events = await Event.find(
      { createdBy: id },
      { questions: 0, reactions: 0 }
    )
      .limit(PAGE)
      .skip(skip);
    const total = await Event.count({ createdBy: id });
    const hasMore = total - (skip + PAGE) > 0;

    res.json({
      results: events,
      total,
      hasMore,
      next:
        hasMore && `/api/events/list?page=${Math.ceil((skip + PAGE) / PAGE)}`,
    });
  } catch (error) {
    return res.status(401).end(error.message || "Error listing events.");
  }
};
