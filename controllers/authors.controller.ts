import { NextFunction, Request, Response, response } from 'express';
import { CreateAuthorRequest } from '../DTO/requests/createAuthorRequest';
import { CreatAuthorService } from '../services/createAuthorService';
import { GetAuthorService } from '../services/getAuthorService';
import { GetAllAuthorsService } from '../services/getAllAuthorsService';
import { GetAllAuthorsRequest } from '../DTO/requests/getAllAuthorsRequest';
import { GetAuthorRequest } from '../DTO/requests/getAuthorRequest';
import { EditAuthorRequest } from '../DTO/requests/editAuthorRequest';
import { IUser } from '../models/user.model';
import { UpdateAuthorService } from '../services/updateAuthorService'
import { DeleteAuthorRequest } from '../DTO/requests/deleteAuthorRequest';
import { DeleteAuthorService } from '../services/deleteAuthorService';
import { DeleteAuthorResponse } from '../DTO/responses/deleteAuthorResponse';

export default class AuthorsController { 
    private static createAuthorService: CreatAuthorService = new CreatAuthorService();
    private static getAuthorService: GetAuthorService = new GetAuthorService();
    private static getAllAuthorsService: GetAllAuthorsService = new GetAllAuthorsService();
    private static updateAuthorService: UpdateAuthorService = new UpdateAuthorService();
    private static deleteAuthorService: DeleteAuthorService = new DeleteAuthorService();

    public static async create(req: Request, res: Response, next: NextFunction) {
        const { authorName, birthDate } = req.body;
        const request: CreateAuthorRequest = new CreateAuthorRequest(authorName, birthDate);
        try {
            const response = await AuthorsController.createAuthorService.handle(request);
            res.json(response);
        } catch (error) {   
            next(error)
        }
    }

    public static async get(req: Request, res: Response, next: NextFunction) {
        const { authorId } = req.params;
        const request: GetAuthorRequest  = new GetAuthorRequest(authorId);
        try {
            const author = await AuthorsController.getAuthorService.handle(request);
            res.json(author);
        } catch (error) {
            next(error)
        }
    }

    public static async getAll(req: Request, res: Response, next: NextFunction) {
        const request: GetAllAuthorsRequest = new GetAllAuthorsRequest();
        try {
            console.log("************")
            const authors = await AuthorsController.getAllAuthorsService.handle(request);
            res.json(authors);
        } catch (error) {
            next(error)
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        const { authorId, authorName, birthDate } = req.body;
        const user: IUser = req.user as IUser;

        const request: EditAuthorRequest = new EditAuthorRequest(authorName, authorId, user ,birthDate);
        try {
            const author = await AuthorsController.updateAuthorService.handle(request);
            res.json(author);
        } catch (error) {
            next(error)
        }
    }

    public static async delete(req: Request, res: Response, next: NextFunction) {
        const { authorId } = req.body;
        const user: IUser = req.user as IUser;

        const request: DeleteAuthorRequest = new DeleteAuthorRequest(authorId, user);
        try {
            await AuthorsController.deleteAuthorService.handle(request);
            const response = new DeleteAuthorResponse();
            res.json(response);
        } catch (error) {
            next(error)
        }
    }
}