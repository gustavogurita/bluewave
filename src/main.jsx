import React from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/AppRoutes' // Puxa as configurações de rotas acima
import './index.css' // Carrega seu CSS da Blue Wave

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)