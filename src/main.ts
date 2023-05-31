import { Database } from "./database";

async function main() {
  try {
    const db = new Database("people");
    await db.connect();

    await db.createCollection("users");
    const users = await db.getCollection("users");

    await users.insertOne({ name: "Jeremy", lastname: "Fonseca", company: "Gotlim" });
    await users.insertOne({ name: "Kenneth", lastname: "Lola", company: "Gotlim" });
    await users.insertOne({ name: "Johan", company: "Google" });
    await users.insertOne({ name: "Mynor", company: "Google" });

    const count = await users.count();
    console.log(`-Number of documents in the database: ${count}`);

    const documents: object[] = await users.find();

    console.log("-Documents Found:");
    documents.forEach((worker) => {
        console.log(worker);
    })

    const updateManyResponse = await users.updateMany({company: "Facebook"}, { $set: {company: "Amazon"} });
    console.log(updateManyResponse);

    const amazonWorkers: object[] = await users.find({company: "Amazon"});

    console.log("-Amazon Workers");
    amazonWorkers.forEach((worker) => {
        console.log(worker);
    })

    await users.deleteOne({company: "Amazon"});

    console.log(await users.find());

    await db.dropCollection("users");

    await db.disconnect();
  } catch (error) {
    console.error(error);
  }
}

main();
