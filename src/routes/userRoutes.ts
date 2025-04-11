import express from 'express';
import {
  getUserByWalletOrCreate,
  updateUser,
  deleteUser
} from '../controllers/userController';

const router = express.Router();

// New route: GET /api/users/by-wallet?walletAddress=...
router.route('/by-wallet')
  .get(getUserByWalletOrCreate);

// PUT /api/users/:walletAddress
// DELETE /api/users/:walletAddress
router.route('/:walletAddress')
  .put(updateUser)
  .delete(deleteUser);

export default router;