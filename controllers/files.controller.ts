import { NextFunction, Request, Response, response } from 'express';

import { GeFilesRequest } from '../DTO/requests/getFilesRequest';

import { GetFilesService } from '../services/getFilessService';

export default class FilesController { 
    private static getFiles: GetFilesService = new GetFilesService();
   

    public static async get(req: Request, res: Response, next: NextFunction) {
        const { authorId } = req.params;
        const request: GeFilesRequest  = new GeFilesRequest();
        try {
            const author = await FilesController.getFiles.handle(request);
            res.json(author);
        } catch (error) {
            next(error)
        }
    }

}