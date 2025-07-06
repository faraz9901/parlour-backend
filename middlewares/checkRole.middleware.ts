import { asyncHandler, AppError } from "../utils";
import { Role } from "../utils/enums";

const checkRole = (allowedRoles: Role[]) => asyncHandler(async (req, res, next) => {

    if (!req.user) {
        throw new AppError("You do not have permission to access this resource", 401);
    }

    const { role } = req.user;

    if (!allowedRoles.includes(role)) {
        throw new AppError("You do not have permission to access this resource", 401);
    }

    next();
});

export default checkRole;

