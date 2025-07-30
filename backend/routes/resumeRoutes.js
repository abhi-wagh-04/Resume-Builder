import express from "express";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
} from "../controllers/resumeContrller.js";
import { protect } from "../middlewares/authMiddleware.js";
// import { uploadResumeImages } from "../controllers/uploadImages.js";

const router = express.Router();

router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.post("/:id", protect, updateResume);
// router.put("/:id/upload-images", protect, uploadResumeImages);
router.delete("/:id", protect, deleteResume);

export default router;
