import express from 'express';
import multer from 'multer';
import { generateImage, } from '../controllers/contentController';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 100, // 5MB limit
  },
});

const router = express.Router();

// Upload and generate content
router.route('/content')
  .post(generateImage);

// Serve images by ID


export default router;