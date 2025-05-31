// CRUD/POST/insertOne.js
export default async function insertOne(client, db, collection, document) {
  const database = client.db(db);
  const result = await database.collection(collection).insertOne(document);
  return result;  // contiene el resultado de la operación, ej: insertedId
}
