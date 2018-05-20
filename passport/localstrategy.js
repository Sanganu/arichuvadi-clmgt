const Students = require('../models/Students.js')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'loginemail' // not necessary, DEFAULT
	},
		function(loginemail, password, done) {
					Students.findOne({ 'loginemail': loginemail } , (err, studentMatch) => {
						console.log("The Local strategy - to find the user",studentMatch);
						if (err) {
							return done(err)
						}
						if (!studentMatch) {
							return done(null, false, { message: 'Incorrect Email' })
						}
						if (!studentMatch.checkPassword(password)) {
							return done(null, false, { message: 'Incorrect password' })
						}
						return done(null, studentMatch)
					})
		}
)

module.exports = strategy