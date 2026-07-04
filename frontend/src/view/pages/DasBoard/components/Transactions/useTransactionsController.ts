import { useEffect, useState } from "react";
import { useDashboard } from "../DashBoardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import type { TransactionsFilters } from "../../../../../app/services/transactionsService/getAll";
import type { Transaction } from "../../../../../entities/transaction";

export function useTransactionsController() {
  const { areValuesVisible } = useDashboard();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [isEditTransactionsModalOpen, setIsEditTransactionsModalOpen] =
    useState(false);

  const [transactionBeingEdited, setTransactionBeingEdited] =
    useState<null | Transaction>(null);

  const [filters, setFilters] = useState<TransactionsFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const { transactions, isLoading, isInitialLoading, refetchTransactions } =
    useTransactions(filters);

  useEffect(() => {
    refetchTransactions();
  }, [filters, refetchTransactions]);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleChangeFilters<TFilter extends keyof TransactionsFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionsFilters[TFilter]) => {
      if (value == filters[filter]) return;
      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bankAccountId")(bankAccountId);
    handleChangeFilters("year")(year);
    setIsFiltersModalOpen(false);
  }

  function handleOpenEditTransactionsModal(transaction: Transaction) {
    setIsEditTransactionsModalOpen(true);
    setTransactionBeingEdited(transaction);
  }

  function handleCloseEditTransactionsModal() {
    setIsEditTransactionsModalOpen(false);
    setTransactionBeingEdited(null);
  }

  return {
    areValuesVisible,
    transactions,
    isInitialLoading,
    isLoading,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleChangeFilters,
    filters,
    handleApplyFilters,
    handleOpenEditTransactionsModal,
    handleCloseEditTransactionsModal,
    isEditTransactionsModalOpen,
    transactionBeingEdited,
  };
}
