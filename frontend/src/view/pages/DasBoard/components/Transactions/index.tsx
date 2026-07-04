import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FilterIcon } from "../../../../components/icons/FilterIcon";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";

import { SwiperSlide, Swiper } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
import { SliderOption } from "./SliderOption";
import { SliderNavigation } from "./SliderNavigation";
import { formatCurrency } from "../../../../../app/utils/formatCurrecy";
import { CategoryIcon } from "../../../../components/icons/CategoryIcon";

import { useTransactionsController } from "./useTransactionsController";
import { Spiner } from "../../../../components/Spiner";

import emptyStateImage from "../../../../../assets/Empty State.svg";
import { TransactionTypeDropdown } from "./TransactionTypeDropdown";
import { FiltersModal } from "./FiltersModal";
import { formatDate } from "../../../../../app/utils/formatDate";
import { EditAccountModal } from "../../Modals/EditAccountModal";
import { EditTransactionModal } from "../../Modals/EditTransactionModal";

export function Transactions() {
  const {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    filters,
    handleChangeFilters,
    handleApplyFilters,
    handleCloseEditTransactionsModal,
    handleOpenEditTransactionsModal,
    isEditTransactionsModalOpen,
    transactionBeingEdited,
  } = useTransactionsController();

  const hasTransactions = transactions.length > 0;

  return (
    <div className="bg-gray-100 rounded-2xl w-full h-full p-10 flex flex-col">
      {isInitialLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <Spiner className=" text-teal-950  w-20 h-20" />
        </div>
      )}

      {!isInitialLoading && (
        <>
          <FiltersModal
            open={isFiltersModalOpen}
            onClose={handleCloseFiltersModal}
            onApplyFilters={handleApplyFilters}
          />
          <header>
            <div className="flex items-center justify-between">
              <TransactionTypeDropdown
                onSelect={handleChangeFilters("type")}
                selectedType={filters.type}
              />
              <button onClick={handleOpenFiltersModal}>
                <FilterIcon />
              </button>
            </div>

            <div className="mt-6 relative">
              <Swiper
                slidesPerView={3}
                centeredSlides
                initialSlide={filters.month}
                onSlideChange={(swiper) => {
                  handleChangeFilters("month")(swiper.realIndex);
                }}
              >
                <SliderNavigation />
                {MONTHS.map((month, index) => (
                  <SwiperSlide key={month}>
                    {({ isActive }) => (
                      <SliderOption
                        isActive={isActive}
                        month={month}
                        index={index}
                      />
                    )}
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </header>

          {/** TRANSAÇÕES ------------------ */}
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto min-h-0">
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <Spiner className=" text-teal-950  w-20 h-20" />
              </div>
            )}

            {!hasTransactions && !isLoading && (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={emptyStateImage} />
                <p className="text-gray-700">
                  Não encontramos nenhuma Transação
                </p>
              </div>
            )}

            {/** LISTA DE TRANSAÇÕES CARDS ------------------ */}

            {hasTransactions && !isLoading && (
              <>
                {transactionBeingEdited && (
                  <EditTransactionModal
                    isModalOpen={isEditTransactionsModalOpen}
                    onClose={handleCloseEditTransactionsModal}
                    transaction={transactionBeingEdited}
                  />
                )}

                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                    role="button"
                    onClick={() => handleOpenEditTransactionsModal(transaction)}
                  >
                    <div className="flex-1 flex items-center gap-3">
                      <CategoryIcon
                        type={
                          transaction.type === "EXPENSE" ? "expense" : "income"
                        }
                        category={transaction.category?.icon}
                      />

                      <div>
                        <strong className="font-bold tracking-[-0.5px] block">
                          {transaction.name}
                        </strong>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(transaction.date))}
                        </span>
                      </div>
                    </div>

                    <span
                      className={cn(
                        "text-red-800 font-medium tracking-[-0.5px]",
                        transaction.type === "EXPENSE"
                          ? "text-red-800 dark:text-red-900"
                          : "text-green-800 dark:text-green-900",
                        !areValuesVisible && "blur-sm",
                      )}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}{" "}
                      {formatCurrency(transaction.value)}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
