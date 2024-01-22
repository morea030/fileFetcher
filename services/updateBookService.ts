import { AbstractAplicationService } from "../services/abstractAplicationService";
import { CreateBookResponse } from "../DTO/responses/createBookResponse";
import  BookRepository  from "../repository/bookRepository";
import Book, { IBook } from "../models/book.model";
import { NotFoundErrorError } from "../errors/notFoundError";
import { EditBookRequest } from "../DTO/requests/editBookRequest";
import { IAuthor } from "../models/author.model";
import { AuthorRepository } from "../repository/authorRepository";
import { AuthorInterface } from "../DTO/interfaces";

export class EditBookService  extends AbstractAplicationService<EditBookRequest, CreateBookResponse>{
     
    async doHandle(request: EditBookRequest): Promise<CreateBookResponse> {

        const author: AuthorInterface | null = await AuthorRepository.findById(request.authorId);
        if (!author) { 
            throw new NotFoundErrorError(`getBookService.doHandle Author with id ${request.authorId} not found`);
        }
        const updatedBook: IBook = new Book({
            bookName: request.bookName,
            bookId: request.bookId,
            authorName: request.authorName,
            publicationDate: request.publicationDate,
            author: request.authorId
        })
        if (request.user.role === "Admin") {
            const book: IBook | null = await BookRepository.updateBook(request.bookId, updatedBook);
            if (!book) { 
                throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.bookId} not found`);
            }
            const response = new CreateBookResponse(book.id, book.bookName, book.authorName, book.publicationDate);
            return response;
       
        } 
        const oldBook = await BookRepository.getBookById(request.bookId);
        if(!oldBook) {
            throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.bookId} not found`);
        }
        if (request.user.authorId && oldBook.author.toString() === request.user.authorId) {
           
            const book: IBook | null = await BookRepository.updateBook(request.bookId, updatedBook);
            if (!book) { 
                throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.bookId} not found`);
            }
            const response = new CreateBookResponse(book.id, book.bookName, book.authorName, book.publicationDate);
            return response;
        }

        throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.bookId} not found`);
    }
}