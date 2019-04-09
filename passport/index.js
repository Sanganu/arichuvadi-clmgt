const passport = require('passport')
const LocalStrategy = require('./localstrategy.js')
//const GoogleStrategy = require('./googleStrategy')
const Students = require('../models/Students')

passport.serializeUser((user, done) => {
	console.log('======== serialize ... called ============')
	console.log(user) // the whole raw user object!
	console.log('-------------------------------------------------')
	done(null, { user: user });
});

passport.deserializeUser((user, done) => {
	console.log('=========Deserialize ... called===========');
	console.log(user);
	const id = user.user.userdata._id;
	if (user.usertype = "student"){
		Students.findOne(
			{ _id: id },
			
			(err, user) => {
				console.log('======= DESERILAIZE USER CALLED ======')
				console.log(user)
				console.log('---------------------------------------------------------')
				done(null, user)
			}
		);
	}

});


passport.use(LocalStrategy)
//passport.use(GoogleStrategy)

module.exports = passport   