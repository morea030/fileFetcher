import express from 'express';
import router from './router';
import { logger } from 'express-winston';
import { ErrorHandler } from './middlewares/errorHandler';
import FilesAdapter from "./adapters/filesAdapter"
import CacheService from './services/cacheService';
import {cacheKey} from "./constants"

  
const winston = require('winston');

const loggr = winston.createLogger({
    level: 'info', // Set the log level as needed
    format: winston.format.combine(
        winston.format.colorize(), // Add colorization to the console output
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }: { timestamp: string, level: string, message: string }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(), // Log to the console
        new winston.transports.File({ filename: 'error.log', level: 'error' }) // Log errors to a file
    ]
});

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(logger({ winstonInstance: loggr }));
app.use(express.json());

app.use('/', router);

app.use(ErrorHandler.handleError);
app.listen(port, () => console.log(`Server running on port ${port}`));

// Init Cache 
const resultsToStash = FilesAdapter.fetchFiles();
CacheService.set(cacheKey, resultsToStash)