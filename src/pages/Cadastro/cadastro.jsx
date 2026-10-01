import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./cadastro.module.css";

export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [aceitaTermos, setAceitaTermos] = useState(false);
  const [erro, setErro] = useState("");

  // Acessibilidade
  const [menuAcessibilidade, setMenuAcessibilidade] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
    return () => {
      document.body.style.fontSize = "";
    };
  }, [fontSize]);

  // Volta para a página anterior; se não houver histórico (acesso direto), vai para a inicial
  function voltar() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/blue");
    }
  }

  function cadastrar(e) {
    e.preventDefault();

    if (nome.trim().length < 3) {
      setErro("Informe seu nome completo.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (senha.trim().length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (!aceitaTermos) {
      setErro("Aceite os Termos de Uso e a Política de Privacidade.");
      return;
    }

    setErro("");

    // Aqui você pode enviar os dados para a sua API antes de redirecionar
    navigate("/login");
  }

  return (
    <div
      className={`${styles.page} ${darkMode ? styles.dark : ""} ${
        highContrast ? styles.highContrast : ""
      }`}
    >
      <header className={styles.navbar}>
        <Link to="/blue" className={styles.navLogo}>
          <h2>Blue Wave</h2>
        </Link>

        <button type="button" className={styles.navLink} onClick={voltar}>
          ← Voltar
        </button>
      </header>

      <button
        className={styles.accessibilityButton}
        onClick={() => setMenuAcessibilidade(!menuAcessibilidade)}
        aria-label="Abrir menu de acessibilidade"
      >
        ♿
      </button>

      {menuAcessibilidade && (
        <div className={styles.accessibilityMenu}>
          <button onClick={() => setFontSize(fontSize + 2)}>🔎 A+</button>
          <button onClick={() => setFontSize(Math.max(12, fontSize - 2))}>
            🔎 A-
          </button>
          <button onClick={() => setDarkMode(!darkMode)}>🌙 Escuro</button>
          <button onClick={() => setHighContrast(!highContrast)}>
            ◐ Contraste
          </button>
        </div>
      )}

      <main className={styles.content}>
        <section className={styles.heroDetails}>
          <h2 className={styles.heroTitle}>Vida e Conservação Marinha</h2>
          <h3 className={styles.heroSubtitle}>Faça parte da maré</h3>
          <p className={styles.heroDescription}>
            Crie sua conta e ajude a proteger a vida marinha. Navegue com
            consciência e faça parte dessa corrente do bem.
          </p>
        </section>

        <form className={styles.box} onSubmit={cadastrar} noValidate>
          <h2>Cadastro</h2>

          <div className={styles.field}>
            <label htmlFor="nome">Nome completo</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="senha">Senha</label>
              <input
                id="senha"
                type="password"
                placeholder="Mín. 6 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="confirmarSenha">Confirmar senha</label>
              <input
                id="confirmarSenha"
                type="password"
                placeholder="Repita a senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
            </div>
          </div>

          <label className={styles.termsCheck}>
            <input
              type="checkbox"
              checked={aceitaTermos}
              onChange={(e) => setAceitaTermos(e.target.checked)}
            />
            <span>
              Li e concordo com os <Link to="/termos">Termos de Uso</Link> e a{" "}
              <Link to="/privacidade">Política de Privacidade</Link>.
            </span>
          </label>

          {erro && (
            <p className={styles.error} role="alert">
              {erro}
            </p>
          )}

          <button type="submit" className={styles.submit}>
            Criar conta
          </button>

          <div className={styles.divider}>
            <span>ou cadastre-se com</span>
          </div>

          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.socialButton}
              aria-label="Cadastrar com Google"
            >
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                alt=""
                width="20"
                height="20"
              />
              Google
            </button>

            <button
              type="button"
              className={styles.socialButton}
              aria-label="Cadastrar com Microsoft"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                alt=""
                width="20"
                height="20"
              />
              Microsoft
            </button>
          </div>

          <p className={styles.smallText}>
            Já tem uma conta?{" "}
            <Link to="/login" className={styles.link}>
              Entrar
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
}