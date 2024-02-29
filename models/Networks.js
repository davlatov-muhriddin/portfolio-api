import { model, Schema } from "mongoose";

const NetworksSchema = new Schema({
  icon: { type: String, required: true },
  url: { type: String, required: true },
});

const NetworkModel = model("networks", NetworksSchema);
export default NetworkModel;
