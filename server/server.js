import  express from "express";
import path from "path";
import morgan from 'morgan';
import session from 'express-session';
import {db} from './config/connection.js';
import passport from "./passport/index.js";
import routes from "./routes/index.js";
import auth from "./auth/index.js";
import batchRoutes from "./routes/batch.js";
import boardRoutes from "./routes/board.js";
import studentRoutes from "./routes/student.js";
//import teacherRoutes from "./routes/teacher.js"
import MongoStore from "connect-mongo";



await db();


const app = express();
const PORT = process.env.PORT || 5000;



// Configure
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Middleware - Logger
app.use(morgan('dev'))


// Express session

app.use(
  session({
    name: "board.sid",
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions"
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 4 * 60 * 60 * 1000 // 4 hours
    }
  })
);
// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// Express app & auth routes
app.use('/auth',auth);
app.use(batchRoutes);
app.use(boardRoutes);
app.use(studentRoutes);
app.use(routes);
//app.use(teacherRoutes)

//Production environment

if (process.env.NODE_ENV === 'production'){
	const path = require('path')
	// console.log('Production environment')
	app.use('/static',express.static(path.join(_dirname,'../build/static')))
	app.get('/', (req, res) => {
	  res.sendFile(path.join(__dirname, '../build/'))
  })
}

 




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


