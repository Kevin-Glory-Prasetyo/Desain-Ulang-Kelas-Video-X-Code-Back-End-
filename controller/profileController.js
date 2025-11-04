import db from "../database/connection.js";
import multer from "multer";
import path from "path";

// ---------- Konfigurasi Upload ----------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/img/"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ---------- GET PROFILE ----------
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // dari verifyToken (JWT)
    const [rows] = await db.query(
      "SELECT user_id, user_first_name, user_last_name, user_email, user_phone, user_image FROM user WHERE user_id = ?",
      [userId]
    );

    if (!rows.length)
      return res.status(404).json({ message: "User tidak ditemukan" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil data profil" });
  }
};

// ---------- UPDATE PROFILE ----------
export const updateProfile = [
  upload.single("user_image"),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const { user_first_name, user_last_name, user_phone, new_password } =
        req.body;
      const user_image = req.file ? `/uploads/img/${req.file.filename}` : null;

      // Query dasar
      let sql =
        "UPDATE user SET user_first_name=?, user_last_name=?, user_phone=?";
      const params = [user_first_name, user_last_name, user_phone];

      // Tambah image jika ada
      if (user_image) {
        sql += ", user_image=?";
        params.push(user_image);
      }

      // Tambah password jika diisi
      if (new_password) {
        sql += ", user_password=?";
        const bcrypt = (await import("bcrypt")).default;
        const hash = await bcrypt.hash(new_password.toString(), 10);
        params.push(hash);
      }

      sql += " WHERE user_id=?";
      params.push(userId);

      const [result] = await db.query(sql, params);

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User tidak ditemukan" });

      res.json({ message: "Profil berhasil diperbarui" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Gagal memperbarui profil" });
    }
  },
];
