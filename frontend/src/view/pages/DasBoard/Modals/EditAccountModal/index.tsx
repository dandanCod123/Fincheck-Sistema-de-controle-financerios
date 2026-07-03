import { Controller } from "react-hook-form";
import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { EditAccountModalController } from "./useEditAccountModalController";
import { Button } from "../../../../components/Button";
import { TrashIcon } from "../../../../components/icons/TrashIcon";
import { DeleteModal } from "../../../../components/DeleteModal";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    errors,
    handleSubmit,
    register,
    control,
    isPending,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteAccount,
    isLoadingRemove,
  } = EditAccountModalController();

  if (isDeleteModalOpen) {
    return (
      <DeleteModal
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteAccount}
        isLoading={isLoadingRemove}
        title={
          "Tem certeza que Deseja deletar esta conta? Essa ação não pode ser desfeita."
        }
        description={
          "Ao excluir a conta, todas as transações associadas a ela também serão excluídas. Essa ação é irreversível e não pode ser desfeita."
        }
      />
    );
  }

  return (
    <Modal
      title="Editar Conta"
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <TrashIcon className="text-red-900 w-6 h-6" />
        </button>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Saldo Inicial
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <Controller
              control={control}
              defaultValue="0"
              name="initialBalance"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  errors={errors.initialBalance?.message}
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
            placeholder="Nome da Conta"
            erro={errors.name?.message}
            {...register("name")}
          />

          <Controller
            control={control}
            defaultValue="CHECKING"
            name="type"
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder="Escolha uma conta!!"
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  { value: "INVESTMENT", label: "Investimentos" },
                  { value: "CHECKING", label: "Conta Corrente" },
                  { value: "CASH", label: "Dinheiro Físico" },
                ]}
              />
            )}
          />

          <Controller
            control={control}
            name="color"
            defaultValue=""
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-6" isPending={isPending}>
          Salvar
        </Button>
      </form>
    </Modal>
  );
}
