import multer from "multer";
import path from "path";
import fs from "fs";

const uploadPath = "uploads/bukti";

// auto create folder kalau belum ada
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
    cb(null, filename);
  }
});

export const uploadBukti = multer({ storage });
