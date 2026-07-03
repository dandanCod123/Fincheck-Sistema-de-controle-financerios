import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../services/transactionsService";
import type { TransactionsFilters } from "../services/transactionsService/getAll";

export function useTransactions(filters: TransactionsFilters) {
  const { data, isFetching, isInitialLoading, refetch } = useQuery({
    queryKey: ["transactions", filters], // ✅ inclui filtros
    queryFn: () => transactionsService.getAll(filters),
  });

  return {
    transactions: data ?? [],
    isLoading: isFetching,
    isInitialLoading,
    refetchTransactions: refetch,
  };
}
