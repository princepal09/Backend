import { Router, Request, Response } from "express";
import {
  getBooks,
  addBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";
import { auth, isAdmin, isVisitor } from "../middlewares/auth.middleware";

const bookRouter = Router();

bookRouter.get("/get-books", auth, isVisitor, getBooks);

bookRouter.post("/add-book", addBook);
bookRouter.put("/update-book/:bookId", updateBook);
bookRouter.put("/delete-book/:bookId", deleteBook);

export default bookRouter;
