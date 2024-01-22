import { AbstractAplicationService } from "../services/abstractAplicationService";
import  BookRepository  from "../repository/bookRepository";
import  { IBook } from "../models/book.model";
import { NotFoundErrorError } from "../errors/notFoundError";
import { AuthorRepository } from "../repository/authorRepository";
import { AuthorInterface } from "../DTO/interfaces";
import { DeleteBookResponse } from "../DTO/responses/deleteBookResponse";
import { DeleteAuthorRequest } from "../DTO/requests/deleteAuthorRequest";
import { DeleteAuthorResponse } from "../DTO/responses/deleteAuthorResponse";

export class DeleteAuthorService  extends AbstractAplicationService<DeleteAuthorRequest, DeleteAuthorResponse>{
     
    async doHandle(request: DeleteAuthorRequest): Promise<DeleteBookResponse> {

        const author: AuthorInterface | null = await AuthorRepository.findById(request.authorId);
        if (!author) { 
            throw new NotFoundErrorError(`getBookService.doHandle Author with id ${request.authorId} not found`);
        }
        if (request.user.role === "Admin") {

            this.deleteAuthor(author);
    
            const response = new DeleteBookResponse();
            return response;
        } 

        if (request.authorId  === request.user.authorId) {
           
            this.deleteAuthor(author);

            const response = new DeleteBookResponse();
            return response;  
        }

        throw new NotFoundErrorError(`getBookService.doHandle Book with id ${request.authorId} not found`);
    }

    private async deleteAuthor(author: AuthorInterface): Promise<void> {
        const books: IBook[] = await BookRepository.getBooksByAuthorId(author.id);
        const promises: Promise<void>[] = [];
        books.forEach(book => {
            promises.push(BookRepository.deleteBook(book.id));
        });
        await Promise.all(promises);
        await AuthorRepository.delete(author.id);
    }    
}