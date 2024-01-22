
import { AbstractAplicationService } from "../services/abstractAplicationService";
import { GetBookRequest } from "../DTO/requests/getBookRequest";
import { CreateBookResponse } from "../DTO/responses/createBookResponse";
import  BookRepository  from "../repository/bookRepository";
import { IBook } from "../models/book.model";
import { NotFoundErrorError } from "../errors/notFoundError";

export class GetBookService  extends AbstractAplicationService<GetBookRequest, CreateBookResponse>{
     
    async doHandle(request: GetBookRequest): Promise<CreateBookResponse> {
        const book: IBook | null = await BookRepository.getBookById(request.bookId);
        if (!book) { 
            throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.bookId} not found`);
        }
        const response = new CreateBookResponse(book.id, book.bookName, book.authorName, book.publicationDate);
        return response;
    }
}