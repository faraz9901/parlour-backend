import mongoose from "mongoose";

export interface AttendanceLogDocument extends mongoose.Document {
    employee: mongoose.Types.ObjectId;
    checkIn: Date;
    checkOut: Date;
}

const attendanceLogSchema = new mongoose.Schema<AttendanceLogDocument>({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, default: null },
}, {
    timestamps: true,
});

const AttendanceLog = mongoose.model<AttendanceLogDocument>("AttendanceLog", attendanceLogSchema);
export default AttendanceLog;
