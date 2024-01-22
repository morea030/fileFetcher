import { AbstractAplicationService } from "./abstractAplicationService";
import { CreateAuthoresponse } from "../DTO/responses/createAuthorResponse";
import { AuthorRepository } from "../repository/authorRepository";
import { EditAuthorRequest } from "../DTO/requests/editAuthorRequest";
import { AuthorInterface } from "../DTO/interfaces";
import { ApplicationError } from "../errors/applicationError";
import { NotFoundErrorError } from "../errors/notFoundError";

export class UpdateAuthorService  extends AbstractAplicationService<EditAuthorRequest, CreateAuthoresponse>{

    async doHandle(request: EditAuthorRequest): Promise<CreateAuthoresponse> {
        const { authorName, birthDate, authorId } = request;
        if (request.user.role === "Admin") {
            const author: AuthorInterface = {id:authorId, authorName, birthDate };
            const savedAuthor = await AuthorRepository.update(authorId, author);
            if (!savedAuthor) {
                throw new ApplicationError(`UpdateAuthorService.handle ${authorId}`, 500);
            }
            const response = new CreateAuthoresponse(savedAuthor.id, savedAuthor.authorName, savedAuthor.birthDate);
            return response;
        }
        const oldAuthor = await AuthorRepository.findById(authorId);
        if (!oldAuthor) {
            throw new NotFoundErrorError(`UpdateAuthorService.handle ${authorId}`, 400);
        }
        if (request.user.authorId && oldAuthor.id === request.user.authorId) {
            const author: AuthorInterface = {id:authorId, authorName, birthDate };
            const savedAuthor = await AuthorRepository.update(authorId, author);
            if (!savedAuthor) {
                throw new ApplicationError(`UpdateAuthorService.handle ${authorId}`, 500);
            }
            const response = new CreateAuthoresponse(savedAuthor.id, savedAuthor.authorName, savedAuthor.birthDate);
            return response;
        }
        throw new NotFoundErrorError(`UpdateAuthorService.handle ${authorId}`, 400);
    }
}