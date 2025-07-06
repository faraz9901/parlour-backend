import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Role } from "./enums";


interface AuthRequest extends Request {
    user?: { _id: string, role: Role }
}

const asyncHandler = (fn: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>) => (req: AuthRequest, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};


const globalErrorHandler = (err: any, req: AuthRequest, res: Response, next: NextFunction) => {

    if (process.env.NODE_ENV === "development") console.log(err);

    if (err instanceof ZodError) {
        return res.status(400).json({ message: err.issues[0].message, status: 400 });
    }

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message, status: err.statusCode });
    }

    return res.status(500).json({ message: "Internal Server Error", status: 500 });
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
