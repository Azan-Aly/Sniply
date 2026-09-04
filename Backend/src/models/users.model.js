import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String, // cloudinary url
        // default: `https://ui-avatars.com/api/?name=${this.fullName}&background=random&rounded=true&size=128`
    },
    password: {
        type: String, //hashed form
        required: [true, "password is required"]
    },
    refreshToken: {
        type: String
    }


}, { timestamps: true })

userSchema.pre('save', async function () {
    if (!this.isModified("password")) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
    const secret = process.env.ACCESS_TOKEN_SECRET || "sniply_jwt_access_secret_fallback_2025";
    const expiry = process.env.ACCESS_TOKEN_EXPIRY || "1d";
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
        },
        secret,
        {
            expiresIn: expiry
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    const secret = process.env.REFRESH_TOKEN_SECRET || "sniply_jwt_refresh_secret_fallback_2025";
    const expiry = process.env.REFRESH_TOKEN_EXPIRY || "7d";
    return jwt.sign(
        {
            _id: this._id,
        },
        secret,
        {
            expiresIn: expiry
        }
    )
}

export const User = mongoose.model("User", userSchema)