import express from "express";
import { checkInController, checkOutController, getAttendanceLogs, getEmployeesAttendanceLogs } from "../controllers/attendanceLog.controllers";
import checkAuth from "../middlewares/checkAuth.middleware";
import { Role } from "../utils/enums";
import checkRole from "../middlewares/checkRole.middleware";

const router = express.Router();

router.get("/", checkAuth, checkRole([Role.SUPER_ADMIN, Role.ADMIN]), getAttendanceLogs);

router.post("/check-in", checkInController);

router.post("/check-out", checkOutController);

router.get("/employees", getEmployeesAttendanceLogs);


export default router;
