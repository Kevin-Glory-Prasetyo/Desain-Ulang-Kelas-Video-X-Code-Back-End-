import express from "express";
import { verifyToken } from "../middleware/verifyToken.js"; // <-- pakai kurung kurawal!
import { getProfile, updateProfile } from "../controller/profileController.js";

const router = express.Router();

// Ambil data profil user yang login
router.get("/", verifyToken, getProfile);

// Update data profil
router.put("/update", verifyToken, updateProfile);

export default router;
