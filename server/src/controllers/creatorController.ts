import { Response, NextFunction } from "express";
import Click from "../models/Click";
import Product from "../models/Product";
import CreatorLink from "../models/CreatorLink";
import { AuthRequest } from "../types";

/**
 * @desc    Get creator dashboard statistics
 * @route   GET /api/creator/stats
 * @access  Private (Creator only)
 */
export const getCreatorStats = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const creatorId = req.user?.id;

    if (!creatorId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Get date ranges for comparison
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() - 14);

    // Get total clicks
    const totalClicks = await Click.countDocuments({
      creatorId,
      isVerified: true,
    });

    // Get clicks this week
    const clicksThisWeek = await Click.countDocuments({
      creatorId,
      isVerified: true,
      createdAt: { $gte: startOfThisWeek },
    });

    // Get clicks last week
    const clicksLastWeek = await Click.countDocuments({
      creatorId,
      isVerified: true,
      createdAt: { $gte: startOfLastWeek, $lt: startOfThisWeek },
    });

    // Calculate clicks change percentage
    const clicksChange =
      clicksLastWeek > 0
        ? Math.round(((clicksThisWeek - clicksLastWeek) / clicksLastWeek) * 100)
        : 0;

    // Get total earnings
    const earningsResult = await Click.aggregate([
      {
        $match: {
          creatorId: creatorId,
          isVerified: true,
          status: "verified",
        },
      },
      {
        $group: {
          _id: null,
          totalEarnings: { $sum: "$earnings" },
        },
      },
    ]);

    const totalEarnings =
      earningsResult.length > 0 ? earningsResult[0].totalEarnings : 0;

    // Get earnings this week
    const earningsThisWeekResult = await Click.aggregate([
      {
        $match: {
          creatorId: creatorId,
          isVerified: true,
          status: "verified",
          createdAt: { $gte: startOfThisWeek },
        },
      },
      {
        $group: {
          _id: null,
          earnings: { $sum: "$earnings" },
        },
      },
    ]);

    const earningsThisWeek =
      earningsThisWeekResult.length > 0
        ? earningsThisWeekResult[0].earnings
        : 0;

    // Get earnings last week
    const earningsLastWeekResult = await Click.aggregate([
      {
        $match: {
          creatorId: creatorId,
          isVerified: true,
          status: "verified",
          createdAt: { $gte: startOfLastWeek, $lt: startOfThisWeek },
        },
      },
      {
        $group: {
          _id: null,
          earnings: { $sum: "$earnings" },
        },
      },
    ]);

    const earningsLastWeek =
      earningsLastWeekResult.length > 0
        ? earningsLastWeekResult[0].earnings
        : 0;

    // Calculate earnings change percentage
    const earningsChange =
      earningsLastWeek > 0
        ? Math.round(
            ((earningsThisWeek - earningsLastWeek) / earningsLastWeek) * 100
          )
        : 0;

    // Get active campaigns count (unique products with verified clicks)
    const activeCampaignsResult = await Click.distinct("productId", {
      creatorId: creatorId,
      isVerified: true,
    });
    const activeCampaigns = activeCampaignsResult.length;

    // Get available balance (verified clicks, not yet paid out)
    const availableBalanceResult = await Click.aggregate([
      {
        $match: {
          creatorId: creatorId,
          isVerified: true,
          status: "verified",
          // You can add a 'paidOut' field later to track payouts
        },
      },
      {
        $group: {
          _id: null,
          balance: { $sum: "$earnings" },
        },
      },
    ]);

    const availableBalance =
      availableBalanceResult.length > 0 ? availableBalanceResult[0].balance : 0;

    // Get pending balance (clicks awaiting verification)
    const pendingBalanceResult = await Click.aggregate([
      {
        $match: {
          creatorId: creatorId,
          status: "pending",
        },
      },
      {
        $group: {
          _id: null,
          balance: { $sum: "$earnings" },
        },
      },
    ]);

    const pendingBalance =
      pendingBalanceResult.length > 0 ? pendingBalanceResult[0].balance : 0;

    // Get earnings this week for the earnings overview
    const thisWeekEarnings = earningsThisWeek;

    res.status(200).json({
      success: true,
      data: {
        totalClicks,
        totalEarnings: Math.round(totalEarnings),
        activeCampaigns,
        clicksChange,
        earningsChange,
        availableBalance: Math.round(availableBalance),
        pendingBalance: Math.round(pendingBalance),
        thisWeekEarnings: Math.round(thisWeekEarnings),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get creator's tracking links
 * @route   GET /api/creator/links
 * @access  Private (Creator only)
 */
export const getCreatorLinks = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const creatorId = req.user?.id;

    if (!creatorId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Get creator links with product details
    const creatorLinks = await CreatorLink.find({
      creatorId: creatorId,
      isActive: true,
    })
      .populate("productId", "name salePrice price images category")
      .populate("brandId", "name")
      .sort({ createdAt: -1 });

    const links = creatorLinks.map((link: any) => ({
      id: link._id.toString(),
      productName: link.productId?.name || "Unknown Product",
      productId: link.productId?._id.toString() || "",
      brandName: link.brandId?.name || "Unknown Brand",
      trackingUrl: link.trackingUrl,
      trackingCode: link.trackingCode,
      clicks: link.clicks,
      earnings: Math.round(link.earnings),
      cpc: link.productId?.salePrice || link.productId?.price || 0,
      createdAt: link.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: links,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Generate tracking link for a campaign
 * @route   POST /api/creator/links/generate
 * @access  Private (Creator only)
 */
export const generateTrackingLink = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const creatorId = req.user?.id;
    const { productId } = req.body;

    if (!creatorId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    if (!productId) {
      res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
      return;
    }

    // Check if product exists
    const product = await Product.findById(productId).populate(
      "brandId",
      "name"
    );
    if (!product) {
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
      return;
    }

    // Check if tracking link already exists for this creator-product combination
    const existingLink = await CreatorLink.findOne({
      creatorId: creatorId,
      productId: productId,
    });

    if (existingLink) {
      res.status(200).json({
        success: true,
        data: {
          trackingUrl: existingLink.trackingUrl,
          trackingCode: existingLink.trackingCode,
          productName: product.name,
          productImage: product.images?.[0] || null,
          brandName: (product.brandId as any)?.name || "Unknown Brand",
          cpc: product.salePrice || product.price,
          alreadyExists: true,
        },
        message: "Tracking link already exists",
      });
      return;
    }

    // Generate unique tracking code
    const trackingCode = `${creatorId.slice(-6)}${productId.slice(
      -6
    )}${Date.now().toString(36)}`;
    const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";
    const trackingUrl = `${CLIENT_URL}/track/${trackingCode}`;

    // Create new creator link
    const creatorLink = await CreatorLink.create({
      creatorId,
      productId,
      brandId: product.brandId,
      trackingUrl,
      trackingCode,
      accessedLink: true,
    });

    // Increment creatorsInterestedCount on product
    await Product.findByIdAndUpdate(productId, {
      $inc: { creatorsInterestedCount: 1 },
    });

    res.status(201).json({
      success: true,
      data: {
        id: creatorLink._id,
        trackingUrl: creatorLink.trackingUrl,
        trackingCode: creatorLink.trackingCode,
        productName: product.name,
        productImage: product.images?.[0] || null,
        brandName: (product.brandId as any)?.name || "Unknown Brand",
        cpc: product.salePrice || product.price,
        alreadyExists: false,
      },
      message: "Tracking link generated successfully",
    });
  } catch (error) {
    next(error);
  }
};
