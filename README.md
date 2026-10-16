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

## 💻 Rodando em outra máquina (clone do repositório)

Se você clonar o projeto em outro computador (outro PC, laboratório, notebook da
apresentação), siga nesta ordem:

### Pré-requisitos
| Ferramenta | Versão | Para quê |
|---|---|---|
| SQL Server | 2019+ (Express serve) | banco `bd_bluewave` |
| Java (JDK) | **21** | rodar a API |
| Node.js | 18+ | rodar o front-end |
| Git | qualquer | clonar o repositório |
| Internet | — | Maven e npm baixam dependências na 1ª execução |

### Passo a passo
```powershell
# 1. Clonar
git clone https://github.com/gustavogurita/bluewave.git
cd bluewave

# 2. Banco (só na primeira vez) — abra o SSMS e execute o arquivo:
#    bd_bluewave.sql  (na raiz do projeto)
#    Ele cria o banco bd_bluewave + dados de teste.

# 3. API — atenção à senha do banco (próximo tópico!)
cd API\bluewave
.\mvnw.cmd spring-boot:run

# 4. Front-end (em outro terminal)
cd bluewave
cd bluewave             ( de novo pois o front-end está dentro da subpasta `bluewave`, tendo que dar mais um cd extra)
npm install
npm run dev

Observações Importantes !

- Se em caso de dar erros no cd saiba que as pastas estão com nomes repetidos igual o caso relatado a cima, 

cd : Não é possível localizar o caminho 'Z:\Teste legal\API' porque ele não existe.
No linha:1 caractere:1
+ cd API
+ ~~~~~~
    + CategoryInfo          : ObjectNotFound: (Z:\Teste legal\API:String) [Set-Location], ItemNo  
   tFoundException
    + FullyQualifiedErrorId : PathNotFound,Microsoft.PowerShell.Commands.SetLocationCommand   

A resolução foi dar 2 "cd bluewave" para entrar na pasta desejada

- Outro ponto é na questão da API, se caso não achar o diretório para fazer a API rodar,
O diretório correto para acha-lá é "\bluewave\API\bluewave>"

```

### ⚠️ Ajustando a senha do seu SQL Server (IMPORTANTE)

O `application.properties` vem com um usuário/senha padrão. **Se o SQL Server da
máquina tiver outra senha, a API não sobe** e aparecerá o erro:

> *"Não foi possível conectar à API. Ela está rodando em localhost:8080?"*

Nesse caso, **não altere o arquivo** — basta definir as variáveis de ambiente
`DB_USER` e `DB_PASSWORD` antes de rodar a API (o `application.properties` já
suporta isso):

```powershell
# PowerShell — vale só para esta janela/terminal
$env:DB_USER = "sa"
$env:DB_PASSWORD = "A_SENHA_DO_SEU_SQL_SERVER"
.\mvnw.cmd spring-boot:run
```

Ou permanentemente (Windows → "Variáveis de ambiente do sistema"):

| Variável | Exemplo |
|---|---|
| `DB_USER` | `sa` |
| `DB_PASSWORD` | a senha do `sa` daquela máquina |

> **Dica:** se o `sa` estiver desabilitado, habilite-o no SSMS
> (Segurança → Logins → `sa` → Propriedades → desmarcar "Login desabilitado")
> e use a senha que você escolheu na instalação do SQL Server.

### ✅ Checklist antes de apresentar

```powershell
# API no ar? (deve responder JSON com os mutirões)
curl http://localhost:8080/api/mutiroes

# Teste completo ponta a ponta (12 verificações)
cd bluewave
node scripts\teste-integracao.mjs

# Front no ar? (deve abrir a página azul)
http://localhost:5173
```

Se os 3 itens acima responderem bem, está tudo conectado:
**front → API → banco**.

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
