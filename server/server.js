import { fileURLToPath } from "url";
import express from "express";
import path from "path";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import { db } from "./config/connection.js";
import routes from "./routes/index.js";
import batchRoutes from "./routes/batch.js";
import boardRoutes from "./routes/board.js";
import studentRoutes from "./routes/student.js";

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  await db();

  const app = express();
  const isProd = process.env.NODE_ENV === "production";

  // Trust proxy MUST be set BEFORE session middleware so secure cookies
  // work behind Heroku/Render/NGINX.
  app.set("trust proxy", 1);

  app.use(helmet());

  // Body parsers
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // CORS — single mount; fails noisily if origin is missing in prod.
  if (isProd && !process.env.CLIENT_ORIGIN) {
    console.warn("⚠️  CLIENT_ORIGIN is not set — cross-origin SPA calls will fail.");
  }
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || true,
      credentials: true,
    })
  );

  app.use(morgan("dev"));

  // Sessions stored in MongoDB
  app.use(
    session({
      name: "board.sid",
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions",
      }),
      cookie: {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",          // ← fixed: was process.env.isProd
        maxAge: 4 * 60 * 60 * 1000, // 4 hours
      },
    })
  );

  // Rate-limit the actual auth endpoints
  const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Too many attempts. Please try again later." },
  });
  app.use(
    ["/api/board/login", "/api/student/login", "/api/board/new"],
    authLimiter
  );

  // Routes
  app.use(batchRoutes);
  app.use(boardRoutes);
  app.use(studentRoutes);
  app.use(routes);

  // Static SPA in production
  if (isProd) {
    app.use(express.static(path.join(__dirname, "../client/build")));
    app.get("/*", (_req, res) =>
      res.sendFile(path.join(__dirname, "../client/build/index.html"))
    );
  }

  // Centralized error handler — actually sends a response
  app.use((err, req, res, _next) => {
    console.error("====== ERROR =======");
    console.error(err.stack || err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message, details: err.errors });
    }
    res.status(err.status || 500).json({
      error: isProd ? "Internal server error" : err.message || "Server error",
    });
  });

  app.listen(PORT, () => {
    console.log(`🌎  API listening on PORT ${PORT}`);
  });
}

main().catch((err) => {
  console.error("Fatal startup error:", err);
  process.exit(1);
});