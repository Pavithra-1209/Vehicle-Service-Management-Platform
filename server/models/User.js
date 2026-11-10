import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	email: { type: String, required: true, unique: true, trim: true, lowercase: true,
		 match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'] },
	password: { type: String, required: true, minlength: 6, select: false },
	role: { type: String, enum: ["customer", "technician", "admin", "service_center"], 
		default: "customer" },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;