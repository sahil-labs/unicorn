import { Response, NextFunction } from 'express';
import Product from '../models/Product';
import { AuthRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

interface AnalyticsStats {
  totalRevenue: number;
  revenueChange: number;
  totalOrders: number;
  ordersChange: number;
  activeCreators: number;
  creatorsChange: number;
  productViews: number;
  viewsChange: number;
  conversionRate: number;
  conversionChange: number;
  avgOrderValue: number;
  avgOrderChange: number;
}

interface TopProduct {
  name: string;
  sales: number;
  revenue: number;
  productId: string;
}

interface TopCreator {
  name: string;
  clicks: number;
  conversions: number;
  earnings: number;
  creatorId: string;
}

// Helper function to get date range
const getDateRange = (days: number) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return { startDate, endDate };
};

// Get brand analytics overview
export const getBrandAnalytics = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;

    if (!brandId) {
      throw new AppError('Unauthorized', 401);
    }

    // Get current month and previous month date ranges
    const currentMonthStart = new Date();
    currentMonthStart.setDate(1);
    currentMonthStart.setHours(0, 0, 0, 0);

    const previousMonthStart = new Date(currentMonthStart);
    previousMonthStart.setMonth(previousMonthStart.getMonth() - 1);

    const previousMonthEnd = new Date(currentMonthStart);
    previousMonthEnd.setMilliseconds(-1);

    // Get all products for this brand
    const allProducts = await Product.find({ brandId });

    // Current month data
    const currentProducts = await Product.find({
      brandId,
      updatedAt: { $gte: currentMonthStart },
    });

    // Previous month data
    const previousProducts = await Product.find({
      brandId,
      updatedAt: { $gte: previousMonthStart, $lte: previousMonthEnd },
    });

    // Calculate current month stats
    const currentConversions = currentProducts.reduce((sum, p) => sum + p.conversions, 0);
    const currentClicks = currentProducts.reduce((sum, p) => sum + p.clicks, 0);
    const currentRevenue = currentProducts.reduce((sum, p) => {
      const price = p.salePrice || p.price;
      return sum + (price * p.conversions);
    }, 0);

    // Calculate previous month stats
    const previousConversions = previousProducts.reduce((sum, p) => sum + p.conversions, 0);
    const previousClicks = previousProducts.reduce((sum, p) => sum + p.clicks, 0);
    const previousRevenue = previousProducts.reduce((sum, p) => {
      const price = p.salePrice || p.price;
      return sum + (price * p.conversions);
    }, 0);

    // Calculate conversion rates
    const currentConversionRate = currentClicks > 0 
      ? (currentConversions / currentClicks) * 100 
      : 0;
    const previousConversionRate = previousClicks > 0 
      ? (previousConversions / previousClicks) * 100 
      : 0;

    // Calculate average order values
    const currentAvgOrderValue = currentConversions > 0 
      ? currentRevenue / currentConversions 
      : 0;
    const previousAvgOrderValue = previousConversions > 0 
      ? previousRevenue / previousConversions 
      : 0;

    // Calculate percentage changes
    const calculateChange = (current: number, previous: number): number => {
      if (previous === 0) return current > 0 ? 100 : 0;
      return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    // For now, activeCreators is 0 since we don't have creator tracking yet
    // This will be updated when affiliate link tracking is implemented
    const activeCreators = 0;
    const previousActiveCreators = 0;

    const stats: AnalyticsStats = {
      totalRevenue: Math.round(currentRevenue),
      revenueChange: calculateChange(currentRevenue, previousRevenue),
      totalOrders: currentConversions,
      ordersChange: calculateChange(currentConversions, previousConversions),
      activeCreators,
      creatorsChange: calculateChange(activeCreators, previousActiveCreators),
      productViews: currentClicks,
      viewsChange: calculateChange(currentClicks, previousClicks),
      conversionRate: Number(currentConversionRate.toFixed(1)),
      conversionChange: calculateChange(currentConversionRate, previousConversionRate),
      avgOrderValue: Math.round(currentAvgOrderValue),
      avgOrderChange: calculateChange(currentAvgOrderValue, previousAvgOrderValue),
    };

    // Get top performing products (all time, sorted by revenue)
    const topProducts: TopProduct[] = allProducts
      .map(product => {
        const price = product.salePrice || product.price;
        const revenue = price * product.conversions;
        return {
          name: product.name,
          sales: product.conversions,
          revenue: Math.round(revenue),
          productId: (product._id as any).toString(),
        };
      })
      .filter(p => p.sales > 0) // Only show products with sales
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5); // Top 5 products

    // Top creators - placeholder for now
    // This will be populated when creator/affiliate link tracking is implemented
    const topCreators: TopCreator[] = [];

    res.status(200).json({
      success: true,
      data: {
        stats,
        topProducts,
        topCreators,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get detailed product analytics
export const getProductAnalytics = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;
    const { productId } = req.params;

    if (!brandId) {
      throw new AppError('Unauthorized', 401);
    }

    const product = await Product.findOne({ _id: productId, brandId });

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    const price = product.salePrice || product.price;
    const revenue = price * product.conversions;
    const conversionRate = product.clicks > 0 
      ? (product.conversions / product.clicks) * 100 
      : 0;

    res.status(200).json({
      success: true,
      data: {
        productId: product._id,
        name: product.name,
        clicks: product.clicks,
        conversions: product.conversions,
        revenue: Math.round(revenue),
        conversionRate: Number(conversionRate.toFixed(2)),
        price,
        commissionRate: product.commissionRate,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get analytics time series data (for charts)
export const getAnalyticsTimeSeries = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;
    const { days = '30' } = req.query;

    if (!brandId) {
      throw new AppError('Unauthorized', 401);
    }

    const daysNumber = parseInt(days as string, 10);
    const { startDate } = getDateRange(daysNumber);

    // This is a simplified version
    // In production, you'd want to aggregate by day using MongoDB aggregation pipeline
    const products = await Product.find({
      brandId,
      updatedAt: { $gte: startDate },
    });

    const totalClicks = products.reduce((sum, p) => sum + p.clicks, 0);
    const totalConversions = products.reduce((sum, p) => sum + p.conversions, 0);
    const totalRevenue = products.reduce((sum, p) => {
      const price = p.salePrice || p.price;
      return sum + (price * p.conversions);
    }, 0);

    res.status(200).json({
      success: true,
      data: {
        period: `Last ${daysNumber} days`,
        clicks: totalClicks,
        conversions: totalConversions,
        revenue: Math.round(totalRevenue),
        // In production, include daily breakdown data points
        dataPoints: [],
      },
    });
  } catch (error) {
    next(error);
  }
};

