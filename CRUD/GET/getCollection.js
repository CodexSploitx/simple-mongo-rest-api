export default async function getCollection(client, db, collection) {
  const database = client.db(db);
  const col = database.collection(collection);
  return await col.find({}).toArray();
}
