import { Router } from "express";
import SkillsModel from "../models/Skills.js";
import { validateSkills } from "../validators/index.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const skills = await SkillsModel.find({});

    if (!skills) {
      res.json({ success: false, error: "Skills not found" });
    }

    res.status(200).json({ success: true, skills });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateSkills(req.body);

    if (error) {
      return res.json({ success: false, error: error.details[0].message });
    }

    const newSkill = await SkillsModel.create(req.body);
    res.status(201).json({ success: true, skills: newSkill });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = validateSkills(req.body);

    if (error) {
      return res.json({ success: false, error: error.details[0].message });
    }

    const updateSkill = await SkillsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateSkill) {
      return res
        .status(404)
        .json({ success: false, error: "Skills not found" });
    }

    res.status(200).json({ success: true, skill: updateSkill });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteSkill = await SkillsModel.findByIdAndDelete(id);

    if (!deleteSkill) {
      return res.status(404).json({ success: false, error: "skill not found" });
    }

    res.status(200).json({
      success: true,
      message: "the skill has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
