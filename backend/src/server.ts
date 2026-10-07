import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./lib/prisma.js";
import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import passwordRoutes from "./routes/passwordRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — ROUTES SE PEHLE
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "CareerConnect API is running",
  });
});

// app.post("/api/auth/login", data);

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
  });
});

app.get("/api/test-db", async (_req, res) => {
  try {
    await prisma.$connect();

    res.json({
      success: true,
      message: "Database connected successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  } finally {
    await prisma.$disconnect();
  }
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", passwordRoutes);

app.listen(PORT, () => {
  console.log(`CareerConnect server running on port ${PORT}`);
});