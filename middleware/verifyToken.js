import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      status: "Fail",
      error: true,
      message: "Akses ditolak, silakan login dulu"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
     req.data = { user: decoded };
    next();
  } catch (err) {
    return res.status(403).json({
      statusCode: 403,
      status: "Fail",
      error: true,
      message: "Token tidak valid atau sudah kadaluarsa"
    });
  }
};
