import mysql2 from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql2.createPool({
  uri: process.env.JAWSDB_URL,
  connectionLimit: 10,
});
export { db };
