# 🌊 Blue Wave — TCC

Plataforma de **voluntariado e conservação da vida marinha**: usuários se cadastram,
se inscrevem em mutirões de limpeza costeira, doam e recebem informações sobre
a vida marinha — administradores gerenciam tudo por um painel.

# 📁 Estrutura do projeto

```
TCC/
├── bd_bluewave.sql        → script do banco (SQL Server) + dados de teste
├── API/
│   └── bluewave/          → API REST (Spring Boot 4 + JPA + Java 21)
└── bluewave/              → Front-end (React 19 + Vite + axios)
    └── src/
        ├── services/api.js        → instância do axios + interceptor do token
        ├── context/AuthContext.jsx → sessão do usuário (login/logout)
        ├── routes/AppRoutes.jsx   → rotas (com rota protegida /admin)
        └── pages/                 → Blue, Combate, Multiroes, Recife,
                                      Login, Cadastro, Perfil, Adm/AdminMutiroes
```

## 🛠 Tecnologias

| Camada | Tecnologias |
|---|---|
| Front-end | React 19, Vite, react-router, **axios**, CSS Modules |
| Back-end | Java 21, Spring Boot 4 (Web, JPA, Validation), BCrypt |
| Banco | Microsoft SQL Server (`bd_bluewave`) |

## ▶ Como rodar (Passo a Passo)

# 1. Banco (só na primeira vez)
Execute o arquivo `bd_bluewave.sql` no SQL Server Management Studio.
> A API já cria as colunas/tabelas que faltarem automaticamente (`ddl-auto=update`).

# 2. API
```powershell
cd API\bluewave
.\mvnw.cmd spring-boot:run
```
Configuração da conexão em `src/main/resources/application.properties`
(usando outro usuário/senha? defina as variáveis de ambiente `DB_USER` e `DB_PASSWORD`).

# 3. Front-end
```powershell
cd bluewave
npm install
npm run dev
```
Abra http://localhost:5173

## 👥 Usuários de teste (senha: `12345678`)

| E-mail | Nível |
|---|---|
| fulano@email.com.br | ADMIN (painel em `/admin`) |
| beltrana@email.com.br | USER |
| sicrana@email.com.br | USER (inativo — não consegue logar) |

## 🔌 Principais endpoints da API

| Método | Rota | Descrição | Acesso |
|---|---|---|---|
| POST | `/api/auth/login` | Login (devolve token) | público |
| POST | `/api/auth/cadastro` | Cria conta | público |
| GET | `/api/auth/perfil` | Usuário da sessão | logado |
| GET | `/api/mutiroes` | Lista mutirões | público |
| POST/PUT/DELETE | `/api/mutiroes` | Gerencia mutirões | ADMIN |
| POST | `/api/inscricoes` | Inscrição (anônimo ou logado) | público |
| GET | `/api/inscricoes/mutirao/{id}` | Inscritos de um mutirão | ADMIN |
| POST | `/api/mensagens` | Formulário de contato | público |
| POST | `/api/doacoes` | Formulário de doação | público |

## ✅ Teste de integração

Com a API rodando:
```powershell
cd bluewave
node scripts\teste-integracao.mjs
```
Roda 12 verificações ponta a ponta (login, CRUD de admin, inscrições, contato, doação).

## 🔐 Segurança

- Senhas armazenadas com **bcrypt** (nunca em texto puro).
- Sessão por **token** enviado no header `Authorization: Bearer <token>`.
- Rota `/admin` protegida no front (`RotaAdmin`) **e** no back (`requireAdmin`).
- Validações nos dois lados (bean validation na API + validação no formulário).
