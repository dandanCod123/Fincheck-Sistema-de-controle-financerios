import z from "zod";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

import { useDashboard } from "../../components/DashBoardContext/useDashboard";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";
import { useCategories } from "../../../../../app/hooks/useCategories";
import { transactionsService } from "../../../../../app/services/transactionsService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  value: z.string().nonempty("Valor é obrigatório"),
  categoryId: z.string().nonempty("Categoria é obrigatória"),
  bankAccountId: z.string().nonempty("Conta é obrigatória"),
  name: z.string().nonempty("Nome é obrigatório"),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      value: "0",
      date: new Date(),
      categoryId: "",
      bankAccountId: "",
    },
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation({
    mutationFn: transactionsService.create,
  });

  const { accounts } = useBankAccounts();
  const { categories: categoriesList } = useCategories();

  const categories = useMemo(() => {
    return categoriesList.filter(
      (category) => category.type === newTransactionType,
    );
  }, [categoriesList, newTransactionType]);

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      // 👇 ITEM 2 — adicione ANTES do mutateAsync
      const payload = {
        ...data,
        value: currencyStringToNumber(data.value),
        type: newTransactionType!,
        date: data.date.toISOString(),
      };
      console.log("PAYLOAD ENVIADO:", payload); // 👈 log do payload

      await mutateAsync(payload); // 👈 use a variável payload aqui

      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success(
        newTransactionType === "EXPENSE"
          ? "Despesa cadastrada com sucesso!"
          : "Receita cadastrada com sucesso!",
      );
      closeNewTransactionModal();
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Status:", error.response?.status);
        // 👇 ITEM 1 — troque esta linha
        console.error("Data:", JSON.stringify(error.response?.data, null, 2));
        console.error("URL:", error.config?.url);
      } else {
        console.error("Erro inesperado:", error);
      }
      toast.error(
        newTransactionType === "EXPENSE"
          ? "Erro ao cadastrar despesa!"
          : "Erro ao cadastrar receita!",
      );
      closeNewTransactionModal();
      reset();
    }
  });

  return {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
    errors,
    control,
    register,
    handleSubmit,
    accounts,
    categories,
    isPending,
  };
}
