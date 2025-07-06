import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { globalErrorHandler } from "./utils";
import { connectDB } from "./utils/db";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
}));

app.use(express.json());

// Routes
import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import attendanceLogRoutes from "./routes/attendanceLog.routes";
import userRoutes from "./routes/user.route";

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceLogRoutes);

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    globalErrorHandler(err, req, res, next);
});

// Server
app.listen(PORT, () => {
    connectDB()
        .then(() => {
            console.log(`Server is running on port ${PORT}`);
        }).catch(() => {
            process.exit(1);
        });
});