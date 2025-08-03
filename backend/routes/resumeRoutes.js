import express from "express";
import {
  createResume,
  getUserResumes,
  getResumeById,
  updateResume,
  deleteResume,
  getAllResumes,
} from "../controllers/resumeContrller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { uploadResumeImages } from "../controllers/uploadImages.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/all", getAllResumes);
router.post("/", protect, createResume);
router.get("/", protect, getUserResumes);
router.get("/:id", protect, getResumeById);
router.put("/:id", protect, updateResume);
router.put(
  "/:id/upload-images",
  protect,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "profileImage", maxCount: 1 },
  ]),
  uploadResumeImages
);
router.delete("/:id", protect, deleteResume);

export default router;
