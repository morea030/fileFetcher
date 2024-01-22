import { ApplicationError } from "../errors/applicationError";
import  Book, { IBook }  from "../models/book.model";

export default class BookRepository {

    public static async create(book: IBook) {
        try {
            return await book.save();
        } catch (error) {
            const errorMsg = `BookRepository.createBook: ${error}`;
            throw new ApplicationError(errorMsg, 500)
        }
    }
    public static async getAllBooks(): Promise<IBook[]> {
        try {
            console.log("BookRepository.getAllBooks");
            return await Book.find({});
        } catch (error) {
            const errorMsg = `BookRepository.getAllBooks: ${error}`;
            throw new ApplicationError(errorMsg, 500)
        }
    }

    public static async getBooksByAuthorId(authorId: string): Promise<IBook[]> {
        try {
            return await Book.find({ authorId });
        } catch (error) {
            const errorMsg = `BookRepository.getBooksByAuthorId: ${error}`;
            throw new ApplicationError(errorMsg, 500)
        }
    }
    
    public static async getBookById(bookId: string): Promise<IBook | null> {
        try {
            return await Book.findById(bookId);
        } catch (error) {
            const errorMsg = `BookRepository.getBookById: ${error}`;
            throw new ApplicationError(errorMsg, 500)
        }   
    }

    public static async updateBook(bookId: string, book: IBook) {
        return await Book.findByIdAndUpdate(bookId, book, { new: true });
    }

    public static async deleteBook(bookId: string) {
        await Book.findByIdAndDelete(bookId);
        return
    }
}