import { AbstractAplicationRequest } from "../../DTO/requests/abstractAplicationRequest";
import { RequestValidationError } from "../../errors/requestValidationError";
import { IUser } from "../../models/user.model";

export class EditBookRequest extends AbstractAplicationRequest {
    public bookId: string;
    public bookName: string;
    public publicationDate: Date;
    public authorName: string;
    public authorId: string;
    public user: IUser;

    constructor(bookId: string, user: IUser, bookName: string, publicationDate: Date, authorId: string, authorName: string) {
        super();
        this.bookId = bookId;
        this.user = user;
        this.bookName = bookName;
        this.publicationDate = publicationDate;
        this.authorId = authorId;
        this.authorName = authorName;
    }

    toString() {
        return `EditBookRequest{bookId=${this.bookId}}`;
    }

    validate() {
        if (!this.bookId) {
            const errorMessage = `EditBookRequest validation error: ${RequestValidationError.REQUEST_MISSING_REQUIRED_FIELDS}`;
            throw new RequestValidationError(errorMessage);
        }
    }
}