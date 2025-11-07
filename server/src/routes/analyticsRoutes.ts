import express from 'express';
import {
  getBrandAnalytics,
  getProductAnalytics,
  getAnalyticsTimeSeries,
} from '../controllers/analyticsController';
import { verifyToken } from '../controllers/authController';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// @route   GET /api/analytics/overview
// @desc    Get brand analytics overview (stats, top products, top creators)
// @access  Private (Brand only)
router.get('/overview', getBrandAnalytics);

// @route   GET /api/analytics/product/:productId
// @desc    Get detailed analytics for a specific product
// @access  Private (Brand only)
router.get('/product/:productId', getProductAnalytics);

// @route   GET /api/analytics/timeseries
// @desc    Get time series analytics data for charts
// @access  Private (Brand only)
router.get('/timeseries', getAnalyticsTimeSeries);

export default router;

