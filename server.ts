import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { createServer } from "http";
import { AuthRequest, globalErrorHandler } from "./utils";
import { connectDB } from "./utils/db";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: process.env.APP_URL,
    credentials: true,
}));

app.use(express.json());

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.APP_URL,
        credentials: true,
    }
});

app.use((req: AuthRequest, res, next) => {
    req.io = io;
    next();
});

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
server.listen(PORT, () => {
    connectDB()
        .then(() => {
            console.log(`Server is running on port ${PORT}`);
        }).catch(() => {
            process.exit(1);
        });
});