import express from "express";
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


app.use(globalErrorHandler);

app.listen(PORT, () => {
    connectDB()
        .then(() => {
            console.log(`Server is running on port ${PORT}`);
        }).catch(() => {
            process.exit(1);
        });
});