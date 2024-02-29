import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import networksRouter from "./router/networks.js";
import skillsRouter from "./router/skills.js";
import projectRouter from "./router/project.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDBga muvaffaqiyatli ulanildi"))
  .catch((err) => console.error("MongoDB ulanish xatosi: ", err));

app.use("/api/networks", networksRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/projects", projectRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
