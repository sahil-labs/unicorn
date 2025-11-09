import { Schema, model } from 'mongoose';
import { IClick } from '../types';

const clickSchema = new Schema<IClick>(
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
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
    },
    referrer: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    earnings: {
      type: Number,
      required: [true, 'Earnings amount is required'],
      default: 0,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
clickSchema.index({ creatorId: 1, createdAt: -1 });
clickSchema.index({ productId: 1, createdAt: -1 });
clickSchema.index({ brandId: 1, createdAt: -1 });
clickSchema.index({ status: 1, isVerified: 1 });

const Click = model<IClick>('Click', clickSchema);

export default Click;

