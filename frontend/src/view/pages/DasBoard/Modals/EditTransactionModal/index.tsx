import { Controller } from "react-hook-form";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Button } from "../../../../components/Button";
import type { Transaction } from "../../../../../entities/transaction";
import { DeleteModal } from "../../../../components/DeleteModal";
import { TrashIcon } from "../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
  isModalOpen: boolean;

  onClose(): void;

  transaction: Transaction | null;
}

export function EditTransactionModal({
  isModalOpen,
  onClose,
  transaction,
}: EditTransactionModalProps) {
  const {
    control,
    errors,
    register,
    handleSubmit,
    accounts,
    categories,
    isLoading,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isLoadingDelete,
    handleDeleteTransaction,
    handleCloseDeleteAccount,
    handleOpenDeleteAccount,
  } = useEditTransactionModalController(transaction, onClose);

  const isExpense = transaction?.type === "EXPENSE";

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        onClose={handleCloseDeleteAccount}
        onConfirm={handleDeleteTransaction}
        isLoading={isLoadingDelete}
        title={`Tem certeza que Deseja excluir esta ${isExpense ? "despesa" : "receita"}?.`}
      />
    );
  }

  return (
    <Modal
      title={isExpense ? "Editar Despesa" : "Editar Receita"}
      open={isModalOpen}
      onClose={onClose}
      rightAction={
        <button onClick={handleOpenDeleteAccount}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              name="value"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  errors={errors.value?.message}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            {...register("name")}
            placeholder={isExpense ? "Nome despesa" : "Nome receita"}
            erro={errors.name?.message}
          />

          <Controller
            control={control}
            name="categoryId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Categorias"
                error={errors.categoryId?.message}
                onChange={onChange}
                value={value}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={isExpense ? "Pagar com" : "Receber com"}
                error={errors.bankAccountId?.message}
                onChange={onChange}
                value={value}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            defaultValue={new Date()}
            render={({ field: { onChange, value } }) => (
              <DatePickerInput
                error={errors.date?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <Button
          type="submit"
          className="flex items-center justify-center w-full mt-6"
          isPending={isLoading}
        >
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
