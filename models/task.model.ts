import mongoose from "mongoose";
import { TaskStatus } from "../utils/enums";

export interface TaskDocument extends mongoose.Document {
    title: string;
    description: string;
    assignedTo: mongoose.Types.ObjectId;
    status: TaskStatus;
}

const taskSchema = new mongoose.Schema<TaskDocument>({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    status: { type: String, enum: [TaskStatus.PENDING, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED], default: TaskStatus.PENDING },
}, {
    timestamps: true,
});

const Task = mongoose.model<TaskDocument>("Task", taskSchema);
export default Task;
