import axios from 'axios';
import {FileStructure} from "../DTO/interfaces"
import { ApplicationError } from '../errors/applicationError';
import { API_URL } from '../constants';

interface data {
    fileUrl: string
}

export default class FilesAdapter {

    

    public static async fetchFiles (): Promise<FileStructure> {
        try{
            console.log('Data fetching sstarted')
            const response = await axios.get(API_URL);
            return FilesAdapter.transformData(response.data.items)
        }
        catch {
            throw new ApplicationError('bad data returned from files API', 500)
        }
    }

    private static transformData = (data: data[]): FileStructure => {
        const result: FileStructure = {};
      
        for (const dataUrl of data){
            const url = dataUrl.fileUrl;
            let urlObj;
            let parts;
            try{
                urlObj = new URL(url);
                parts = urlObj.pathname.split('/').filter(Boolean)
            }
            catch {
                continue
            }
            
            if (!parts[parts.length - 1].includes(".")){
                continue
            }
            const ipAddress = urlObj.hostname;
            const fileName = parts.pop();
            const directories = parts.slice(1);
            if (!result[ipAddress]) result[ipAddress] = [];
            let currentLevel = result[ipAddress];
            directories.forEach((dir, index) => {
                let dirObj = currentLevel.find((obj: any) => obj[dir]);
                if (!dirObj) {
                    dirObj = { [dir]: index === directories.length - 1 ? [] : [{}] };
                    currentLevel.push(dirObj);
                }
                if ( typeof dirObj === "string" ){
                    currentLevel = [dirObj]
                } else {
                    currentLevel = dirObj[dir];
                }
               
            });
            currentLevel.push(fileName);
        };
        console.log('Returning results ')
        return result;
      };

}