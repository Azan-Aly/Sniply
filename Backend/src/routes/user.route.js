import { Router } from "express";
import { registerUser, loginUser, logoutUser, checkLoginStatus, refreshingTokens, updateUserAvatar } from "../controllers/users.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/me").get(verifyJWT, checkLoginStatus)
router.route('/refresh').get(refreshingTokens)

router.route("/avatar").post(verifyJWT, upload.single("avatar"), updateUserAvatar)

export default router;