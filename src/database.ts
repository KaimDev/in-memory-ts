import { Collection } from "./collection";

export class Database {

    private collections?: Map<string, Collection>;
    private isConnected?: boolean;
    private databaseName?: string;

    public constructor(databaseName: string) {
        this.databaseName = databaseName;
    }

    public async connect(): Promise<void> {
        return new Promise((resolve, reject) => {

            if (this.isConnected){
                throw new Error("The database is already connected");
            }

            console.log(`Connection to '${this.databaseName}' database established.`);
            this.isConnected = true;

            resolve();
        })
    }

    public async disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {

            if (!this.isConnected) {
                throw new Error("The database is already disconnected");
            } 

            console.log(`Disonnected from '${this.databaseName}' database.`);
            this.isConnected = false;

            resolve();
        })
    }

    public async createCollection(name: string): Promise<void> {
        return new Promise((resolve, reject) => {

            if (!this.isConnected) throw new Error("Database is disconnect");

            if (this.collections !== undefined) {

                if (this.collections.has(name))
                    throw new Error("The Collection already exists");
                else 
                    this.collections.set(name, new Collection());

                resolve();
            }
            else {
                this.collections = new Map();
                this.collections.set(name, new Collection());
                resolve();
            }
        })
    }

    public async dropDatabase(): Promise<void> {
        return new Promise(() => {

            if (!this.isConnected) throw new Error("Database is disconnect");

            if (this.collections !== undefined) {
                this.collections = undefined;
            }
            else {
                throw new Error("Database does not exist");
            }

            Promise.resolve();
        })
    }

    public async dropCollection(name: string): Promise<void> {
        return new Promise((resolve) => {

            if (!this.isConnected) throw new Error("Database is disconnect");

            if (this.collections !== undefined)
            {
                this.collections.delete(name);
                console.log(`${name} is droped`);
                resolve();
            }
            else {
                throw new Error("There are not collections");
            }
        })
    }

    public async getCollection(name: string): Promise<Collection> {
        return new Promise((resolve) => {

            if (!this.isConnected) throw new Error("Database is disconnect");

            if (this.collections !== undefined) {
                const collection: Collection | undefined = this.collections.get(name);

                if (collection !== undefined) {
                    resolve(collection);
                }
                else {
                    throw new Error("The collection does not exist");
                }
            }
            else {
                throw new Error("There are not collections");
            }
        })
    }

    public async getCollectionNames(): Promise<string[]> {
        return new Promise((resolve) => {
            
            if (!this.isConnected) throw new Error("Database is disconnect");

            if (this.collections !== undefined) {

                let keys_array: string[] = [];

                for (const key of this.collections.keys()) {
                    keys_array.push(key);
                }

                resolve(keys_array);
            }
            else {
                throw new Error("There are not collections")
            }
        })
    }

    public getName(): string {
        return this.databaseName!;
    }
}