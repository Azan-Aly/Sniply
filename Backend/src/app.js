import express from "express"
import cookieParser from 'cookie-parser'
import cors from "cors"


const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import urlRouter from "./routes/url.route.js"
import userRouter from "./routes/user.route.js"

// routes declaration
app.use("/", urlRouter)
app.use("/api/v1/users", userRouter)

export default app;