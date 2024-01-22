import { AbstractAplicationRequest } from "../../DTO/requests/abstractAplicationRequest";
import { RequestValidationError } from "../../errors/requestValidationError";
import { IUser } from "../../models/user.model";

export class DeleteBookRequest extends AbstractAplicationRequest {
    public bookId: string;
    public user: IUser;

    constructor(bookId: string, user: IUser) {
        super();
        this.bookId = bookId;
        this.user = user;
    }

    toString() {
        return `DeleteBookRequest{bookId=${this.bookId}}`;
    }

    validate() {
        if (!this.bookId) {
            const errorMessage = `DeleteBookRequest validation error: ${RequestValidationError.REQUEST_MISSING_REQUIRED_FIELDS}`;
            throw new RequestValidationError(errorMessage);
        }
    }
}