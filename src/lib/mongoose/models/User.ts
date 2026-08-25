import mongoose from 'mongoose';

export const User = mongoose.model(
	'User',
	new mongoose.Schema({
		isActive: { type: Boolean, default: false },
		passwordHash: { type: String, required: true },
		username: { type: String, required: true, unique: true }
	})
);
