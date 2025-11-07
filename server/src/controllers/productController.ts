import { Response, NextFunction } from "express";
import Product from "../models/Product";
import { AppError } from "../middleware/errorHandler";
import { AuthRequest } from "../types";

// Get all products for a brand
export const getBrandProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;

    const products = await Product.find({ brandId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Get all active products (for marketplace)
export const getAllActiveProducts = async (
  _req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find({ isActive: true })
      .populate('brandId', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// Get single product
export const getProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id).populate('brandId', 'name email');

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Create new product
export const createProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;

    // Parse tags if it's a comma-separated string
    let tags = req.body.tags || [];
    if (typeof tags === 'string') {
      tags = tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
    }

    const productData = {
      ...req.body,
      brandId,
      tags,
    };

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Update product
export const updateProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const brandId = req.user?.id;

    const product = await Product.findOne({ _id: id, brandId });

    if (!product) {
      throw new AppError("Product not found or unauthorized", 404);
    }

    // Parse tags if it's a comma-separated string
    let tags = req.body.tags;
    if (typeof tags === 'string') {
      tags = tags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body, tags },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// Toggle product active status
export const toggleProductStatus = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const brandId = req.user?.id;

    const product = await Product.findOne({ _id: id, brandId });

    if (!product) {
      throw new AppError("Product not found or unauthorized", 404);
    }

    product.isActive = !product.isActive;
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product ${product.isActive ? 'activated' : 'deactivated'} successfully`,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// Delete product
export const deleteProduct = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const brandId = req.user?.id;

    const product = await Product.findOneAndDelete({ _id: id, brandId });

    if (!product) {
      throw new AppError("Product not found or unauthorized", 404);
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Increment product clicks
export const incrementClicks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndUpdate(
      id,
      { $inc: { clicks: 1 } },
      { new: true }
    );

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

