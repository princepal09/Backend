import { Router, Request, Response } from "express";
import { getBooks, addBook, updateBook, deleteBook } from "../controllers/book.controller";

const bookRouter = Router();


bookRouter.get('/get-books', getBooks)

bookRouter.post('/add-book', addBook)
bookRouter.put('/update-book/:bookId', updateBook)
bookRouter.put('/delete-book/:bookId', deleteBook)




export default bookRouter;