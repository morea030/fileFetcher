
import { AbstractAplicationService } from "../services/abstractAplicationService";
import { NotFoundErrorError } from "../errors/notFoundError";
import { IAuthor } from "../models/author.model";
import { AuthorRepository } from "../repository/authorRepository";
import { GetAllAuthorsRequest } from "../DTO/requests/getAllAuthorsRequest";
import { GetAllAuthorsResponse } from "../DTO/responses/getAllAuthorsResponse";

export class GetAllAuthorsService  extends AbstractAplicationService<GetAllAuthorsRequest, GetAllAuthorsResponse>{
     
    async doHandle(request: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse> {
        const author: IAuthor[] | null = await AuthorRepository.findAll();
        if (!author) { 
            throw new NotFoundErrorError(`GetAuthorService.doHandle authors not found`);
        }
        const response = new GetAllAuthorsResponse(author);
        return response;
    }
}