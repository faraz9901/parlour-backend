import express from "express";
import checkAuth from "../middlewares/checkAuth.middleware";
import checkRole from "../middlewares/checkRole.middleware";
import { Role } from "../utils/enums";
import { userCreationController, userDeleteController, userGetAllController, userGetController, userUpdateController } from "../controllers/user.controllers";


const router = express.Router();

router.post('/create', checkAuth, checkRole([Role.SUPER_ADMIN]), userCreationController);

router.put('/update/:id', checkAuth, checkRole([Role.SUPER_ADMIN]), userUpdateController);

router.delete('/delete/:id', checkAuth, checkRole([Role.SUPER_ADMIN]), userDeleteController);

router.get('/get/:id', checkAuth, userGetController);

router.get('/', checkAuth, userGetAllController);



export default router;
