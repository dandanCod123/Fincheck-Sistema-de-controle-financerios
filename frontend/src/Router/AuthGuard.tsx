import { Navigate, Outlet } from "react-router-dom";

interface AuthGuardProps {
  isPravite: boolean;
}

export function AuthGuard({ isPravite }: AuthGuardProps) {
  const signedIn = false;

  if (!signedIn && isPravite) {
    return <Navigate to="/login" replace />;
  }
  if (signedIn && isPravite) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
