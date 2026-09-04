import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary, deleteFromCloudinary, extractPublicIdFromUrl } from "../utils/cloudinary.utils.js";

const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL === "1";

const getCookieOptions = () => ({
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: 1000 * 24 * 60 * 60 * 7
});

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.error("Error generating tokens:", error);
        if (error instanceof ApiError) throw error;
        throw new ApiError(500, error.message || "Error generating authentication tokens");
    }
};

const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password } = req.body;
    if (!fullName?.trim() || !username?.trim() || !email?.trim() || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { username: normalizedUsername }]
    });

    if (existingUser) {
        throw new ApiError(409, "User with this email or username already exists");
    }

    const user = await User.create({
        fullName: fullName.trim(),
        username: normalizedUsername,
        email: normalizedEmail,
        password
    });

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(user._id);

    const options = getCookieOptions();

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res
        .status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                201,
                { user: createdUser, refreshToken, accessToken },
                "User registered successfully"
            )
        );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email?.trim() || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = getCookieOptions();

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, refreshToken, accessToken },
                "User logged in successfully"
            )
        );
});

const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user?._id) {
        await User.findByIdAndUpdate(
            user._id,
            {
                $set: { refreshToken: undefined }
            },
            { returnDocument: "after" }
        );
    }

    const options = getCookieOptions();

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const checkLoginStatus = asyncHandler(async (req, res) => {
    const user = req?.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized access");
    }
    return res
        .status(200)
        .json(new ApiResponse(200, user, "User is authorized"));
});

const refreshingTokens = asyncHandler(async (req, res) => {
    try {
        const token =
            req.cookies?.refreshToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request: No refresh token provided");
        }

        const secret = process.env.REFRESH_TOKEN_SECRET || "sniply_jwt_refresh_secret_fallback_2025";
        const decodedToken = jwt.verify(token, secret);

        const user = await User.findById(decodedToken?._id);
        if (!user || user.refreshToken !== token) {
            throw new ApiError(401, "Invalid or expired refresh token");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const options = getCookieOptions();

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken },
                    "Tokens refreshed successfully"
                )
            );
    } catch (error) {
        throw new ApiError(
            error?.statusCode || 401,
            error?.message || "Invalid refresh token"
        );
    }
});

const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarLocalPath = req.file?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing");
    }

    if (!req.user?._id) {
        throw new ApiError(401, "Unauthorized request");
    }

    // Get current user to find old avatar
    const currentUser = await User.findById(req.user._id);

    // Delete old avatar from cloudinary if it exists
    if (currentUser?.avatar) {
        const publicId = extractPublicIdFromUrl(currentUser.avatar);
        if (publicId) {
            await deleteFromCloudinary(publicId);
        }
    }

    // Upload new avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const uploadedUrl = avatar?.secure_url || avatar?.url;

    if (!avatar || !uploadedUrl) {
        throw new ApiError(500, "Error while uploading avatar to cloud storage");
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { avatar: uploadedUrl } },
        { returnDocument: "after" }
    ).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found after avatar upload");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Avatar updated successfully"));
});

export {
    registerUser,
    loginUser,
    logoutUser,
    checkLoginStatus,
    refreshingTokens,
    updateUserAvatar
};

