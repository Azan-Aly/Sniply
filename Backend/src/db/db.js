import mongoose from "mongoose"
import DB_NAME from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); 
        console.log("MongoDB Connected!!! DB Host : ", connectionInstance.connection.host);
    } catch (error) {
        console.error("MONGODB Connection failed", error);
        process.exit(1);
    }
}

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        console.log("MongoDB Disconnected!!!");
    } catch (error) {
        console.error("Error disconnecting from MongoDB", error);
        process.exit(1);
    }
}

export { connectDB, disconnectDB };