import { Product } from "../types";
import api from "./axios";

export const fetchAllProducts = async () => {
  const response = await api.get(`/shop`);
  return response.data;
};

export const fetchProductsByCategory = async (
  category: string,
  subcategory?: string
): Promise<Product[]> => {
  if (subcategory) {
    const response = await api.get(`/shop/category/${category}/${subcategory}`);
    return response.data;
  }
  const response = await api.get(`/shop/category/${category}`);
  return response.data;
};
