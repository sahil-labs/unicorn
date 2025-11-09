import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import couponRoutes from "./couponRoutes";
import analyticsRoutes from "./analyticsRoutes";
import creatorRoutes from "./creatorRoutes";
import brandRoutes from "./brandRoutes";

const router = Router();

// Health check
router.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    message: "API is healthy",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/coupons", couponRoutes);
router.use("/analytics", analyticsRoutes);
router.use("/creator", creatorRoutes);
router.use("/brand", brandRoutes);
router.use("/users", userRoutes);

export default router;
