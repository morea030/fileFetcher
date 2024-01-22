import { Request, Response, NextFunction } from 'express';
import {BooksController} from '../controllers/books.controller';
import { CreateBookRequest } from '../DTO/requests/createBookRequest';
import { GetBookRequest } from '../DTO/requests/getBookRequest';
import { GetAllBooksRequest } from '../DTO/requests/getAllBooksRequests';
import { IUser } from '../models/user.model';

jest.mock('../services/createBookService');
jest.mock('../services/getBookService');
jest.mock('../services/getAllBooksService');

describe('BooksController', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

  beforeEach(() => {
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });

  it('should create a book', async () => {
    const bookName = 'Test Book';
    const publicationDate = new Date();
    const authorId = '123';
    req.body = { bookName, publicationDate, authorId };
    await BooksController.create(req, res, next);

    expect(BooksController.createBookService.handle).toHaveBeenCalledWith(new CreateBookRequest(bookName, publicationDate, authorId));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should get a book', async () => {
    const bookId = '123';
    req.params = {bookId}
    await BooksController.get(req, res, next);

    expect(BooksController.getBookService.handle).toHaveBeenCalledWith(new GetBookRequest(bookId));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('should get all books', async () => {
    const user: IUser = { id: '123', username: 'Test User', role: 'Admin', password: '123' } as IUser;
    req.user = user
    await BooksController.getAll(req, res, next);

    expect(BooksController.getAllBooksService.handle).toHaveBeenCalledWith(new GetAllBooksRequest(user));
    expect(res.json).toHaveBeenCalled();
  });
});