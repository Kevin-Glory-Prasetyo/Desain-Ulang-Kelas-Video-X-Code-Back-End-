import bcrypt from "bcrypt";
import db from "../database/connection.js";
import jwt from "jsonwebtoken";

//
// =============== REGISTER USER ==================
//
export const userRegister = async (req, res) => {
  const {
    user_first_name,
    user_last_name,
    user_email,
    user_password,
    user_phone, // Tambahan: nomor handphone
  } = req.body;

  // Validasi input, termasuk user_phone
  if (
    !user_first_name ||
    !user_last_name ||
    !user_email ||
    !user_password ||
    !user_phone
  ) {
    return res.status(400).json({
      statusCode: 400,
      status: "Fail",
      error: true,
      message:
        "First name, last name, email, password, dan nomor handphone wajib diisi",
    });
  }

  try {
    // Cek apakah email sudah terdaftar
    const [checkUser] = await db.query(
      "SELECT * FROM user WHERE user_email = ?",
      [user_email]
    );

    if (checkUser.length > 0) {
      return res.status(409).json({
        statusCode: 409,
        status: "Fail",
        error: true,
        message: "Email sudah terdaftar",
      });
    }

    // Hash password
    const passToString = user_password.toString();
    const hashPassword = await bcrypt.hash(passToString, 10);

    // Simpan data user baru, termasuk nomor handphone dan image kosong
    const [insertData] = await db.query(
      `INSERT INTO user (user_first_name, user_last_name, user_email, user_password, user_phone, user_image)
       VALUES (?, ?, ?, ?, ?, '')`,
      [user_first_name, user_last_name, user_email, hashPassword, user_phone]
    );

    if (insertData.affectedRows === 1) {
      return res.status(200).json({
        statusCode: 200,
        status: "success",
        error: false,
        message: "Registrasi berhasil!",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error server",
    });
  }
};

//
// =============== LOGIN USER ==================
//
export const userLogin = async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({
      statusCode: 400,
      status: "Fail",
      error: true,
      message: "Email & password wajib diisi",
    });
  }

  try {
    const [checkUser] = await db.query(
      "SELECT * FROM user WHERE user_email = ?",
      [user_email]
    );
    if (checkUser.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        status: "Fail",
        error: true,
        message: "User tidak ditemukan",
      });
    }

    const passToString = user_password.toString();
    const user = checkUser[0];
    const isMatch = await bcrypt.compare(passToString, user.user_password);

    if (!isMatch) {
      return res.status(401).json({
        statusCode: 401,
        status: "Fail",
        error: true,
        message: "Password salah",
      });
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        first_name: user.user_first_name,
        last_name: user.user_last_name,
        email: user.user_email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 20 * 60 * 1000,
    });

    res.status(200).json({
      statusCode: 200,
      status: "success",
      error: false,
      message: "Login sukses",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error server",
    });
  }
};

//
// =============== CHANGE PASSWORD ==================
//
export const changePassword = async (req, res) => {
  const { user_email, new_password, confirm_password } = req.body;

  if (!user_email || !new_password || !confirm_password) {
    return res.status(400).json({
      statusCode: 400,
      status: "Fail",
      error: true,
      message: "Email & password baru wajib diisi",
    });
  }

  if (new_password !== confirm_password) {
    return res.status(400).json({
      statusCode: 400,
      status: "Fail",
      error: true,
      message: "Password baru dan konfirmasi password tidak cocok",
    });
  }

  try {
    const [checkUser] = await db.query(
      "SELECT * FROM user WHERE user_email = ?",
      [user_email]
    );
    if (checkUser.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        status: "Fail",
        error: true,
        message: "User tidak ditemukan",
      });
    }

    const passToString = new_password.toString();
    const hashPassword = await bcrypt.hash(passToString, 10);

    const [updatePassword] = await db.query(
      "UPDATE user SET user_password = ? WHERE user_email = ?",
      [hashPassword, user_email]
    );

    if (updatePassword.affectedRows === 1) {
      return res.status(200).json({
        statusCode: 200,
        status: "success",
        error: false,
        message: "Reset password berhasil",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error server",
    });
  }
};

//
// =============== LOGOUT USER ==================
//
export const userLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  });
  res.status(200).json({
    statusCode: 200,
    status: "Success",
    error: false,
    message: "Logout berhasil",
  });
};
