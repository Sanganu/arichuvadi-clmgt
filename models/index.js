
 /* Mongo Database
*/
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
let MONGO_URL = `mongodb+srv://cluster0.yooti.mongodb.net/tamil?retryWrites=true&w=majority, { user: process.env.${process.env.MLAB_USER}, pass: ${process.env.MLAB_PASSWORD}, useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify : false,useCreateIndex : true  }`
const MONGO_LOCAL_URL = `mongodb+srv://arichuvadi:cluster0.yooti.mongodb.net/${process.env.MLAB_database}?retryWrites=true&w=majority`


// mongoose.connect(MONGO_LOCAL_URL)

mongoose.connect(MONGO_URL)

const db = mongoose.connection
db.on('error', err => {
	console.log(`There was an error connecting to the database: ${err}`)
})
db.once('open', () => {
	console.log(
		`You have successfully connected to your mongo database: ${MONGO_LOCAL_URL}`
	)
})

module.exports = db
