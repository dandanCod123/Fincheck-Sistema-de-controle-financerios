import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/hooks/useAuth";

interface AuthGuardProps {
  isPrivate: boolean;
}

export function AuthGuard({ isPrivate }: AuthGuardProps) {
  const { signedIn } = useAuth();

  // Rota privada + NÃO logado → vai pro login
  if (!signedIn && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  // Rota pública + JÁ logado → vai pra dashboard
  if (signedIn && !isPrivate) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
