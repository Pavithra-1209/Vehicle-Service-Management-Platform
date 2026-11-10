import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
	vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
	technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
	serviceType: { type: String, required: true, trim: true },
	appointmentDate: { type: Date, required: true },
	status: { type: String, enum: ["PENDING", "ASSIGNED", "IN_PROGRESS", "COMPLETED"], 
		default: "PENDING" },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;