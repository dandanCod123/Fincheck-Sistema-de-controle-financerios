import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { AccountsSliderNavigation } from "./AccountsSliderNavigation";
import { useAccountsController } from "./useAccountsController";
import { formatCurrency } from "../../../../../app/utils/formatCurrecy";
import { cn } from "../../../../../app/utils/cn";
import { Spinner } from "../../../../components/Spinner";
import { Spiner } from "../../../../components/Spiner";

export function Accounts() {
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisibility,
    isLoading,
    accounts,
  } = useAccountsController();

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full md:p-10 px-4 py-8 flex flex-col">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spiner className="text-green-200  w-20 h-20" />
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">
              Saldo total
            </span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  "text-2xl tracking-[-1px] text-white",
                  !areValuesVisible && "blur-sm",
                )}
              >
                {formatCurrency(1000.0)}
              </strong>

              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisibility}
              >
                <EyeIcon open={!areValuesVisible} />
              </button>
            </div>
          </div>

          {/** CONTAS DO USUARIO */}
          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length == 0 && (
              <>
                <div className="mb-4" slot="container-start">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">
                    Minhas contas
                  </strong>
                </div>

                <button className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col items-center justify-center gap-4 text-white hover:bg-teal-950/5 transition-colors">
                  <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                    <PlusIcon className="w-6 h-6" />
                  </div>
                  <span className="tracking-[-0.5px] font-medium block w-32 text-center">
                    Cadastre uma nova conta
                  </span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={
                    typeof windowWidth === "number" && windowWidth >= 500
                      ? 2.1
                      : 1.2
                  }
                  onSlideChange={(swiper) => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd,
                    });
                  }}
                  loop
                >
                  <div
                    className="flex items-center justify-between mb-4"
                    slot="container-start"
                  >
                    <strong className="text-white tracking-[-1px] text-lg">
                      Minhas contas
                    </strong>

                    <AccountsSliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  <div className="mt-4">
                    <SwiperSlide>
                      <AccountCard
                        name="Nubank"
                        balance={1000}
                        color=""
                        type="CASH"
                      />
                    </SwiperSlide>

                    <SwiperSlide>
                      <AccountCard
                        name="Xp Investimento"
                        balance={8000}
                        color=""
                        type="CHECKING"
                      />
                    </SwiperSlide>

                    <SwiperSlide>
                      <AccountCard
                        name="Inter"
                        balance={2000}
                        color=""
                        type="INVESTMENT"
                      />
                    </SwiperSlide>
                  </div>
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
