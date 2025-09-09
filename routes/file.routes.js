import express from 'express';
import { uploadFile } from '../controllers/file.controller.js';
import upload from '../middleware/multer.middleware.js';

const router = express.Router();

// The 'upload.single()' middleware processes the file before it hits the controller
router.post('/upload', upload.single('medicalFile'), uploadFile);

export default router;