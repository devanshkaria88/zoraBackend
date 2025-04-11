import mongoose, { Document, Schema } from 'mongoose';

// User interface
export interface IUser extends Document {
  walletAddress?: string; // Optional wallet address
  mintingFrequency?: string; // Optional minting frequency (e.g., 'daily', 'weekly')
  isAutoMintEnabled?: boolean; // Optional flag for auto minting
  nextMintingTimestamp?: Date; // Optional timestamp for next minting
  isSentimentAnalysisEnabled?: boolean; // Optional flag for sentiment analysis
  basePrompt?: string; // Added basePrompt field
  createdAt: Date;
  updatedAt: Date;
}

// User schema
const userSchema: Schema = new Schema(
  {
    walletAddress: {
      type: String,
      trim: true
      // Add validation if needed, e.g., regex for wallet address format
    },
    mintingFrequency: {
      type: String,
      // Consider using an enum if there are predefined frequencies
      // enum: ['daily', 'weekly', 'monthly'],
      trim: true
    },
    isAutoMintEnabled: {
      type: Boolean,
      default: false
    },
    nextMintingTimestamp: {
      type: Date
    },
    isSentimentAnalysisEnabled: {
      type: Boolean,
      default: false
    },
    basePrompt: {
      type: String,
      trim: true,
      default: '' // Default to an empty string or set a predefined default prompt
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;