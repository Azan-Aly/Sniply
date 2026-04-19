import mongoose, { Schema } from "mongoose";
import { User } from "./users.model.js";
const urlSchema = new Schema(
    {
        originalUrl: {
            type: String,
            required: [true, "Original URL is required"],
            trim: true,
        },
        shortUrl:{
            type: String,
        },
        shortId: {
            type: String,
            index: true
        },
        clicks: {
            type: Number,
            default: 0
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        expiresAt: {
            type: Date
        }

    }, { timestamps: true }
);

export const URL = mongoose.model("URL", urlSchema);