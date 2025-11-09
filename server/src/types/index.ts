import { Document } from "mongoose";
import { Request } from "express";
import mongoose from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "CREATOR" | "BRAND" | "ADMIN";
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document {
  brandId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  productUrl: string;
  commissionRate: number;
  category?: string;
  tags: string[];
  images: string[];
  isActive: boolean;
  clicks: number;
  conversions: number;
  creatorsInterestedCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICoupon extends Document {
  brandId: mongoose.Types.ObjectId;
  code: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minimumPurchase: number;
  usageLimit: number | null;
  usageCount: number;
  expiresAt: Date;
  isActive: boolean;
  applicableProducts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isValid(): boolean;
}

export interface IClick extends Document {
  creatorId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  trackingUrl: string;
  ipAddress: string;
  userAgent?: string;
  referrer?: string;
  isVerified: boolean;
  earnings: number;
  status: "pending" | "verified" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreatorLink extends Document {
  creatorId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  trackingUrl: string;
  trackingCode: string;
  accessedLink: boolean;
  clicks: number;
  earnings: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}
