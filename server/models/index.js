/* Mongo Database */
const mongoose = require('mongoose')
require("dotenv").config()
mongoose.Promise = global.Promise

// if (process.env.MONGODB_URI) {
// 	console.log("Using MongoDB URI from environment variables")
// 	mongoose.connect(process.env.MONGODB_URI, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 		useFindAndModify: false,
// 	}, (err) => {
// 		if (err) {
// 			console.log("MongoDB Connection Error : ", err)
// 			return err;
// 		}
// 		console.log("MongoDB connection established", MONGO_URL)
// 	})

// } else {
// 	const MONGO_LOCAL_URL = `mongodb://localhost/arichuvadi`
// 	mongoose.connect(MONGO_LOCAL_URL, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 		useCreateIndex: true,
// 		useFindAndModify: false,
// 	}, (err) => {
// 		if (err) console.log("MongoDB Connection Error : ", err)
// 		console.log("MongoDB connection established", MONGO_URL)
// 	})
// 	MONGO_URL = MONGO_LOCAL_URL
// }

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


export default db;
