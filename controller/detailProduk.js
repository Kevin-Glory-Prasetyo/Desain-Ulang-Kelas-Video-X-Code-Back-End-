import db from "../database/connection.js";

export const detailProduk = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      statusCode: 400,
      status: "Fail",
      error: true,
      message: "ID produk wajib dikirim",
    });
  }

  try {
    const [rows] = await db.query("SELECT * FROM course_video WHERE id = ?", [
      id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        statusCode: 404,
        status: "Fail",
        error: true,
        message: "Produk tidak ditemukan",
      });
    }

    return res.status(200).json({
      statusCode: 200,
      status: "Success",
      error: false,
      message: "Detail produk berhasil diambil",
      data: rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      statusCode: 500,
      status: "Fail",
      error: true,
      message: "Terjadi kesalahan server",
    });
  }
};
