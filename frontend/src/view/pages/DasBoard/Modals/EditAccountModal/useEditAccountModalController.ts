import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";

import { useDashboard } from "../../components/DashBoardContext/useDashboard";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { currencyStringToNumber } from "../../../../../app/utils/currencyStringToNumber";

const schema = z.object({
  initialBalance: z.union([
    z.string().nonempty("Saldo inicial é obrigatório"),
    z.number(),
  ]),
  name: z.string().nonempty("Nome da Conta é obrigatório"),
  type: z.enum(["CHECKING", "INVESTMENT", "CASH"]),
  color: z.string().nonempty("Cor é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export function EditAccountModalController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: accountBeingEdited?.name ?? "",
      initialBalance: accountBeingEdited?.initialBalance.toString() ?? "0",
      color: accountBeingEdited?.color ?? "",
      type: accountBeingEdited?.type ?? "CHECKING",
    },
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { isPending, mutateAsync: updateAccount } = useMutation({
    mutationFn: bankAccountsService.update,
  });

  const { isPending: isLoadingRemove, mutateAsync: removeAccount } =
    useMutation({
      mutationFn: bankAccountsService.remove,
    });

  const handleSubmit = hookFormSubmit(
    async (data) => {
      try {
        await updateAccount({
          ...data,
          initialBalance: currencyStringToNumber(data.initialBalance),
          id: accountBeingEdited!.id,
        });

        queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
        toast.success("Conta editada com sucesso!");
        closeEditAccountModal();
        reset();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Status:", error.response?.status);
          console.error("Data:", error.response?.data);
          console.error("URL:", error.config?.url);
          console.error("Headers enviados:", error.config?.headers);
        } else {
          console.error("Erro inesperado:", error);
        }
        toast.error("Erro ao editar conta!");
      }
    },
    (errors) => {
      console.log("Erros de validação:", errors);
    },
  );

  function handleOpenDeleteModal() {
    setIsDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDeleteAccount() {
    try {
      await removeAccount(accountBeingEdited!.id);

      queryClient.invalidateQueries({ queryKey: ["bankAccounts"] });
      toast.success("Conta deletada com sucesso!");
      closeEditAccountModal();
    } catch {
      toast.error("Erro ao deletar a conta");
    }
  }

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    accountBeingEdited,
    register,
    errors,
    handleSubmit,
    control,
    isPending,
    isLoadingRemove,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteAccount,
  };
}
