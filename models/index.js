/* Mongo Database */
const mongoose = require('mongoose')
require("dotenv").config()
mongoose.Promise = global.Promise

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}, (err) => {
		if (err) console.log("MongoDB Connection Error : ", err)
		console.log("MongoDB connection established", MONGO_URL)
	})

} else {
	const MONGO_LOCAL_URL = `mongodb://localhost/arichuvadi`
	mongoose.connect(MONGO_LOCAL_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	}, (err) => {
		if (err) console.log("MongoDB Connection Error : ", err)
		console.log("MongoDB connection established", MONGO_URL)
	})
	MONGO_URL = MONGO_LOCAL_URL
}
