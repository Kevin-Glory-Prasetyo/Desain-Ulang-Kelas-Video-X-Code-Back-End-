import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Router
import loginRouter from "./routers/loginRouter.js";
import productRouter from "./routers/productRouter.js";
import detailProdukRouter from './routers/detailProdukRouter.js';
import profileRouter from "./routers/profileRouter.js";
import passwordResetRouter from "./routers/passwordResetRouter.js";
import pembelianRouter from "./routers/pembelianRouter.js";  // <- router pembelian
import uploadRouter from "./routers/uploadRouter.js";

// Setup
const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5501","http://localhost:5500"],
  credentials: true
}));

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routing
app.use("/auth", loginRouter);
app.use("/produk", detailProdukRouter);
app.use("/api", productRouter);
app.use("/api/profile", profileRouter);
app.use("/auth/password", passwordResetRouter);

// *** ROUTER PEMBELIAN HARUS DI BAWAH app = express()
app.use("/api", pembelianRouter);  // <-- sekarang aman

// Start Server
app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});

app.use("/api", uploadRouter);
