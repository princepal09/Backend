import {Request, Response} from 'express'

interface IResponse {
    success : boolean, 
    message : string,
    data? : any
}

export const getBooks = async(req:Request, res:Response) => {
    
}  

export const addBook = async(req:Request, res:Response) => {
    try{
        

    }catch(err:any){
        console.log("Unable to add Books", err.message);
        return res.status(500).json({
            success : false,
            message : "INTERNAL SERVER ERROR"
        } as IResponse)

    }
}