import mongoose from "mongoose";
import { URL } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getStats = asyncHandler(async (req, res) => {
    try {
        const userObjectId = new mongoose.Types.ObjectId(String(req.user._id));

        const totalLinks = await URL.countDocuments({
            user: userObjectId
        });

        const totalClicksAgg = await URL.aggregate([
            {
                $match: { user: userObjectId }
            },
            {
                $group: {
                    _id: null,
                    totalClicks: { $sum: "$clicks" }
                }
            }
        ]);

        const totalClicks = totalClicksAgg[0]?.totalClicks || 0;

        // Active today (created today)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activeToday = await URL.countDocuments({
            user: userObjectId,
            createdAt: { $gte: today }
        });

        return res.status(200).json(
            new ApiResponse(200, {
                totalLinks,
                clicks: totalClicks,
                activeToday
            }, "Stats fetched successfully")
        );
    } catch (err) {
        console.error("Error fetching stats:", err);
        throw new ApiError(500, "Error fetching user link statistics");
    }
});


