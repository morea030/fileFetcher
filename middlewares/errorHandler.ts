import { NextFunction } from "express";
import { ApplicationError } from "../errors/applicationError";
import { Request, Response } from "express";
export class ErrorHandler {
    static handleError(error: Error, request: Request, response:Response, next: NextFunction) {
        console.log('########## ERROR ##########');
        let statusCode = 500;
        let message = error.message || ApplicationError.INTERNAL_SERVER_ERROR;
        if (error instanceof ApplicationError) {
            statusCode = error.statusCode;
        }
        response.status(statusCode).json({
            statusCode: statusCode,
            message: message
        });
    }
}