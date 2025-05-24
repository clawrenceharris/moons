import api from "./axios";

export const fetchProductsBySearch = async (query: string) => {
  const response = await api.get(`/search`, { params: { query } });
  return response.data;
};
