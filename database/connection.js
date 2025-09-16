import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "course_video"
});

try {
  const conn = await db.getConnection();
  console.log("Koneksi DB berhasil!");
  conn.release();
} catch (err) {
  console.error("Gagal koneksi DB:", err.message);
}

export default db;
