const Students = require('../models/Students.js')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'loginemail' // not necessary, DEFAULT
	},
		function(email, password, done) {
					Students.findOne({ 'email': email } , (err, studentMatch) => {
						if (err) {
							return done(err)
						}
						if (!studentMatch) {
							return done(null, false, { message: 'Incorrect username' })
						}
						if (!studentMatch.checkPassword(password)) {
							return done(null, false, { message: 'Incorrect password' })
						}
						console.log("The Local strategy - to find the user");
						return done(null, studentMatch)
					})
		}
)

module.exports = strategy