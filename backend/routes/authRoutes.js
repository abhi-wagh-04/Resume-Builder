import exppress from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authContrller.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import AppError from "../utils/AppError.js";

const router = exppress.Router();

// Auth Routess
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);

router.post("/upload-image", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    return next(new AppError("No file Uploaded", 400));
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.status(200).json({ imageUrl });
});

export default router;
