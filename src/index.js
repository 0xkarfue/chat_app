import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import connectDB from './config/db.js';

connectDB()

