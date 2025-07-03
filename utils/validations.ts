import { z } from "zod";
import { Role, TaskStatus } from "./enums";

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const registerValidation = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum([Role.ADMIN, Role.USER, Role.SUPER_ADMIN]),
});

// Employee Validations
export const employeeCreateValidation = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    phone: z.string().min(8),
    position: z.string().min(2),
    salary: z.number().nonnegative()
});

export const employeeUpdateValidation = z.object({
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    phone: z.string().min(8).optional(),
    position: z.string().min(2).optional(),
    salary: z.number().nonnegative().optional()
});

// Task Validations
export const taskCreateValidation = z.object({
    title: z.string().min(3),
    description: z.string().optional(),
    assignedTo: z.string().length(24), // MongoDB ObjectId
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]).optional(),
    dueDate: z.coerce.date().optional()
});

export const taskUpdateValidation = z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    assignedTo: z.string().length(24).optional(),
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED]).optional(),
    dueDate: z.coerce.date().optional()
});

// AttendanceLog Validations
export const attendanceLogCreateValidation = z.object({
    employeeId: z.string().length(24), // MongoDB ObjectId
    date: z.coerce.date(),
    hoursWorked: z.number().nonnegative(),
    notes: z.string().optional()
});