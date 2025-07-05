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
    generateToken(): string;
    hashPassword(password: string): Promise<void>;
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
        default: Role.EMPLOYEE,
    },
}, {
    timestamps: true,
});


userSchema.methods.hashPassword = async function (password: string) {
    this.password = await argon2.hash(password);
};

userSchema.methods.comparePassword = async function (password: string) {
    return await argon2.verify(this.password, password);
};

userSchema.methods.generateToken = function () {
    return jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET!, { expiresIn: "1h" });
};

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
