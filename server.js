import express from "express";
import bodyParser from "body-parser";
import loginRouter from "./routers/loginRouter.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", loginRouter);

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
