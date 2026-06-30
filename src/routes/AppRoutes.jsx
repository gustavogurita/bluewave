import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Blue from '../pages/Blue/blue';
import Combate from '../pages/Combate/combate';
import Multiroes from '../pages/Multiroes/multiroes';
import Recife from '../pages/Recife/recife'; 

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
      </Routes>
    </BrowserRouter>
  );
}