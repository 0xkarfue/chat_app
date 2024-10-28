import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/auth.routes.js'; // Adjust the path as needed
import connectDB from './config/db.js'; // Import your database connection
import { DB_NAME } from './constants.js'; // Import your constants

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// Connect to MongoDB Atlas
connectDB()
	.then(() => console.log(`Connected to MongoDB Atlas - Database: ${DB_NAME}`))
	.catch(err => console.error("MongoDB connection error:", err));

// Define Routes
app.use('/api/users', userRoutes); // Define user-related routes

// Error handling middleware (optional)
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something went wrong!');
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

