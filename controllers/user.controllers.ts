import { asyncHandler } from "../utils";
import { userCreationValidation } from "../utils/validations";
import User from "../models/user.model";
import { AppError, AppResponse } from "../utils";
import { Role } from "../utils/enums";

export const userCreationController = asyncHandler(async (req, res) => {

    const userCreationValidationResult = userCreationValidation.parse(req.body);

    const { name, email, password, role } = userCreationValidationResult;

    const user = await User.findOne({ email });

    if (user) {
        throw new AppError("User already exists", 400);
    }

    const newUser = new User({
        name,
        email,
        password,
        role,
    })

    await newUser.hashPassword(password);

    await newUser.save();

    res.status(201).json(new AppResponse(201, "User registered successfully", { user: newUser }));
});



export const userGetController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.status(200).json(new AppResponse(200, "User found", user));
});


export const userGetAllController = asyncHandler(async (req, res) => {
    const users = await User.find({ role: { $ne: Role.SUPER_ADMIN } }).select("-password");
    res.status(200).json(new AppResponse(200, "All users", users));
});


export const userUpdateController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findById(id);


    if (!user) {
        throw new AppError("User not found", 404);
    }

    if (password) {
        await user.hashPassword(password);
    }

    user.name = name;
    user.email = email;
    user.role = role;

    const updatedUser = await user.save();

    res.status(200).json(new AppResponse(200, "User updated successfully", { user: updatedUser }));
});

export const userDeleteController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    res.status(200).json(new AppResponse(200, "User deleted successfully", user));
});