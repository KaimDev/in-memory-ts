import { Database } from "./database";

async function main () {
    try {

        const db = new Database("people");
        await db.connect();
        
        await db.createCollection("users");
        const users = await db.getCollection("users");
        console.log(users);
        // const count = await users.count();


        // await users.insertOne({ name: "Jeremy", lastname: "Fonseca", company: "Gotlim" });
        // await users.insertOne({ name: "Kenneth", lastname: "Lola", company: "Gotlim" });
        // await users.insertOne({ name: "Johan", company: "Google" });
        // await users.insertOne({ name: "Mynor", company: "Google" });

        // const gotlimWorkers = await users.find({ company: "Gotlim" });

    /* ... */

        await db.disconnect();


    } catch (error) {
        console.error(error);
    }
}

main();