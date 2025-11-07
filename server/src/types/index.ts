import { Document } from "mongoose";
import { Request } from "express";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "CREATOR" | "BRAND" | "ADMIN";
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
