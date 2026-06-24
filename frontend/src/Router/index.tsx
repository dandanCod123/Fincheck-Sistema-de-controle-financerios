import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { AuthGuard } from "./AuthGuard";
import { Login } from "../view/pages/Login";
import { Register } from "../view/pages/register";
import { Dasboard } from "../view/pages/DasBoard";
import { AuthLayout } from "../view/Layouts/AuthLayouts";

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPravite={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
        </Route>

        <Route element={<AuthGuard isPravite />}>
          <Route path="/" element={<Dasboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
