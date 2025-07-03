import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import { globalErrorHandler } from "./utils";
import { connectDB } from "./utils/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === "development" ? "*" : process.env.APP_URL,
    credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);

import employeeRoutes from "./routes/employee.routes";
import taskRoutes from "./routes/task.routes";
import attendanceLogRoutes from "./routes/attendanceLog.routes";

app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceLogRoutes);


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    globalErrorHandler(err, req, res, next);
});

app.listen(PORT, () => {
    connectDB()
        .then(() => {
            console.log(`Server is running on port ${PORT}`);
        }).catch(() => {
            process.exit(1);
        });
});