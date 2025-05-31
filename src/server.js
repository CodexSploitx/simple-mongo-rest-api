import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// import middleware's
import validateMongoRequest from '../middleware/validateMongoRequest.js';
import mongoClientMiddleware from '../middleware/mongoClientMiddleware.js';
import methodNotAllowed from '../middleware/methodNotAllowed.js';
import authToken from '../middleware/authToken.js'; // Token authentication middleware


// Importa los módulos CRUD
import find from '../CRUD/GET/find.js';
import findOne from '../CRUD/GET/findOne.js';
import insertOne from '../CRUD/POST/insertOne.js';
import updateOne from '../CRUD/PUT/updateOne.js';
import deleteOne from '../CRUD/DELETE/deleteOne.js';
import getCollection from '../CRUD/GET/getCollection.js';



dotenv.config();

const app = express();
app.use(mongoClientMiddleware);
app.use(authToken); // Middleware para autenticar el token

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Error: La variable de entorno MONGODB_URI no está definida.');
  process.exit(1);
}

app.use(express.json());

let client;



app.get('/api/:db/:collection', async (req, res) => {
  try {
    const { db, collection } = req.params;
    const docs = await getCollection(req.client, db, collection);
    res.json({ success: true, result: docs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});




// Ruta POST /api/find con body: {db, collection, query}
app.post('/api/find', validateMongoRequest, async (req, res) => {
  try {
    const { db, collection, query, options } = req.body;
    const response = await find(client, db, collection, query, options);

    if (!response.found) {
      return res.status(404).json({ success: false, message: 'No documents found' });
    }

    res.json({ success: true, result: response.data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// Manage other methods
app.all('/api/find', methodNotAllowed);


app.post('/api/findOne', validateMongoRequest, async (req, res) => {
  try {
    const { db, collection, query, options } = req.body;
    const result = await findOne(client, db, collection, query, options);

    if (!result) {
      return res.status(404).json({ success: false, message: 'Document not found' });
    }

    res.json({ success: true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// Manage other methods
app.all('/api/findOne', methodNotAllowed);


app.post('/api/insertOne', validateMongoRequest, async (req, res) => {
  try {
    const { db, collection, document } = req.body;

    if (!document || typeof document !== 'object') {
      return res.status(400).json({ success: false, error: 'Missing or invalid document in request body' });
    }

    const result = await insertOne(client, db, collection, document);

    res.json({ success: true, inserted: document });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// Manage other methods
app.all('/api/insertOne', methodNotAllowed);


app.put('/api/updateOne', validateMongoRequest, async (req, res) => {
  try {
    const { db, collection, filter, update, options = {} } = req.body;

    if (!filter || !update) {
      return res.status(400).json({ success: false, error: 'Missing filter or update in request body' });
    }

    const result = await updateOne(client, db, collection, filter, update, options);

    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, message: 'No documents matched the filter' });
    }

    // Obtener el documento actualizado después de la actualización
    const updatedDoc = await findOne(client, db, collection, filter, options);

    res.json({
      success: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
      updated: updatedDoc,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});
// Manage other methods
app.all('/api/updateOne', methodNotAllowed);



app.delete('/api/delete', validateMongoRequest, async (req, res) => {
  try {
    const { db, collection, query = {} } = req.body;
    const result = await deleteOne(req.client, db, collection, query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'No se encontró ningún documento para eliminar' });
    }

    // Buscar el documento antes de eliminarlo
    const deletedDoc = await findOne(req.client, db, collection, query);
    res.json({ success: true, deletedCount: result.deletedCount, deleted: deletedDoc });
  } catch (err) {
    console.error('[DELETE] Error:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});
// Manage other methods
app.all('/api/delete', methodNotAllowed);





async function startServer() {
  try {
    client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Conectado a MongoDB');

    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Error al conectar a MongoDB', err);
    process.exit(1);
  }
}


startServer();
