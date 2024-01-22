import { Router } from 'express';
import Author from './models/author.model';
import {BooksController} from './controllers/books.controller';
import AuthorsController from './controllers/authors.controller';
import { AUTHORS, BOOKS, BOOKS_ID, AUTHOR } from './routes';
import { ErrorHandler } from './middlewares/errorHandler';
import { body, validationResult } from 'express-validator';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { UserModel } from './models/user.model';
import { requireRole } from './middlewares/authMiddleware';

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello Q!');
});
// Create a new author
router.post(
    AUTHORS, 
    requireRole('Admin'), 
    AuthorsController.create, 
    ErrorHandler.handleError
);

// Get author
router.get(
    AUTHOR, 
    requireRole('Admin' || 'Author'),
    AuthorsController.get, 
    ErrorHandler.handleError
);

// Get all authors
router.get(
    AUTHORS, 
    requireRole('Admin' || 'Author'),
    AuthorsController.getAll, 
    ErrorHandler.handleError
);

// Create a new book
router.post(
    BOOKS,
    requireRole('Admin' || 'Author'),
    BooksController.create, 
    ErrorHandler.handleError
);

// Get all books
router.get(
    BOOKS, 
    requireRole('Admin' || 'Author'),
    BooksController.getAll, 
    ErrorHandler.handleError
);

// Get a book by id
router.get(
    BOOKS_ID,
    requireRole('Admin' || 'Author'),
    BooksController.get, 
    ErrorHandler.handleError
);

// Update a book by id
router.patch(
    BOOKS_ID, 
    requireRole('Admin' || 'Author'), 
    BooksController.update,
    ErrorHandler.handleError
);

// Delete a book by id
router.delete(
    BOOKS_ID, 
    requireRole('Admin' || 'Author'), 
    BooksController.delete,
    ErrorHandler.handleError
);

// Update an author by id
router.patch(
    AUTHORS, 
    requireRole('Admin' || 'Author'), 
    AuthorsController.update,
    ErrorHandler.handleError
);

// Delete an author by id
router.delete(
    AUTHORS, 
    requireRole('Admin' || 'Author'), 
    AuthorsController.delete,
    ErrorHandler.handleError
);

// Registration route
router.post( 
  '/register',
  [
    body('username').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
  ],
 
);

// Login route
router.post('/login', );

export default router;