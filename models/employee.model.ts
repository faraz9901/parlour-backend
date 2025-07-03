import mongoose from "mongoose";

export interface EmployeeDocument extends mongoose.Document {
    name: string;
    email: string;
    phone: string;
    position: string;
    salary: number;
}

const employeeSchema = new mongoose.Schema<EmployeeDocument>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
}, {
    timestamps: true,
});

const Employee = mongoose.model<EmployeeDocument>("Employee", employeeSchema);
export default Employee;
