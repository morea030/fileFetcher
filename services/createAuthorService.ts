import { CreateAuthorRequest } from "../DTO/requests/createAuthorRequest";
import { AbstractAplicationService } from "./abstractAplicationService";
import { CreateAuthoresponse } from "../DTO/responses/createAuthorResponse";
import Author from "../models/author.model";
import { AuthorRepository } from "../repository/authorRepository";

export class CreatAuthorService  extends AbstractAplicationService<CreateAuthorRequest, CreateAuthoresponse>{

    async doHandle(request: CreateAuthorRequest): Promise<CreateAuthoresponse> {
        const { authorName, birthDate } = request;
        const author = new Author({ authorName, birthDate });
        const savedAuthor = await AuthorRepository.create(author)//author.save();
        const response = new CreateAuthoresponse(savedAuthor.id, savedAuthor.authorName, savedAuthor.birthDate);
        return response;
    }
}