import { Response, NextFunction } from "express";
import Coupon from "../models/Coupon";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../types";

// Get all coupons for a brand
export const getBrandCoupons = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;

    const coupons = await Coupon.find({ brandId })
      .populate('applicableProducts', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: coupons.length,
      data: coupons,
    });
  } catch (error) {
    next(error);
  }
};

// Get single coupon
export const getCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const coupon = await Coupon.findById(id).populate('applicableProducts', 'name');

    if (!coupon) {
      throw new AppError("Coupon not found", 404);
    }

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

// Create new coupon
export const createCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;

    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: req.body.code.toUpperCase() });
    if (existingCoupon) {
      throw new AppError("Coupon code already exists", 400);
    }

    const couponData = {
      ...req.body,
      brandId,
      code: req.body.code.toUpperCase(),
    };

    const coupon = await Coupon.create(couponData);

    res.status(201).json({
      success: true,
      message: "Coupon created successfully",
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

// Update coupon
export const updateCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const brandId = req.user?.id;

    const coupon = await Coupon.findOne({ _id: id, brandId });

    if (!coupon) {
      throw new AppError("Coupon not found or unauthorized", 404);
    }

    // If code is being changed, check if new code already exists
    if (req.body.code && req.body.code.toUpperCase() !== coupon.code) {
      const existingCoupon = await Coupon.findOne({ code: req.body.code.toUpperCase() });
      if (existingCoupon) {
        throw new AppError("Coupon code already exists", 400);
      }
    }

    const updateData = {
      ...req.body,
      code: req.body.code ? req.body.code.toUpperCase() : undefined,
    };

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
      data: updatedCoupon,
    });
  } catch (error) {
    next(error);
  }
};

// Toggle coupon active status
export const toggleCouponStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const brandId = req.user?.id;

    const coupon = await Coupon.findOne({ _id: id, brandId });

    if (!coupon) {
      throw new AppError("Coupon not found or unauthorized", 404);
    }

    coupon.isActive = !coupon.isActive;
    await coupon.save();

    res.status(200).json({
      success: true,
      message: `Coupon ${coupon.isActive ? 'activated' : 'deactivated'} successfully`,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

// Delete coupon
export const deleteCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const brandId = req.user?.id;

    const coupon = await Coupon.findOneAndDelete({ _id: id, brandId });

    if (!coupon) {
      throw new AppError("Coupon not found or unauthorized", 404);
    }

    res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Validate coupon by code
export const validateCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { code } = req.params;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      throw new AppError("Invalid coupon code", 404);
    }

    const isValid = coupon.isValid();

    if (!isValid) {
      throw new AppError("Coupon is expired or inactive", 400);
    }

    res.status(200).json({
      success: true,
      data: coupon,
    });
  } catch (error) {
    next(error);
  }
};

