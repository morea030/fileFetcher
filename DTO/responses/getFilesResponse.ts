import { FileStructure } from "../interfaces";
import { AbstractAplicationResponse } from "./abstractapplicationResponse";

export class GeFilesResponse extends AbstractAplicationResponse {

    public files: FileStructure;

    constructor(files: FileStructure) {
        super();
        this.files = files;
    }

    public toString(): string {
        return JSON.stringify(this);
    }
}