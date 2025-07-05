import express from "express";
import { checkSessionController, loginController, logoutController } from "../controllers/auth.controllers";
import checkAuth from "../middlewares/checkAuth.middleware";



const router = express.Router();

router.post('/login', loginController);

router.post('/logout', checkAuth, logoutController);

router.get('/check-session', checkAuth, checkSessionController);


export default router;
