import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router";
import Blue from '../pages/Blue/blue';
import Combate from '../pages/Combate/combate';
import Multiroes from '../pages/Multiroes/multiroes';
import Recife from '../pages/Recife/recife';
import Login from '../pages/Login/login';
import AdminMutiroes from '../pages/Adm/AdminMutiroes';
import Cadastro from '../pages/Cadastro/cadastro';
import Perfil from '../pages/Perfil/perfil';
import { useAuth } from '../context/AuthContext';

 
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/**
 * Protege rotas: sem sessão → /login; sem nivelAcesso ADMIN → /blue.
 * É ele que fecha o "buraco" de qualquer pessoa digitar /admin no navegador.
 */
function RotaAdmin({ children }) {
  const { usuario, ehAdmin } = useAuth();

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (!ehAdmin) {
    return <Navigate to="/blue" replace />;
  }

  return children;
}
 
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Blue />} />
        <Route path="/combate" element={<Combate />} />
        <Route path="/multiroes" element={<Multiroes />} />
        <Route path="/recife" element={<Recife />} />
        <Route path="/blue" element={<Blue />} />
        <Route
          path="/admin"
          element={
            <RotaAdmin>
              <AdminMutiroes />
            </RotaAdmin>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/perfil" element={<Perfil />} /> 
      </Routes>
    </BrowserRouter>
  );
}
 