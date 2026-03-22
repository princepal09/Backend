import { Router } from "express"
import { signUp } from "../controllers/user.controller.js";
import { sendOtp } from "../controllers/user.controller.js";

const router = Router();
/***
 * /api/v1/auth/signup
 */
router.post("/signup", signUp)
router.post("/verify-email", sendOtp)



export default router;