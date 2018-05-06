
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

const strategy = new LocalStrategy(
	{
		usernameField: 'loginemail', // not necessary, DEFAULT
		password: 'passw'
	},
	function(loginemail, passw, done) {
		db.studentdetails.findOne({ loginemail: loginemail }, (err, userMatch) => {
			if (err) {
				return done(err)
			}
			if (!userMatch) {
				return done(null, false, { message: 'Incorrect username' })
			}
			if (!userMatch.checkPassword(password)) {
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, userMatch)
		})
	}
)

module.exports = strategy
