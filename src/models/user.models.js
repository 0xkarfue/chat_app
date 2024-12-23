import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		index: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowecase: true,
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	googleId: {},
	avatar: {
		type: String
	},
	userId: {
		type: String,
		unique: true,
		default: () => new mongoose.Types.ObjectId().toString()
	},
	onlineStatus: {
		type: Boolean,
		default: false,
	},
	lastSeen: {
		type: Date,
	},
	refreshToken: {
		type: String,
	},
}, { timestamps: true })


userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next()
	this.password = bcryptjs.hash(this.password, 10)
	next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcryptjs.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
	return jwt.sign(
		{
			_id: this._id,
			email: this.email,
			username: this.username,
		},
		process.env.ACCESS_TOKEN_SECRET,
		{
			expiresIn: process.env.ACCESS_TOKEN_EXPIRY
		}
	)
}

userSchema.methods.generateRefreshToken = function () {
	return jwt.sign(
		{
			_id: this._id,
		},
		process.env.REFRESH_TOKEN_SECRET,
		{
			expiresIn: process.env.REFRESH_TOKEN_EXPIRY
		}
	)
}

export const User = mongoose.model("User", userSchema)


