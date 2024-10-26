import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
	messageId: {
		type: String,
		unique: true,
	},
	content: {
		type: String,
	},
	senderId: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	seenStatus: {
		type: Boolean,
		default: false,
	},
}, { timestamps: true })

export const Message = mongoose.model("Message", messageSchema);
