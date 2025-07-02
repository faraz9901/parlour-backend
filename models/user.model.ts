import mongoose from "mongoose";
import { Role } from "../utils/enums";

const userSchema = new mongoose.Schema({
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
        default: "user",
    },
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;
