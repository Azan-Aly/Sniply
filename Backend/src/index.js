import dotenv from "dotenv"
import app from "./app.js"
import { connectDB, disconnectDB } from "./db/db.js";
dotenv.config({ path: "./.env" })

let server;

// Handle uncaught exceptions FIRST
process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    process.exit(1);
});


connectDB()
    .then(() => {
        server = app.listen(process.env.PORT || 8000, () => {
            console.log("DB connected successfully!!")
            console.log(`App is running on http://localhost:${process.env.PORT || 8000}`)
        })
    }
    ).catch((err) => {
        console.log("Error connecting DB ", err);
    })


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
    }
});

























// // Handle unhandled promise rejections (e.g., database connection errors)
// process.on("unhandledRejection", (err) => {
//     console.error("Unhandled Rejection:", err);
//     server.close(async () => {
//         await disconnectDB();
//         process.exit(1);
//     });
// });

// // Handle uncaught exceptions
// process.on("uncaughtException", async (err) => {
//     console.error("Uncaught Exception:", err);
//     await disconnectDB();
//     process.exit(1);
// });

// // Graceful shutdown
// process.on("SIGTERM", async () => {
//     console.log("SIGTERM received, shutting down gracefully");
//     server.close(async () => {
//         await disconnectDB();
//         process.exit(0);
//     });
// });
