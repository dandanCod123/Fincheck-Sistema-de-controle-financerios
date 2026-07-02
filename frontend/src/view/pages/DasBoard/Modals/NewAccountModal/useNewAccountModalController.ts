import { useDashboard } from "../../components/DashBoardContext/useDashboard";

export function useNewAccountModalController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
  };
}
