import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	vehicleNumber: { type: String, required: true, trim: true },
	model: { type: String, required: true, trim: true },
	fuelType: { type: String, required: true, 
		enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG", "LPG"] },
	purchaseYear: { type: Number, required: true, min: 1900, max: new Date().getFullYear() },
	imageUrl: { type: String, required: false },
}, { timestamps: true });

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;