// middleware/mongoClientMiddleware.js
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGODB_URI;

let client;

export default async function mongoClientMiddleware(req, res, next) {
  try {
    if (!client) {
      client = new MongoClient(mongoUri);
      await client.connect();
      console.log('[MongoDB] Conectado exitosamente');
    }
    req.client = client; // ahora el cliente estará disponible en req
    next();
  } catch (error) {
    console.error('[MongoDB] Error de conexión:', error);
    res.status(500).json({ error: 'Error de conexión a MongoDB' });
  }
}
