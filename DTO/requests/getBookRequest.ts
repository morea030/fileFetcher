import { AbstractAplicationRequest } from "../../DTO/requests/abstractAplicationRequest";
import { RequestValidationError } from "../../errors/requestValidationError";

export class GetBookRequest extends AbstractAplicationRequest {
    public bookId: string;

    constructor(bookId: string) {
        super();
        this.bookId = bookId;
    }
    toString() {
        return `GetBookRequest{bookId=${this.bookId}}`;
    }
    validate() {
        if (!this.bookId) {
            const errorMessage = `GetBookRequest validation error: ${RequestValidationError.REQUEST_MISSING_REQUIRED_FIELDS}`;
            throw new RequestValidationError(errorMessage);
        }
    }
}