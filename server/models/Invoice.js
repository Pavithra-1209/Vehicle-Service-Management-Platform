import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
	vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
	appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
	totalAmount: { type: Number, required: true, min: 0 },
	paymentStatus: { type: String, enum: ["PENDING", "PAID", "FAILED"], default: "PENDING" },
}, { timestamps: true });

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;