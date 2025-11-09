"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Link as LinkIcon,
  Search,
  Package,
  MousePointerClick,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";
import { TrackingLinkModal } from "@/components/tracking-link-modal";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  images: string[];
  views: number;
  conversions: number;
  commissionRate: number;
  productUrl: string;
  brandId: {
    _id: string;
  };
}

export default function CreatorMarketplacePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [myLinks, setMyLinks] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showNewOnly, setShowNewOnly] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchMyLinks();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data) {
          setProducts(result.data);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchMyLinks = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:8000/api/creator/links", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data) {
          // Create a Set of product IDs that the creator has already accessed
          const productIds = new Set<string>(
            result.data.map((link: any) => link.productId as string)
          );
          setMyLinks(productIds);
        }
      }
    } catch (error) {
      console.error("Failed to fetch my links:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    // New products only filter (products not in myLinks)
    const matchesNewOnly = !showNewOnly || !myLinks.has(product._id);

    return matchesSearch && matchesCategory && matchesNewOnly;
  });

  // Get unique categories from products
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const calculateCPC = (product: Product) => {
    return product.commissionRate;
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar role="creator" />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading campaigns...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const getTrackingLink = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Refresh links after modal closes (in case a new link was generated)
    fetchMyLinks();
  };

  const isProductAdded = (productId: string) => {
    return myLinks.has(productId);
  };

  return (
    <div className="flex h-screen">
      <Sidebar role="creator" />

      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">Campaign Marketplace</h1>
              <Badge variant="secondary" className="bg-secondary">
                {products.length} Active
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Browse campaigns and start earning per click
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 border-2">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search campaigns..."
                      className="pl-10 border-2"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* View Toggle */}
                  <div className="flex gap-2 border-2 rounded-lg p-1">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="gap-2"
                    >
                      <LayoutGrid className="h-4 w-4" />
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "table" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("table")}
                      className="gap-2"
                    >
                      <TableIcon className="h-4 w-4" />
                      Table
                    </Button>
                  </div>
                </div>

                {/* Category and New Filter */}
                <div className="flex gap-4 items-center">
                  <div className="flex-1 flex gap-2 items-center">
                    <label className="text-sm font-medium text-muted-foreground">
                      Category:
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border-2 rounded-lg px-3 py-1.5 text-sm bg-background"
                    >
                      <option value="all">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Button
                    variant={showNewOnly ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowNewOnly(!showNewOnly)}
                    className="gap-2"
                  >
                    {showNewOnly ? "Showing New Only" : "Show New Only"}
                  </Button>

                  {(selectedCategory !== "all" ||
                    showNewOnly ||
                    searchQuery) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("all");
                        setShowNewOnly(false);
                        setSearchQuery("");
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Display */}
          {filteredProducts.length === 0 ? (
            <Card className="border-2">
              <CardContent className="py-16">
                <div className="text-center">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">
                    No Campaigns Available
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchQuery
                      ? "No campaigns match your search. Try different keywords."
                      : "There are no active campaigns right now. Check back soon!"}
                  </p>
                  {searchQuery && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            /* Grid View */
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => {
                console.log("product", product);
                const cpc = calculateCPC(product);
                const displayPrice = product.salePrice || product.price;

                return (
                  <Card
                    key={product._id}
                    className="overflow-hidden hover:shadow-lg transition-shadow border-2"
                  >
                    <div className="h-48 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 flex items-center justify-center">
                      {product.images &&
                      product.images.length > 0 &&
                      product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-44 w-44 object-contain"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <Package className="h-12 w-12 text-secondary mx-auto mb-2" />
                          <span className="text-xs text-muted-foreground">
                            {product.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                        {product.views > 0 && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MousePointerClick className="h-3 w-3" />
                            {product.views}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-base line-clamp-1 mb-1">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-xs line-clamp-2">
                        {product.description || "No description available"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg p-3 mb-3 border-2 border-accent/20">
                        <div className="text-base font-bold text-accent">
                          Earn ₹{cpc}/click
                        </div>
                      </div>
                      {isProductAdded(product._id) ? (
                        <Badge className="w-full justify-center py-2 bg-accent hover:bg-accent">
                          Added To My Links
                        </Badge>
                      ) : (
                        <Button
                          onClick={() => getTrackingLink(product)}
                          size="sm"
                          className="w-full gap-2 bg-secondary hover:bg-secondary/90"
                        >
                          <LinkIcon className="h-3 w-3" />
                          Get Link
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <Card className="border-2">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2">
                        <th className="text-left p-4 font-semibold">
                          Campaign
                        </th>
                        <th className="text-left p-4 font-semibold">
                          Category
                        </th>
                        <th className="text-left p-4 font-semibold">
                          CPC Rate
                        </th>
                        <th className="text-center p-4 font-semibold">Views</th>
                        <th className="text-right p-4 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product) => {
                        const cpc = calculateCPC(product);

                        return (
                          <tr
                            key={product._id}
                            className="border-b hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                          >
                            <td className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 flex items-center justify-center flex-shrink-0">
                                  {product.images &&
                                  product.images.length > 0 &&
                                  product.images[0] ? (
                                    <img
                                      src={product.images[0]}
                                      alt={product.name}
                                      className="h-full w-full object-contain rounded-lg p-1"
                                    />
                                  ) : (
                                    <Package className="h-8 w-8 text-secondary" />
                                  )}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-semibold line-clamp-1">
                                    {product.name}
                                  </div>
                                  <div className="text-sm text-muted-foreground line-clamp-2">
                                    {product.description || "No description"}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant="outline" className="text-xs">
                                {product.category}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="font-bold text-accent">
                                ₹{cpc} per click
                              </div>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                                <MousePointerClick className="h-4 w-4" />
                                {product.views || 0}
                              </div>
                            </td>
                            <td className="p-4 text-right">
                              {isProductAdded(product._id) ? (
                                <Badge className="bg-accent hover:bg-accent">
                                  Added To My Links
                                </Badge>
                              ) : (
                                <Button
                                  onClick={() => getTrackingLink(product)}
                                  size="sm"
                                  className="gap-2 bg-secondary hover:bg-secondary/90"
                                >
                                  <LinkIcon className="h-4 w-4" />
                                  Get Link
                                </Button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      {/* Tracking Link Modal */}
      <TrackingLinkModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
