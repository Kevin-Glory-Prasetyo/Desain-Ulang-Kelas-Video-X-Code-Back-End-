import express from "express";
import bodyParser from "body-parser";
import loginRouter from "./routers/loginRouter.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5501", 
  credentials: true
}));

app.use("/auth", loginRouter);

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
