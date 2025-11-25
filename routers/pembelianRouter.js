import express from "express";
import db from "../database/connection.js";
import { verifyToken } from "../middleware/verifyToken.js";

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

export default router;
