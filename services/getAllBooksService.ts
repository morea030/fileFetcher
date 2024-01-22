import { GetAllBooksRequest } from "../DTO/requests/getAllBooksRequests";
import { GetAllBooksResponse } from "../DTO/responses/getAllBooksResponse";
import { ApplicationError } from "../errors/applicationError";
import { IBook } from "../models/book.model";
import BookRepository from "../repository/bookRepository";
import { AbstractAplicationService } from "./abstractAplicationService";

export class GetAllBooksService  extends AbstractAplicationService<GetAllBooksRequest, GetAllBooksResponse>{
    
    async doHandle(request: GetAllBooksRequest): Promise<GetAllBooksResponse> {
        if (request.user.role === "Admin") {
            try {
                const books: IBook[] = await BookRepository.getAllBooks();
                return new GetAllBooksResponse(books);
            } catch (error) {
                throw new ApplicationError("GetAllBooksService.doHandle: " + error, 500);
            }
        }
        else {
            try {
                const books: IBook[] = await BookRepository.getBooksByAuthorId(request.user.id);
                return new GetAllBooksResponse(books);
            } catch (error) {
                throw new ApplicationError("GetAllBooksService.doHandle: " + error, 500);
            }
        }    
    }

}