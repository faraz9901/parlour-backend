import { Request, Response } from "express";
import Employee from "../models/employee.model";
import { AppError, asyncHandler, AppResponse } from "../utils";

export const addEmployee = asyncHandler(async (req: Request, res: Response) => {
    const { name, email, phone, position, salary } = req.body;
    const existing = await Employee.findOne({ email });
    if (existing) throw new AppError("Employee already exists", 400);
    const employee = await Employee.create({ name, email, phone, position, salary });
    res.status(201).json(new AppResponse(201, "Employee added", employee));
});

export const getEmployees = asyncHandler(async (req: Request, res: Response) => {
    const employees = await Employee.find();
    res.status(200).json(new AppResponse(200, "All employees", employees));
});

export const getEmployeeById = asyncHandler(async (req: Request, res: Response) => {
    const employee = await Employee.findById(req.params.id);
    if (!employee) throw new AppError("Employee not found", 404);
    res.status(200).json(new AppResponse(200, "Employee found", employee));
});

export const updateEmployee = asyncHandler(async (req: Request, res: Response) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) throw new AppError("Employee not found", 404);
    res.status(200).json(new AppResponse(200, "Employee updated", employee));
});

export const deleteEmployee = asyncHandler(async (req: Request, res: Response) => {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) throw new AppError("Employee not found", 404);
    res.status(200).json(new AppResponse(200, "Employee deleted", employee));
});
