import { Router } from "express";
import NetworkModel from "../models/Networks.js";
import { validateNetwork } from "../validators/index.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const networks = await NetworkModel.find({});

    if (!networks) {
      res.json({ success: false, error: "Networks not found" });
    }

    res.status(200).json({ success: true, networks: networks });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const network = await NetworkModel.findById(id);

    if (!network) {
      return res
        .status(404)
        .json({ success: false, error: "network not found" });
    }

    res.status(200).json({ success: true, network });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validateNetwork(req.body);

    if (error) {
      return res.json({ success: false, error: error.details[0].message });
    }

    const newNetwork = await NetworkModel.create(req.body);
    res.status(201).json({ success: true, networks: newNetwork });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = validateNetwork(req.body);

    if (error) {
      return res.json({ success: false, error: error.details[0].message });
    }

    const updateNetwork = await NetworkModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateNetwork) {
      return res
        .status(404)
        .json({ success: false, error: "Network not found" });
    }

    res.status(200).json({ success: true, network: updateNetwork });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteNetwork = await NetworkModel.findByIdAndDelete(id);

    if (!deleteNetwork) {
      return res
        .status(404)
        .json({ success: false, error: "network not found" });
    }

    res.status(200).json({
      success: true,
      message: "the network has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

export default router;
