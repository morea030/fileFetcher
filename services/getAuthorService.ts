
import { AbstractAplicationService } from "../services/abstractAplicationService";
import { NotFoundErrorError } from "../errors/notFoundError";
import { GetAuthorRequest } from "../DTO/requests/getAuthorRequest";
import { CreateAuthoresponse } from "../DTO/responses/createAuthorResponse";
import { IAuthor } from "../models/author.model";
import { AuthorRepository } from "../repository/authorRepository";
import { AuthorInterface } from "../DTO/interfaces";

export class GetAuthorService  extends AbstractAplicationService<GetAuthorRequest, CreateAuthoresponse>{
     
    async doHandle(request: GetAuthorRequest): Promise<CreateAuthoresponse> {
        const author: AuthorInterface | null = await AuthorRepository.findById(request.authorId);
        if (!author) { 
            throw new NotFoundErrorError(`GetAuthorService.doHandle Author with id ${request.authorId} not found`);
        }
        const response = new CreateAuthoresponse(author.id,  author.authorName, author.birthDate);
        return response;
    }
}