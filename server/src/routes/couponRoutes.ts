import { Router } from "express";
import { body } from "express-validator";
import {
  getBrandCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  toggleCouponStatus,
  deleteCoupon,
  validateCoupon,
} from "../controllers/couponController";
import { verifyToken } from "../controllers/authController";
import { validateRequest } from "../middleware/validation";

const router = Router();

// Validation rules
const couponValidation = [
  body("code")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("Coupon code must be between 3 and 20 characters")
    .matches(/^[A-Z0-9_-]+$/i)
    .withMessage("Coupon code can only contain letters, numbers, hyphens and underscores"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("discountType")
    .isIn(['percentage', 'fixed'])
    .withMessage("Discount type must be 'percentage' or 'fixed'"),
  body("discountValue")
    .isFloat({ min: 0 })
    .withMessage("Discount value must be a positive number"),
  body("minimumPurchase")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Minimum purchase must be a positive number"),
  body("usageLimit")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Usage limit must be at least 1"),
  body("expiresAt")
    .isISO8601()
    .withMessage("Please provide a valid expiration date")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error('Expiration date must be in the future');
      }
      return true;
    }),
  body("applicableProducts")
    .optional()
    .isArray()
    .withMessage("Applicable products must be an array"),
];

// Public routes
router.get("/validate/:code", validateCoupon); // Validate coupon code

// Protected routes (require authentication)
router.use(verifyToken); // All routes below require auth

// Brand routes
router.get("/my-coupons", getBrandCoupons); // Brand's own coupons
router.post("/", couponValidation, validateRequest, createCoupon);
router.get("/:id", getCoupon);
router.put("/:id", couponValidation, validateRequest, updateCoupon);
router.patch("/:id/toggle-status", toggleCouponStatus);
router.delete("/:id", deleteCoupon);

export default router;

