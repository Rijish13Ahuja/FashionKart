import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProduct = async (product: {
  name: string;
  category: string;
  imageUrl: string;
  originalPrice: number;
  reducedPrice: number;
  stock: number;
  discount?: number;
}) => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

export const updateProduct = async (id: number, product: {
  name: string;
  category: string;
  imageUrl: string;
  originalPrice: number;
  reducedPrice: number;
  stock: number;
  discount?: number;
}) => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

export const deleteProduct = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
