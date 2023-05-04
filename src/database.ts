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
                console.log("The database's already connected");
                return;
            }

            console.log(`Connection to '${this.databaseName}' database established.`);
            this.isConnected = true;

            return Promise.resolve();
        })
    }

    public async disconnect(): Promise<void> {
        return new Promise((resolve, reject) => {

            if (!this.isConnected){
                console.log("The database's already disconnected");
                return;
            } 

            console.log(`Disonnected from '${this.databaseName}' database.`);
            this.isConnected = false;

            return Promise.resolve();
        })
    }

    public async createCollection(name: string): Promise<void> {
        return new Promise((resolve, reject) => {

            if (!this.isConnected) return reject("Database's disconnect");

            if (this.collections !== undefined)
            {
                if (this.collections.has(name))
                    reject("The Collection already exists");
                else 
                    this.collections.set(name, new Collection());
            }
            else {
                this.collections = new Map();
                this.collections.set(name, new Collection());
            }

            return Promise.resolve();
        })
    }

    public async dropDatabase(): Promise<void> {
        return new Promise((resolve, reject) => {

            if (!this.isConnected) return reject("Database's disconnect");

            return Promise.resolve();
        })
    }

    public async dropCollection(name: string): Promise<void> {
        return new Promise((resolve, reject) => {

            if (!this.isConnected) return reject("Database's disconnect");

            return Promise.resolve();
        })
    }

    public async getCollection(name: string): Promise<Collection> {
        return new Promise((resolve, reject) => {

            if (!this.isConnected) return reject("Database's disconnect");

            return Promise.resolve();
        })
    }

    public async getCollectionNames(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            
            if (!this.isConnected) return reject("Database's disconnect");
        })
    }

    public getName(): string {
        return this.databaseName!;
    }
}