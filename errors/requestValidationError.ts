import { ApplicationError } from "./applicationError";

export class RequestValidationError extends ApplicationError {

    public static INVALID_REQUEST = 'INVALID REQUEST';
    public static REQUEST_MISSING_REQUIRED_FIELDS = 'REQUEST MISSING RQUIRED FIELDS';

    constructor(message: string = RequestValidationError.INVALID_REQUEST, statusCode: number = 400) {
        super(message, statusCode);
        this.name = 'RequestValidationError';
    }
}