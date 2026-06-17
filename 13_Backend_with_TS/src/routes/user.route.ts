import { Router, Request, Response } from "express";
import { signUp } from "../controllers/user.controller";

const authRouter = Router();



authRouter.post("/signUp", signUp)


export default authRouter;