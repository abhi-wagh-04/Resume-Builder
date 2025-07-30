import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import resumeRoutes from "./routes/resumeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
