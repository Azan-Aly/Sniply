import app from "../src/app.js";
import { connectDB } from "../src/db/db.js";

// Vercel serverless function entry point
export default async function handler(req, res) {
  // Ensure DB connection is established before handling request
  await connectDB();
  
  // Delegate request to Express app
  return app(req, res);
}
