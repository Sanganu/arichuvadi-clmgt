// const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20');

const strategy  = new GoogleStrategy({
	clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
	clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
	callbackURL: '/auth/google/teacher'
},(accessToken,refreshToken,profile,done) =>{
   console.log("passport callback function for google str",profile);
});

module.exports = strategy;


