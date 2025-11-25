import express from "express";
import db from "../database/connection.js";
import { verifyToken } from "../middleware/verifyToken.js";
import multer from "multer";
import path from "path";
import { uploadBukti } from "../middleware/uploadBukti.js";



const router = express.Router();

// ===========================
// 1. POST /api/transaksi
// ===========================
router.post("/transaksi", verifyToken, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { productId, metodePembayaran, harga } = req.body;

        if (!productId || !metodePembayaran || !harga) {
            return res.status(400).json({
                message: "Data transaksi tidak lengkap"
            });
        }

        // Insert ke tabel pembelian
        const sql = `
            INSERT INTO pembelian (id, user_id, metodepembayaran, status, harga)
            VALUES (?, ?, ?, 'pending', ?)
        `;

        await db.query(sql, [
            productId,
            user_id,
            metodePembayaran,
            harga
        ]);

        res.json({ message: "Transaksi berhasil dibuat" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal membuat transaksi" });
    }
});

// ===========================
// 2. GET /api/histori
// ===========================
router.get("/histori", verifyToken, async (req, res) => {
    try {
        const user_id = req.user.id;

        const sql = `
          SELECT 
              p.idpembelian,
              p.tanggal,
              p.harga,
              p.status,
              p.metodepembayaran,
              p.buktiupload,
              c.namaProduk,
              c.gambarProduk
          FROM pembelian p
          LEFT JOIN course_video c ON c.id = p.id
          WHERE p.user_id = ?
          ORDER BY p.tanggal DESC
        `;

        const [rows] = await db.query(sql, [user_id]);

        res.json(rows);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Gagal mengambil histori transaksi" });
    }
});

// =============== MULTER CONFIG =====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/bukti"); 
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Format file tidak didukung"));
    }
    cb(null, true);
  }
});

// =============== UPLOAD BUKTI =====================
router.post("/upload-bukti/:idpembelian",
  verifyToken,
  uploadBukti.single("bukti"),
  async (req, res) => {

    if (!req.file) {
        return res.status(400).json({ message: "Tidak ada file yang dikirim" });
    }

    const id = req.params.idpembelian;

    await db.query(
        "UPDATE pembelian SET buktiupload = ? WHERE idpembelian = ?",
        [req.file.filename, id]
    );

    res.json({
        success: true,
        message: "Upload bukti berhasil",
        filename: req.file.filename
    });
});



export default router;
