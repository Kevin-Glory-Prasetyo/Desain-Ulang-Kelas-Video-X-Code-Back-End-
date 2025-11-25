import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // 1. Coba ambil dari Cookie
  const tokenFromCookie = req.cookies.token;
  
  // 2. Coba ambil dari Header Authorization (Format: Bearer <token>)
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader && authHeader.split(' ')[1];

  // 3. Gunakan salah satu yang ada
  const token = tokenFromCookie || tokenFromHeader;

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: "Fail",
      error: true,
      message: "Akses ditolak, silakan login dulu",
    });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET);

    req.user = decoded;
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

export default verifyToken; 