import { useState } from "react";
import { useWidowWidth } from "../../../../../app/hooks/useWidowWidth";
import { useDashboard } from "../DashBoardContext/useDashboard";

export function useAccountsController() {
  const windowWidth = useWidowWidth();
  const { areValuesVisible, toggleValuesVisibility } = useDashboard();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  return {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading: false,
    accounts: [],
  };
}
