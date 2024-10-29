import mongoose, { Schema } from 'mongoose';

const chatRoomSchema = new Schema({
	roomId: {
		type: String,
		unique: true,
	},
	roomName: {
		type: String,
	},
	members: {
		type: [],
	},
	createdAt: {
		type: Date,
	},
}, { timestamps: true })

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema)
