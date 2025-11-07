// Predefined product categories for the marketplace

export const PRODUCT_CATEGORIES = [
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
] as const

export type ProductCategory = typeof PRODUCT_CATEGORIES[number]

// Category icons mapping (for future use)
export const CATEGORY_ICONS: Record<string, string> = {
  'Electronics': '🔌',
  'Fashion & Apparel': '👗',
  'Beauty & Personal Care': '💄',
  'Home & Kitchen': '🏠',
  'Health & Fitness': '💪',
  'Books & Stationery': '📚',
  'Sports & Outdoors': '⚽',
  'Toys & Games': '🎮',
  'Jewelry & Accessories': '💎',
  'Food & Beverages': '🍔',
  'Mobile & Accessories': '📱',
  'Computers & Laptops': '💻',
  'Automotive': '🚗',
  'Baby Products': '👶',
  'Pet Supplies': '🐾',
  'Office Supplies': '📎',
  'Music & Instruments': '🎵',
  'Art & Crafts': '🎨',
  'Digital Products': '💿',
  'Services': '⚙️',
  'Other': '📦',
}

// Category descriptions (for marketplace filtering)
export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Electronics': 'Gadgets, devices, and electronic accessories',
  'Fashion & Apparel': 'Clothing, footwear, and fashion accessories',
  'Beauty & Personal Care': 'Cosmetics, skincare, and grooming products',
  'Home & Kitchen': 'Furniture, appliances, and home decor',
  'Health & Fitness': 'Supplements, equipment, and wellness products',
  'Books & Stationery': 'Books, notebooks, and writing supplies',
  'Sports & Outdoors': 'Sports equipment and outdoor gear',
  'Toys & Games': 'Toys, board games, and entertainment',
  'Jewelry & Accessories': 'Jewelry, watches, and fashion accessories',
  'Food & Beverages': 'Food products, snacks, and drinks',
  'Mobile & Accessories': 'Smartphones, cases, and mobile accessories',
  'Computers & Laptops': 'Computers, laptops, and PC accessories',
  'Automotive': 'Car accessories and automotive products',
  'Baby Products': 'Baby care, toys, and essentials',
  'Pet Supplies': 'Pet food, toys, and accessories',
  'Office Supplies': 'Office equipment and supplies',
  'Music & Instruments': 'Musical instruments and audio equipment',
  'Art & Crafts': 'Art supplies and craft materials',
  'Digital Products': 'Software, courses, and digital downloads',
  'Services': 'Service-based offerings',
  'Other': 'Products that don\'t fit other categories',
}

