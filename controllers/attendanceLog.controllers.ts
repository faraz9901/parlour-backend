import AttendanceLog from "../models/attendanceLog.model";
import { AppError, asyncHandler, AppResponse } from "../utils";

export const getAttendanceLogs = asyncHandler(async (req, res) => {
    const logs = await AttendanceLog.find().populate("employeeId");
    res.status(200).json(new AppResponse(200, "All attendance logs", logs));
});


export const checkInController = asyncHandler(async (req, res) => {

    const employee = req.user?._id;

    if (!employee) {
        throw new AppError("Employee not found", 404);
    }

    // get current date and time
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    // check if employee has already checked in today by checking if any checkin by employee today 
    const log = await AttendanceLog.findOne({ employee, checkIn: { $gte: startOfToday, $lt: endOfToday } });

    if (log) {
        throw new AppError("Employee has already checked in today", 400);
    }

    const newLog = await AttendanceLog.create({ employee, checkIn: now, checkOut: null });

    res.status(201).json(new AppResponse(201, "Check-in successful", newLog));
});


export const checkOutController = asyncHandler(async (req, res) => {
    const employee = req.user?._id;

    if (!employee) {
        throw new AppError("Employee not found", 404);
    }

    // get current date and time
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const log = await AttendanceLog.findOne({ employee, checkIn: { $gte: startOfToday, $lt: endOfToday } });

    if (!log) {
        throw new AppError("Employee has not checked in today", 404);
    }

    if (log.checkOut) {
        throw new AppError("Employee has already checked out today", 400);
    }

    log.checkOut = now;
    await log.save();

    res.status(200).json(new AppResponse(200, "Check-out successful", log));
});


export const getEmployeeAttendanceLogs = asyncHandler(async (req, res) => {
    const employee = req.user?._id;

    if (!employee) {
        throw new AppError("Employee not found", 404);
    }

    const logs = await AttendanceLog.find({ employee })

    res.status(200).json(new AppResponse(200, "Employee attendance logs", logs));
});




