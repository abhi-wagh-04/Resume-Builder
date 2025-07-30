import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: "7d" });
};

// @desc Register a new user
// @route POST/api/auth/register
// @access Public
export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, profileImageUrl } = req.body;
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User Already Exists", 400));
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    profileImageUrl,
  });

  if (user) {
    res.status(200).json({
      status: "success",
      user,
      token: generateToken(user._id),
    });
  } else {
    return next(new AppError("Server Error", 500));
  }
});

// @desc  Login user
// @route POST/api/auth/login
// @access Public
export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new AppError("Invalid Username or Password", 404));
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch) {
    res.status(200).json({
      status: "success",
      token: generateToken(user._id),
    });
  } else {
    return next(new AppError("Server Error", 500));
  }
});

// @desc  Get user profile
// @route POST/api/auth/profile
// @access Private (Requires JWT)
export const getUserProfile = catchAsync(async (req, res, next) => {
  // const user = await User.findById(req.user.id).select("-password");

  if (!req.user) {
    return next(new AppError("User Not Found", 404));
  }

  res.status(200).json({
    status: "success",
    user: req.user,
  });
});
