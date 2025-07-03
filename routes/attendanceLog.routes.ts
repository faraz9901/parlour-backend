import express from "express";
import { getAttendanceLogs, getAttendanceLogsByEmployee } from "../controllers/attendanceLog.controllers";

const router = express.Router();

router.get("/", getAttendanceLogs);
router.get("/employee/:employeeId", getAttendanceLogsByEmployee);

export default router;
