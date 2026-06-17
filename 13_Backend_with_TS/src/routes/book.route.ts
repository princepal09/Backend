import { Router, Request, Response } from "express";
import { getBooks } from "../controllers/book.controller";

const bookRouter = Router();


bookRouter.get('/get-books', getBooks)




export default bookRouter;