import { AbstractAplicationRequest } from "./abstractAplicationRequest";
import { RequestValidationError } from "../../errors/requestValidationError";
import { IUser } from "../../models/user.model";

export class DeleteAuthorRequest extends AbstractAplicationRequest {
    public authorId: string;
    public user: IUser;

    constructor(authorId: string, user: IUser) {
        super();
        this.authorId = authorId;
        this.user = user;
    }

    toString() {
        return `DeleteAuthorRequest{bookId=${this.authorId}}`;
    }

    validate() {
        if (!this.authorId) {
            const errorMessage = `DeleteBookRequest validation error: ${RequestValidationError.REQUEST_MISSING_REQUIRED_FIELDS}`;
            throw new RequestValidationError(errorMessage);
        }
    }
}