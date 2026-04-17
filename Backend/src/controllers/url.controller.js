import { URL } from "../models/url.model.js";
import { urlGenerate } from "../services/urlGen.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const shortenUrl = asyncHandler(async (req, res) => {
  const { originalUrl, customAlias, expiryDate } = req.body;

  if (!originalUrl) {
    throw new ApiError(400, "Original URL is required");
  }

  const existing = await URL.findOne({
    originalUrl,
    user: req.user._id
  });
  if (existing) {
    return res.status(200).json(
      new ApiResponse(200, {
        shortId: existing.shortId,
        shortUrl: `${req.protocol}://${req.get("host")}/${existing.shortId}`,
      }, "URL already shortened")
    );
  }

  let shortId;

  if (customAlias) {
    const aliasExists = await URL.findOne({ shortId: customAlias });
    if (aliasExists) {
      throw new ApiError(400, "Custom alias name already taken");
    }
    shortId = customAlias;
  } else {

    let isUnique = false;

    while (!isUnique) {
      shortId = urlGenerate(7);
      const exists = await URL.findOne({ shortId });
      if (!exists) isUnique = true;
    }
  }

  const newUrl = await URL.create({
    originalUrl,
    shortId,
    shortUrl: `${req.protocol}://${req.get("host")}/${shortId}`,
    expiresAt: expiryDate || null,
    user: req.user?._id || null
  });

  if (!newUrl) {
    throw new ApiError(500, "Failed to create short URL");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        shortId: newUrl.shortId,
        shortUrl: `${req.protocol}://${req.get("host")}/${newUrl.shortId}`,
      },
      "URL shortened successfully"
    )
  );
});

// REDIRECT
const redirectUrl = asyncHandler(async (req, res) => {
  const { code } = req.params;
  console.log(code)
  if (!code) {
    throw new ApiError(400, "Short ID is required");
  }

  const url = await URL.findOne({ shortId: code });
  console.log(url)
  if (!url) {
    throw new ApiError(404, "URL not found");
  }

  if (url.expiresAt && url.expiresAt < new Date()) {
    throw new ApiError(410, "URL has expired");
  }

  await URL.updateOne(
    { shortId: code },
    { $inc: { clicks: 1 } }
  );

  return res.redirect(url.originalUrl);
});



// GET RECENT URLS
const getRecentUrls = asyncHandler(async (req, res) => {
  const recentUrls = await URL.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .limit(10);
  return res.status(200).json(new ApiResponse(200, recentUrls, "Recent URLs fetched successfully"));
});



// Delete URL
const urlDelete = asyncHandler(async (req, res) => {
  const { shortId } = req.params;
  const deleted = await URL.findOneAndDelete({ shortId, user: req.user._id });
  if (!deleted) {
    throw new ApiError(404, "URL not found");
  } else {
    return res.status(200).json(new ApiResponse(200, null, "URL deleted successfully"));
  }
});


// HEALTH - TEST
const firstPage = asyncHandler((req, res) => {
  res.send("API is running smoothly!");
});

export {
  shortenUrl,
  redirectUrl,
  getRecentUrls,
  urlDelete,
  firstPage,
};