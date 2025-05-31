// Elimina un documento que cumpla con la condición del query
export default async function deleteOne(client, db, collection, query = {}) {
  const database = client.db(db);
  const result = await database.collection(collection).deleteOne(query);
  return result;
}
