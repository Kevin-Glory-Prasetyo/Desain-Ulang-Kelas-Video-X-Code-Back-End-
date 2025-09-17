import bcrypt from "bcrypt";
import db from "../database/connection.js";

export const userRegister = async (req, res) => {
  const { user_first_name, user_last_name, user_email, user_password } = req.body;

  if (!user_first_name || !user_last_name || !user_email || !user_password) {
    return res.status(400).json({
      statusCode: 400,
      status: "Fail",
      error: true,
      message: "First name, last name, email & password wajib diisi"
    });
  }

  try {
    const [checkUser] = await db.query("SELECT * FROM user WHERE user_email = ?", [user_email]);
    if (checkUser.length > 0) {
      return res.status(409).json({
        statusCode: 409,
        status: "Fail",
        error: true,
        message: "Email sudah terdaftar"
      });
    }

    const passToString = user_password.toString();
    const hashPassword = await bcrypt.hash(passToString, 10);

    const [insertData] = await db.query(
      "INSERT INTO user (user_first_name, user_last_name, user_email, user_password) VALUES (?, ?, ?, ?)",
      [user_first_name, user_last_name, user_email, hashPassword]
    );

    if (insertData.affectedRows == 1) {
      return res.status(200).json({
        statusCode: 200,
        status: "success",
        error: false,
        message: "Registrasi berhasil!"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error server"
    });
  }
};


export const userLogin = async (req, res) => {
  const { user_email, user_password } = req.body;

  if (!user_email || !user_password) {
    return res.status(400).json({
        statusCode: 400,
        status: "Fail",
        error: true,
        message: "Email & password wajib diisi"
    });
  }

  try {
    const [checkUser] = await db.query("SELECT * FROM user WHERE user_email = ?", [user_email]);
    if (checkUser.length === 0) {
        return res.status(404).json({ 
            statusCode: 404,
            status: "Fail",
            error: true,
            message: "User tidak ditemukan"
        });
    }

    const passToString = user_password.toString()
    const user = checkUser[0];
    const isMatch = await bcrypt.compare(passToString, user.user_password);

    if (!isMatch) {
        return res.status(401).json({
            statusCode: 401,
            status: "Fail",
            error: true, 
            message: "Password salah" 
        });
    }

    res.status(200).json({ 
        statusCode: 200,
        status: "success",
        error: false,
        message: "Login sukses", 
        email: user.user_email 
    });

  } catch (err) {
        console.error(err);
        res.status(500).json({ 
        message: "Error server" 
    });
  }
};


export const changePassword = async (req, res) => {

    const {user_email, new_password, confirm_password} = req.body

    if (!user_email || !new_password || !confirm_password) {
        return res.status(400).json({
            statusCode: 400,
            status: "Fail",
            error: true,
            message: "Email & password baru wajib diisi"
        });
    }

    if (new_password !== confirm_password) {
        return res.status(400).json({
            statusCode: 400,
            status: "Fail",
            error: true,
            message: "Paassword baru dan konfirmasi passsword tidak cocok"
        });
    }

    try {
        const [checkUser] = await db.query("SELECT * FROM user WHERE user_email = ?", [user_email]);
        if (checkUser.length === 0) {
            return res.status(404).json({ 
                statusCode: 404,
                status: "Fail",
                error: true,
                message: "User tidak ditemukan"
            });
        }

        const passToString = new_password.toString();
        const hashPasword = await bcrypt.hash(passToString, 10);

        const [updatePassword] = await db.query("UPDATE user SET user_password = ? WHERE user_email = ?",[hashPasword, user_email]);

        if (updatePassword.affectedRows == 1) {
        return res.status(200).json({ 
            statusCode: 200,
            status: "success",
            error: false,
            message: "Reset password berhasil" 
        });  
    }

    } catch (error) {
            console.error(err);
            res.status(500).json({ 
            message: "Error server" 
       });
    }
}
