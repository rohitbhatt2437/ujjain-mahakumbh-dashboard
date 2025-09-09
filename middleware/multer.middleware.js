import multer from 'multer';
import fs from 'fs';
import path from 'path';

// Use ephemeral /tmp in serverless to avoid write errors; persistent in dev
const uploadDir = process.env.NODE_ENV === 'production'
  ? path.join('/tmp', 'uploads')
  : 'uploads';

// Ensure the uploads directory exists (best-effort)
try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
} catch (_) {
  // ignore if cannot create (Vercel may restrict in some contexts)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

export default upload;
