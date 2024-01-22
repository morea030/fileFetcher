import { RequestValidationError } from "../../errors/requestValidationError";
import { IUser } from "../../models/user.model";
import { AbstractAplicationRequest } from "./abstractAplicationRequest";

export class EditAuthorRequest extends AbstractAplicationRequest {
    public authorName: string;
    public birthDate?: Date;
    public authorId: string;
    public user: IUser;


    constructor(authorName: string, authorId: string, user: IUser, birthDate?: Date) {
        super();
        this.authorName = authorName;
        this.birthDate = birthDate;
        this.authorId = authorId;
        this.user = user;

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