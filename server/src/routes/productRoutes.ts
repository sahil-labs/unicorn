import { Router } from "express";
import { body } from "express-validator";
import {
  getBrandProducts,
  getAllActiveProducts,
  getProduct,
  createProduct,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
  incrementClicks,
} from "../controllers/productController";
import { verifyToken } from "../controllers/authController";
import { validateRequest } from "../middleware/validation";

const router = Router();

// Validation rules
const productValidation = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Product name must be between 3 and 200 characters"),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("salePrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Sale price must be a positive number"),
  body("productUrl")
    .trim()
    .isURL()
    .withMessage("Please provide a valid product URL"),
  body("commissionRate")
    .isFloat({ min: 1, max: 100 })
    .withMessage("Commission rate must be between 1 and 100"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isIn([
      "Electronics",
      "Fashion & Apparel",
      "Beauty & Personal Care",
      "Home & Kitchen",
      "Health & Fitness",
      "Books & Stationery",
      "Sports & Outdoors",
      "Toys & Games",
      "Jewelry & Accessories",
      "Food & Beverages",
      "Mobile & Accessories",
      "Computers & Laptops",
      "Automotive",
      "Baby Products",
      "Pet Supplies",
      "Office Supplies",
      "Music & Instruments",
      "Art & Crafts",
      "Digital Products",
      "Services",
      "Other",
    ])
    .withMessage("Please select a valid category"),
  body("tags").optional(),
];

// Public routes
router.get("/marketplace", getAllActiveProducts); // For creators to browse

// Protected routes (require authentication)
router.use(verifyToken); // All routes below require auth

// Brand routes
router.get("/my-products", getBrandProducts); // Brand's own products
router.get("/", getAllActiveProducts); // All products
router.post("/", productValidation, validateRequest, createProduct);
router.get("/:id", getProduct);
router.put("/:id", productValidation, validateRequest, updateProduct);
router.patch("/:id/toggle-status", toggleProductStatus);
router.delete("/:id", deleteProduct);
router.post("/:id/click", incrementClicks);

export default router;
