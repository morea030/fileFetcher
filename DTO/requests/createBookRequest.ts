import { RequestValidationError } from "../../errors/requestValidationError";
import { AbstractAplicationRequest } from "./abstractAplicationRequest";


export class CreateBookRequest extends AbstractAplicationRequest {

    public bookName: string;
    public publicationDate: Date;
    public authorId: string;

    constructor(bookName: string,  publicationDate: Date, authorId: string) {
        super();
        this.bookName = bookName;
        this.publicationDate = publicationDate;
        this.authorId = authorId;
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