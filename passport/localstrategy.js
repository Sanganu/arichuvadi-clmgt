
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

const strategy = new LocalStrategy(
	// {
	// 	usernameField: 'loginemail', // not necessary, DEFAULT
	// 	password: 'passw'
	// },
	{
	console.log("Local strategy",req.body)
	function(loginemail, passw, done) {
		console.log("The Local strategy",loginemail,passw)
		db.studentdetails.findOne({ loginemail: loginemail }, (err, userMatch) => {
			console.log("The student records fetched:",userMatch)
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (userMatch.passw != passw) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch) 
		})
	}}
)

module.exports = strategy
