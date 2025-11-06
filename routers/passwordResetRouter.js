import express from "express";
import { requestReset, verifyReset, setNewPassword } from "../controller/passwordResetController.js";

const router = express.Router();

// Tidak pakai verifyToken — ini flow publik (berbasis email + OTP)
router.post("/request", requestReset);     // kirim OTP
router.post("/verify", verifyReset);       // verifikasi OTP -> dapat reset_token
router.post("/set-new", setNewPassword);   // pakai reset_token untuk set password baru

export default router;
