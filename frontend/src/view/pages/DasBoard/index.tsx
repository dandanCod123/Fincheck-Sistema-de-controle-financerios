import logo from "../../../assets/logo.svg";
import { Modal } from "../../components/Modal";

import { UserMenu } from "../../components/UserMenu";
import { Accounts } from "./components/Accounts";
import { DashboardProvider } from "./components/DashBoardContext";
import { Fab } from "./components/Fab";
import { Transactions } from "./components/Transactions";
import { NewAccountModal } from "./Modals/NewAccountModal";
import { NewTransactionModal } from "./Modals/NewTransactionModal";

export function Dasboard() {
  return (
    <DashboardProvider>
      <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col overflow-y-auto md:overflow-hidden">
        <header className="h-12 flex items-center justify-between">
          <img src={logo} />
          <UserMenu />
        </header>

        <main className="flex-1 flex flex-col md:flex-row gap-4 mt-10 min-h-0">
          <div className="w-full md:w-1/2">
            <Accounts />
          </div>

          <div className="w-full md:w-1/2">
            <Transactions />
          </div>
        </main>

        <Fab />
        <NewAccountModal />
        <NewTransactionModal />
      </div>
    </DashboardProvider>
  );
}
