import { RequestValidationError } from "../../errors/requestValidationError";
import { AbstractAplicationRequest } from "./abstractAplicationRequest";

export class GetAllAuthorsRequest extends AbstractAplicationRequest {

    constructor() {
        super();
       
    }
    toString() {
        return `GetAllAuthorsRequest`;
    }
    validate() {
        //noop
        return true
    }
}