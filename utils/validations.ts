import { z } from "zod";
import { Role, TaskStatus } from "./enums";

// User Validations
export const userUpdateValidation = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, { message: "Name must be at least 3 characters long" }).optional(),
    email: z.string().email({ message: "Invalid email" }).optional(),
    password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "Password must be at least 8 characters long and contain at least one letter and one number no special characters" }).optional(),
    role: z.enum([Role.ADMIN, Role.EMPLOYEE, Role.SUPER_ADMIN], { required_error: "Role is required", message: "Invalid role" }).optional()
});

export const loginValidation = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "Password must be at least 8 characters long and contain at least one letter and one number no special characters" }),
});

export const userCreationValidation = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "Password must be at least 8 characters long and contain at least one letter and one number" }),
    role: z.enum([Role.ADMIN, Role.EMPLOYEE, Role.SUPER_ADMIN], { required_error: "Role is required", message: "Invalid role" }),
});

// Employee Validations
export const employeeCreateValidation = z.object({
    name: z.string({ required_error: "Name is required" }).min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    phone: z.string({ required_error: "Phone is required" }).min(8, { message: "Phone must be at least 8 characters long" }),
    position: z.string({ required_error: "Position is required" }).min(2, { message: "Position must be at least 2 characters long" }),
    salary: z.number({ required_error: "Salary is required" }).nonnegative({ message: "Salary must be a non-negative number" })
});

export const employeeUpdateValidation = z.object({
    name: z.string({ required_error: "Name is required" }).min(3).optional(),
    email: z.string().email({ message: "Invalid email" }).optional(),
    phone: z.string().min(8, { message: "Phone must be at least 8 characters long" }).optional(),
    position: z.string().min(2, { message: "Position must be at least 2 characters long" }).optional(),
    salary: z.number().nonnegative({ message: "Salary must be a non-negative number" }).optional()
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