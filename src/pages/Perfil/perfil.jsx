import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import styles from './perfil.module.css';

const perfilInicial = {
  nome: 'Marina Oliveira',
  email: 'marina@email.com',
  telefone: '(11) 99999-9999',
  cidade: 'Santos',
  estado: 'SP',
  bio: 'Voluntária apaixonada pela preservação dos oceanos e pela educação ambiental.',
};

export default function Perfil() {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [menuAcessibilidade, setMenuAcessibilidade] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const [perfil, setPerfil] = useState(perfilInicial);
  const [fotoPerfil, setFotoPerfil] = useState('');
  const [msgPerfil, setMsgPerfil] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;

    return () => {
      document.body.style.fontSize = '';
    };
  }, [fontSize]);

  useEffect(() => {
    return () => {
      if (fotoPerfil) {
        URL.revokeObjectURL(fotoPerfil);
      }
    };
  }, [fotoPerfil]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPerfil((perfilAtual) => ({
      ...perfilAtual,
      [name]: value,
    }));

    setMsgPerfil('');
  };

  const handleFoto = (e) => {
    const arquivo = e.target.files?.[0];

    if (!arquivo) {
      return;
    }

    if (!arquivo.type.startsWith('image/')) {
      setMsgPerfil('Selecione um arquivo de imagem válido.');
      return;
    }

    setFotoPerfil(URL.createObjectURL(arquivo));
    setMsgPerfil('Foto de perfil atualizada.');
  };

  const handleSalvar = (e) => {
    e.preventDefault();

    setMsgPerfil('Perfil atualizado com sucesso!');
  };

  return (
    <div
      className={`
        ${styles.page}
        ${darkMode ? styles.dark : ''}
        ${highContrast ? styles.highContrast : ''}
      `}
    >
      <header>
        <nav className={`navbar section-content ${styles.navbar}`}>
          <Link to="/" className={styles.navLogo}>
            <h2>Blue Wave</h2>
          </Link>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => setMenuAtivo((ativo) => !ativo)}
            aria-label="Abrir menu de navegação"
            aria-expanded={menuAtivo}
            aria-controls="menu-principal"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul
            id="menu-principal"
            className={`
              ${styles.navMenu}
              ${menuAtivo ? styles.active : ''}
            `}
          >
            <li>
              <Link to="/blue" className={styles.navLink}>
                ← Voltar
              </Link>
            </li>

            <li>
              <a href="#perfil" className={styles.navLink}>
                Meu Perfil
              </a>
            </li>

            <li>
              <a href="#participacoes" className={styles.navLink}>
                Participações
              </a>
            </li>

            <li>
              <a href="#configuracoes" className={styles.navLink}>
                Configurações
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <button
        type="button"
        className={styles.accessibilityButton}
        onClick={() => setMenuAcessibilidade((aberto) => !aberto)}
        aria-label="Abrir menu de acessibilidade"
        aria-expanded={menuAcessibilidade}
      >
        ♿
      </button>

      {menuAcessibilidade && (
        <div
          className={styles.accessibilityMenu}
          aria-label="Opções de acessibilidade"
        >
          <button
            type="button"
            onClick={() => setFontSize((tamanho) => Math.min(24, tamanho + 2))}
          >
            🔎 A+
          </button>

          <button
            type="button"
            onClick={() => setFontSize((tamanho) => Math.max(12, tamanho - 2))}
          >
            🔎 A-
          </button>

          <button
            type="button"
            onClick={() => setDarkMode((ativo) => !ativo)}
            aria-pressed={darkMode}
          >
            🌙 Escuro
          </button>

          <button
            type="button"
            onClick={() => setHighContrast((ativo) => !ativo)}
            aria-pressed={highContrast}
          >
            ◐ Contraste
          </button>
        </div>
      )}

      <main>
        <section className={styles.internalHero}>
          <div className="section-content">
            <h1>Meu Perfil</h1>
            <p>
              Gerencie suas informações e acompanhe sua participação nas ações
              da Blue Wave.
            </p>
          </div>
        </section>

        <section className={styles.profileSection} id="perfil">
          <div className="section-content">
            <div className={styles.profileLayout}>
              <aside className={styles.profileSummary}>
                <div className={styles.avatarWrapper}>
                  {fotoPerfil ? (
                    <img
                      src={fotoPerfil}
                      alt={`Foto de perfil de ${perfil.nome}`}
                      className={styles.avatar}
                    />
                  ) : (
                    <div className={styles.avatarPlaceholder} aria-hidden="true">
                      {perfil.nome
                        .split(' ')
                        .slice(0, 2)
                        .map((parte) => parte[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                  )}

                  <button
                    type="button"
                    className={styles.changePhotoButton}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Alterar foto
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className={styles.hiddenInput}
                    onChange={handleFoto}
                  />
                </div>

                <h2>{perfil.nome}</h2>

                <p className={styles.memberType}>Voluntária Blue Wave</p>

                <p className={styles.location}>
                  <i className="fas fa-map-marker-alt"></i>
                  {perfil.cidade} - {perfil.estado}
                </p>

                <div className={styles.profileStats}>
                  <div>
                    <strong>8</strong>
                    <span>Mutirões</span>
                  </div>

                  <div>
                    <strong>32h</strong>
                    <span>Voluntariado</span>
                  </div>

                  <div>
                    <strong>146kg</strong>
                    <span>Resíduos</span>
                  </div>
                </div>
              </aside>

              <div className={styles.profileCard} id="configuracoes">
                <h2 className={styles.sectionTitle}>Informações pessoais</h2>
                <div className={styles.galleryLine}></div>

                <form className={styles.modernForm} onSubmit={handleSalvar}>
                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="nome">Nome completo</label>
                      <input
                        id="nome"
                        name="nome"
                        type="text"
                        value={perfil.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="email">E-mail</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={perfil.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                      <label htmlFor="telefone">Telefone</label>
                      <input
                        id="telefone"
                        name="telefone"
                        type="tel"
                        value={perfil.telefone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="cidade">Cidade</label>
                      <input
                        id="cidade"
                        name="cidade"
                        type="text"
                        value={perfil.cidade}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className={styles.inputGroup}>
                      <label htmlFor="estado">Estado</label>
                      <select
                        id="estado"
                        name="estado"
                        value={perfil.estado}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Selecione</option>
                        <option value="ES">ES</option>
                        <option value="PR">PR</option>
                        <option value="RJ">RJ</option>
                        <option value="SC">SC</option>
                        <option value="SP">SP</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="bio">Sobre você</label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="5"
                      maxLength="300"
                      value={perfil.bio}
                      onChange={handleChange}
                    ></textarea>
                    <small>{perfil.bio.length}/300 caracteres</small>
                  </div>

                  <button type="submit" className={styles.submitButton}>
                    SALVAR ALTERAÇÕES
                  </button>
                </form>

                <p className={styles.formMessage} aria-live="polite">
                  {msgPerfil}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.activitiesSection} id="participacoes">
          <div className="section-content">
            <h2 className={styles.sectionTitle}>Minhas participações</h2>
            <div className={styles.galleryLine}></div>

            <div className={styles.activitiesGrid}>
              <article className={styles.activityCard}>
                <div className={styles.activityIcon}>✓</div>
                <div>
                  <span className={styles.completedBadge}>Concluído</span>
                  <h3>Mutirão Praia do Tombo</h3>
                  <p>
                    <i className="fas fa-calendar-alt"></i>
                    12 de julho de 2026
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt"></i>
                    Guarujá - SP
                  </p>
                </div>
              </article>

              <article className={styles.activityCard}>
                <div className={styles.activityIcon}>✓</div>
                <div>
                  <span className={styles.completedBadge}>Concluído</span>
                  <h3>Limpeza Costeira - Praia Vermelha</h3>
                  <p>
                    <i className="fas fa-calendar-alt"></i>
                    26 de julho de 2026
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt"></i>
                    Ubatuba - SP
                  </p>
                </div>
              </article>

              <article className={styles.activityCard}>
                <div className={styles.activityIcon}>⏱</div>
                <div>
                  <span className={styles.confirmedBadge}>Confirmado</span>
                  <h3>Ação de Despoluição Manguezal</h3>
                  <p>
                    <i className="fas fa-calendar-alt"></i>
                    9 de agosto de 2026
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt"></i>
                    Santos - SP
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`section-content ${styles.footerContent}`}>
          <p>© 2026 Blue Wave</p>

          <div className={styles.footerSocial}>
            <a
              href="[facebook.com](https://facebook.com)"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>

            <a
              href="[instagram.com](https://instagram.com)"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>

            <a
              href="[twitter.com](https://twitter.com)"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <i className="fab fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
