import "dotenv/config";
const required = ["MONGODB_URI", "APP_SECRET"];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error(`❌ Missing env vars: ${missing.join(", ")}`);
  process.exit(1);
}
export const env = {
  port: Number(process.env.PORT) || 5000,
  mongoUri: process.env.MONGODB_URI,
  appSecret: process.env.APP_SECRET,
  isProd: process.env.NODE_ENV === "production",
};      