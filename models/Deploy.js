import Mongoose from "mongoose";

const deploySchema = new Mongoose.Schema({ count: [Date] });

const Deploy = Mongoose.models.Deploy || Mongoose.model("Deploy", deploySchema);

export default Deploy;
