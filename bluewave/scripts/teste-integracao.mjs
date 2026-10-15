/**
 * Teste ponta a ponta da integração FRONT (axios) x API.
 * Roda com: node .scripts-teste-integracao.mjs
 * Usa a MESMA lib que o front (axios) e os MESMOS fluxos do services/api.js.
 */
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

let token = null;
let falhas = 0;

function verificar(nome, condicao, detalhe = '') {
  if (condicao) {
    console.log(`  OK  ${nome} ${detalhe}`);
  } else {
    falhas++;
    console.log(`FALHA ${nome} ${detalhe}`);
  }
}

try {
  // 1) Login (fluxo do AuthContext.login)
  const login = await api.post('/auth/login', {
    email: 'fulano@email.com.br',
    senha: '12345678',
  });
  token = login.data.token;
  verificar('Login ADMIN', login.status === 200 && login.data.usuario.nivelAcesso === 'ADMIN');

  // Interceptor manual (igual ao services/api.js)
  const comToken = { headers: { Authorization: `Bearer ${token}` } };

  // 2) Lista de mutirões (AdminMutiroes + Multiroes)
  const mutiroes = await api.get('/mutiroes');
  verificar('GET /mutiroes', mutiroes.status === 200 && mutiroes.data.length > 0, `→ ${mutiroes.data.length} registros`);

  // 3) Criar mutirão (AdminMutiroes.save)
  const criado = await api.post('/mutiroes', {
    titulo: 'Mutirao Teste Integracao',
    data: '2026-12-24',
    horario: '09:00',
    localizacao: 'Santos - SP',
    vagas: 2,
    status: 'aberto',
    descricao: 'Teste automatizado front x API',
  }, comToken);
  verificar('POST /mutiroes (ADMIN)', criado.status === 201, `→ id=${criado.data.id}`);
  const idTeste = criado.data.id;

  // 4) Sem token → 401 (proteção do RotaAdmin no back)
  let statusSemToken = null;
  try {
    await api.post('/mutiroes', { titulo: 'x', data: '2026-12-24', horario: '09:00', localizacao: 'x', vagas: 1, status: 'aberto' });
  } catch (e) {
    statusSemToken = e.response?.status;
  }
  verificar('POST /mutiroes SEM token → 401', statusSemToken === 401);

  // 5) Inscrição anônima (Multiroes.handleInscricao)
  const inscricao = await api.post('/inscricoes', {
    mutiraoId: idTeste,
    nome: 'Teste Integracao',
    email: 'integracao@teste.com',
  });
  verificar('POST /inscricoes', inscricao.status === 201 && inscricao.data.mutirao.titulo === 'Mutirao Teste Integracao');

  // 6) Contador de vagas subiu
  const depois = await api.get(`/mutiroes/${idTeste}`);
  verificar('inscritos incrementado', depois.data.inscritos === 1, `→ ${depois.data.inscritos}/${depois.data.vagas}`);

  // 7) Sem vagas → 409 (já que vagas=2, vamos encher)
  await api.post('/inscricoes', { mutiraoId: idTeste, nome: 'Y', email: 'y@t.com' });
  let statusCheio = null;
  try {
    await api.post('/inscricoes', { mutiraoId: idTeste, nome: 'Z', email: 'z@t.com' });
  } catch (e) {
    statusCheio = e.response?.status;
  }
  verificar('Inscrição sem vagas → 409', statusCheio === 409, `→ ${statusCheio}`);

  // 8) Excluir com inscrições → 409 (AdminMutiroes.excluir)
  let statusDeleteCheio = null;
  try {
    await api.delete(`/mutiroes/${idTeste}`, comToken);
  } catch (e) {
    statusDeleteCheio = e.response?.status;
  }
  verificar('DELETE com inscrições → 409', statusDeleteCheio === 409);

  // 9) Mensagem de contato (Blue.enviarContato)
  const mensagem = await api.post('/mensagens', {
    emissor: 'Teste Integracao',
    email: 'integracao@teste.com',
    texto: 'Mensagem do teste de integracao',
  });
  verificar('POST /mensagens', mensagem.status === 201, `→ id=${mensagem.data.id}`);

  // 10) Doação (Blue.confirmarDoacao)
  const doacao = await api.post('/doacoes', {
    nome: 'Teste Integracao',
    email: 'integracao@teste.com',
    valor: 25.5,
    formaPagamento: 'Pix',
  });
  verificar('POST /doacoes', doacao.status === 201, `→ id=${doacao.data.id}`);

  // 11) Login errado → 401 (Login.entrar)
  let statusLoginErrado = null;
  try {
    await api.post('/auth/login', { email: 'fulano@email.com.br', senha: 'errada' });
  } catch (e) {
    statusLoginErrado = e.response?.status;
  }
  verificar('Login senha errada → 401', statusLoginErrado === 401);

  // 12) Cadastro (Cadastro.cadastrar)
  const emailNovo = `e2e.${Date.now()}@teste.com`;
  const cadastro = await api.post('/auth/cadastro', {
    nome: 'Usuário E2E',
    email: emailNovo,
    senha: 'senha123',
  });
  verificar('POST /auth/cadastro', cadastro.status === 201, `→ id=${cadastro.data.id}`);

  console.log(`\nRESULTADO: ${falhas === 0 ? 'TODOS OS TESTES PASSARAM' : falhas + ' FALHA(S)'}`);
  console.log('PARA_LIMPEZA: ids de teste → mutirao=' + idTeste + ', mensagem=' + mensagem.data.id + ', doacao=' + doacao.data.id + ', usuario=' + emailNovo);
  process.exit(falhas === 0 ? 0 : 1);
} catch (erro) {
  console.error('ERRO FATAL:', erro.response ? `HTTP ${erro.response.status} - ${JSON.stringify(erro.response.data)}` : erro.message);
  process.exit(1);
}
