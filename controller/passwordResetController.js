import db from "../database/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendOtpMail } from "../utils/mailer.js";

// helper
const nowPlusMinutes = (m) =>{
  const date = new Date();
  date.setMinutes(date.getMinutes() + m);
  // Format YYYY-MM-DD HH:MM:SS (lokal)
  const pad = (n) => (n < 10 ? "0" + n : n);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};

function genCode4() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit
}

// 1) Request OTP
export const requestReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ statusCode: 400, message: "Email wajib diisi" });

    // cek user
    const [users] = await db.query("SELECT user_id, user_email FROM user WHERE user_email=?", [email]);
    if (users.length === 0)
      return res.status(404).json({ statusCode: 404, message: "Email tidak terdaftar" });

    const user = users[0];
    const code = genCode4();
    const expiresAt = nowPlusMinutes(10);

    // simpan OTP
    await db.query(
      "INSERT INTO password_reset (user_id, email, code, expires_at, used) VALUES (?, ?, ?, ?, 0)",
      [user.user_id, email, code, expiresAt]
    );

    // kirim email
    await sendOtpMail(email, code);

    return res.status(200).json({
      statusCode: 200,
      message: "Kode verifikasi telah dikirim ke email",
    });
  } catch (err) {
    console.error("requestReset error:", err);
    return res.status(500).json({ statusCode: 500, message: "Gagal mengirim kode" });
  }
};

// 2) Verify OTP -> kembalikan reset_token (JWT)
export const verifyReset = async (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code)
      return res.status(400).json({ statusCode: 400, message: "Email & kode wajib diisi" });

    const [rows] = await db.query(
      `SELECT pr.*, u.user_id FROM password_reset pr
       JOIN user u ON pr.user_id = u.user_id
       WHERE pr.email=? AND pr.code=? AND pr.used=0
       ORDER BY pr.created_at DESC LIMIT 1`,
      [email, code]
    );

    if (rows.length === 0)
      return res.status(400).json({ statusCode: 400, message: "Kode tidak valid" });

    const rec = rows[0];
    if (new Date(rec.expires_at) < new Date())
      return res.status(410).json({ statusCode: 410, message: "Kode telah kedaluwarsa" });

    // (opsional) tandai kode terpakai agar tidak bisa dipakai ulang
    await db.query("UPDATE password_reset SET used=1 WHERE id=?", [rec.id]);

    // buat reset_token (berlaku singkat)
    const resetToken = jwt.sign(
      { kind: "password_reset", user_id: rec.user_id, email },
      process.env.RESET_JWT_SECRET,
      { expiresIn: process.env.RESET_JWT_EXPIRES || "1h" }
    );

    return res.status(200).json({
      statusCode: 200,
      message: "Verifikasi berhasil",
      reset_token: resetToken,
    });
  } catch (err) {
    console.error("verifyReset error:", err);
    return res.status(500).json({ statusCode: 500, message: "Gagal verifikasi kode" });
  }
};

// 3) Set new password
export const setNewPassword = async (req, res) => {
  try {
    const { reset_token, new_password, confirm_password } = req.body;
    if (!reset_token || !new_password || !confirm_password)
      return res.status(400).json({ statusCode: 400, message: "Data tidak lengkap" });

    if (new_password !== confirm_password)
      return res.status(400).json({ statusCode: 400, message: "Konfirmasi password tidak cocok" });

    let payload;
    try {
      payload = jwt.verify(reset_token, process.env.RESET_JWT_SECRET);
    } catch {
      return res.status(403).json({ statusCode: 403, message: "Token reset tidak valid / kedaluwarsa" });
    }

    if (!payload || payload.kind !== "password_reset")
      return res.status(403).json({ statusCode: 403, message: "Token tidak valid" });

    const hash = await bcrypt.hash(new_password.toString(), 10);
    const [upd] = await db.query("UPDATE user SET user_password=? WHERE user_id=?", [hash, payload.user_id]);

    if (upd.affectedRows !== 1)
      return res.status(500).json({ statusCode: 500, message: "Gagal memperbarui password" });

    return res.status(200).json({ statusCode: 200, message: "Password berhasil diperbarui" });
  } catch (err) {
    console.error("setNewPassword error:", err);
    return res.status(500).json({ statusCode: 500, message: "Error server" });
  }
};
