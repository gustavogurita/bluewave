import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './login.module.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function entrar() {
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      setErro('Informe um e-mail em um formato válido.');
      return;
    }
    if (senha.trim().length < 6) {
      setErro('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    setErro('');
    navigate('/blue');
  }

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
              <input
                type="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Senha</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            {erro && <p className={styles.loginError}>{erro}</p>}
            <button type="button" className={styles.loginButton} onClick={entrar}>Entrar</button>
          </div>
        </div>

      </div>
    </div>
  );
}