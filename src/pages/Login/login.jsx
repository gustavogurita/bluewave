import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./login.module.css";
 
export default function Login() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
 
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [menuAcessibilidade, setMenuAcessibilidade] = useState(false);
 
  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;
  }, [fontSize]);
 
  function entrar() {
    const emailValido =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
 
    if (!emailValido) {
      setErro("Informe um e-mail em um formato válido.");
      return;
    }
 
    if (senha.trim().length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
 
    setErro("");
    navigate("/blue");
  }
 
  function lerPagina() {
    window.speechSynthesis.cancel();
 
    const texto =
      "Bem-vindo ao Blue Wave. Faça login para acessar o sistema.";
 
    const fala = new SpeechSynthesisUtterance(texto);
    fala.lang = "pt-BR";
 
    window.speechSynthesis.speak(fala);
  }
 
  return (
<div
  className={`${styles.loginPage}
  ${darkMode ? styles.dark : ""}
  ${highContrast ? styles.highContrast : ""}`}
  style={{
    backgroundImage: "url('https://s2.best-wallpaper.net/wallpaper/3840x2160/1805/Underwater-fish-coral-shark-sea_3840x2160.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>

      <nav className={styles.navbar}>
        <h1> Blue Wave</h1>
      </nav>
 
      <button
        className={styles.accessibilityButton}
        onClick={() =>
          setMenuAcessibilidade(!menuAcessibilidade)
        }
        aria-label="Abrir menu de acessibilidade"
      >
        ♿
      </button>
 
      {menuAcessibilidade && (
        <div className={styles.accessibilityMenu}>
          <button onClick={() => setFontSize(fontSize + 2)}>
            🔎︎+
          </button>
 
          <button
            onClick={() =>
              setFontSize(Math.max(12, fontSize - 2))
            }
          >
            🔎︎-
          </button>
 
          <button onClick={() => setDarkMode(!darkMode)}>
            ☼
          </button>
 
          <button
            onClick={() =>
              setHighContrast(!highContrast)
            }
          >
            ⏾
          </button>
 
          <button onClick={lerPagina}>
            🔊
          </button>
        </div>
      )}
 
      <div className={styles.contentArea}>
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h2>Protegendo nossos oceanos</h2>
 
            <p>
              Tecnologia e monitoramento para a
              preservação da vida marinha.
            </p>
          </div>
        </div>
        

        
 
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h2>Login</h2>
 
            <div className={styles.inputGroup}>
              <label htmlFor="email">
                E-mail
              </label>
 
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>
 
            <div className={styles.inputGroup}>
              <label htmlFor="senha">
                Senha
              </label>
 
              <input
                id="senha"
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) =>
                  setSenha(e.target.value)
                }
              />
            </div>
 
            {erro && (
              <p
                className={styles.loginError}
                role="alert"
              >
                {erro}
              </p>
            )}
 
            {/* continua... */}
             <div className={styles.optionsRow}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                 Lembrar de mim
              </label>
             
              
              <Link
                to="/blue"
                className={styles.forgotLink}
              >
                Esqueci minha senha
              </Link>
            </div>
 
            <button
              type="button"
              className={styles.loginButton}
              onClick={entrar}
            >
              Entrar
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
                Entrar com Google
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
                Entrar com Microsoft
              </button>
            </div>
 
            <p className={styles.signupText}>
              Não tem uma conta?{" "}
              <Link
                to="/cadastro"
                className={styles.signupLink}
              >
                Cadastre-se
              </Link>
            </p>
 
            <p className={styles.termsText}>
              Ao continuar, você concorda com os{" "}
              <Link to="/termos">Termos de Uso</Link>{" "}
              e a{" "}
              <Link to="/privacidade">
                Política de Privacidade
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
 