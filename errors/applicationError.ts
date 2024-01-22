export class ApplicationError extends Error {

    public static INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR';

    public statusCode: number;

    constructor(message: string = ApplicationError.INTERNAL_SERVER_ERROR, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApplicationError';
    }
}