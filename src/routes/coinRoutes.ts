import express from 'express';
import { coinCreate } from '../controllers/coinController';
import multer from 'multer';


const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB limit
  },
});

const router = express.Router();

// New route: GET /api/users/by-wallet?walletAddress=...
router.route('/coin')
  .post(upload.single('file'), coinCreate);


export default router;