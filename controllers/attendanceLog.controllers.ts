import AttendanceLog from "../models/attendanceLog.model";
import { AppError, asyncHandler, AppResponse } from "../utils";

export const getAttendanceLogs = asyncHandler(async (req, res) => {
    const logs = await AttendanceLog.find().populate("employeeId");
    res.status(200).json(new AppResponse(200, "All attendance logs", logs));
});


export const checkInController = asyncHandler(async (req, res) => {
    const { checkIn } = req.body;

    const employeeId = req.user?._id;

    if (!employeeId) {
        throw new AppError("Employee not found", 404);
    }

    //Check if the check in date and time is of today
    const today = new Date();
    const checkInDate = new Date(checkIn);

    if (today.toDateString() !== checkInDate.toDateString()) {
        throw new AppError("Check-in date and time is not of today", 400);
    }

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // check if employee has already checked in today by checking if any checkin by employeeId today 
    const log = await AttendanceLog.findOne({ employeeId, checkIn: { $gte: startOfToday, $lt: endOfToday }, checkOut: null });

    if (log) {
        throw new AppError("Employee has already checked in today", 400);
    }

    const newLog = await AttendanceLog.create({ employeeId, checkIn: checkInDate });

    res.status(201).json(new AppResponse(201, "Check-in successful", newLog));
});


export const checkOutController = asyncHandler(async (req, res) => {
    const { checkOut } = req.body;
    const employeeId = req.user?._id;

    if (!employeeId) {
        throw new AppError("Employee not found", 404);
    }

    const today = new Date();
    const checkOutDate = new Date(checkOut);

    if (today.toDateString() !== checkOutDate.toDateString()) {
        throw new AppError("Check-out date and time is not of today", 400);
    }

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const log = await AttendanceLog.findOne({ employeeId, checkIn: { $gte: startOfToday, $lt: endOfToday }, checkOut: null });

    if (!log) {
        throw new AppError("Employee has not checked in today", 404);
    }

    log.checkOut = new Date(checkOut);
    await log.save();

    res.status(200).json(new AppResponse(200, "Check-out successful", log));
});




