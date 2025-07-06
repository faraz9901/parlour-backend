import AttendanceLog from "../models/attendanceLog.model";
import User from "../models/user.model";
import { AppError, asyncHandler, AppResponse } from "../utils";

export const getAttendanceLogs = asyncHandler(async (req, res) => {
    const logs = await AttendanceLog.find().populate("employee");
    res.status(200).json(new AppResponse(200, "All attendance logs", logs));
});


export const checkInController = asyncHandler(async (req, res) => {

    const { id } = req.body;

    if (!id) {
        throw new AppError("Employee not found", 400);
    }

    const employee = await User.findById(id);

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

    const newLog = await AttendanceLog.create({ employee: id, checkIn: now, checkOut: null });

    if (req.io) {
        req.io.emit("attendance-update");
    }

    res.status(201).json(new AppResponse(201, "Check-in successful", newLog));
});


export const checkOutController = asyncHandler(async (req, res) => {
    const { id } = req.body;

    if (!id) {
        throw new AppError("Employee not found", 400);
    }

    const employee = await User.findById(id);

    if (!employee) {
        throw new AppError("Employee not found", 404);
    }

    // get current date and time
    const now = new Date();

    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    const log = await AttendanceLog.findOne({ employee: id, checkIn: { $gte: startOfToday, $lt: endOfToday } });

    if (!log) {
        throw new AppError("Employee has not checked in today", 404);
    }

    if (log.checkOut) {
        throw new AppError("Employee has already checked out today", 400);
    }

    log.checkOut = now;
    await log.save();

    if (req.io) {
        req.io.emit("attendance-update");
    }

    res.status(200).json(new AppResponse(200, "Check-out successful", log));
});


export const getEmployeesAttendanceLogs = asyncHandler(async (req, res) => {

    const today = new Date();

    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    const logs = await AttendanceLog.find({ checkIn: { $gte: startOfToday, $lt: endOfToday } })

    res.status(200).json(new AppResponse(200, "All attendance logs", logs));
});




