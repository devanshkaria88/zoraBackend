import express from 'express';
import multer from 'multer';
import { generateImage } from '../controllers/contentController';

const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
});

const router = express.Router();

router.route('/content')
  .post(generateImage);


export default router;