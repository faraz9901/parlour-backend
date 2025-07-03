import mongoose from "mongoose";

export interface AttendanceLogDocument extends mongoose.Document {
    employee: mongoose.Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
}

const attendanceLogSchema = new mongoose.Schema<AttendanceLogDocument>({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date },
}, {
    timestamps: true,
});

const AttendanceLog = mongoose.model<AttendanceLogDocument>("AttendanceLog", attendanceLogSchema);
export default AttendanceLog;
