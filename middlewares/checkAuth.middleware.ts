import { asyncHandler } from "../utils";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { AppError } from "../utils";
import { Role } from "../utils/enums";

const checkAuth = asyncHandler(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) {
        throw new AppError("Invalid Session", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: Role };


    if (!decoded || !decoded.userId || !decoded.role) {
        throw new AppError("Invalid Session", 401);
    }

    req.user = { _id: decoded.userId, role: decoded.role };

    next();
});

export default checkAuth;

