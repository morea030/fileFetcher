import { AbstractAplicationResponse } from "./abstractapplicationResponse";

export class CreateBookResponse extends AbstractAplicationResponse {

    public bookId: string;
    public bookName: string;
    public authorName: string;
    public publicationDate: Date;

    constructor(bookId: string, bookName: string, authorName: string, publicationDate: Date) {
        super();
        this.bookId = bookId;
        this.bookName = bookName;
        this.authorName = authorName;
        this.publicationDate = publicationDate;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}