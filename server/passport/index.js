const passport = require('passport')
const LocalStrategy = require('./localstrategy.js')
const Students = require('../models/Students')
const Board = require("../models/Management")

//Setup   encrypt
passport.serializeUser((user, done) => {
	console.log('======== serialize ... called ============')
	// console.log("The USer DATa Serialized",user) // the whole raw user object!
	// console.log('-------------------------------------------------')
	done(null, { user: user });
});

// Decode
passport.deserializeUser((user, done) => {
	console.log('=========Deserialize USER DATA called===========');
	console.log("USER",user,"Usertype",user.user.usertype);
	const id = user.user.userdata._id;
	if (user.user.usertype === "student"){
		Students.findOne(
			{ _id: id},
			(err, user) => {
				console.log('======= DESERILAIZE STUDENT USER CALLED ======')
				// console.log(user)
				// console.log('---------------------------------------------------------')
				done(null, user)
			}
		);
	}
	else if(user.user.usertype === "management"){
		Board.findOne(
			{_id:id},
			(error,user) => {
				console.log("=================DeSerialize Teacher User called==========");
				// console.log(user);
				// console.log("===========================-");
				done(null,user);
			}
		);
	}

});


passport.use(LocalStrategy)


module.exports = passport   