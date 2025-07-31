import fs from "fs";
import path from "path";
import Resume from "../models/Resume.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createResume = catchAsync(async (req, res, next) => {
  const { title } = req.body;

  // Default Template
  const defaultResumeData = {
    profileInfo: {
      profileImg: null,
      previewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institutions: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        github: "",
        liveDemo: "",
      },
    ],
    certifications: [{ title: "", issuer: "", year: "" }],
    languages: [
      {
        name: "",
        progress: 0,
      },
    ],
    intrests: [""],
  };

  const newResume = await Resume.create({
    userId: req.user._id,
    title,
    ...defaultResumeData,
  });

  res.status(201).json({
    status: "success",
    newResume,
  });
});

export const getAllResumes = catchAsync(async (req, res, next) => {
  const resumes = await Resume.find();
  if (!resumes) {
    return next(new AppError("Resume not found", 404));
  }
  res.status(200).json({
    status: "success",
    results: resumes.length,
    resumes,
  });
});

export const getUserResumes = catchAsync(async (req, res, next) => {
  const resumes = await Resume.find({ userId: req.user._id });
  if (!resumes) {
    return next(new AppError("Resume not found", 404));
  }
  res.status(200).json({
    status: "success",
    results: resumes.length,
    resumes,
  });
});

export const getResumeById = catchAsync(async (req, res, next) => {
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
  res.status(200).json({
    status: "success",
    resume,
  });
});

export const updateResume = catchAsync(async (req, res, next) => {
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

  // Merge updates from req.body into existing resume
  Object.assign(resume, req.body);

  // Save the updated resume
  const savedResume = await resume.save();
  res.status(201).json({
    status: "success",
    resume: savedResume,
  });
});

export const deleteResume = catchAsync(async (req, res, next) => {
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
  // delete the thumbnailLink and ProfileImageUrl images from uploads folder
  const uploadsFolder = path.join(__dirname, "..", "uploads");
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  if (resume.thumbnailLink) {
    const oldThumbnail = path.join(
      uploadsFolder,
      path.basename(resume.thumbnailLink)
    );
    if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
  }

  if (resume.profileInfo?.profilePreviewUrl) {
    const oldProfile = path.join(
      uploadsFolder,
      path.basename(resume.profileInfo.profilePreviewUrl)
    );
    if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
  }
  await Resume.findByIdAndDelete({ _id: req.params.id, userId: req.user._id });
  res.status(200).json(null);
});
