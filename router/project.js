import { Router } from "express";
import ProjectModel from "../models/Project.js";
import { validateProjects } from "../validators/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const projects = await ProjectModel.find({});
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const project = await ProjectModel.findById(id);

    if (!project) {
      return res
        .status(404)
        .json({ success: false, error: "project not found" });
    }

    res.status(200).json({ success: true, project });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateProjects(req.body);

    if (error) {
      return res.json({ success: false, error: error.details[0].message });
    }
    const newProject = await ProjectModel.create(req.body);
    res.status(201).json({ success: true, project: newProject });
    res.send(req.body);
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = validateProjects(req.body);

    if (error) {
      return res.json({ success: false, error: error.details[0].message });
    }

    const updateProject = await ProjectModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateProject) {
      return res
        .status(404)
        .json({ success: false, error: "Project not found" });
    }

    res.status(200).json({ success: true, project: updateProject });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProject = await ProjectModel.findByIdAndDelete(id);

    if (!deleteProject) {
      return res
        .status(404)
        .json({ success: false, error: "project not found" });
    }

    res.status(200).json({
      success: true,
      message: "the project has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
