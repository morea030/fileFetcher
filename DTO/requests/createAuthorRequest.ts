import { AbstractAplicationRequest } from "../../DTO/requests/abstractAplicationRequest";
import { RequestValidationError } from "../../errors/requestValidationError";

export class CreateAuthorRequest extends AbstractAplicationRequest {
    public authorName: string;
    public birthDate?: Date;

    constructor(authorName: string, birthDate?: Date) {
        super();
        this.authorName = authorName;
        this.birthDate = birthDate;
    }

    public toString(): string {
        return JSON.stringify(this);
    }

    public validate(): void {
        if (!this.authorName) {
            const errorMessage = `CreateAuthorsRequest validation error: ${RequestValidationError.REQUEST_MISSING_REQUIRED_FIELDS}`
            throw new RequestValidationError(errorMessage);
        }
    }
}