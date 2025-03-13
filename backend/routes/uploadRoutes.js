import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("audio"), (req, res) => {
  console.log("Received file:", req.file); // Debugging

  if (!req.file) {
    console.error("No file received!");
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({ message: "File uploaded successfully!", filePath: `/uploads/${req.file.filename}`, data:{
    "birdName": "Sparrow",
    "description": "A small, plump bird commonly found in urban areas.",
    "accuracy": 92.5,
    "imageUrl": "https://example.com/sparrow.jpg"
  } });
});

export default router;
