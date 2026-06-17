import mongoose from "mongoose"

interface IBook {
    name : string,
    author : string,
    publishYear : number,
    description : string
}


const bookSchema = new mongoose.Schema<IBook>({
         name :{
            type : String,
            required : [true, "name should be required"]
         },
         author :{
            type : String,
            required : [true, "author should be required"]
         },
         publishYear :{
            type : Number,
            required : [true, "publishYear should be required"]
         },
         description :{
            type : String,
            required : [true, "description should be required"]
         },

})


export const Book = mongoose.model<IBook>("Book", bookSchema)