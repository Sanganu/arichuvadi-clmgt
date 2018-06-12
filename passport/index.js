 const passport = require('passport')
const LocalStrategy = require('./localstrategy.js')
// const GoogleStratgey = require('./googleStrategy')
const Students = require('../models/Students')

passport.serializeUser((user, done) => {
	console.log('=== serialize ... called ===')
	console.log(user) // the whole raw user object!
	console.log('---------')
	done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
	console.log('DEserialize ... called')
    Students.findOne(
		{ _id: id },
		'firstName lastName photos local.username',
		(err, user) => {
			console.log('======= DESERILAIZE USER CALLED ======')
			console.log(user)
			console.log('--------------')
			done(null, user)
		}
	)
})


passport.use(LocalStrategy)

// passport.use(GoogleStratgey)

module.exports = passport   