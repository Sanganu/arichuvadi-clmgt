/* Mongo Database */
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config()
mongoose.set("strictQuery", false);

console.log("MONGODB_URI =", process.env.MONGODB_URI);


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
