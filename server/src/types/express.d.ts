import { Request } from "express";

declare global {
  namespace Express {
    export interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
      };
    }
  }
}

// Extend the Request interface to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      email: string;
      name: string;
    };
  }
}

export {};
