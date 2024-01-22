import { AbstractAplicationResponse } from "./abstractapplicationResponse";

export class CreateAuthoresponse extends AbstractAplicationResponse {

    public authorName: string;
    public birthDate?: Date;
    public authorId: string;

    constructor(authorName: string, authorId: string,  birthDate?: Date) {
        super();
        this.authorName = authorName;
        this.birthDate = birthDate;
        this.authorId = authorId;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}