import { Router } from "express";
import bookRouter from "./book.route";
import authRouter from "./user.route";


const routes = Router()


routes.use("/books", bookRouter)
routes.use("/auth", authRouter)



export default routes;