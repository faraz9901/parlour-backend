import { AppError, asyncHandler, AppResponse } from "../utils";
import User from "../models/user.model";
import { registerValidation } from "../utils/validations";

export const loginController = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Email and password are required", 400);
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new AppError("User not found", 404);
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401);
    }

    const token = user.generateToken();

    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json(new AppResponse(200, "User logged in successfully"));
});


export const registerController = asyncHandler(async (req, res) => {

    const registerValidationResult = registerValidation.parse(req.body);

    const { name, email, password, role } = registerValidationResult;

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

    await newUser.hashPassword();

    await newUser.save();

    res.status(201).json(new AppResponse(201, "User registered successfully", { user: newUser }));
});

export const logoutController = asyncHandler(async (req, res) => {
    res.clearCookie("token");
    res.status(200).json(new AppResponse(200, "User logged out successfully"));
});

export const checkSessionController = asyncHandler(async (req, res) => {

    if (!req.user) {
        throw new AppError("User not found", 404);
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        throw new AppError("User not found", 404);
    }

    // Hide password from response
    const { password, ...rest } = user.toObject();

    res.status(200).json(new AppResponse(200, "User found", rest));
});
