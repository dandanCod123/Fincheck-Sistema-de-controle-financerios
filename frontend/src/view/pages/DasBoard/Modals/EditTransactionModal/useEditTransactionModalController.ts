import z from "zod";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";
import type { Transaction } from "../../../../../entities/transaction";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";

const schema = z.object({
  value: z.union([z.string().nonempty("Valor é obrigatório"), z.number()]),
  categoryId: z.string().nonempty("Categoria é obrigatória"),
  bankAccountId: z.string().nonempty("Conta é obrigatória"),
  name: z.string().nonempty("Nome é obrigatório"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(
  transaction: Transaction | null,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      bankAccountId: transaction?.bankAccountId,
      categoryId: transaction?.categoryId,
      date: transaction ? new Date(transaction.date) : new Date(),
      name: transaction?.name,
      value: transaction?.value,
    },
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();
  const queryClient = useQueryClient();

  const { isPending: isLoadingDelete, mutateAsync: removeTransaction } =
    useMutation({
      mutationFn: transactionsService.remove,
    });

  const { isPending, mutateAsync: updateTransactions } = useMutation({
    mutationFn: transactionsService.update,
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if (!transaction) return;

      const payload = {
        id: transaction.id,
        name: data.name,
        value:
          typeof data.value === "number"
            ? data.value
            : currencyStringToNumber(data.value),
        categoryId: data.categoryId,
        bankAccountId: data.bankAccountId,
        type: transaction.type,
        date: data.date.toISOString(),
      };

      await updateTransactions(payload);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        transaction.type === "EXPENSE"
          ? "Despesa atualizada com sucesso!"
          : "Receita atualizada com sucesso!",
      );
      onClose();
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        console.error("Data:", JSON.stringify(error.response?.data, null, 2));
        console.error("URL:", error.config?.url);
      } else {
        console.error("Erro inesperado:", error);
      }
      toast.error(
        transaction?.type === "EXPENSE"
          ? "Erro ao atualizar despesa!"
          : "Erro ao atualizar receita!",
      );
    }
  });

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === transaction?.type,
    );
  }, [categoriesList, transaction]);

  async function handleDeleteTransaction() {
    try {
      await removeTransaction(transaction!.id);

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Transação foi deletada com sucesso!");
      onClose();
    } catch {
      toast.error("Erro ao deletar a Transação");
    }
  }

  function handleCloseDeleteAccount() {
    setIsDeleteModalOpen(false);
  }

  function handleOpenDeleteAccount() {
    setIsDeleteModalOpen(true);
  }

  return {
    register,
    errors,
    control,
    handleSubmit,
    accounts,
    categories,
    isLoading: isPending,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteAccount,
    handleOpenDeleteAccount,
  };
}
