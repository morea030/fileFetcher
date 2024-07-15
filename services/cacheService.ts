import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

export default class CacheService {

    public static async get (cacheKey: string) {
        if (cache.has(cacheKey)) {
            return await cache.get(cacheKey) 
        }
    }

    public static set(cacheKey: string, data: any): void{
        cache.set(cacheKey, data);
    }
}