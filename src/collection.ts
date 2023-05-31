import { v4 } from "uuid";

import { Document } from "./document";
import { IDeleteManyResponse } from "./interface/delete-many-response.interface";
import { IDeleteOneResponse } from "./interface/delete-one-response.interface";
import { IInsertManyResponse } from "./interface/insert-many-response.interface";
import { IInsertOneResponse } from "./interface/insert-one-response.interface";
import { IUpdateManyResponse } from "./interface/update-many-response.interface";
import { IUpdateOneResponse } from "./interface/update-one-response.interface";

export class Collection {
  private documents: Document[] = [];

  public async count(query?: object): Promise<number> {
    return new Promise((resolve, reject) => {
      let count: number = 0;

      if (query && this.documents) {
        for (const key in query) {
          for (let document of this.documents) {
            if (key in document) {
              const valueOfDocumentKey: any = (document as Record<string, any>)[key];
              const valueOfQueryKey: any = (query as Record<string, any>)[key];

              if (valueOfDocumentKey === valueOfQueryKey)
                count++;
              
            } else {
              throw new Error("There is no document with that property");
            }
          }
        }

        resolve(count);
      } else if (this.documents) {
        count = this.documents.length;

        resolve(count);
      } else {
        throw new Error("The collection has not documents");
      }
    });
  }

  public async find(query?: object): Promise<object[]> {
    return new Promise((resolve, reject) => {
      if (query && this.documents) {
        let matches: object[] = [];

        for (const key in query) {
          for (let document of this.documents) {
            if (key in document) {
              const valueOfDocumentKey: any = (document as Record<string, any>)[key];
              const valueOfQueryKey: any = (query as Record<string, any>)[key];

              if (valueOfDocumentKey === valueOfQueryKey) {
                matches.push(document);
              }
            }
          }
        }

        resolve(matches);
      } else if (this.documents) {
        resolve(this.documents);
      } else {
        throw new Error("The collection has not documents");
      }
    });
  }

  public async findOne(query?: object): Promise<object | null> {
    return new Promise((resolve, reject) => {
      let matchFound = false;

      if (query && this.documents) {
        for (const key in query) {
          for (let document of this.documents) {
            if (key in document) {
              const valueOfDocumentKey: any = (document as Record<string, any>)[key];
              const valueOfQueryKey: any = (query as Record<string, any>)[key];
              
              if (valueOfDocumentKey === valueOfQueryKey) {
                resolve(document);
                break;
              }
            }
          }

          if (matchFound) {
            break;
          }
        }

      } else {
        throw new Error("Empty Query");
      }
      resolve(null);
    });
  }

  public async insertOne(query: object): Promise<IInsertOneResponse> {
    return new Promise((resolve, reject) => {
      if (query) {
        let document: Document = new Document();
        document._id = v4();
        Object.assign(document, query);
        this.documents.push(document);

        resolve({ success: true, insertedId: document._id! });
      } else {
        throw new Error("Invalid query");
      }
    });
  }

  public async insertMany(query: object[]): Promise<IInsertManyResponse> {
    return new Promise((resolve, reject) => {
      let id_collection: string[] = [];

      if (query) {
        query.forEach((queryItem: Object) => {
          let document: Document = new Document();
          document._id = v4();
          id_collection.push(document._id!);
          Object.assign(document, queryItem);
          this.documents!.push(document);
        });
      } else {
        throw new Error("Invalid queries");
      }

      const response: IInsertManyResponse = {
        success: true,
        insertedIds: id_collection,
      };

      resolve(response);
    });
  }

  public async updateOne(
    query: object,
    update: object
  ): Promise<IUpdateOneResponse> {
    return new Promise(async (resolve, reject) => {
      let document: Record<string, any> | null = await this.findOne(query);
      const update_map: Record<string, any> = update;

      if (document && update_map["$set"] !== null) {
        for (const key in update_map["$set"]) {
          document[key] = update_map["$set"][key];
        }

        resolve({
          success: true,
          modifiedCount: Object.keys(update).length,
          upsertedCount: 0,
          upsertedId: document._id,
          matchedCount: 1,
        });
      } else {
        throw new Error("Document not found");
      }
    });
  }

  public async updateMany(
    query: object,
    update: object
  ): Promise<IUpdateManyResponse> {
    return new Promise(async (resolve, reject) => {
      let documents: object[] | null = await this.find(query);
      const update_map: Record<string, any> = update;

      let modifiedCount: number = 0;
      let upsertedCount: number = 0;
      let matchedCount: number = 0;

      if (documents && update_map["$set"]) {
        documents.filter((doc) => {
          for (const key in update_map["$set"]) {
            if (key in doc) {
              const value_doc: any = (doc as Record<string, any>)[key];
              const value_update: any = update_map["$set"][key];

              if (value_doc !== value_update)
              {
                (doc as Record<string, any>)[key] = update_map["$set"][key];
                modifiedCount++;
              }
              matchedCount++;
            }
          }
        });

        if (matchedCount === 0) {
          let new_query: object = query;
          Object.assign(new_query, (update as any)['$set']);
          await this.insertOne(new_query);
          upsertedCount++;
        }

        resolve({
          success: true,
          modifiedCount: modifiedCount,
          upsertedCount: upsertedCount,
          matchedCount: matchedCount  
        })
      } else {
        reject({
          success: false,
          modifiedCount: 0,
          upsertedCount: 0,
          matchedCount: 0
        })
      }
    });
  }

  public async deleteOne(query: object): Promise<IDeleteOneResponse> {
    return new Promise((resolve, reject) => {
      let success: boolean = false;

      this.documents = this.documents!.filter((document) => {
        if (!success) {
          for (const [key, value] of Object.entries(query)) {
            if (key in document && (document as Record<string, any>)[key] === value) {
              success = true;
              return false;
            }
          }
        }
        return true;
      });
      
      if (success)
        resolve({ success: success, deletedCount: 1 });
      else
        reject({ success: success, deletedCount: 0 });
    });
  }

  public async deleteMany(query: object): Promise<IDeleteManyResponse> {
    return new Promise((resolve, reject) => {
      let success: boolean = false;
      let deletedCount: number = 0;

      this.documents = this.documents!.filter((document) => {
        for (const [key, value] of Object.entries(query)) {
          if (key in document && (document as Record<string, any>)[key] === value) {
            success = true;
            deletedCount++;
            return false;
          }
          return true;
        }
      });
      
      if (success)
        resolve({ success: success, deletedCount: deletedCount });
      else
        reject({ success: success, deletedCount: 0 });
    });
  }
}
