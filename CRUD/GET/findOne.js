// CRUD/GET/findOne.js
export default async function findOne(client, db, collection, query = {}, options = {}) {
  const database = client.db(db);
  const result = await database.collection(collection).findOne(query, options);
  return result;  // puede ser null si no encontró nada
}
