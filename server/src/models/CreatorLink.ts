import { Schema, model } from 'mongoose';
import { ICreatorLink } from '../types';

const creatorLinkSchema = new Schema<ICreatorLink>(
  {
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Creator ID is required'],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Product ID is required'],
    },
    brandId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Brand ID is required'],
    },
    trackingUrl: {
      type: String,
      required: [true, 'Tracking URL is required'],
      unique: true,
    },
    trackingCode: {
      type: String,
      required: [true, 'Tracking code is required'],
      unique: true,
    },
    accessedLink: {
      type: Boolean,
      default: true, // True when creator accesses/generates the link
    },
    clicks: {
      type: Number,
      default: 0,
    },
    earnings: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
creatorLinkSchema.index({ creatorId: 1, productId: 1 });
creatorLinkSchema.index({ trackingCode: 1 });
creatorLinkSchema.index({ creatorId: 1, createdAt: -1 });

const CreatorLink = model<ICreatorLink>('CreatorLink', creatorLinkSchema);

export default CreatorLink;

