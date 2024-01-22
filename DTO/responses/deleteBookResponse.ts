import { AbstractAplicationRequest } from "../requests/abstractAplicationRequest";

export class DeleteBookResponse extends AbstractAplicationRequest {
    constructor() {
        super();
    }
    toString() {
        return `DeleteBookRequest`;
    }
    validate() {
        //noop
    }
}