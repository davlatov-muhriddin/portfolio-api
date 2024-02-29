import { model, Schema } from "mongoose";

const SkillsSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
});

const SkillsModel = model("skills", SkillsSchema);
export default SkillsModel;
