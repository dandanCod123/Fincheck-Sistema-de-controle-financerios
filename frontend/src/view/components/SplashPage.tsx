import { Spiner } from "./Spiner";
import logoGray from "../../assets/Logo-gray.svg";

export function SplashPage() {
  return (
    <div className="bg-teal-900 fixed top-0 left-0 w-full h-full grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <img src={logoGray} />
        <Spiner className="w-10 h-10 text-teal-900 fill-white" />
      </div>
    </div>
  );
}
