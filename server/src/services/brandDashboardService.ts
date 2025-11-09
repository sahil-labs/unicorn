import User from "../models/User";
import Product from "../models/Product";
import Click from "../models/Click";

interface BrandDashboardData {
  brandInfo: {
    name: string;
    email: string;
    role: string;
  };
  stats: {
    activeCampaigns: number;
    totalClicks: number;
    activeCreators: number;
    totalSpent: number;
    avgCPC: number;
    clicksChange: number;
    creatorsChange: number;
  };
  recentActivity: Array<{
    creator: string;
    campaign: string;
    clicks: number;
    cpc: number;
    time: string;
  }>;
  topCampaigns: Array<{
    name: string;
    clicks: number;
    spend: number;
    cpc: number;
  }>;
}

export class BrandDashboardService {
  /**
   * Get brand information
   */
  static async getBrandInfo(brandId: string) {
    const brand = await User.findById(brandId).select("-password");
    
    if (!brand) {
      throw new Error("Brand not found");
    }

    return {
      name: brand.name,
      email: brand.email,
      role: brand.role,
    };
  }

  /**
   * Get brand products/campaigns
   */
  static async getBrandProducts(brandId: string) {
    const products = await Product.find({ brandId, isActive: true }).sort({
      createdAt: -1,
    });

    return products;
  }

  /**
   * Get click statistics
   */
  static async getClickStats(brandId: string) {
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() - 14);

    // Total verified clicks
    const totalClicks = await Click.countDocuments({
      brandId,
      isVerified: true,
    });

    // Clicks this week
    const clicksThisWeek = await Click.countDocuments({
      brandId,
      isVerified: true,
      createdAt: { $gte: startOfThisWeek },
    });

    // Clicks last week
    const clicksLastWeek = await Click.countDocuments({
      brandId,
      isVerified: true,
      createdAt: { $gte: startOfLastWeek, $lt: startOfThisWeek },
    });

    // Calculate percentage change
    const clicksChange =
      clicksLastWeek > 0
        ? Math.round(((clicksThisWeek - clicksLastWeek) / clicksLastWeek) * 100)
        : 0;

    // Total spent (sum of all click earnings)
    const spendResult = await Click.aggregate([
      {
        $match: {
          brandId: brandId,
          isVerified: true,
          status: "verified",
        },
      },
      {
        $group: {
          _id: null,
          totalSpent: { $sum: "$earnings" },
        },
      },
    ]);

    const totalSpent = spendResult.length > 0 ? spendResult[0].totalSpent : 0;

    // Average CPC
    const avgCPC = totalClicks > 0 ? Math.round(totalSpent / totalClicks) : 0;

    return {
      totalClicks,
      clicksThisWeek,
      clicksLastWeek,
      clicksChange,
      totalSpent: Math.round(totalSpent),
      avgCPC,
    };
  }

  /**
   * Get active creators count
   */
  static async getActiveCreators(brandId: string) {
    const now = new Date();
    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - 7);
    const startOfLastWeek = new Date(now);
    startOfLastWeek.setDate(now.getDate() - 14);

    // Unique creators this week
    const creatorsThisWeek = await Click.distinct("creatorId", {
      brandId,
      isVerified: true,
      createdAt: { $gte: startOfThisWeek },
    });

    // Unique creators last week
    const creatorsLastWeek = await Click.distinct("creatorId", {
      brandId,
      isVerified: true,
      createdAt: { $gte: startOfLastWeek, $lt: startOfThisWeek },
    });

    const activeCreators = creatorsThisWeek.length;
    const creatorsChange =
      creatorsLastWeek.length > 0
        ? Math.round(
            ((creatorsThisWeek.length - creatorsLastWeek.length) /
              creatorsLastWeek.length) *
              100
          )
        : 0;

    return {
      activeCreators,
      creatorsChange,
    };
  }

  /**
   * Get recent activity (clicks from creators)
   */
  static async getRecentActivity(brandId: string, limit: number = 4) {
    const recentClicks = await Click.find({
      brandId,
      isVerified: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("creatorId", "name email")
      .populate("productId", "name salePrice price");

    const activity = recentClicks.map((click: any) => {
      const timeDiff = Date.now() - new Date(click.createdAt).getTime();
      const minutes = Math.floor(timeDiff / 60000);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      let timeStr = "Just now";
      if (days > 0) timeStr = `${days}d ago`;
      else if (hours > 0) timeStr = `${hours}h ago`;
      else if (minutes > 0) timeStr = `${minutes}m ago`;

      return {
        creator: click.creatorId?.name || `@creator_${click.creatorId}`,
        campaign: click.productId?.name || "Unknown Campaign",
        clicks: 1, // Each click record is 1 click
        cpc: click.earnings || click.productId?.salePrice || click.productId?.price || 0,
        time: timeStr,
      };
    });

    return activity;
  }

  /**
   * Get top performing campaigns
   */
  static async getTopCampaigns(brandId: string, limit: number = 4) {
    const topProducts = await Click.aggregate([
      {
        $match: {
          brandId: brandId,
          isVerified: true,
        },
      },
      {
        $group: {
          _id: "$productId",
          clicks: { $sum: 1 },
          totalSpent: { $sum: "$earnings" },
        },
      },
      {
        $sort: { clicks: -1 },
      },
      {
        $limit: limit,
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $project: {
          name: "$product.name",
          clicks: 1,
          spend: "$totalSpent",
          cpc: {
            $cond: [
              { $gt: ["$clicks", 0] },
              { $divide: ["$totalSpent", "$clicks"] },
              0,
            ],
          },
        },
      },
    ]);

    return topProducts.map((campaign) => ({
      name: campaign.name,
      clicks: campaign.clicks,
      spend: Math.round(campaign.spend),
      cpc: Math.round(campaign.cpc),
    }));
  }

  /**
   * Get complete dashboard data (unified method)
   */
  static async getDashboardData(brandId: string): Promise<BrandDashboardData> {
    try {
      // Fetch all data in parallel for better performance
      const [
        brandInfo,
        products,
        clickStats,
        creatorStats,
        recentActivity,
        topCampaigns,
      ] = await Promise.all([
        this.getBrandInfo(brandId),
        this.getBrandProducts(brandId),
        this.getClickStats(brandId),
        this.getActiveCreators(brandId),
        this.getRecentActivity(brandId, 4),
        this.getTopCampaigns(brandId, 4),
      ]);

      return {
        brandInfo,
        stats: {
          activeCampaigns: products.length,
          totalClicks: clickStats.totalClicks,
          activeCreators: creatorStats.activeCreators,
          totalSpent: clickStats.totalSpent,
          avgCPC: clickStats.avgCPC,
          clicksChange: clickStats.clicksChange,
          creatorsChange: creatorStats.creatorsChange,
        },
        recentActivity,
        topCampaigns,
      };
    } catch (error) {
      console.error("Error fetching brand dashboard data:", error);
      throw error;
    }
  }
}

