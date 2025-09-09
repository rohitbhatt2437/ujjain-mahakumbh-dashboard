import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', registerUser); // New route for creating users
router.post('/login', loginUser);     // Existing route, now using new logic

export default router;