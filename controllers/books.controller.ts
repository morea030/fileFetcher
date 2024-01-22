
import { NextFunction, Request, Response, response } from "express";
import { CreateBookService } from "../services/createBookService";
import { CreateBookRequest } from "../DTO/requests/createBookRequest";
import { GetBookRequest } from "../DTO/requests/getBookRequest";
import { CreateBookResponse } from "../DTO/responses/createBookResponse";
import { GetBookService } from "../services/getBookService";
import { GetAllBooksService } from "../services/getAllBooksService";
import { GetAllBooksRequest } from "../DTO/requests/getAllBooksRequests";
import { IUser } from "../models/user.model";
import { EditBookRequest } from "../DTO/requests/editBookRequest";
import { EditBookService } from "../services/updateBookService";
import { DeleteBookRequest } from "../DTO/requests/deleteBookRequest";
import { DeleteBookService } from "../services/deleteBookService";
import { DeleteBookResponse } from "../DTO/responses/deleteBookResponse";

export class BooksController {
    public static createBookService: CreateBookService = new CreateBookService();
    public static getBookService: GetBookService = new GetBookService();
    public static getAllBooksService: GetAllBooksService = new GetAllBooksService();
    public static updateBookService: EditBookService = new EditBookService();
    public static deleteBookService: DeleteBookService = new DeleteBookService();

    public static async create (req: Request, res: Response, next: NextFunction){
        const { bookName, authorId, publicationDate } = req.body;
        const user: IUser = req.user as IUser;
        const request: CreateBookRequest = new CreateBookRequest(bookName, publicationDate, authorId, user);
        try {   
            const response: CreateBookResponse = await BooksController.createBookService.handle(request)
            res.status(200).json(response);
        } catch (error) {   
            next(error)
        }
    }

    public static async get (req: Request, res: Response, next: NextFunction){
        const { bookId } = req.params;
        const request: GetBookRequest = new GetBookRequest(bookId);
        try {       
            const response: CreateBookResponse = await BooksController.getBookService.handle(request)
            res.status(200).json(response);
        } catch (error) {       
            next(error);
        }
    }

    public static async getAll (req: Request, res: Response, next: NextFunction){
        const user: IUser = req.user as IUser;
        const request: GetAllBooksRequest = new GetAllBooksRequest(user);
        console.log("BooksController.getAll: " + req.user);
        try {   
            const books = await BooksController.getAllBooksService.handle(request) ;
            res.json(books);
        } catch (error) {   
            next(error)
        }
    }

    public static async update (req: Request, res: Response, next: NextFunction){
        const {bookId, bookName, authorId, publicationDate, authorName } = req.body;

        const user: IUser = req.user as IUser;
        const request: EditBookRequest = new EditBookRequest(bookId, user, bookName, publicationDate, authorId, authorName);
        try {       
            const response: CreateBookResponse = await BooksController.updateBookService.handle(request)
            res.status(200).json(response);
        } catch (error) {       
            next(error);
        }
    }

    public static async delete (req: Request, res: Response, next: NextFunction){
        const { bookId } = req.params;
        const user: IUser = req.user as IUser;
        const request: DeleteBookRequest = new DeleteBookRequest(bookId, user);
        try {       
            const response: DeleteBookResponse = await BooksController.deleteBookService.handle(request)
            res.status(200).json(response);
        } catch (error) {       
            next(error);
        }
    }
}