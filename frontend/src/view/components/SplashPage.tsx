import { Spiner } from "./Spiner";
import logoGray from "../../assets/Logo-gray.svg";

export function SplashPage() {
  return (
    <div className="bg-teal-900 fixed z-50 top-0 left-0 w-full h-full grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <img src={logoGray} className="w-48 h-auto" alt="Logo" />
        <Spiner className="w-10 h-10 text-white" />
      </div>
    </div>
  );
}
