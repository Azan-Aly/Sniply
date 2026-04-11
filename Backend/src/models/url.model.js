import mongoose, { Schema } from "mongoose";

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
            unique: true,
            index: true
        },
        clicks: {
            type: Number,
            default: 0
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