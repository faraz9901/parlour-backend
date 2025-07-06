import express from "express";
import { checkInController, checkOutController, getAttendanceLogs, getEmployeeAttendanceLogs } from "../controllers/attendanceLog.controllers";
import checkAuth from "../middlewares/checkAuth.middleware";
import { Role } from "../utils/enums";
import checkRole from "../middlewares/checkRole.middleware";

const router = express.Router();

router.get("/", checkAuth, checkRole([Role.SUPER_ADMIN, Role.ADMIN]), getAttendanceLogs);

router.post("/check-in", checkAuth, checkRole([Role.EMPLOYEE]), checkInController);

router.post("/check-out", checkAuth, checkRole([Role.EMPLOYEE]), checkOutController);


router.get("/employee", checkAuth, checkRole([Role.EMPLOYEE]), getEmployeeAttendanceLogs);


export default router;
