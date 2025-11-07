import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types';

const productSchema = new Schema<IProduct>(
  {
    brandId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Brand ID is required'],
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      minlength: [3, 'Product name must be at least 3 characters'],
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [10, 'Description must be at least 10 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    salePrice: {
      type: Number,
      min: [0, 'Sale price cannot be negative'],
    },
    productUrl: {
      type: String,
      required: [true, 'Product URL is required'],
      trim: true,
    },
    commissionRate: {
      type: Number,
      required: [true, 'Commission rate is required'],
      min: [1, 'Commission rate must be at least 1%'],
      max: [100, 'Commission rate cannot exceed 100%'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      enum: [
        'Electronics',
        'Fashion & Apparel',
        'Beauty & Personal Care',
        'Home & Kitchen',
        'Health & Fitness',
        'Books & Stationery',
        'Sports & Outdoors',
        'Toys & Games',
        'Jewelry & Accessories',
        'Food & Beverages',
        'Mobile & Accessories',
        'Computers & Laptops',
        'Automotive',
        'Baby Products',
        'Pet Supplies',
        'Office Supplies',
        'Music & Instruments',
        'Art & Crafts',
        'Digital Products',
        'Services',
        'Other',
      ],
    },
    tags: [{
      type: String,
      trim: true,
    }],
    images: [{
      type: String,
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    conversions: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
productSchema.index({ brandId: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;

