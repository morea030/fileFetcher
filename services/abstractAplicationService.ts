import { AbstractAplicationRequest } from "../DTO/requests/abstractAplicationRequest";
import { AbstractAplicationResponse } from "../DTO/responses/abstractapplicationResponse";
import { Logging } from "../logging"

export abstract class AbstractAplicationService<Q extends AbstractAplicationRequest, S extends AbstractAplicationResponse> {
    public async handle(request: Q): Promise<S> {
        console.info(request.toString());
        request.validate();
        const response = await this.doHandle(request);
        return response
    }

    protected abstract doHandle(request: Q): Promise<S>;
}