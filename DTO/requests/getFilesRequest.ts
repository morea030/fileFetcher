import { AbstractAplicationRequest } from "./abstractAplicationRequest";

export class GeFilesRequest extends AbstractAplicationRequest {

    constructor() {
        super();
       
    }
    toString() {
        return `GeFilesRequest`;
    }
    validate() {
        //noop
        return true
    }
}