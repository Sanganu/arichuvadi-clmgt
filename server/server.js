import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import morgan from 'morgan';
import session from 'express-session';
import { db } from './config/connection.js';
import passport from "./passport/index.js";
import routes from "./routes/index.js";
import auth from "./auth/index.js";
import batchRoutes from "./routes/batch.js";
import boardRoutes from "./routes/board.js";
import studentRoutes from "./routes/student.js";
//import teacherRoutes from "./routes/teacher.js"
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";


await db();


const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
      sameSite: process.env.isProd ? "none" : "lax",
      maxAge: 4 * 60 * 60 * 1000 // 4 hours
    }
  })
);
// Passport setup
app.use(passport.initialize());
app.use(passport.session());

app.set("trust proxy", 1);                // behind Heroku/Render/NGINX
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

// Throttle auth endpoints specifically
app.use("/auth", rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));

// Express app & auth routes
// app.use('/auth',auth);
app.use(batchRoutes);
app.use(boardRoutes);
app.use(studentRoutes);
app.use(routes);
//app.use(teacherRoutes)

//Production environment

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("/*", (_req, res) =>
    res.sendFile(path.join(__dirname, "../client/build/index.html")))
  // app.use('/static',express.static(path.join(_dirname,'../build/static')))
  // app.get('/', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../build/'))
  // })
}






// Serve up static assets

// app.use(express.static(path.join(__dirname,"client/build")));

//  app.use(express.static('Files'));


//Wildcard route to server index.html 

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });


// ====== Error handler ====
app.use(function (err, req, res, next) {
  console.log('====== ERROR =======')
  console.error(err.stack)
  res.status(500)
})

// Start the API server 
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

});


