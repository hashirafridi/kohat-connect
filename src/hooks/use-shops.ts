import { useQuery } from "@tanstack/react-query";
import { fetchShopsWithFallback, fetchShopBySlugWithFallback } from "@/data/shops-db";
import { shops as fakeShops } from "@/data/shops";

export function useShops() {
  const query = useQuery({
    queryKey: ["shops"],
    queryFn: fetchShopsWithFallback,
    staleTime: 30_000,
  });
  return {
    shops: query.data?.shops ?? fakeShops,
    usingFallback: query.data?.usingFallback ?? true,
    isLoading: query.isLoading,
    refetch: query.refetch,
  };
}

export function useShop(slug: string) {
  return useQuery({
    queryKey: ["shop", slug],
    queryFn: () => fetchShopBySlugWithFallback(slug),
    staleTime: 30_000,
  });
}
