import { IUser } from "../../models/user.model";
import { AbstractAplicationRequest } from "./abstractAplicationRequest";

export class GetAllBooksRequest extends AbstractAplicationRequest {
    public user: IUser;
    constructor(user: IUser) {
        super();
        this.user = user;
    }
    toString() {
        return `GetAllBooskRequest`;
    }
    validate() {
        //noop
    }
}