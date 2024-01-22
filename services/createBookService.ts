import { AbstractAplicationService } from "./abstractAplicationService";
import { CreateBookRequest } from "../DTO/requests/createBookRequest";
import { CreateBookResponse } from "../DTO/responses/createBookResponse";
import  Book, {IBook}  from "../models/book.model";
import  Author, { IAuthor } from "../models/author.model";
import { AuthorRepository } from "../repository/authorRepository";
import { ArgumentError } from "../errors/argumentError";
import { AuthorInterface } from "../DTO/interfaces";
import BookRepository  from "../repository/bookRepository";

export class CreateBookService  extends AbstractAplicationService<CreateBookRequest, CreateBookResponse>{
     
    async doHandle(request: CreateBookRequest): Promise<CreateBookResponse> {
        const { bookName, publicationDate, authorId } = request;

        const author: AuthorInterface | null = await AuthorRepository.findById(authorId);

        if (!author) {
          const errorMessage = `Author not found. Creating author ${authorId}`;
          throw new ArgumentError(errorMessage, 404);
        }
        
        const book: IBook = new Book({
          bookName,
          authorName: author.authorName,
          publicationDate,
          author: author.id,
        });

        const savedBook = await BookRepository.create(book);
        const response = new CreateBookResponse(savedBook.id, savedBook.bookName, savedBook.authorName, savedBook.publicationDate);
        return response;
    }
}