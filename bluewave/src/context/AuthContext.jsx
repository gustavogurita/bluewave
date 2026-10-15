import { createContext, useContext, useState } from 'react';
import api from '../services/api';

/**
 * Guarda o usuário logado + token no localStorage.
 * - login(dados)   → chama POST /api/auth/login e persiste a sessão
 * - logout()       → limpa a sessão
 * - usuario        → objeto { id, nome, email, nivelAcesso, statusUsuario } ou null
 * - ehAdmin        → true quando nivelAcesso === 'ADMIN'
 */
const AuthContext = createContext(null);

const CHAVE_TOKEN = 'bluewave_token';
const CHAVE_USUARIO = 'bluewave_usuario';

function lerUsuario() {
  try {
    const bruto = localStorage.getItem(CHAVE_USUARIO);
    return bruto ? JSON.parse(bruto) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(lerUsuario);

  async function login(email, senha) {
    const { data } = await api.post('/auth/login', { email, senha });
    localStorage.setItem(CHAVE_TOKEN, data.token);
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(data.usuario));
    setUsuario(data.usuario);
    return data.usuario;
  }

  function logout() {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_USUARIO);
    setUsuario(null);
  }

  const ehAdmin = usuario?.nivelAcesso === 'ADMIN';

  return (
    <AuthContext.Provider value={{ usuario, ehAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>');
  }
  return contexto;
}
