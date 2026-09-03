import app from "../app.js";
import { connectDB } from "../src/db/db.js";

// Initialize database connection
connectDB().catch(err => console.error("DB Connection Error on Vercel:", err));

// Export the Express app directly for Vercel Serverless
export default app;
