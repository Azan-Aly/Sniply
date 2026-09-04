import mongoose from "mongoose";
import DB_NAME from "../constants.js";
import dns from "dns";

// Only apply custom DNS settings when NOT running in Vercel/serverless environments,
// as Vercel AWS Lambda containers block external DNS (port 53) queries to 8.8.8.8.
if (!process.env.VERCEL) {
    try {
        dns.setServers(["8.8.8.8", "8.8.4.4"]);
        dns.setDefaultResultOrder("ipv4first");
    } catch {
        // Ignore if DNS server override is not permitted
    }
}

let cachedPromise = null;

const connectDB = async () => {
    // 1 = connected
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    if (!process.env.MONGODB_URI) {
        const err = new Error("MONGODB_URI environment variable is missing! Please set it in your environment / Vercel settings.");
        console.error(err.message);
        throw err;
    }

    if (!cachedPromise) {
        const opts = {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 8000,
        };

        cachedPromise = mongoose
            .connect(process.env.MONGODB_URI, opts)
            .then((connectionInstance) => {
                console.log(
                    `MongoDB Connected successfully! DB Host: ${connectionInstance.connection.host}`
                );
                return connectionInstance;
            })
            .catch((error) => {
                cachedPromise = null;
                console.error("MONGODB Connection failed:", error.message || error);
                throw error;
            });
    }

    return cachedPromise;
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        cachedPromise = null;
        console.log("MongoDB Disconnected!");
    } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
    }
};

export { connectDB, disconnectDB };