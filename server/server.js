import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import morgan from 'morgan';
import session from 'express-session';
import { db } from './config/connection.js';
import routes from "./routes/index.js";
import batchRoutes from "./routes/batch.js";
import boardRoutes from "./routes/board.js";
import studentRoutes from "./routes/student.js";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cors from "cors";
import rateLimit from 'express-rate-limit';

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
async function main() {
  await db();
  const app = express();
  app.set("trust proxy", 1);                // behind Heroku/Render/NGINX
  app.use(helmet());

  // Configure
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());


  //Client in production
  if (process.env.NODE_ENV === "production" && !process.env.CLIENT_ORIGIN) {
    console.warn("Client is not set; cross-origin SPA(React) calls will fail.");
  }
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || true,
      credentials: true,
    })
  );

  //Middleware - Logger
  app.use(morgan('dev'))


  // Express session
  const isProd = process.env.NODE_ENV === "production";
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

  app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

  app.use(batchRoutes);
  app.use(boardRoutes);
  app.use(studentRoutes);
  app.use(routes);

  //Production environment

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../client/build")))

    app.get("/*", (_req, res) =>
      res.sendFile(path.join(__dirname, "../client/build/index.html")))
  }

  // ====== Error
  app.use(function (err, req, res, next) {
    console.log('====== ERROR =======')
    console.error(err.stack)
    res.status(500)
  })

  // Start the API server 
  app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);

  });

}

main().catch((err) => {
  console.error("Error starting API server", err);
  process.exit(1)
})
