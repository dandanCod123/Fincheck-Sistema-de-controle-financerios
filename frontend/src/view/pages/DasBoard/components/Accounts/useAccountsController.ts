import { useMemo, useState } from "react";
import { useWidowWidth } from "../../../../../app/hooks/useWidowWidth";
import { useDashboard } from "../DashBoardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/bankAccountService";
import { useBankAccounts } from "../../../../../app/hooks/useBankAccounts";

export function useAccountsController() {
  const windowWidth = useWidowWidth();
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { accounts, isFetched } = useBankAccounts();

  const { data = [], isFetching } = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
  });

  const currentBalance = useMemo(() => {
    // if (!accounts) return 0;

    return accounts.reduce(
      (total, account) => total + account.currentBalance,
      0,
    );
  }, [accounts]);

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: isFetching,
    accounts,
    openNewAccountModal,
    currentBalance,
  };
}
