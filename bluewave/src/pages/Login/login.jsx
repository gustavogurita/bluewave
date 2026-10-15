import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./login.module.css";
import { useAuth } from "../../context/AuthContext";
import { mensagemDeErro } from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const { login, usuario } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Se já tem sessão, não precisa logar de novo
  useEffect(() => {
    if (usuario) {
      navigate(usuario.nivelAcesso === "ADMIN" ? "/admin" : "/blue", { replace: true });
    }
  }, [usuario, navigate]);

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

  async function entrar(e) {
    e.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErro("Informe um e-mail válido.");
      return;
    }

    if (senha.trim().length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    setErro("");
    setEnviando(true);

    try {
      // POST /api/auth/login → { token, usuario }
      const usuarioLogado = await login(email.trim(), senha);
      // Admin cai direto no painel; usuário comum vai para a home
      navigate(usuarioLogado.nivelAcesso === "ADMIN" ? "/admin" : "/blue", { replace: true });
    } catch (erroApi) {
      setErro(mensagemDeErro(erroApi));
    } finally {
      setEnviando(false);
    }
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

        <Link to="/blue" className={styles.navLink}>
          ← Voltar
        </Link>
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
          <h3 className={styles.heroSubtitle}>Protegendo nossos oceanos</h3>
          <p className={styles.heroDescription}>
            Tecnologia e monitoramento para a preservação da vida marinha.
            Entre na sua conta e faça parte dessa corrente do bem.
          </p>
        </section>

        <form className={styles.box} onSubmit={entrar} noValidate>
          <h2>Login</h2>

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

          <div className={styles.field}>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          {erro && (
            <p className={styles.error} role="alert">
              {erro}
            </p>
          )}

          <div className={styles.optionsRow}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              Lembrar de mim
            </label>

            <Link to="/blue" className={styles.link}>
              Esqueci minha senha
            </Link>
          </div>

          <button type="submit" className={styles.submit} disabled={enviando}>
            {enviando ? "Entrando..." : "Entrar"}
          </button>

          <div className={styles.divider}>
            <span>ou continue com</span>
          </div>

          <div className={styles.socialButtons}>
            <button
              type="button"
              className={styles.socialButton}
              aria-label="Entrar com Google"
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
              aria-label="Entrar com Microsoft"
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
            Não tem uma conta?{" "}
            <Link to="/cadastro" className={styles.link}>
              Cadastre-se
            </Link>
          </p>

          <p className={styles.terms}>
            Ao continuar, você concorda com os{" "}
            <Link to="/termos">Termos de Uso</Link> e a{" "}
            <Link to="/privacidade">Política de Privacidade</Link>.
          </p>
        </form>
      </main>
    </div>
  );
}