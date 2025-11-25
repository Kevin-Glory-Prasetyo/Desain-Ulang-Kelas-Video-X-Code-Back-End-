import express from "express";
import multer from "multer";
import path from "path";
import db from "../database/connection.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// lokasi folder upload
const uploadFolder = "uploads/bukti";

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ============= API UPLOAD BUKTI =============
router.post("/upload-bukti/:id", verifyToken, upload.single("bukti"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "File tidak ditemukan" });
    }

    const idpembelian = req.params.id;
    const namaFile = req.file.filename;

    const sql = `
      UPDATE pembelian 
      SET buktiupload = ?
      WHERE idpembelian = ?
    `;

    await db.query(sql, [namaFile, idpembelian]);

    return res.json({
      success: true,
      file: namaFile,
      message: "Upload berhasil"
    });

  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ success: false, message: "Gagal upload bukti" });
  }
});

export default router;
