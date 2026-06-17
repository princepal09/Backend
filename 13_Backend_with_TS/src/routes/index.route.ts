import { Router } from "express";
import { getBooks } from "../controllers/book.controller";

const routes = Router()


routes.use("books", getBooks)



export default routes;