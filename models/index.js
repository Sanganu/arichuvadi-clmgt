/* Mongo Database */
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let MONGO_URL
const MONGO_LOCAL_URL = `mongodb://localhost/arichuvadi`
if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	MONGO_URL = process.env.MONGODB_URI
} else {
	mongoose.connect(MONGO_LOCAL_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	MONGO_URL = MONGO_LOCAL_URL
}

mongoose.connect(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, (err) => {
	if (err) console.log("MongoDB Connection Error : ", err)
	console.log("MongoDB connection established", MONGO_URL)
})



// LINKING TO MLAAB

// let collection;
// const MongoClient = require('mongodb').MongoClient;
// const uri = process.enc.MLABDB;
// const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
// client.connect(err => {
//   collection = client.db("tamil").collection(vaguppu);

//   // perform actions on the collection object
// //   client.close();
// });

// module.exports = client;
