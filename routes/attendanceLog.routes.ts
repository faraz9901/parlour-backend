import express from "express";
import { checkInController, checkOutController, getAttendanceLogs } from "../controllers/attendanceLog.controllers";
import checkAuth from "../middlewares/checkAuth.middleware";
import { Role } from "../utils/enums";
import checkRole from "../middlewares/checkRole.middleware";
import { validate } from "../utils";
import { attendanceLogCreateValidation, attendanceLogUpdateValidation } from "../utils/validations";

const router = express.Router();

router.get("/", checkAuth, checkRole([Role.SUPER_ADMIN, Role.ADMIN]), getAttendanceLogs);

router.post("/check-in", checkAuth, checkRole([Role.EMPLOYEE]), validate(attendanceLogCreateValidation), checkInController);

router.post("/check-out", checkAuth, checkRole([Role.EMPLOYEE]), validate(attendanceLogUpdateValidation), checkOutController);

export default router;
