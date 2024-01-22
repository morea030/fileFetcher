import { AbstractAplicationResponse } from "./abstractapplicationResponse";

export class DeleteAuthorResponse extends AbstractAplicationResponse {
    constructor() {
        super();
    }
    toString() {
        return `DeleteAuthorRequest`;
    }
    validate() {
        //noop
    }
}