import express from 'express';
//import { signup, login } from '../controllers/auth.controller.js';
import { signup, login } from '../controllers/auth.controllers.js';

const router = express.Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

export default router;

