import { ApplicationError } from "./applicationError";

export class NotFoundErrorError extends ApplicationError {

    public static RESOURCE_NOT_FOUND = 'REQUEST MISSING RQUIRED FIELDS';

    constructor(message: string = NotFoundErrorError.RESOURCE_NOT_FOUND, statusCode: number = 404) {
        super(message, statusCode);
        this.name = 'NotFoundError';
    }
}