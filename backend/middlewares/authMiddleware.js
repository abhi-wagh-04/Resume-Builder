import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

export const protect = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer")) {
    token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      return next(new AppError("Invalid token", 401));
    }
  } else {
    return next(new AppError("User not valid", 401));
  }
});
