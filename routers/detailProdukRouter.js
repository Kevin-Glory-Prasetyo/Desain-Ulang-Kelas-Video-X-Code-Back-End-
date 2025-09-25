import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { detailProduk } from "../controller/detailProduk.js";

const router = Router();

router.get('/detailproduk/:id', detailProduk)
router.get("/detailproduk", verifyToken, (req, res) => {
  res.json({
    user: req.data.user
  });
});
router.get("/checkLogin", verifyToken, (req, res) => {
  res.sendStatus(200);
});

export default router