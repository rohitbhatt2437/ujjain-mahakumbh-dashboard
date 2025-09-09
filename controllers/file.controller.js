import File from '../models/file.model.js';

const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    const newFile = new File({
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
    });

    const savedFile = await newFile.save();
    console.log('File uploaded and metadata saved:', savedFile);

    res.status(201).json({
      message: 'File uploaded successfully!',
      file: savedFile
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Server error during file upload.' });
  }
};

export {
  uploadFile
};