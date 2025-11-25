import db from '../database/connection.js';

// 1. Simpan Transaksi Baru
export const createTransaksi = (req, res) => {
    const { productId, harga, metodePembayaran } = req.body;
    const userId = req.user.id; 
    const status = "Menunggu Pembayaran"; 

    const query = `INSERT INTO pembelian (id, user_id, metodepembayaran, status, harga, tanggal) VALUES (?, ?, ?, ?, ?, NOW())`;

    db.query(query, [productId, userId, metodePembayaran, status, harga], (err, result) => {
        if (err) {
            console.error("Error SQL Insert:", err);
            return res.status(500).json({ message: "Gagal menyimpan transaksi database" });
        }
        // Kirim respon JSON sederhana agar mudah dibaca frontend
        res.status(200).json({ 
            success: true,
            message: "Transaksi berhasil dibuat", 
            idpembelian: result.insertId 
        });
    });
};

// 2. Ambil Data Histori (FIX: Menggunakan LEFT JOIN)
export const getHistori = (req, res) => {
    const userId = req.user.id;

    console.log("Mengambil histori untuk User ID:", userId);

    // PENTING: Gunakan LEFT JOIN.
    // Jika produk (c.namaProduk) tidak ditemukan, data transaksi (p.*) tetap akan muncul.
    const query = `
        SELECT 
            p.idpembelian, 
            p.tanggal, 
            p.harga, 
            p.status, 
            p.metodepembayaran, 
            p.buktiupload,
            p.id AS id_produk_asal, -- Debugging ID produk
            c.namaProduk, 
            c.gambarProduk 
        FROM pembelian p 
        LEFT JOIN course_video c ON p.id = c.id 
        WHERE p.user_id = ? 
        ORDER BY p.tanggal DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error SQL Select:", err);
            return res.status(500).json({ message: "Gagal mengambil data histori" });
        }
        console.log(`Ditemukan ${results.length} data untuk user ${userId}`);
        res.status(200).json(results);
    });
};