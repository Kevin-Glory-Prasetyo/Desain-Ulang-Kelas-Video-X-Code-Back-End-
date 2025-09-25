import express from "express";
import bodyParser from "body-parser";
import loginRouter from "./routers/loginRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import productRouter from "./routers/productRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import { dir } from "console";

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5501", 
  credentials: true
}));

app.use("/auth", loginRouter);
app.use("/api", productRouter); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
