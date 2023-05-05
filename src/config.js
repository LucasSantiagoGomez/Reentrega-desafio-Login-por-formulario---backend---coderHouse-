import dotenv from "dotenv";
dotenv.config();

const config = {
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  SESSION_SECRET: process.env.SESSION_SECRET,
};

export default config;
