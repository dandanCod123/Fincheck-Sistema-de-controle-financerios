import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/register";
import { Dasboard } from "../view/pages/DasBoard";
import { AuthLayout } from "../view/Layouts/AuthLayouts";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        {/* Rotas privadas */}
        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dasboard />} />
        </Route>

        {/* Qualquer rota desconhecida → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
