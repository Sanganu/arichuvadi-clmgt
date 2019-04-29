const passport = require('passport')
const LocalStrategy = require('./localstrategy.js')
const Students = require('../models/Students')
const Teachers = require("../models/Teachers")

//Set up se  encrypt
passport.serializeUser((user, done) => {
	console.log('======== serialize ... called ============')
	console.log(user) // the whole raw user object!
	console.log('-------------------------------------------------')
	done(null, { user: user });
});

// Decode
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
	else if(user.usertype = "teacher"){
		Teachers.findOne(
			{_id:id},
			(error,user) => {
				console.log("=================DeSerialize Teacher User called==========");
				console.log(user);
				console.log("===========================-");
				done(null,user);
			}
		);
	}

});


passport.use(LocalStrategy)


module.exports = passport   