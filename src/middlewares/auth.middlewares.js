import jwt from "jsonwebtoken";

// Middleware to verify JWT
export const authenticateToken = (req, res, next) => {
	// Step 1: Get the token from the request headers
	const authHeader = req.headers["authorization"];
	const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

	// Step 2: Check if the token is not provided
	if (!token) {
		return res.status(401).json({ error: "Access token is required!" });
	}

	// Step 3: Verify the token
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) {
			return res.status(403).json({ error: "Invalid token!" });
		}

		// Step 4: Store user information in request object for further use
		req.user = user;
		next(); // Proceed to the next middleware or route handler
	});
};

