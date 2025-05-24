export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  subcategory_id: number;
  brand_id: number;
  price: number;
  stockQuantity: number;
  createdAt: string;
  discount: number | null;
  category: string;
  subcategory: string;
  brand: ProductBrand;
  published: boolean;
  isArchived: boolean;
  images: ProductImage[];
  flags: ProductFlag[];
  variants: ProductVariants;
}
export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  altText?: string | null;
}

export interface ProductVariants {
  colors: string[];
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  size?: string;
  color?: string;
}

export interface ProductBrand {
  id: number;
  name: string;
  imageUrl: string;
}
export interface ProductCategory {
  id: number;
  name: string;
}
export interface ProductFlag {
  id: number;
  name: string;
}
