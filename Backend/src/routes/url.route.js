import { Router } from "express";
import { shortenUrl, redirectUrl, getRecentUrls, urlDelete, firstPage } from "../controllers/url.controller.js";
import { getStats } from "../controllers/stats.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(firstPage)

router.route("/url/stats").get(verifyJWT,getStats)

router.route("/url/shorten").post(verifyJWT, shortenUrl);
router.route("/url/recent").get(verifyJWT, getRecentUrls);

router.route("/url/:shortId").delete(verifyJWT, urlDelete);

// REDIRECT 
router.route("/:code").get(redirectUrl);


export default router;