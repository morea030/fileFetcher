import { Router } from 'express';
import AuthorsController from './controllers/files.controller';
import { Files } from './routes';
import { ErrorHandler } from './middlewares/errorHandler';

const router = Router();



router.get(
    Files, 
    AuthorsController.get, 
    ErrorHandler.handleError
);

export default router;