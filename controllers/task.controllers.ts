import { asyncHandler } from "../utils";
import Task from "../models/task.model";
import { AppError, AppResponse } from "../utils";
import { taskCreateValidation, taskUpdateValidation } from "../utils/validations";
import mongoose from "mongoose";

export const taskCreationController = asyncHandler(async (req, res) => {

    const task = await Task.create(req.body);

    res.status(201).json(new AppResponse(201, "Task created successfully", { task }));
});

export const taskGetAllController = asyncHandler(async (req, res) => {
    const tasks = await Task.find().populate({
        path: "assignedTo",
        select: "_id name email"
    })

    console.log(tasks)

    res.status(200).json(new AppResponse(200, "All tasks", tasks));
});

export const taskGetController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id).populate({
        path: "assignedTo",
        select: "_id name email"
    })

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    res.status(200).json(new AppResponse(200, "Task found", task));
});

export const taskUpdateController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const { title, description, assignedTo, status } = req.body;

    const task = await Task.findById(id);

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.assignedTo = new mongoose.Types.ObjectId(`${assignedTo}`) || task.assignedTo;
    task.status = status || task.status;

    const updatedTask = await task.save();

    res.status(200).json(new AppResponse(200, "Task updated successfully", { task: updatedTask }));
});

export const taskDeleteController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new AppError("Task not found", 404);
    }

    res.status(200).json(new AppResponse(200, "Task deleted successfully", { task }));
});

export const taskGetAssignedController = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new AppError("You do not have permission to access this resource", 401);
    }

    const tasks = await Task.find({ assignedTo: req.user._id }).populate({
        path: "assignedTo",
        select: "_id name email"
    })

    res.status(200).json(new AppResponse(200, "Assigned tasks", tasks));
});

