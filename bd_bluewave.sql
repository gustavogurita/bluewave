-- =====================================================================
-- Blue Wave - Banco de dados (SQL Server)
-- Adaptado do template do professor (bd_pizzaria) para o domínio do TCC:
-- plataforma de voluntariado e conservação da vida marinha.
-- =====================================================================
USE master;
GO

IF EXISTS (SELECT * FROM sys.databases WHERE name = 'bd_bluewave')
    DROP DATABASE bd_bluewave;
GO

CREATE DATABASE bd_bluewave;
GO

USE bd_bluewave;
GO

-- ============ USUÁRIO ============
CREATE TABLE Usuario
(
    id              INT             IDENTITY,
    nome            VARCHAR(254)    NOT NULL,
    username        VARCHAR(255)    NOT NULL UNIQUE,      -- e-mail usado no login
    password        VARCHAR(100)    NOT NULL,             -- hash bcrypt
    nivelAcesso     VARCHAR(10)     NULL,                 -- ADMIN ou USER
    foto            VARBINARY(MAX)  NULL,
    dataCadastro    SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
    dataAtualizacao SMALLDATETIME   NULL,
    statusUsuario   VARCHAR(20)     NOT NULL,             -- ATIVO / INATIVO / TROCAR_SENHA

    PRIMARY KEY (id)
);
GO

-- Senha de todos os usuários abaixo = 12345678 (hash bcrypt)
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Fulano da Silva', 'fulano@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'ADMIN', NULL, GETDATE(), NULL, 'ATIVO');
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Beltrana de Sá', 'beltrana@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'ATIVO');
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Sicrana de Oliveira', 'sicrana@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'INATIVO');
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Ordnael Zurc', 'ordnael@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'ATIVO');
GO

-- ============ RECUPERAR SENHA ============
CREATE TABLE RecuperarSenha
(
    id           INT             IDENTITY,
    email        VARCHAR(254)    NOT NULL,
    codigo       CHAR(6)         NOT NULL,
    geradoEm     SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
    expiraEm     SMALLDATETIME   NOT NULL,
    statusCodigo BIT             NOT NULL DEFAULT 1,      -- 1 = ATIVO, 0 = INATIVO

    PRIMARY KEY (id)
);
GO

-- ============ MENSAGEM (formulário de contato) ============
CREATE TABLE Mensagem
(
    id              INT             IDENTITY,
    dataMensagem    SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
    emissor         VARCHAR(100)    NOT NULL,
    email           VARCHAR(254)    NOT NULL,
    telefone        VARCHAR(20)     NULL,
    texto           VARCHAR(400)    NOT NULL,
    dataAtualizacao SMALLDATETIME   NULL,
    statusMensagem  VARCHAR(10)     NOT NULL DEFAULT 'ATIVO',

    PRIMARY KEY (id)
);
GO

INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, dataAtualizacao, statusMensagem)
VALUES (GETDATE(), 'Ordnael Zurc', 'ordnael@username.com', '(11) 98765-4123', 'Mensagem de teste', NULL, 'ATIVO');
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, dataAtualizacao, statusMensagem)
VALUES (GETDATE(), 'Maria Onete', 'maria@username.com', NULL, 'Segunda mensagem de teste', NULL, 'ATIVO');
GO

-- ============ MUTIRÃO ============
CREATE TABLE Mutirao
(
    id           INT             IDENTITY,
    titulo       VARCHAR(150)    NOT NULL,
    data         DATE            NOT NULL,
    horario      TIME            NOT NULL,
    localizacao  VARCHAR(150)    NOT NULL,
    vagas        INT             NOT NULL,
    inscritos    INT             NOT NULL DEFAULT 0,
    status       VARCHAR(20)     NOT NULL DEFAULT 'aberto',  -- aberto / alerta / fechado
    descricao    VARCHAR(500)    NULL,

    PRIMARY KEY (id)
);
GO

INSERT Mutirao (titulo, data, horario, localizacao, vagas, inscritos, status, descricao)
VALUES ('Mutirão Praia do Tombo', '2026-08-12', '08:30', 'Guarujá - SP', 30, 18, 'aberto', 'Coleta de resíduos e triagem de material reciclável.');
INSERT Mutirao (titulo, data, horario, localizacao, vagas, inscritos, status, descricao)
VALUES ('Limpeza Costeira - Praia Vermelha', '2026-08-26', '09:00', 'Ubatuba - SP', 25, 25, 'alerta', 'Ação de limpeza costeira com apoio de voluntários locais.');
INSERT Mutirao (titulo, data, horario, localizacao, vagas, inscritos, status, descricao)
VALUES ('Ação de Despoluição Manguezal', '2026-08-09', '08:00', 'Santos - SP', 15, 12, 'aberto', 'Remoção de resíduos sólidos e plantio de mudas nativas.');
GO

-- ============ INSCRIÇÃO (voluntário em um mutirão) ============
CREATE TABLE Inscricao
(
    id             INT             IDENTITY,
    usuario_id     INT             NULL,                  -- preenchido se o e-mail já tiver conta
    nome           VARCHAR(150)    NOT NULL,
    email          VARCHAR(255)    NOT NULL,
    mutirao_id     INT             NOT NULL,
    dataInscricao  SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
    status         VARCHAR(20)     NOT NULL DEFAULT 'CONFIRMADO',

    PRIMARY KEY (id),
    CONSTRAINT FK_Inscricao_Usuario FOREIGN KEY (usuario_id) REFERENCES Usuario(id),
    CONSTRAINT FK_Inscricao_Mutirao FOREIGN KEY (mutirao_id) REFERENCES Mutirao(id)
);
GO

-- ============ DOAÇÃO ============
CREATE TABLE Doacao
(
    id              INT             IDENTITY,
    nome            VARCHAR(150)    NOT NULL,
    email           VARCHAR(255)    NOT NULL,
    valor           DECIMAL(10,2)   NOT NULL,
    formaPagamento  VARCHAR(30)     NOT NULL,
    dataDoacao      SMALLDATETIME   NOT NULL DEFAULT GETDATE(),

    PRIMARY KEY (id)
);
GO

-- Conferência
SELECT * FROM Usuario;
SELECT * FROM Mutirao;

