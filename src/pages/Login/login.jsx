import React from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';

export default function Login() {
  return (
    <div className={styles.loginPage}>
      <nav className={styles.navbar}>
        <h1>BlueWave</h1>
      </nav>

      {/* Conteúdo central (texto + imagem + login) */}
      <div className={styles.contentArea}>
        
        {/* Texto centralizado */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h2>Protegendo nossos oceanos</h2>
            <p>Tecnologia e monitoramento para a preservação da vida marinha.</p>
          </div>
        </div>

  <div className={styles.heroImage}>
  <img
    src="https://snct.fiocruz.br/wp-content/uploads/2025/10/Fig-4-oceanos-e-saude-1024x666.jpg"
    alt="Oceanos"
  />
</div>

        {/* Login */}
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h2>Login</h2>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input type="email" placeholder="Digite seu email" />
            </div>
            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input type="password" placeholder="Digite sua senha" />
            </div>
            <Link to="/blue" className={styles.loginButton}>Entrar</Link>
          </div>
        </div>

      </div>
    </div>
  );
}