import express from 'express';
import {
  getCreatorStats,
  getCreatorLinks,
  generateTrackingLink,
} from '../controllers/creatorController';
import { verifyToken } from '../controllers/authController';

const router = express.Router();

// All routes require authentication
router.use(verifyToken);

// @route   GET /api/creator/stats
// @desc    Get creator dashboard statistics
// @access  Private
router.get('/stats', getCreatorStats);

// @route   GET /api/creator/links
// @desc    Get creator's tracking links
// @access  Private
router.get('/links', getCreatorLinks);

// @route   POST /api/creator/links/generate
// @desc    Generate tracking link for a campaign
// @access  Private
router.post('/links/generate', generateTrackingLink);

export default router;

