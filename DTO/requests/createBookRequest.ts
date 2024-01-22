import { RequestValidationError } from "../../errors/requestValidationError";
import { IUser } from "../../models/user.model";
import { AbstractAplicationRequest } from "./abstractAplicationRequest";


export class CreateBookRequest extends AbstractAplicationRequest {

    public bookName: string;
    public publicationDate: Date;
    public authorId: string;
    public user: IUser

    constructor(bookName: string,  publicationDate: Date, authorId: string, user: IUser) {
        super();
        this.bookName = bookName;
        this.publicationDate = publicationDate;
        this.authorId = authorId;
        this.user = user;
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public validate(): void {
        if (!this.bookName || !this.publicationDate || !this.authorId) {
            const errorMessage = `CreateBoookRequest validation error: ${RequestValidationError.REQUEST_MISSING_REQUIRED_FIELDS}`
            throw new RequestValidationError(errorMessage);
        }
    }
 }