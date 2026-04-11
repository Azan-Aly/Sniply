import dotenv from "dotenv"
import app from "./app.js"
import connectDB from "./db/db.js";
dotenv.config({ path: "./.env" })


connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log("DB connected successfully!!")
            console.log(`App is running on http://localhost:${process.env.PORT || 8000}`)
        })
    }
    ).catch((err) => {
        console.log("Error connecting DB ", err);
    })
