import { User } from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()

        console.log("access:", accessToken);
        console.log("Refresh:", refreshToken);

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Error generating tokens")
    }
}



const registerUser = asyncHandler(async (req, res) => {

    const { fullName, username, email, password } = req.body;
    if (!fullName || !username || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        throw new ApiError(400, "User with this email or username already exists");
    }


    const user = await User.create(
        { fullName, username, email, password }
    );

    const { refreshToken, accessToken } = await generateAccessAndRefreshTokens(user._id)

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, { createdUser, refreshToken, accessToken }, "User registered Successfully")
        )

});



const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    console.log("login attempt with:", email, password)
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    console.log("user mil gya", user)
    if (!user) {
        throw new ApiError(400, "Invalid email or password");
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
        throw new ApiError(400, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, refreshToken, accessToken },
                "User LoggedIn successfully"
            )
        )
})



const logoutUser = asyncHandler(async (req, res) => {
    const user = req.user

    await User.findByIdAndUpdate(
        user._id,
        {
            $set: { refreshToken: undefined }
        },
        { new: true }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "User logged out")
        )
})




const checkLoginStatus = asyncHandler(async (req, res) => {
    const user = req?.user;
    if (!user) {
        throw new ApiError(401, "Unauthorized access")
    }
    return res.status(200)
        .json(
            new ApiResponse(200, user, "User is Authorized or logged-in")
        )
})




const refreshToken = asyncHandler(async (req, res) => {
    try {
        const token =
            req.cookies?.refreshToken ||
            req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);
        if (!user || user.refreshToken !== token) {
            throw new ApiError(401, "Invalid refresh token");
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        };

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
            error?.message || "Invalid access token"
        );
    }
});




export {
    registerUser,
    loginUser,
    logoutUser,
    checkLoginStatus,
    refreshToken
}
