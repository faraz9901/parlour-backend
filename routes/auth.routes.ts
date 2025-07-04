import express from "express";
import { checkSessionController, loginController, logoutController, registerController } from "../controllers/auth.controllers";
import checkAuth from "../middlewares/checkAuth.middleware";
import checkRole from "../middlewares/checkRole.middleware";
import { Role } from "../utils/enums";


const router = express.Router();

router.post('/login', loginController);

router.post('/logout', checkAuth, logoutController);

router.get('/check-session', checkAuth, checkSessionController);

// As only superadmin can register new user
router.post('/register', checkAuth, checkRole([Role.SUPER_ADMIN]), registerController);

export default router;
