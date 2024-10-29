import { Server } from "socket.io";
import { authenticateToken } from "../middlewares/auth.middlewares.js"; // Assuming verifyJWT is a middleware for JWT verification
import { User } from "../models/user.models.js";
import { Message } from "../models/message.models.js";
import { ChatRoom } from "../models/chatRoom.models.js";

export const setupSocketServer = (server) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000/",  // Adjust for your frontend's origin if needed
			methods: ["GET", "POST"]
		}
	});

	// Middleware to verify JWT on connection
	io.use(async (socket, next) => {
		try {
			const token = socket.handshake.auth.token;
			const user = verifyJWT(token); // Verifies the JWT token from client auth
			socket.userId = user._id;      // Attach user ID to socket instance
			next();
		} catch (error) {
			next(new Error("Unauthorized"));
		}
	});

	// Event handlers
	io.on("connection", (socket) => {
		console.log(`User connected: ${socket.userId}`);

		// Join a chat room
		socket.on("joinRoom", async (roomId) => {
			const room = await Chatroom.findById(roomId);
			if (room) {
				socket.join(roomId);
				console.log(`User ${socket.userId} joined room: ${roomId}`);
			} else {
				socket.emit("error", "Room not found");
			}
		});

		// Send a message
		socket.on("sendMessage", async (data) => {
			const { roomId, content } = data;
			const newMessage = new Message({
				chatroom: roomId,
				sender: socket.userId,
				content,
			});
			await newMessage.save();

			// Emit message to other users in the room
			io.to(roomId).emit("receiveMessage", newMessage);
		});

		// User disconnects
		socket.on("disconnect", () => {
			console.log(`User disconnected: ${socket.userId}`);
		});
	});
};

