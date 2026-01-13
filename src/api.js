import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendapi-cwp7.onrender.com/api'
});

export const getProducts = async () => {
  const response = await api.get('/products/');
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}/`);
  return response.data;
};

export const getCartItems = async () => {
  const response = await api.get('/cart/');
  return response.data;
};

export const addToCart = async ({ title, quantity, price }) => {
  const response = await api.post('/cart/', { title, quantity, price });
  return response.data;
};

export const updateCartItem = async ({ id, quantity }) => {
  const response = await api.put(`/cart/${id}/`, { quantity });
  return response.data;
};

export const deleteCartItem = async (id) => {
  const response = await api.delete(`/cart/${id}/`);
  return response.data;
};
