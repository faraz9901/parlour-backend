import { z } from "zod";
import { Role, TaskStatus } from "./enums";

// User Validations
export const userValidation = z.object({
    name: z.string({ required_error: "Name is required" })
        .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string()
        .email({ message: "Invalid email" }),
    password: z.string().optional(),
    role: z.enum([Role.ADMIN, Role.EMPLOYEE, Role.SUPER_ADMIN], {
        required_error: "Role is required",
        invalid_type_error: "Invalid role"
    }),
})

export const loginValidation = z.object({
    email: z.string({ required_error: "Email is required" }).email({ message: "Invalid email" }),
    password: z.string({ required_error: "Password is required" }).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, { message: "Password must be at least 8 characters long and contain at least one letter and one number no special characters" }),
});


// Task Validations
export const taskCreateValidation = z.object({
    title: z.string({ required_error: "Title is required" }).min(3, { message: "Title must be at least 3 characters long" }),
    description: z.string({ required_error: "Description is required" }),
    assignedTo: z.string({ required_error: "Assigned to is required" }).length(24, { message: "Invalid assigned to" }), // MongoDB ObjectId
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], { required_error: "Status is required", message: "Invalid status" })
});

export const taskUpdateValidation = z.object({
    title: z.string({ required_error: "Title is required" }).min(3, { message: "Title must be at least 3 characters long" }).optional(),
    description: z.string({ required_error: "Description is required" }).optional(),
    assignedTo: z.string({ required_error: "Assigned to is required" }).length(24, { message: "Invalid assigned to" }),
    status: z.enum([TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], { required_error: "Status is required", message: "Invalid status" })
});

