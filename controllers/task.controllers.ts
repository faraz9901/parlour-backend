import { Request, Response } from "express";
import Task from "../models/task.model";
import { AppError, asyncHandler, AppResponse } from "../utils";

export const addTask = asyncHandler(async (req: Request, res: Response) => {
    const { title, description, assignedTo, status, dueDate } = req.body;
    const task = await Task.create({ title, description, assignedTo, status, dueDate });
    res.status(201).json(new AppResponse(201, "Task added", task));
});

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
    const tasks = await Task.find().populate("assignedTo");
    res.status(200).json(new AppResponse(200, "All tasks", tasks));
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findById(req.params.id).populate("assignedTo");
    if (!task) throw new AppError("Task not found", 404);
    res.status(200).json(new AppResponse(200, "Task found", task));
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) throw new AppError("Task not found", 404);
    res.status(200).json(new AppResponse(200, "Task updated", task));
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) throw new AppError("Task not found", 404);
    res.status(200).json(new AppResponse(200, "Task deleted", task));
});
