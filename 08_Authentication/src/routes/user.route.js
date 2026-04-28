import { Router } from "express"
import { login, logout, refreshToken, signUp } from "../controllers/user.controller.js";
import { sendOtp } from "../controllers/user.controller.js";

const router = Router();
/***
 * /api/v1/auth/signup
 */
router.post("/signup", signUp)
router.post("/send-otp", sendOtp)
router.post("/login", login)
router.get("/refresh-token", refreshToken)
router.post("/logout", logout)



export default router;