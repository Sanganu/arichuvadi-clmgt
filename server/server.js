const express = require("express");
const morgan = require('morgan')
const session = require('express-session')
const db = require('./config/connection.js');

await db();

const passport = require("./passport");

const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const routes = require("./routes");

require('dotenv').config()


// Configure
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Middleware - Logger
app.use(morgan('dev'))


// Express session
app.use(
      session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		maxAge:4*60*60*1000,
	    resave: false,
		saveUninitialized: false,
		useUnifiedTopology: true
	})    
)

// Passport setup
app.use(passport.initialize());
app.use(passport.session());


//Production environment

if (process.env.NODE_ENV === 'production'){
	const path = require('path')
	// console.log('Production environment')
	app.use('/static',express.static(path.join(_dirname,'../build/static')))
	app.get('/', (req, res) => {
	  res.sendFile(path.join(__dirname, '../build/'))
  })
}

 


// Express app & auth routes
app.use('/auth',require('./auth'));
app.use(require("./routes/batch"));
app.use(require("./routes/board"));
app.use(require("./routes/student"));
app.use(routes);

// Serve up static assets

// app.use(express.static(path.join(__dirname,"client/build")));

//  app.use(express.static('Files'));


//Wildcard route to server index.html 

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

 
// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// Start the API server 
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

});


