import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

mongoose.set("strictQuery", false);

console.log('MONGODB_URI =', process.env.MONGODB_URI ? '(set)' : 'undefined');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialmedia';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//Since using free render version and free Mongodb Atlas - 
//want to implement a solution to avoid timeout errors

const isRetryableError = (error) => {
  if (error.name === 'MongoParseError') return false;
  if (error.code === 18 || /bad auth/i.test(error.message)) return false;
  if (error.name === 'MongooseServerSelectionError') return true;
  if (error.name === 'MongoNetworkError') return true;
  return false;
};


const connectWithRetry = async (maxAttempts = 5) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await mongoose.connect(MONGO_URI, {
        serverSelectionTimeoutMS: 15000, // give Atlas time to wake up/respond
      });
      console.log('Database connected.');
      return mongoose.connection;
    } catch (error) {
      console.error(
        `Database connection attempt ${attempt}/${maxAttempts} failed [${error.name}]: ${error.message}`
      );

      if (!isRetryableError(error)) {
        console.error('This does not look like a transient/timeout error — not retrying.');
        throw error;
      }

      if (attempt === maxAttempts) {
        throw new Error('Database connection failed after multiple attempts (timeout/network).');
      }

      const delay = Math.min(2000 * attempt, 15000); // 2s, 4s, 6s... capped at 15s
      console.log(`Retrying in ${delay / 1000}s...`);
      await wait(delay);
    }
  }
};


mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error (will keep retrying in background):', err.message);
});
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Attempting to reconnect...');
});
mongoose.connection.on('reconnected', () => {
  console.log('MongoDB reconnected.');
});

const db = () => connectWithRetry();

const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log("Database disconnected.");
};

export{db,disconnectDB};