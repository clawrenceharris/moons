import { Product } from "../../../../types";
import api from "../axios";

export const deleteProduct = async (id: number) => {
  const response = await api.delete(`/admin/product/${id}`);
  return response.data;
};
export const addProduct = async () => {
  const response = await api.post(`/admin/product`);
  return response.data;
};

export const fetchProducts = async () => {
  const response = await api.get(`/admin/product`);
  return response.data;
};

export const fetchProduct = async (id: number): Promise<Product> => {
  const response = await api.get(`/admin/product/${id}`);
  return response.data;
};

export const updateProduct = async (
  id: number,
  body: any
): Promise<Product> => {
  const response = await api.put(`/admin/product/${id}`, body);
  return response.data;
};

export const deleteImage = async (
  id: number,
  imageId: number
): Promise<Product> => {
  const response = await api.delete(`/admin/product/${id}/images/${imageId}`);
  return response.data;
};

export const addProductImage = async (
  id: number,
  body: { image_url: string; alt_text?: string | null }
) => {
  const response = await api.post(`/admin/product/${id}/images`, body);
  return response.data;
};

export const setProductFlag = async (id: number, flags: string[]) => {
  const response = await api.post(`/admin/product/${id}/flags`, { flags });
  return response.data;
};
