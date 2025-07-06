import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Role } from "./enums";
import { Server } from "socket.io";
import mongoose from "mongoose";


export interface AuthRequest extends Request {
    user?: { _id: string, role: Role }
    io?: Server
}

const asyncHandler = (fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>) => (req: AuthRequest, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};


const globalErrorHandler = (err: any, req: AuthRequest, res: Response, next: NextFunction) => {

    if (process.env.NODE_ENV === "development") {
        console.error("🔥 Error:", err);
    }

    // Zod validation error
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 400,
            message: err.issues[0].message,
            errors: err.issues, // you might include all issues for frontend
        });
    }

    // Mongoose validation error
    if (err instanceof mongoose.Error.ValidationError) {
        const messages = Object.values(err.errors).map((e: any) => e.message);
        return res.status(400).json({
            status: 400,
            message: messages.join(", "),
            errors: messages
        });
    }

    // Mongoose duplicate key error (e.g. unique: true fails)
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        return res.status(400).json({
            status: 400,
            message: `${field} must be unique. Value '${err.keyValue[field]}' already exists.`,
        });
    }

    // Your custom AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
    }

    // Generic fallback
    return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
    });
};


class AppError extends Error {
    message: string;
    statusCode: number;
    success: boolean;

    constructor(message: string, statusCode: number) {
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        this.success = false;
        // Prevent prototype pollution attacks
        Error.captureStackTrace(this, this.constructor);
    }
}


class AppResponse {
    status: number;
    message: string;
    content?: any;
    success: boolean;

    constructor(status: number, message: string, content?: any) {
        this.success = true;
        this.status = status;
        this.message = message;
        this.content = content;
    }
}


const validate = (schema: any) => (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        next(err);
    }
};


export { asyncHandler, globalErrorHandler, AppError, AppResponse, validate };
