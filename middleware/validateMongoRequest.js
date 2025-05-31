export default function validateMongoRequest(req, res, next) {
  const db = req.body?.db || req.params?.db;
  const collection = req.body?.collection || req.params?.collection;

  if (!db || !collection) {
    return res.status(400).json({ error: 'Missing db or collection' });
  }

  next();
}
