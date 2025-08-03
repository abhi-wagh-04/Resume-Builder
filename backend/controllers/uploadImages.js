import fs from "fs";
import path from "path";
import Resume from "../models/Resume.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadResumeImages = catchAsync(async (req, res, next) => {
  const resumeId = req.params.id;

  const resume = await Resume.findOne({
    _id: resumeId,
    userId: req.user._id,
  });

  if (!resume) {
    return next(
      new AppError(
        `Resume not found with id:${resumeId} or you are not authorized`,
        404
      )
    );
  }

  console.log("📂 Files received:", req.files);

  const uploadsFolder = path.join(__dirname, "..", "uploads");
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  const newThumbnail = req.files?.thumbnail?.[0];
  const newProfileImage = req.files?.profileImage?.[0];

  // 🧹 Delete old thumbnail
  if (newThumbnail) {
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
        console.log("🗑️ Old thumbnail deleted:", oldThumbnail);
      }
    }
    resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
    console.log("✅ New thumbnail link set:", resume.thumbnailLink);
  }

  // 🧹 Delete old profile image
  if (newProfileImage) {
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
        console.log("🗑️ Old profile image deleted:", oldProfile);
      }
    }
    resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
    console.log(
      "✅ New profile image link set:",
      resume.profileInfo.profilePreviewUrl
    );
  }

  await resume.save();

  console.log("📤 Final saved resume:", resume);

  res.status(200).json({
    status: "success",
    thumbnailLink: resume.thumbnailLink,
    profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
  });
});
