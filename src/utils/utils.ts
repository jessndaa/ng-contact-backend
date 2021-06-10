import * as express from 'express';
export class Utility {
    public static asQuerry(query: any): boolean{
        let asQuerry =  false;
        for (const key in query) {
            if (query.hasOwnProperty(key)) { 
                asQuerry = true;
            }
        }
        return asQuerry;
    }
    public static getBearerToken(req: express.Request): string | undefined {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            return req.headers.authorization.split(' ')[1];
        return undefined;
    }
    public static getObjectAttributeNumber(object: any){
        let inc = 0;
        for (const key in object) {
            if (object.hasOwnProperty(key)) {
                inc++;
            }
        }
        return inc;
    }

    public static generateRandomNumber(limit: number){
        return Math.floor(Math.random()*limit)
    }
}