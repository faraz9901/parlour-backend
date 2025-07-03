import { Request, Response } from "express";
import AttendanceLog from "../models/attendanceLog.model";
import { AppError, asyncHandler, AppResponse } from "../utils";

export const getAttendanceLogs = asyncHandler(async (req: Request, res: Response) => {
    const logs = await AttendanceLog.find().populate("employee");
    res.status(200).json(new AppResponse(200, "All attendance logs", logs));
});

export const getAttendanceLogsByEmployee = asyncHandler(async (req: Request, res: Response) => {
    const logs = await AttendanceLog.find({ employee: req.params.employeeId }).populate("employee");
    res.status(200).json(new AppResponse(200, "Attendance logs for employee", logs));
});
