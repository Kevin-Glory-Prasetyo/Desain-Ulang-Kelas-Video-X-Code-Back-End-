import db from "../database/connection.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// 1. Simpan Transaksi Baru
export const createTransaksi = (req, res) => {
  const { productId, harga, metodePembayaran } = req.body;
  const userId = req.user.id;
  const status = "Menunggu Pembayaran";

  const query = `INSERT INTO pembelian (id, user_id, metodepembayaran, status, harga, tanggal) VALUES (?, ?, ?, ?, ?, NOW())`;

  db.query(
    query,
    [productId, userId, metodePembayaran, status, harga],
    (err, result) => {
      if (err) {
        console.error("Error SQL Insert:", err);
        return res
          .status(500)
          .json({ message: "Gagal menyimpan transaksi database" });
      }
      // Kirim respon JSON sederhana agar mudah dibaca frontend
      res.status(200).json({
        success: true,
        message: "Transaksi berhasil dibuat",
        idpembelian: result.insertId,
      });
    }
  );
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

export const dataPembelian = async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM pembelian INNER JOIN user ON pembelian.user_id = user.user_id INNER JOIN course_video ON pembelian.id = course_video.id;"
  );

  if (rows.length > 0) {
    return res.status(200).json({
      statusCode: 200,
      status: "Success",
      error: false,
      rows,
    });
  } else {
    return res.status(404).json({
      statusCode: 404,
      status: "Fail",
      error: true,
    });
  }
};

export const download = async (req, res) => {
  const { user_id, product_id } = req.body;

  const [pembelian] = await db.query(
    "SELECT * FROM pembelian WHERE user_id = ? AND id = ? ORDER BY tanggal DESC LIMIT 1",
    [user_id, product_id]
  );

  if (!pembelian[0]) {
    return res.status(403).json({ message: "Akses ditolak" });
  }

  const [product] = await db.query("SELECT * FROM course_video WHERE id = ?", [
    product_id,
  ]);

  if (!product[0]) {
    return res.status(404).json({ message: "Produk tidak ditemukan" });
  }

  return res.json({ nameProduk: product[0].namaProduk });
};

export const file = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const nama = req.query.nama;
  const filePath = path.join(
    __dirname,
    "..",
    "uploads",
    "video",
    nama + ".mp4"
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File tidak ditemukan", filePath });
  }

  res.download(filePath, nama + ".mp4", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Gagal download file");
    }
  });
};

export const getBukti = async (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const nama = req.query.nama;
  if (!nama) {
    return res.status(400).json({ message: "Nama file tidak disertakan" });
  }

  const filePath = path.join(__dirname, "..", "uploads", "bukti", nama);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File tidak ditemukan" });
  }

  res.sendFile(filePath);
};

export const approve = async (req, res) => {
  const { id } = req.params;

  try {
    await db.query(
      "UPDATE pembelian SET status = 'disetujui' WHERE idpembelian = ?",
      [id]
    );

    res.json({
      message: "Status pembelian berhasil diupdate menjadi disetujui",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};
