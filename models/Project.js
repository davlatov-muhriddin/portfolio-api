import { Schema, model } from "mongoose";

const ProjectSchema = new Schema({
  image: { type: String, required: true },
  title: { type: String, required: true, min: 15, max: 100 },
  description: { type: String, required: true, min: 50, max: 500 },
  github: { type: String, required: true },
  google: { type: String, required: true },
  youtube: { type: String, required: true },
  technology: [String],
});

const ProjectModel = model("project", ProjectSchema);
export default ProjectModel;
