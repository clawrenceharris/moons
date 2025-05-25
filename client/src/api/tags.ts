import { ProductBrand, ProductCategory, ProductFlag } from "../../../types";
import api from "./axios";

export const fetchAllCategories = async (): Promise<ProductCategory[]> => {
  const response = await api.get(`/tags/categories`);
  return response.data;
};

export const fetchAllSubcategories = async (): Promise<ProductCategory[]> => {
  const response = await api.get(`/tags/subcategories`);
  return response.data;
};

export const fetchAllBrands = async (): Promise<ProductBrand[]> => {
  const response = await api.get(`/tags/brands`);
  return response.data;
};

export const fetchAllFlags = async (): Promise<ProductFlag[]> => {
  const response = await api.get(`/tags/flags`);
  return response.data;
};
