import React from 'react';
import { Link } from 'react-router';
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
    src="https://media.istockphoto.com/id/466061973/pt/foto/recife-de-coral-no-fundo-do-mar-tropical.jpg?s=612x612&w=0&k=20&c=bpnnRYlcPoQ-6Jvj-kzwwMTwFXWYUFK9auKcq6nxu9k="
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

            <div className={styles.optionsRow}>
              <label className={styles.rememberMe}>
                <input type="checkbox" />
                Lembrar de mim
              </label>
              <Link to="/blue" className={styles.forgotLink}>Esqueci minha senha</Link>
            </div>

            <Link to="/blue" className={styles.loginButton}>Entrar</Link>

            <div className={styles.divider}>
              <span>ou continue com</span>
            </div>

            <div className={styles.socialButtons}>
              <Link to="/blue" className={styles.socialButton}>
                <svg className={styles.socialIcon} viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-4z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6 29.5 4 24 4c-7.6 0-14.2 4.3-17.7 10.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.4 0 10.3-2.1 14-5.5l-6.5-5.4C29.5 34.9 26.9 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.7 39.6 16.3 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.5 5.4C40.9 35.9 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"/>
                </svg>
                Entrar com Google
              </Link>

              <Link to="/blue" className={styles.socialButton}>
                <svg className={styles.socialIcon} viewBox="0 0 23 23" aria-hidden="true">
                  <rect x="1" y="1" width="10" height="10" fill="#F35325"/>
                  <rect x="12" y="1" width="10" height="10" fill="#81BC06"/>
                  <rect x="1" y="12" width="10" height="10" fill="#05A6F0"/>
                  <rect x="12" y="12" width="10" height="10" fill="#FFBA08"/>
                </svg>
                Entrar com Microsoft
              </Link>
            </div>

            <p className={styles.signupText}>
              Não tem uma conta? <Link to="/blue" className={styles.signupLink}>Cadastre-se</Link>
            </p>
          </div>

          <p className={styles.termsText}>
            Ao continuar, você concorda com os <Link to="/blue">Termos de Uso</Link> e a <Link to="/blue">Política de Privacidade</Link>.
          </p>
        </div>

      </div>
    </div>
  );
}