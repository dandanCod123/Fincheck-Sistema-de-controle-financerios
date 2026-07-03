import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface DeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  isLoading: boolean;
}

export function DeleteModal({
  onClose,
  onConfirm,
  title,
  description,
  isLoading,
}: DeleteModalProps) {
  return (
    <Modal open title="Deletar" onClose={onClose}>
      <div className="flex flex-col items-center text-center gap-6">
        <div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
          <TrashIcon className="w-6 h-6 text-red-900" />
        </div>
        <p className="w-[280px] text-gray-800 tracking-[-0.5px] font-bold dark:text-white">
          {title}
        </p>
        {description && (
          <p className="tracking-[-0.1px] text-gray-800 dark:text-white">
            {description}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center  mt-10 space-y-4">
        <Button
          className="w-full bg-red-600 text-white hover:bg-red-700"
          onClick={onConfirm}
          isPending={isLoading}
          variant="danger"
        >
          Sim, Desejo excluir
        </Button>
        <Button
          className="w-full dark:text-white dark:!border-white dark:hover:!bg-gray-600"
          onClick={onClose}
          disabled={isLoading}
          variant="ghost"
        >
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}
