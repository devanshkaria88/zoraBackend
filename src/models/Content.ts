import mongoose, { Document, Schema } from 'mongoose';

// Metadata interface
export interface IMetadata {
  name: string;
  description: string;
  image: string;
  properties: {
    [key: string]: string;
  };
}

// Content interface
export interface IContent extends Document {
  data: Buffer | IMetadata; // Buffer for images, IMetadata for JSON
  mimeType?: string; // For images only
  createdAt: Date;
  updatedAt: Date;
}

// Content schema
const contentSchema: Schema = new Schema(
  {
    data: {
      type: Schema.Types.Mixed, // Can be Buffer or Metadata object
      required: true
    },
    mimeType: {
      type: String
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

const Content = mongoose.model<IContent>('Content', contentSchema);

export default Content; 