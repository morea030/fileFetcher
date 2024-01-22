import { IAuthor } from "../../models/author.model";
import { AbstractAplicationResponse } from "./abstractapplicationResponse";

export class GetAllAuthorsResponse extends AbstractAplicationResponse {

    public authors: IAuthor[];

    constructor(autors: IAuthor[]) {
        super();
        this.authors = autors;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}