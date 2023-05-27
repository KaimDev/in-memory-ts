import { v4 as uuidv4, v4 } from 'uuid';

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

            if (query && this.documents) {

                for (const key in query) {

                    for (let document of this.documents) {

                        if (document.hasOwnProperty(key)) {
                            
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
            else if (this.documents) {

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

            if (query && this.documents) {
                
                let matches: object[] = [];

                for (const key in query) {

                    for (let document of this.documents) {

                        if (document.hasOwnProperty(key)) {

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
            else if (this.documents) {

                resolve(this.documents)
            }
            else {

                throw new Error("The collection has not documents");
            }

        })
    }

    public findOne(query?: object): Promise<object | null> {

        return new Promise((resolve, reject) => {

            if (query && this.documents) {

                for (const key in query) {

                    for (let document of this.documents) {

                        if (document.hasOwnProperty(key)) {

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

            if (query) {
                let document: Document = new Document()
                document._id = v4();
                Object.setPrototypeOf(document, query)
                this.documents!.push(document);

                resolve({ success: true, insertedId: document._id });
            }
            else {
                throw new Error("Invalid query");
            }
        })
    }

    public insertMany(query: object[]): Promise<IInsertManyResponse> {
        return new Promise((resolve, reject) => {
            let id_collection: string[] = [];

            if (query) {
                query.forEach((queryItem: Object) => {
                    let document: Document = new Document();
                    document._id = v4();
                    id_collection.push(document._id);
                    Object.setPrototypeOf(document, queryItem);
                    this.documents!.push(document);
                })
            }
            else {
                throw new Error("Invalid queries")
            }

            const response: IInsertManyResponse = {
                success: true,
                insertedIds: id_collection
            }

            resolve(response);
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