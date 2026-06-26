import { Outlet } from "react-router-dom";
import illustration from "../../assets/Login.png";
import logo from "../../assets/logo.svg";
import logoGray from "../../assets/Logo-gray.svg";

export function AuthLayout() {
  return (
    <div className="flex w-full h-full">
      {/** INPUTS DE LOGIN E CADASTRO */}
      <div className="w-full flex items-center justify-center flex-col gap-16 lg:w-1/2">
        <img src={logoGray} />

        <div className="w-full max-w-[504px] px-8 lg:px-0">
          <Outlet />
        </div>
      </div>

      {/** IMAGEM + FOOTER */}
      <div className="w-1/2 p-8 justify-center items-center hidden lg:flex">
        {/* wrapper define a largura/altura de referência */}
        <div className="relative h-full max-w-[656px] w-full max-h-[960px]">
          <img
            src={illustration}
            className="object-cover w-full h-full rounded-[32px]"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-white p-10 rounded-b-[32px]">
            <img src={logo} />
            <p className="text-gray-700 font-medium text-[16px] mt-6">
              Gerencie suas finanças pessoais de uma forma simples com o
              fincheck, e o melhor, totalmente de graça!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
