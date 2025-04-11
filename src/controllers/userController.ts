import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { asyncHandler } from '../middlewares/asyncHandler';

/**
 * @desc    Get all users
 * @route   GET /api/users
 */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).json(users);
});

/**
 * @desc    Get user by wallet address, or create if not exists
 * @route   GET /api/users/by-wallet?walletAddress=...
 * @access  Public
 */
export const getUserByWalletOrCreate = asyncHandler(async (req: Request, res: Response) => {
  const { walletAddress } = req.query;

  if (!walletAddress || typeof walletAddress !== 'string') {
    res.status(400);
    throw new Error('Wallet address query parameter is required');
  }

  let user = await User.findOne({ walletAddress: walletAddress as string });

  if (user) {
    // User found
    res.status(200).json(user);
  } else {
    // User not found, create a new one
    user = await User.create({ walletAddress });
    res.status(201).json(user); // Return newly created user with default values
  }
});

/**
 * @desc    Update user
 * @route   PUT /api/users/:walletAddress
 * @access  Public (or define appropriate access)
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  // Find user by walletAddress from route params
  const user = await User.findOne({ walletAddress: req.params.walletAddress });

  if (user) {
    // Update fields from request body if they exist
    // Note: Should we allow updating walletAddress itself? Probably not via this route.
    user.mintingFrequency = req.body.mintingFrequency !== undefined ? req.body.mintingFrequency : user.mintingFrequency;
    user.isAutoMintEnabled = req.body.isAutoMintEnabled !== undefined ? req.body.isAutoMintEnabled : user.isAutoMintEnabled;
    user.nextMintingTimestamp = req.body.nextMintingTimestamp !== undefined ? req.body.nextMintingTimestamp : user.nextMintingTimestamp;
    user.isSentimentAnalysisEnabled = req.body.isSentimentAnalysisEnabled !== undefined ? req.body.isSentimentAnalysisEnabled : user.isSentimentAnalysisEnabled;
    user.basePrompt = req.body.basePrompt !== undefined ? req.body.basePrompt : user.basePrompt;

    const updatedUser = await user.save();

    // Return updated user data
    res.status(200).json({
      _id: updatedUser._id, // Keep sending _id as it's the internal DB key
      walletAddress: updatedUser.walletAddress,
      mintingFrequency: updatedUser.mintingFrequency,
      isAutoMintEnabled: updatedUser.isAutoMintEnabled,
      nextMintingTimestamp: updatedUser.nextMintingTimestamp,
      isSentimentAnalysisEnabled: updatedUser.isSentimentAnalysisEnabled,
      basePrompt: updatedUser.basePrompt,
      createdAt: updatedUser.createdAt, // Include timestamps if needed
      updatedAt: updatedUser.updatedAt
    });
  } else {
    res.status(404);
    throw new Error('User not found for the given wallet address');
  }
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:walletAddress
 * @access  Public (or define appropriate access)
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  // Find user by walletAddress from route params
  const user = await User.findOne({ walletAddress: req.params.walletAddress });

  if (user) {
    // Consider if cascade deletes or other actions are needed
    await User.deleteOne({ _id: user._id }); // Use _id for deletion efficiency
    res.status(200).json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found for the given wallet address');
  }
});