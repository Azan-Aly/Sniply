import { Router } from "express";
import {
  shortenUrl,
  redirectUrl,
  getRecentUrls,
  urlDelete,
  firstPage
} from "../controllers/url.controller.js";
import { getStats } from "../controllers/stats.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Health Check Routes
router.route("/").get(firstPage);
router.route("/health").get(firstPage);

// URL Management & Stats Routes (Protected)
router.route("/url/stats").get(verifyJWT, getStats);
router.route("/url/shorten").post(verifyJWT, shortenUrl);
router.route("/url/recent").get(verifyJWT, getRecentUrls);
router.route("/url/:shortId").delete(verifyJWT, urlDelete);

// REDIRECT - wildcard must stay at the bottom of urlRouter
router.route("/:code").get(redirectUrl);

export default router;