import {Request, Response} from 'express'
import { Book } from '../models/book.model';

export interface IResponse {
    success : boolean, 
    message : string,
    data? : any
}

interface IBookBody {
  name: string;
  author?: string;
  description?: string;
  publishYear?: number;
}


export const getBooks = async(req:Request, res:Response) => {
    
    const bookData = await Book.find({});

    if(!bookData){
        return res.status(401).json({
            success : false,
            message : "No Books Found"
        } as IResponse)
    }
    return res.status(200).json({
        success : true,
        message : "BOOKS FOUND",
        data : bookData
    } as IResponse)
}  

export const addBook = async(req:Request, res:Response) => {
    try{

        console.log("HELLO ITS BOOK");

        const {author, description, name,  publishYear} =  req.body

        if(!author || !description || !name || !publishYear){
            return res.status(401).json({
                success :false,
                message : "All fields must be required"
            } as IResponse)
        }

        const book = await Book.create({
            author,
            description, 
            name, 
            publishYear
        })

        console.log(book)


        return res.status(201).json({
            success : true,
            message : "Book added",
            data : book
        } as IResponse)

        

    }catch(err:any){
        console.log("Unable to add Books", err.message);
        return res.status(500).json({
            success : false,
            message : "INTERNAL SERVER ERROR"
        } as IResponse)

    }
}
export const updateBook = async(req:Request, res:Response) => {
    try{
       
        const {bookId} = req.params;
        
         const {author, description, name,  publishYear} =  req.body as IBookBody 
 
         
        if(!bookId){
            return res.status(401).json({
                success :false,
                message : "ID should be not empty"
            } as IResponse)
        }

        const updatedBook = await Book.findByIdAndUpdate(bookId, {
          author, name, description, publishYear
        }, {new : true})


        if(!updatedBook){
            return res.status(401).json({
                success : false,
                message : "Updated book not found"
            } as IResponse)
        }


        return res.status(201).json({
            success : true,
            message : "Book Updated successfully",
            data : updatedBook
        } as IResponse)

        

    }catch(err:any){
        console.log("Unable to add Books", err.message);
        return res.status(500).json({
            success : false,
            message : "INTERNAL SERVER ERROR"
        } as IResponse)

    }
}

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: deletedBook,
    }as IResponse);
  } catch (err: any) {
    console.error("Unable to delete book:", err.message);

    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    } as IResponse);
  }
};