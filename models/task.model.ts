import mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
    title: string;
    description: string;
    assignedTo: mongoose.Types.ObjectId;
    status: string;
    dueDate: Date;
}

const taskSchema = new mongoose.Schema<TaskDocument>({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
    dueDate: { type: Date },
}, {
    timestamps: true,
});

const Task = mongoose.model<TaskDocument>("Task", taskSchema);
export default Task;
