import mongoose from "mongoose";

const serviceRecordSchema = new mongoose.Schema({
	vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
	technicianId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
	repairDetails: { type: String, trim: true },
	serviceStatus: { type: String, enum: ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"],
		 default: "PENDING" },
}, { timestamps: true });

const ServiceRecord = mongoose.model("ServiceRecord", serviceRecordSchema);
export default ServiceRecord;