import mongoose, { Schema } from mongoose;

const chatRoomSchema = new Schema({
	roomId: {
		type: Sting,
		unique: true,
	},
	roomName: {
		type: Sting,
	},
	members: {
		type: [],
	},
	createdAt: {
		type: Date,
	},
}, { timestamps: true })

export const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema)
