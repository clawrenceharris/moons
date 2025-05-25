import {
  Product,
  ProductBrand,
  ProductCategory,
  ProductFlag,
  ProductImage,
  ProductVariants,
} from "../../../types";
import api from "./axios";

export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`/product/${id}`);
  return response.data;
};
