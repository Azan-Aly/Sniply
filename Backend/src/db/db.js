import mongoose from "mongoose";
import DB_NAME from "../constants.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            return;
        }

        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DB_NAME}`
        );

        console.log(
            `MongoDB Connected successfully! DB Host: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MONGODB Connection failed:", error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB Disconnected!");
    } catch (error) {
        console.error("Error disconnecting from MongoDB:", error);
        process.exit(1);
    }
};

export { connectDB, disconnectDB };