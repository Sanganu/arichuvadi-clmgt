const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const app = express();
const PORT = process.env.PORT || 8000;
const path = require("path");
const sec = require("./OAuth");
const passport = require("passport");
// Loading environment variables
require('dotenv').config()

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Middleware - Logger
app.use(morgan('dev'))

// Serve up static assets
app.use(express.static(path.join(__dirname,"client/build")));

// Passport - setup 
const request = require('request-promise');
const session = require('express-session');
app.use(session({
      secret: process.env.APP_SECRET || 'The default secret',
      store: new MongoStore({mongooseConnection: dbConnection}),
      resave: false,
      saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session();
) 
// Routes
const routes = require("./routes");
app.use(routes);

// Set up promises
mongoose.Promise = Promise;

if(process.env.MONGODB_URI) {
      mongoose.connect(process.env.MONGODB_URI);
}
else {
      mongoose.connect("mongodb://localhost/gkedutrack1");
      console.log("mongodb connected")
}


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
//   yesapp = true;
});

// Instead of having seperate file






// app.post('/api/others/student/login',passport.authenticate('local',{
//       failureRedirect: 'res.json({err:"Invalid Credentials})',
//       successRedirect: 'res.json({studentrecord:studentrecord,classes:classdetails})'
//     }));




//OAuth Variables
// const FACEBOOK_APP_ID = '';
// const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || sec;


// app.post('/api/others/student/login',passport.authenticate('local',{
//      failureRedirect: '/api/student/login/failure',
//      successRedirect: '/api/student/details'
// }));


// passport.use(new FacebookStratergy({
//       clientID: FACEBOOK_APP_ID,
//       clientSecret : FACEBOOK_APP_SECRET,
//       callbackURL: `http://localhost:${PORT}/auth/facebook/done`
// },
// function(acessToken,refreshToken,profile,done){
//   console.log(`${profile.displayName} has logged in`);
//   console.log(`accessToken=${accessToken}`);
//   console.log(`refreshToken=${refreshToken}`);
//   console.log(`profile=${profile}`);
//   profile.accessToken = accessToken;
//   done(null,profile);
// }));
// passport.serializeUser(function(user,done) {
//   done(null,user);
// });

// passport.deserializeUser(function(user,done) {
//   done(null,user);
// });

// app.use(session({
//   secret: 'arbitary string',
//   resave:false,
//   saveUninitialized: false
// }));


// app.use(passport.initialize());
// app.use(passport.session());

// app.get("/",(req,res) => {
//   let body = '<h1>OAuth Lecture Homepage</h1>';
//   body += '<a href="/auth/facebook">Click to login</a>';
//   res.send(body);
// });

// app.get(
//     '/auth/facebook',
//     passport.authenticate('facebook'));

// app.get('/private',(req,res) => {
//   res.send('<h1>Private Page</h1>');
// })    ;

// // Route alias to FB login route (unnecessary, just an example)
// app.get('/login', (req, res) => res.redirect('/auth/facebook'));

// // Log out (destroy session)
// app.get('/logout', (req, res) => {
// 	req.logout();
// 	res.redirect('/');
// });

// // Login redirect URL
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'user_photos' }));

// // OAuth callback URL
// app.get('/auth/facebook/done', passport.authenticate('facebook', {
// 	successRedirect: '/private',
// 	failureRedirect: '/'
// }));

// // Authenticated page
// app.get('/private', isLoggedIn(), (req, res) => {
// 	request.get({
// 		url: `https://graph.facebook.com/me?access_token=${req.user.accessToken}`
// 	})
// 		.then((data) => {
// 			console.log(JSON.stringify(JSON.parse(data),null,2));
// 			res.send(`Hello ${req.user.displayName}!`);
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 			res.sendStatus(500);
// 		});
// });





// // Check if logged in
// function isLoggedIn() {
// 	return function (req, res, next) {
// 		if (req.isAuthenticated()) {
// 			return next();
// 		}
// 		// res.redirect('/auth/facebook');
// 		res.sendStatus(401);
// 	};
// }

