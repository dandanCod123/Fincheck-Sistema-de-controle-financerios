import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKey } from "../config/localStorageKey";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/usersServices";
import toast from "react-hot-toast";
import { SplashPage } from "../../view/components/SplashPage";
import type { User } from "../../entities/user";

interface AuthContextValue {
  signedIn: boolean;
  signin: (acessToken: string) => void;
  signout: () => void;
  user: User | undefined;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(
      localStorageKey.ACCESS_TOKEN,
    );
    return !!storedAccessToken;
  });

  // LOGIN E DESLOGAR O USUÁRIO (SAIR)
  // ---------------------------------------------
  const signin = useCallback((acessToken: string) => {
    localStorage.setItem(localStorageKey.ACCESS_TOKEN, acessToken);
    setSignedIn(true);
  }, []);

  const signout = useCallback(() => {
    localStorage.removeItem(localStorageKey.ACCESS_TOKEN);
    setSignedIn(false);
  }, []);
  // ----------------------------------------------

  const { isError, isFetching, error, isSuccess, data } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => UserService.UsersMe(),
    retry: 2,
    enabled: signedIn,
  });

  // DEPOIS DE 30MIN O USUARIO É DESLOGADO POR INATIVIDADE
  useEffect(() => {
    if (!signedIn) return;

    const INACTIVITY_LIMIT = 30 * 60 * 1000; // 30 minutos
    let timer: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        toast.error("Sessão encerrada por inatividade.");
        signout();
      }, INACTIVITY_LIMIT);
    };

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, resetTimer));

    resetTimer(); // inicia o timer

    return () => {
      clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [signedIn, signout]);

  // Mostra o splash apenas enquanto valida um usuário já logado
  if (signedIn && isFetching) {
    return <SplashPage />;
  }
  return (
    <AuthContext.Provider value={{ signedIn, signin, user: data, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
