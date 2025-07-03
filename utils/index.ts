import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};


const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof ZodError) {
        return res.status(400).json({ message: err.errors[0].message, status: 400 });
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
    data?: any;
    success: boolean;

    constructor(status: number, message: string, data?: any) {
        this.success = true;
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export { asyncHandler, globalErrorHandler, AppError, AppResponse };
