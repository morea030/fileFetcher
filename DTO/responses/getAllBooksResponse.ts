import { IBook } from "../../models/book.model";
import { AbstractAplicationResponse } from "./abstractapplicationResponse";

export class GetAllBooksResponse extends AbstractAplicationResponse {

    public books: IBook[];

    constructor(books: IBook[]) {
        super();
        this.books = books;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}