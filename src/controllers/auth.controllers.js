import { User } from "../models/user.models.js"; // adjust path as needed
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	try {
		// Step 1: Get user info from the request
		const { username, email, password } = req.body;

		// Step 2: Check if the email or username already exists in the database
		const existingUser = await User.findOne({ $or: [{ email }, { username }] });
		if (existingUser) {
			return res.status(400).json({ error: "User with that username or email already exists!" });
		}

		// Step 3: Hash the password
		const hashedPassword = await bcryptjs.hash(password, 10);

		// Step 4: Create the user object
		const newUser = new User({
			username,
			email,
			password: hashedPassword,
		});

		// Step 5: Save the user to the database
		await newUser.save();

		// Step 6: Generate a token for the new user
		const accessToken = newUser.generateAccessToken();

		// Step 7: Send a response with the token and a success message
		res.status(201).json({ message: "User created successfully!", accessToken });
	} catch (error) {
		// Handle errors
		console.error(error);
		res.status(500).json({ error: "Something went wrong!" });
	}
};





export const login = async (req, res) => {
	try {
		// Step 1: Get user credentials from the request
		const { usernameOrEmail, password } = req.body;

		// Step 2: Find the user by username or email
		const user = await User.findOne({
			$or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
		});

		// Step 3: Check if user exists
		if (!user) {
			return res.status(400).json({ error: "Invalid username or password!" });
		}

		// Step 4: Check if the password is correct
		const isPasswordCorrect = await user.isPasswordCorrect(password);
		if (!isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password!" });
		}

		// Step 5: Generate an access token
		const accessToken = user.generateAccessToken();

		// Step 6: Send a response with the token
		res.status(200).json({ message: "Login successful!", accessToken });
	} catch (error) {
		// Handle errors
		console.error(error);
		res.status(500).json({ error: "Something went wrong!" });
	}
};
