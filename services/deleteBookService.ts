import { AbstractAplicationService } from "../services/abstractAplicationService";
import  BookRepository  from "../repository/bookRepository";
import { NotFoundErrorError } from "../errors/notFoundError";
import { DeleteBookResponse } from "../DTO/responses/deleteBookResponse";
import { DeleteBookRequest } from "../DTO/requests/deleteBookRequest";

export class DeleteBookService  extends AbstractAplicationService<DeleteBookRequest, DeleteBookResponse>{
     
    async doHandle(request: DeleteBookRequest): Promise<DeleteBookResponse> {
        
        if (request.user.role === "Admin") {
            await BookRepository.deleteBook(request.bookId);

            const response = new DeleteBookResponse();
            return response;
        } 

        const oldBook = await BookRepository.getBookById(request.bookId);

        if(!oldBook) {
            throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.bookId} not found`);
        }
        if (request.user.authorId && oldBook.author.toString() === request.user.authorId) {
           
            await BookRepository.deleteBook(request.bookId);

            const response = new DeleteBookResponse();
            return response;  
        }

        throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.bookId} not found`);
    }
}