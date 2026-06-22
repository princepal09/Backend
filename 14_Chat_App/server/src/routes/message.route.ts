import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { getMessages, getUserForSideBar, sendMessage } from "../controllers/message.controller.js";

const router = Router();


router.get("/users", auth, getUserForSideBar)
router.get("/user/:id", auth, getMessages)
router.post("/send/:id", auth, sendMessage)


export default router;
