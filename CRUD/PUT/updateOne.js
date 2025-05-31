// CRUD/PUT/updateOne.js
export default async function updateOne(client, db, collection, filter, update, options = {}) {
  const database = client.db(db);
  const result = await database.collection(collection).updateOne(filter, update, options);
  return result; // contiene matchedCount, modifiedCount, etc.
}
