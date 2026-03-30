/* Mongo Database */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Dev script runs with cwd = server/; .env lives at repo root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.set("strictQuery", false);

console.log('MONGODB_URI =', process.env.MONGODB_URI ? '(set)' : 'undefined');


const db = async () => {
     try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia');
        console.log('Database connected.');
        return mongoose.connection;
    } catch(error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
}

const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("Database disconnected.");
};

export{db,disconnectDB};
