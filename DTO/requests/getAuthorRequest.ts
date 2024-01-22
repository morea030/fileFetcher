import { RequestValidationError } from "../../errors/requestValidationError";
import { AbstractAplicationRequest } from "./abstractAplicationRequest";

export class GetAuthorRequest extends AbstractAplicationRequest {
    public authorId: string;

    constructor(authorId: string) {
        super();
        this.authorId = authorId;
    }
    toString() {
        return `GetAuthorRequest{authorId=${this.authorId}}`;
    }
    validate() {
        if (!this.authorId) {
            const errorMessage = `GetAuthorRequest validation error: ${RequestValidationError.REQUEST_MISSING_REQUIRED_FIELDS}`;
            throw new RequestValidationError(errorMessage);
        }
    }
}