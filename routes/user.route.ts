import express from "express";
import checkAuth from "../middlewares/checkAuth.middleware";
import checkRole from "../middlewares/checkRole.middleware";
import { Role } from "../utils/enums";
import { userCreationController, userDeleteController, userGetAllController, employeesGetController, userUpdateController } from "../controllers/user.controllers";
import { validate } from "../utils";
import { userValidation } from "../utils/validations";


const router = express.Router();

router.post('/create', checkAuth, checkRole([Role.SUPER_ADMIN]), validate(userValidation), userCreationController);

router.put('/update/:id', checkAuth, checkRole([Role.SUPER_ADMIN]), validate(userValidation), userUpdateController);

router.delete('/delete/:id', checkAuth, checkRole([Role.SUPER_ADMIN]), userDeleteController);

router.get('/', checkAuth, checkRole([Role.SUPER_ADMIN, Role.ADMIN]), userGetAllController);

router.get('/employees', employeesGetController);

export default router;
