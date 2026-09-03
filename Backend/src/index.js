import "dotenv/config";
import app from "./app.js";
import { connectDB, disconnectDB } from "./db/db.js";

let server;

// Handle uncaught exceptions FIRST
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});

connectDB()
    .then(() => {
        const PORT = process.env.PORT || 8000;
        server = app.listen(PORT, () => {
            console.log(`Sniply backend is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to DB:", err);
        process.exit(1);
    });

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);

    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
});

// Graceful shutdown (Docker / hosting)
process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down...");

    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});

// Local shutdown (Ctrl + C)
process.on("SIGINT", () => {
    console.log("SIGINT received. Shutting down...");

    if (server) {
        server.close(async () => {
            await disconnectDB();
            process.exit(0);
        });
    } else {
        process.exit(0);
    }
});
