const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const passport = require("./passport");
const dbConnection = require('./models')
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const routes = require("./routes");

require('dotenv').config()



// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Middleware - Logger
app.use(morgan('dev'))

// Express session
app.use(
      session({
		secret: process.env.APP_SECRET || 'this is the default passphrase',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false,
		saveUninitialized: false
	})    
)



// Express app & auth routes
app.use(routes);
app.use('/auth',require('./auth'))


// Serve up static assets
app.use(express.static(path.join(__dirname,"client/build")));

// // session and persistent storage  
// const request = require('request-promise');

app.use(session({
      secret: process.env.APP_SECRET || 'The default secret',
      store: new MongoStore({mongooseConnection: dbConnection}),
      resave: false,
      saveUninitialized: false
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());




//Production environment

if (process.env.NODE_ENV === 'production'){
      const path = require('path')
      console.log('Production environment')
      app.use('/static',express.static(path.join(_dirname,'../build/static')))
      app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../build/'))
	})
}



// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// Start the API server 
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
//   yesapp = true;
});


