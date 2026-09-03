import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorHandler } from "./middlewares/error.middleware.js";

// routes import
import userRouter from "./routes/user.route.js";
import urlRouter from "./routes/url.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? true : (process.env.CORS_ORIGIN || "http://localhost:5173"),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes declaration - mount specific API routes first before root wildcard routes
app.use("/api/v1/users", userRouter);
app.use("/", urlRouter);

// global error handler middleware (must be after routes)
app.use(errorHandler);

export default app;