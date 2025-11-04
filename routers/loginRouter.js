import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
const router = Router();

import {userRegister,userLogin,changePassword,userLogout} from '../controller/loginController.js';

router.post('/userRegister',userRegister)
router.post('/userLogin', userLogin)
router.put('/changePassword', changePassword)
router.get("/filelist", verifyToken, (req, res) => {
  res.json({
    user: req.data.user
  });
});
router.get("/checkLogin", verifyToken, (req, res) => {
  res.sendStatus(200);
});
router.post("/logout", userLogout);


export default router
