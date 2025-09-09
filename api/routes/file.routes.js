const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controllers/file.controller');
const upload = require('../middleware/multer.middleware');

// The 'upload.single()' middleware processes the file before it hits the controller
router.post('/upload', upload.single('medicalFile'), uploadFile);

module.exports = router;