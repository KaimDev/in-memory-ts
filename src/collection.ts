import { Document } from "./document";
  

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
                            
                            reject("There is no document with that property");
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

                reject("The collection has not documents");
            }
        })
    }

    public find(query?: object): Promise<object[]> {

        return new Promise((resolve, reject) => {

            
        })
    }
    public findOne(query?: object): Promise<object | null> {

        return new Promise((resolve, reject) => {

            
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