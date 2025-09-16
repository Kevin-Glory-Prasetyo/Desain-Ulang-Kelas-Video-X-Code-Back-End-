import { Router } from "express";
const router = Router();

import {userRegister,userLogin,changePassword} from '../controller/loginController.js';

router.post('/userRegister',userRegister)
router.post('/userLogin', userLogin)
router.put('/changePassword', changePassword)


export default router

