import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Your connection URI with username and password
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('Error: The environment variable MONGODB_URI is not defined.');
  process.exit(1);
}

connect(mongoUri, {
  // Optional: Specify the database to use
})
.then(() => console.log('Successfully connected to MongoDB.'))
.catch(err => console.error('Error connecting to MongoDB:', err));