import fs from "fs";
import path from "path";
import Resume from "../models/Resume.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { upload } from "../middlewares/uploadMiddleware.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadResumeImages = catchAsync(
  async (requestAnimationFrame, res, next) => {
    upload.fields([{ name: "thumbnail" }, { name: "profileImage" }])(
      req,
      res,
      async (err) => {
        if (err) return next(new AppError("File Upload Failed", 400));
        const resumeId = req.params.id;
        const resume = await Resume.findOne({
          _id: req.params.id,
          userId: req.user._id,
        });
        if (!resume) {
          return next(
            new AppError(
              `Resume not found with id:${req.params.id} or you are not authorized`,
              404
            )
          );
        }
        const uploadsFolder = path.join(__dirname, "..", "uploads");
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];

        // If new Thumbnail uploaded, delete old one
        // If (newThumbnail && resume.thumbnailLink)
        if (newThumbnail) {
          if (resume.thumbnailLink) {
            const oldThumbnail = path.join(
              uploadsFolder,
              path.basename(resume.thumbnailLink)
            );
            if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
          }
          resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }
        // If new profile Image uploaded, delete old one
        // If (newProfileImage && resume.profileInfo?.profilePreviewurl )
        if (newProfileImage) {
          if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(
              uploadsFolder,
              path.basename(resume.profileInfo.profilePreviewUrl)
            );
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
          }
          resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }
        await resume.save();
        res.status(200).json({
          status: "success",
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
        });
      }
    );
  }
);
