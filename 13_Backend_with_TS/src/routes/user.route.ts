import { Router, Request, Response } from "express";
import { login, signUp } from "../controllers/user.controller";

const authRouter = Router();



authRouter.post("/signUp", signUp)
authRouter.post("/login", login)


export default authRouter;