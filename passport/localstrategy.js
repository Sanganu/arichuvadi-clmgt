
const LocalStrategy = require('passport-local').Strategy
const db = require('../models')

const strategy = new LocalStrategy(
	{
	 	usernameField: 'loginemail',
	 	password: 'passw'
	 },
	{
	 function(username, password, done) {
		console.log("The Local strategy",username,password)
		db.studentdetails
		.findOne({loginemail: req.session.passport.user.email})
		.then((studetails) =>{
			console.log("The details found",studetails);
			if ( studetails.passw === password)
			{
				console.log("Password match");
				return done(studetails);
			}
			else{
				console.log("Passowrd mismatch");
				return done(null, false, {message: "Incorrect password"})
			}
		})
		.catch((err) => {
			console.log("User details does not exist");
			return done(null, false, {message:"User details doesn't exist"})
		})
	}}
		

)
// db.studentdetails.findOne({ loginemail: username  }, (err, userMatch) => {
	// 	console.log("The student records fetched:",userMatch)
	// 	if (err) {
	// 		return done(err)
	// 	}
	// 	if (!userMatch) {
	// 		return done(null, false, { message: 'Incorrect username' })
	// 	}
	// 	if (userMatch.passw != passw) {
	// 		return done(null, false, { message: 'Incorrect password' })
	// 	}
	// 	return done(null, userMatch) 
module.exports = strategy
