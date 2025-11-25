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


// Endpoint untuk ambil detail produk berdasarkan ID
router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: "Missing product id" });
  }

  try {
    const [rows] = await connection.query(
      `SELECT id, gambarProduk, harga, namaProduk, jumlahmateri, durasimateri, deskripsi
       FROM course_video WHERE id = ? LIMIT 1`,
      [id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    const product = rows[0];

    // Normalisasi path gambar supaya front-end langsung bisa pakai
    // - Jika DB menyimpan path relatif seperti 'uploads/img/xxx' atau 'image/xxx', tetap gunakan.
    // - Jika DB menyimpan hanya nama file, kita asumsi berada di /uploads/img/
    let gambarUrl = product.gambarProduk || "";
    if (!gambarUrl) {
      gambarUrl = "/image/produk.jpg"; // fallback image
    } else {
      // jika hanya nama file tanpa slash, tambahkan prefix uploads/img
      if (!gambarUrl.includes("/") && !gambarUrl.startsWith("http")) {
        gambarUrl = `/uploads/img/${gambarUrl}`;
      }
      // jika path relatif tanpa leading slash, tambahkan leading slash supaya consistent
      if (!gambarUrl.startsWith("/") && !gambarUrl.startsWith("http")) {
        gambarUrl = `/${gambarUrl}`;
      }
    }

    // Kirim object produk + gambarUrl
    res.json({
      id: product.id,
      namaProduk: product.namaProduk,
      harga: product.harga,
      jumlahmateri: product.jumlahmateri,
      durasimateri: product.durasimateri,
      deskripsi: product.deskripsi,
      gambarProduk: product.gambarProduk,
      gambarUrl,
    });
  } catch (err) {
    console.error("❌ Query error (detail):", err.message);
    res.status(500).json({ message: "Gagal ambil detail produk", error: err.message });
  }
});

export default router;
