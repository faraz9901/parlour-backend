import express from "express";
import checkAuth from "../middlewares/checkAuth.middleware";
import checkRole from "../middlewares/checkRole.middleware";
import { Role } from "../utils/enums";
import { userCreationController, userDeleteController, userGetAllController, employeesGetController, userUpdateController } from "../controllers/user.controllers";


const router = express.Router();

router.post('/create', checkAuth, checkRole([Role.SUPER_ADMIN]), userCreationController);

router.put('/update/:id', checkAuth, checkRole([Role.SUPER_ADMIN]), userUpdateController);

router.delete('/delete/:id', checkAuth, checkRole([Role.SUPER_ADMIN]), userDeleteController);

router.get('/', checkAuth, userGetAllController);

router.get('/employees', employeesGetController);



export default router;
