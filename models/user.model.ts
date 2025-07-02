import mongoose from "mongoose";
import { Role } from "../utils/enums";
import argon2 from "argon2";
import jwt from "jsonwebtoken";


interface UserDocument extends mongoose.Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    comparePassword(password: string): Promise<boolean>;
    generateToken(userId: string): string;
    hashPassword(): Promise<void>;
}


const userSchema = new mongoose.Schema<UserDocument>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Role,
        default: Role.USER,
    },
}, {
    timestamps: true,
});


const User = mongoose.model<UserDocument>("User", userSchema);

userSchema.methods.hashPassword = async function () {
    this.password = await argon2.hash(this.password);
};

userSchema.methods.comparePassword = async function (password: string) {
    return await argon2.verify(this.password, password);
};

userSchema.methods.generateToken = function (userId: string) {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};



export default User;
