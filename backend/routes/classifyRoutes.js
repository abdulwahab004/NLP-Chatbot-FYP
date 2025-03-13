import express from 'express';
import multer from 'multer';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// Ensure the uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Endpoint: POST /api/classify
router.post('/', upload.single('audio'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  // Get the absolute path of the uploaded file
  const filePath = path.join(process.cwd(), req.file.path);

  // Call the Python script with the file path as argument
//   const pythonProcess = spawn('python', ['model_predict.py', filePath]);
const pythonProcess = spawn('python', ['../python_model/model_predict.py', filePath]);

  let scriptOutput = '';
  pythonProcess.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error('Python error:', data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ error: 'Error processing the file' });
    }
    try {
      const result = JSON.parse(scriptOutput);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: 'Failed to parse model output' });
    }
  });
});

export default router;
