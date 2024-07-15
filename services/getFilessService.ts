import { GeFilesResponse } from "../DTO/responses/getFilesResponse";
import { AbstractAplicationService } from "./abstractAplicationService";
import FilesAdapter from "../adapters/filesAdapter"
import { GeFilesRequest } from "../DTO/requests/getFilesRequest";
import { FileStructure } from "../DTO/interfaces";
import CacheService from "./cacheService"
import {cacheKey} from "../constants"

export class GetFilesService  extends AbstractAplicationService<GeFilesRequest, GeFilesResponse>{
    
    async doHandle(request: GeFilesRequest): Promise<GeFilesResponse> {
       
        const cachedResults: FileStructure | undefined = await CacheService.get(cacheKey) as FileStructure | undefined 
        if (cachedResults) {
            return new GeFilesResponse(cachedResults);
        }
        const files: FileStructure = await FilesAdapter.fetchFiles();
        CacheService.set(cacheKey, files)
        return new GeFilesResponse(files);
    }
}