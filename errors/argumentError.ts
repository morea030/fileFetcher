import { ApplicationError } from "./applicationError";

export class ArgumentError extends ApplicationError {

    public static INVALID_ARGUMENT = 'INVALID ARGUMENT';

    constructor(message: string = ArgumentError.INVALID_ARGUMENT, statusCode: number = 400) {
        super(message, statusCode);
        this.name = 'ArgumentError';
    }
}