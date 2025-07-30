import fs from "fs";
import path from "path";
import Resume from "../models/Resume.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

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

export const getUserResumes = catchAsync(async (req, res, next) => {
  const resumes = await Resume.find({ userId: req.user._id }).sort({
    updatedAt: -1,
  });
  if (!resumes) {
    return next(new AppError("Resume not found", 404));
  }
  res.status(200).json({
    status: "success",
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

export const deleteResume = catchAsync(async (req, res, next) => {});
