import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./src/db/db.js";
import { errorHandler } from "./src/middlewares/error.middleware.js";
import { ApiError } from "./src/utils/ApiError.js";

// routes import
import userRouter from "./src/routes/user.route.js";
import urlRouter from "./src/routes/url.route.js";

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Database connection middleware for Serverless & Local
app.use(async (req, res, next) => {
  // Skip DB connection for simple health check
  if (req.path === "/health") {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (error) {
    next(new ApiError(500, `Database connection error: ${error.message || "Failed to connect to MongoDB"}`));
  }
});

// routes declaration - mount specific API routes first before root wildcard routes
app.use("/api/v1/users", userRouter);
app.use("/", urlRouter);

// global error handler middleware (must be after routes)
app.use(errorHandler);

export default app;