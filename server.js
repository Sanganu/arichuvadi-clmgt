const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static(path.join(__dirname,"client/build")));
// Add routes, both API and view
app.use(routes);
// Set up promises
mongoose.Promise = Promise;

if(process.env.MONGODB_URI) {
      mongoose.connect(process.env.MONGODB_URI, {
        useMongoClient: true
      });
}
else {
      mongoose.connect("mongodb://localhost/gkedutrack1", {
        useMongoClient: true
      });
      console.log("mongoose connected")
}


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  yesapp = true;
});

/*
//The whole Login Stratergy
const passport = require("passport");
const facebookstrategy = require('passport-facebook').Strategy;
const request = require('request');
const session = require('express-session');
//FB app
const FACEBOOK_APP_ID = "",
const FACEBOOK_APP_SECRET = "",

passport.use(new facebookstrategy({
      clientID: FACEBOOK_APP_ID,
      clientSecret : FACEBOOK_APP_SECRET,
      callbackURL: `http://localhost:${PORT}/auth/facebook/done`
},
function(acessToken,refreshToken,profile,done){
  console.log(`${profile.displayName} has logged in`);
  console.log(`accessToken=${accessToken}`);
  console.log(`refreshToken=${refreshToken}`);
  console.log(`profile=${profile}`);
  profile.accessToken = accessToken;
  done(null,profile);
}));

passport.serializeUser(function(user,done) {
  done(null,user);
});

passport.deserializeUser(function(user,done) {
  done(null,user);
});

app.use(session({
  secret: 'arbitary string',
  resave:false,
  saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());

app.get("/",(req,res) => {
  let body = '<h1>OAuth Lecture Homepage</h1>';
  body += '<a href="/auth/facebook">Click to login</a>';
  res.send(body);
});

app.get(
    '/auth/facebook',
    passport.authenticate('facebook'));

app.get('/private',(req,res) => {
  res.send('<h1>Private Page</h1>');
})    ;

// Route alias to FB login route (unnecessary, just an example)
app.get('/login', (req, res) => res.redirect('/auth/facebook'));

// Log out (destroy session)
app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

// Login redirect URL
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'user_photos' }));

// OAuth callback URL
app.get('/auth/facebook/done', passport.authenticate('facebook', {
	successRedirect: '/private',
	failureRedirect: '/'
}));

// Authenticated page
app.get('/private', isLoggedIn(), (req, res) => {
	request.get({
		url: `https://graph.facebook.com/me?access_token=${req.user.accessToken}`
	})
		.then((data) => {
			console.log(JSON.stringify(JSON.parse(data),null,2));
			res.send(`Hello ${req.user.displayName}!`);
		})
		.catch((err) => {
			console.log(err);
			res.sendStatus(500);
		});
});





// Check if logged in
function isLoggedIn() {
	return function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		// res.redirect('/auth/facebook');
		res.sendStatus(401);
	};
}
*/
