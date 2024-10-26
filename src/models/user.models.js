import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	googleId: {},
	avatar: {
		type: String
	},
	userId: {
		type: String,
		unique: true
	},
	onlineStatus: {
		type: Boolean,
		default: false,
	},
	lastSeen: {
		type: Date,
	},
}, { timestamps: true })


export const User = mongoose.model("User", userSchema)


