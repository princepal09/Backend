import Router from "express";
const router = Router();

import { login, signup, logout, getMe } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";



router.post("/login", login);
router.post("/signup", signup); 
router.get("/logout", auth,logout);
router.get("/me", auth, getMe);


export default router;