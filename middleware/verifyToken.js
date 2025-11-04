import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // ambil token dari cookie

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: "Fail",
      error: true,
      message: "Akses ditolak, silakan login dulu",
    });
  }

  try {
    // verifikasi token dengan secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // simpan payload user di req.user agar mudah diakses di controller lain
    // contoh di controller: req.user.id, req.user.email
    req.user = decoded;

    // tetap simpan format lama (req.data.user) agar kompatibel dengan file lama
    req.data = { user: decoded };

    next();
  } catch (err) {
    return res.status(403).json({
      statusCode: 403,
      status: "Fail",
      error: true,
      message: "Token tidak valid atau sudah kadaluarsa",
    });
  }
};
