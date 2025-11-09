import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { BrandDashboardService } from "../services/brandDashboardService";

/**
 * @desc    Get unified brand dashboard data
 * @route   GET /api/brand/dashboard
 * @access  Private (Brand only)
 */
export const getBrandDashboard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const brandId = req.user?.id;

    if (!brandId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    // Fetch all dashboard data using the service
    const dashboardData = await BrandDashboardService.getDashboardData(brandId);

    res.status(200).json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    next(error);
  }
};

