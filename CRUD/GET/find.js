export default async function find(client, db, collection, query = {}, options = {}) {
  const database = client.db(db);
  const result = await database.collection(collection).find(query, options).toArray();

  if (result.length === 0) {
    return { found: false, data: [] };
  }

  return { found: true, data: result };
}
