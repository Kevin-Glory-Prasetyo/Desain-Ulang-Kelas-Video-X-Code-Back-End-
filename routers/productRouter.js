import express from "express";
import connection from "../database/connection.js"; // ini sudah PromisePool

const router = express.Router();

router.get("/products", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 6;
    let offset = (page - 1) * limit;

    // Hitung total data
    const [countRows] = await connection.query("SELECT COUNT(*) as total FROM course_video");
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // Ambil data dengan limit/offset
    const [rows] = await connection.query(
      `SELECT * FROM course_video ORDER BY tanggal DESC LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    res.json({
      currentPage: page,
      totalPages,
      data: rows,
    });
  } catch (err) {
    console.error("❌ Query error:", err.message);
    res.status(500).json({ message: "Gagal ambil produk", error: err.message });
  }
});

export default router;
