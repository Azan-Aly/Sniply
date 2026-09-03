import { ApiError } from "../utils/ApiError.js";

export const errorHandler = (err, req, res, next) => {
    let error = err;

    if (!(error instanceof ApiError)) {
        let statusCode = error.statusCode || 500;
        let message = error.message || "Something went wrong";
        let errors = error?.errors || [];

        // Handle specific known error types
        if (error.name === "ValidationError") {
            statusCode = 400;
            message = "Validation Error";
            errors = Object.values(error.errors || {}).map((e) => e.message);
        } else if (error.code === 11000) {
            statusCode = 409;
            const field = Object.keys(error.keyPattern || {})[0] || "field";
            message = `Duplicate value entered for ${field}`;
        } else if (error.name === "JsonWebTokenError") {
            statusCode = 401;
            message = "Invalid access token";
        } else if (error.name === "TokenExpiredError") {
            statusCode = 401;
            message = "Access token expired";
        }

        error = new ApiError(statusCode, message, errors, err.stack);
    }

    const response = {
        statusCode: error.statusCode,
        success: false,
        message: error.message,
        errors: error.errors || [],
        data: error.data || null,
        ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {})
    };

    return res.status(error.statusCode).json(response);
};
