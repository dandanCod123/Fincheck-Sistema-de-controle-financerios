import { ColorsDropdownInput } from "../../../../components/ColorsDropdownInput";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Input } from "../../../../components/Input";
import { InputCurrency } from "../../../../components/InputCurrency";
import { Modal } from "../../../../components/Modal";
import { Select } from "../../../../components/Select";
import { useNewTransactionModalController } from "./useNewTransactionModalController";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    isNewTransactionModalOpen,
    newTransactionType,
  } = useNewTransactionModalController();

  const isExpense = newTransactionType == "EXPENSE";

  return (
    <Modal
      title={isExpense ? "Nova Desepa" : "Nova Receita"}
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-[-0.5px] text-xs">
            Valor {isExpense ? "da despesa" : "da receita"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name="name"
            placeholder={isExpense ? "Nome despesa" : "Nome receita"}
          />
          <Select
            placeholder={isExpense ? "Pagar com" : "Receber com"}
            options={[
              {
                value: "INVESTIMENT",
                label: "Investimentos",
              },
              {
                value: "CHECKING",
                label: "Checking",
              },
              {
                value: "Cash",
                label: "Dinheiro Físico",
              },
            ]}
          />
          <ColorsDropdownInput />
          <DatePickerInput />
        </div>
      </form>
    </Modal>
  );
}
