import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); 

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME
});

try {
  const conn = await db.getConnection();
  console.log("Koneksi DB berhasil!");
  conn.release();
} catch (err) {
  console.error("Gagal koneksi DB:", err.message);
}

export default db;
