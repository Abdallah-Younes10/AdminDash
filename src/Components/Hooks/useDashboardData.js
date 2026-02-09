import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import {
  fetchUsers,
  fetchProducts,
  fetchCarts,
} from "../../DashboardLogic/dashboardApi";
import { enhanceWithDate } from "../../DashboardLogic/enhanceData";

export const useDashboardData = (params = {}) => {
  const selectUsers = useCallback((data) => enhanceWithDate(data.users), []);
  const selectProducts = useCallback(
    (data) => enhanceWithDate(data.products),
    [],
  );
  const selectCarts = useCallback(
    (data) =>
      enhanceWithDate(
        data.carts.map((cart) => ({
          ...cart,
          total: cart.total || 0,
        })),
      ),
    [],
  );

  const usersQuery = useQuery({
    queryKey: ["users", params],
    queryFn: () => fetchUsers(params),
    select: selectUsers,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const productsQuery = useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    select: selectProducts,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const cartsQuery = useQuery({
    queryKey: ["carts", params],
    queryFn: () => fetchCarts(params),
    select: selectCarts,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return {
    users: usersQuery.data || [],
    products: productsQuery.data || [],
    carts: cartsQuery.data || [],
    isLoading:
      usersQuery.isLoading || productsQuery.isLoading || cartsQuery.isLoading,
    isRefetching:
      usersQuery.isRefetching ||
      productsQuery.isRefetching ||
      cartsQuery.isRefetching,
    isError: usersQuery.isError || productsQuery.isError || cartsQuery.isError,
  };
};
