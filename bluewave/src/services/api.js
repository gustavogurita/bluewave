import axios from 'axios';

/**
 * Instância única do axios para toda a API do TCC.
 * - baseURL: onde a Spring Boot está rodando (application.properties → server.port=8080)
 * - interceptor: injeta o token "Authorization: Bearer <token>" automaticamente
 *   em TODA requisição, se o usuário estiver logado (guardado no localStorage).
 */
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bluewave_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Devolve só a mensagem de erro vinda da API ({ "erro": "..." }). */
export function mensagemDeErro(erro) {
  if (erro?.response?.data?.erro) {
    return erro.response.data.erro;
  }
  if (erro?.response?.status === 401) {
    return 'Sessão expirada. Faça login novamente.';
  }
  if (erro?.code === 'ECONNABORTED' || !erro?.response) {
    return 'Não foi possível conectar à API. Ela está rodando em localhost:8080?';
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}

export default api;
