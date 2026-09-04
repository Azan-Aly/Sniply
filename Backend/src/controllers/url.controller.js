import path from "path";
import { fileURLToPath } from "url";
import { URL } from "../models/url.model.js";
import { urlGenerate } from "../services/urlGen.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESERVED_SLUGS = new Set([
  "api",
  "url",
  "urls",
  "health",
  "dashboard",
  "analytics",
  "profile",
  "login",
  "register",
  "public",
  "favicon.ico",
  "assets",
  "static",
  "temp"
]);

const normalizeUrl = (urlStr) => {
  let trimmed = urlStr.trim();
  if (!/^https?:\/\//i.test(trimmed)) {
    trimmed = `https://${trimmed}`;
  }
  return trimmed;
};

const formatShortUrl = (req, shortId) => {
  // 1. Prefer client origin header if not localhost (e.g. https://sniply.vercel.app)
  if (req?.headers?.origin && !req.headers.origin.includes("localhost")) {
    return `${req.headers.origin}/${shortId}`;
  }

  // 2. Prefer Vercel / proxy forwarded host if not localhost
  const forwardedHost = req?.headers?.["x-forwarded-host"];
  if (forwardedHost && !forwardedHost.includes("localhost")) {
    const protocol = req.headers?.["x-forwarded-proto"] || "https";
    return `${protocol}://${forwardedHost}/${shortId}`;
  }

  // 3. Prefer BASE_URL environment variable if configured
  if (process.env.BASE_URL && process.env.BASE_URL !== "sniply") {
    const base = /^https?:\/\//i.test(process.env.BASE_URL)
      ? process.env.BASE_URL
      : `https://${process.env.BASE_URL}`;
    return `${base.replace(/\/+$/, "")}/${shortId}`;
  }

  const protocol = req?.headers?.["x-forwarded-proto"] || req?.protocol || "http";
  const host = forwardedHost || req?.get?.("host") || "localhost:3000";
  return `${protocol}://${host}/${shortId}`;
};

const shortenUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customAlias, expiryDate } = req.body;

  if (!originalUrl?.trim()) {
    throw new ApiError(400, "Original URL is required");
  }

  const cleanOriginalUrl = normalizeUrl(originalUrl);

  // Validate URL format
  try {
    new globalThis.URL(cleanOriginalUrl);
  } catch {
    throw new ApiError(400, "Invalid URL format. Please provide a valid web URL");
  }

  // Check if expiry date is in the future
  let parsedExpiry = null;
  if (expiryDate) {
    parsedExpiry = new Date(expiryDate);
    if (isNaN(parsedExpiry.getTime())) {
      throw new ApiError(400, "Invalid expiry date format");
    }
    if (parsedExpiry <= new Date()) {
      throw new ApiError(400, "Expiration date must be in the future");
    }
  }

  // Check if user already shortened this exact URL without custom alias
  if (!customAlias) {
    const existing = await URL.findOne({
      originalUrl: cleanOriginalUrl,
      user: req.user._id,
      expiresAt: parsedExpiry || null
    });

    if (existing) {
      return res.status(200).json(
        new ApiResponse(
          200,
          {
            shortId: existing.shortId,
            shortUrl: formatShortUrl(req, existing.shortId),
            originalUrl: existing.originalUrl,
            clicks: existing.clicks,
            createdAt: existing.createdAt,
            expiresAt: existing.expiresAt
          },
          "URL already shortened"
        )
      );
    }
  }

  let shortId;

  if (customAlias) {
    const slug = customAlias.trim().toLowerCase();

    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(slug)) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Custom alias must be 3-30 characters and contain only letters, numbers, hyphens, and underscores",
        data: { field: "customAlias" }
      });
    }

    if (RESERVED_SLUGS.has(slug)) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: `"${slug}" is a reserved word and cannot be used as a custom alias`,
        data: { field: "customAlias" }
      });
    }

    const aliasExists = await URL.findOne({ shortId: slug });
    if (aliasExists) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Custom alias already taken. Please choose another one.",
        data: { field: "customAlias" }
      });
    }
    shortId = slug;
  } else {
    let isUnique = false;
    while (!isUnique) {
      shortId = urlGenerate(7);
      if (!RESERVED_SLUGS.has(shortId)) {
        const exists = await URL.findOne({ shortId });
        if (!exists) isUnique = true;
      }
    }
  }

  const newUrl = await URL.create({
    originalUrl: cleanOriginalUrl,
    shortId,
    shortUrl: formatShortUrl(req, shortId),
    expiresAt: parsedExpiry,
    user: req.user._id
  });

  if (!newUrl) {
    throw new ApiError(500, "Failed to create short URL");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        shortId: newUrl.shortId,
        shortUrl: formatShortUrl(req, newUrl.shortId),
        originalUrl: newUrl.originalUrl,
        clicks: newUrl.clicks,
        createdAt: newUrl.createdAt,
        expiresAt: newUrl.expiresAt
      },
      "URL shortened successfully"
    )
  );
});

// REDIRECT
const redirectUrl = asyncHandler(async (req, res) => {
  const { code } = req.params;

  if (!code) {
    throw new ApiError(400, "Short ID is required");
  }

  const url = await URL.findOne({ shortId: code });

  if (!url) {
    throw new ApiError(404, "Shortened URL not found");
  }

  if (url.expiresAt && url.expiresAt < new Date()) {
    const expiredPage = path.resolve(__dirname, "../../public/expired.html");
    return res.status(410).sendFile(expiredPage);
  }

  await URL.updateOne(
    { shortId: code },
    { $inc: { clicks: 1 } }
  );

  return res.redirect(302, url.originalUrl);
});

// GET RECENT URLS
const getRecentUrls = asyncHandler(async (req, res) => {
  const recentUrls = await URL.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(50);

  // Ensure all shortUrls are properly formatted with protocol & host
  const formattedUrls = recentUrls.map((item) => ({
    ...item.toObject(),
    shortUrl: formatShortUrl(req, item.shortId)
  }));

  return res.status(200).json(
    new ApiResponse(200, formattedUrls, "Recent URLs fetched successfully")
  );
});

// Delete URL
const urlDelete = asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const deleted = await URL.findOneAndDelete({ shortId, user: req.user._id });
  if (!deleted) {
    throw new ApiError(404, "URL not found or unauthorized to delete");
  }
  return res.status(200).json(new ApiResponse(200, null, "URL deleted successfully"));
});

// HEALTH - TEST
const firstPage = asyncHandler((req, res) => {
  res.status(200).json(new ApiResponse(200, { status: "healthy", uptime: process.uptime() }, "Sniply API is running smoothly!"));
});

export {
  shortenUrl,
  redirectUrl,
  getRecentUrls,
  urlDelete,
  firstPage,
};
