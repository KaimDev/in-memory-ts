import { Document } from "./document";
import { IDeleteManyResponse } from "./interface/delete-many-response.interface";
import { IDeleteOneResponse } from "./interface/delete-one-response.interface";
import { IInsertManyResponse } from "./interface/insert-many-response.interface";
import { IInsertOneResponse } from "./interface/insert-one-response.interface";
import { IUpdateManyResponse } from "./interface/update-many-response.interface";
import { IUpdateOneResponse } from "./interface/update-one-response.interface";

export class Collection {

    private documents?: Document[];

    public async count(query?: object): Promise<number> {
        return new Promise((resolve, reject) => {
            
            let count: number = 0;

            if (query != undefined && this.documents != undefined) {

                for (const key in query) {

                    for (let document of this.documents) {

                        if ((document as Object).hasOwnProperty(key)) {
                            
                            const valueOfDocumentKey: any = (document as any)[key];
                            const valueOfQueryKey: any = (query as any)[key];

                            if (valueOfDocumentKey === valueOfQueryKey) {
                                count++;
                            }
                        }
                        else {
                            
                            throw new Error("There is no document with that property");
                        }
                    }
                }

                resolve(count);
            }
            else if (this.documents != undefined) {

                count = this.documents.length;

                resolve(count);
            }
            else {

                throw new Error("The collection has not documents");
            }
        })
    }

    public find(query?: object): Promise<object[]> {

        return new Promise((resolve, reject) => {

            if (query != undefined && this.documents != undefined) {
                
                let matches: object[] = [];

                for (const key in query) {

                    for (let document of this.documents) {

                        if ((document as Object).hasOwnProperty(key)) {

                            const valueOfDocumentKey: any = (document as any)[key];
                            const valueOfQueryKey: any = (query as any)[key];

                            if (valueOfDocumentKey === valueOfQueryKey) {
                                matches.push(document);
                            }
                        }
                    }

                }

                resolve(matches);
            }
            else if (this.documents != undefined) {

                resolve(this.documents)
            }
            else {

                throw new Error("The collection has not documents");
            }

        })
    }
    public findOne(query?: object): Promise<object | null> {

        return new Promise((resolve, reject) => {

            if (query != undefined && this.documents != undefined) {

                for (const key in query) {

                    for (let document of this.documents) {

                        if ((document as Object).hasOwnProperty(key)) {

                            const valueOfDocumentKey: any = (document as any)[key];
                            const valueOfQueryKey: any = (query as any)[key];

                            if (valueOfDocumentKey === valueOfQueryKey) {
                                resolve(document);
                            }
                        }
                    }

                }
            }
            else {

                throw new Error("Empty Query");
            }

        })
    }
    public insertOne(query: object): Promise<IInsertOneResponse> {

        return new Promise((resolve, reject) => {

            
        })
    }
    public insertMany(query: object[]): Promise<IInsertManyResponse> {

        return new Promise((resolve, reject) => {

            
        })
    }
    public updateOne(query: object, update: object): Promise<IUpdateOneResponse> {

        return new Promise((resolve, reject) => {

            
        })
    }
    public updateMany(query: object, update: object): Promise<IUpdateManyResponse> {

        return new Promise((resolve, reject) => {

            
        })
    }
    public deleteOne(query: object): Promise<IDeleteOneResponse> {

        return new Promise((resolve, reject) => {

            
        })
    }
    public deleteMany(query: object): Promise<IDeleteManyResponse> {

        return new Promise((resolve, reject) => {

            
        })
    }
}