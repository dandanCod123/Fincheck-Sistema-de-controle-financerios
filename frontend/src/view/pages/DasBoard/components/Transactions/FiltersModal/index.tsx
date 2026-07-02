import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Modal } from "../../../../../components/Modal";
import { Button } from "../../../../../components/Button";
import { useFiltersModal } from "./useFiltersModalController";
import { cn } from "../../../../../../app/utils/cn";

interface FiltersModalProps {
  open: boolean;
  onClose(): void;
}

const mockedAccounts = [
  {
    id: "123",
    name: "Nubank",
  },
  {
    id: "456",
    name: "XP Investimentos",
  },
  {
    id: "678",
    name: "Nubank",
  },
];

export function FiltersModal({ open, onClose }: FiltersModalProps) {
  const {
    handleSelectBankAccount,
    selectedBankAccountId,
    selectedYear,
    handleChangeYear,
  } = useFiltersModal();

  return (
    <Modal open={open} onClose={onClose} title="Filtros">
      <div className="space-y-10">
        {/* Conta */}
        <div>
          <span className="text-lg tracking-[-1px] font-bold">Conta</span>
          <div className="space-y-2 mt-2">
            {mockedAccounts.map((account) => (
              <button
                key={account.id}
                onClick={() => handleSelectBankAccount(account.id)}
                className={cn(
                  "p-2 rounded-2xl w-full text-left text-gray-800 hover:bg-gray-50 transition-colors",
                  account.id === selectedBankAccountId && "!bg-gray-200",
                )}
              >
                {account.name}
              </button>
            ))}
          </div>
        </div>

        {/* Ano */}
        <div>
          <span className="text-lg tracking-[-1px] font-bold">Ano</span>
          <div className="mt-2 w-full flex items-center justify-between">
            <button
              className="w-12 h-12 flex items-center justify-center"
              onClick={() => handleChangeYear(-1)}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <div className="flex-1 text-center">
              <span className="text-sm font-medium tracking-[-0.5px]">
                {selectedYear}
              </span>
            </div>
            <button
              className="w-12 h-12 flex items-center justify-center"
              onClick={() => handleChangeYear(1)}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="w-full">Aplicar Filtros</Button>
        </div>
      </div>
    </Modal>
  );
}
