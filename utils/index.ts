import { NextFunction, Request, Response } from "express";

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
};


const globalErrorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.statusCode).json({ message: err.message, status: err.statusCode });
};


class AppError extends Error {
    message: string;
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        // Prevent prototype pollution attacks
        Error.captureStackTrace(this, this.constructor);
    }
}


class AppResponse {
    status: number;
    message: string;
    data?: any;

    constructor(status: number, message: string, data?: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
}

export { asyncHandler, globalErrorHandler, AppError, AppResponse };
