import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getProducts, 
  getProductById, 
  getCartItems, 
  addToCart, 
  updateCartItem, 
  deleteCartItem 
} from './api';

// --- Query Hooks (Fetching) ---

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useProductById = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // Only run if ID exists
  });
};

export const useCart = () => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
  });
};

// --- Mutation Hooks (Modifying) ---

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      // Refresh cart data immediately after adding
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert("Added to cart!");
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};

export const useDeleteCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
};