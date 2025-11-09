import express from "express";
import { getBrandDashboard } from "../controllers/brandDashboardController";
import { verifyToken } from "../controllers/authController";

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// @route   GET /api/brand/dashboard
// @desc    Get unified brand dashboard data (brand info, stats, activity, campaigns)
// @access  Private (Brand only)
router.get("/dashboard", getBrandDashboard);

export default router;

