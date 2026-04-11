import { Router } from "express";
import { shortenUrl, redirectUrl, getRecentUrls, urlDelete, firstPage } from "../controllers/url.controller.js";

const router = Router();

router.route("/").get(firstPage)

router.route("/url/shorten").post(shortenUrl);
router.route("/url/recent").get(getRecentUrls)
router.route("/:code").get(redirectUrl);

router.route("/url/:shortId").delete(urlDelete)

export default router;