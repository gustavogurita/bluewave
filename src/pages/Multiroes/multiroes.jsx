import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './multiroes.module.css';

export default function Multiroes() {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [msgNotificacao, setMsgNotificacao] = useState("");
  const [msgInscricao, setMsgInscricao] = useState("");

  const handleNotificacao = (e) => {
    e.preventDefault();
    const email = e.target.elements['email-notificacao'].value.trim();
    if (email === "" || !email.includes("@")) {
      setMsgNotificacao("Por favor, insira um e-mail válido.");
    } else {
      setMsgNotificacao("Sucesso! Você receberá alertas sobre os próximos mutirões.");
      e.target.reset();
    }
  };

  const handleInscricao = (e) => {
    e.preventDefault();
    setMsgInscricao("Inscrição realizada com sucesso! Verifique sua caixa de entrada.");
    e.target.reset();
  };

  return (
    <>
      <header>
        <nav className={`navbar section-content ${styles.navbar}`}>
          <Link to="/" className={styles.navLogo}>
            <h2>Blue Wave</h2>
          </Link>

          <div className={styles.hamburger} id="hamburger" onClick={() => setMenuAtivo(!menuAtivo)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`${styles.navMenu} ${menuAtivo ? styles.active : ''}`} id="nav-menu">
            <li><Link to="/blue" className={styles.navLink}>← Voltar</Link></li>
            <li><a href="#alertas" className={styles.navLink}>Alertas</a></li>
            <li><a href="#proximos" className={styles.navLink}>Próximos Mutirões</a></li>
            <li><a href="#inscricao" className={styles.navLink}>Inscrição</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className={styles.internalHero}>
          <div className="section-content">
            <h1>Mutirões de Limpeza</h1>
            <p>Transformando praias, protegendo oceanos. Junte-se a nós na próxima ação!</p>
          </div>
        </section>

        <section className={styles.newsletterSection} id="alertas">
          <div className="section-content">
            <div className={styles.newsletterCard}>
              <div className={styles.newsletterIcon}><i className="fas fa-envelope-open-text"></i></div>
              <h3>Fique por dentro das próximas ações</h3>
              <p>Receba alertas por e-mail sempre que um novo mutirão for agendado na sua região.</p>
              <form onSubmit={handleNotificacao} className={styles.newsletterFormInline}>
                <input type="email" name="email-notificacao" placeholder="Digite seu melhor e-mail" required />
                <button type="submit" className={styles.btnSubmit}>Receber Alertas</button>
              </form>
              <p className={styles.formMessage}>{msgNotificacao}</p>
            </div>
          </div>
        </section>

        <section className={styles.eventsSection} id="proximos">
          <div className="section-content">
            <h2 className={styles.sectionTitle}>Próximos Mutirões Agendados</h2>
            <div className={styles.galleryLine}></div>
            <div className={styles.eventsGridLayout}>
              <div className={styles.eventModernCard}>
                <div className={`${styles.eventBadge} ${styles.open}`}>Inscrições Abertas</div>
                <div className={styles.eventHeaderDate}><span className="day">12/</span><span className="month">Jul</span></div>
                <div className={styles.eventBodyInfo}>
                  <h3>Mutirão Praia do Tombo</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Guarujá - SP</p>
                  <p><i className="fas fa-clock"></i> 08:30 às 12:00</p>
                </div>
              </div>
              <div className={styles.eventModernCard} id="inscricao">
                <div className={`${styles.eventBadge} ${styles.open}`}>Inscrições Abertas</div>
                <div className={styles.eventHeaderDate}><span className="day">26/</span><span className="month">Jul</span></div>
                <div className={styles.eventBodyInfo}>
                  <h3>Limpeza Costeira - Praia Vermelha</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Ubatuba - SP</p>
                  <p><i className="fas fa-clock"></i> 09:00 às 13:00</p>
                </div>
              </div>
              <div className={styles.eventModernCard}>
                <div className={`${styles.eventBadge} ${styles.alert}`}>Poucas Vagas</div>
                <div className={`${styles.eventHeaderDate} ${styles.textAlert}`}><span className="day">09/</span><span className="month">Ago</span></div>
                <div className={styles.eventBodyInfo}>
                  <h3>Ação de Despoluição Manguezal</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Santos - SP</p>
                  <p><i className="fas fa-clock"></i> 08:00 às 11:30</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.registrationSection}>
          <div className="section-content">
            <div className={styles.registrationCard}>
              <h2 className={styles.sectionTitle}>Inscrição para Voluntários</h2>
              <div className={styles.galleryLine}></div>
              <form onSubmit={handleInscricao} className={styles.modernForm}>
                <div className={styles.inputGroup}>
                  <label>Nome Completo</label>
                  <input type="text" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>E-mail de Contato</label>
                  <input type="email" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Escolha o Mutirão</label>
                  <select defaultValue="">
                    <option value="" disabled>Selecione uma ação...</option>
                    <option value="tombo">Mutirão Praia do Tombo (12/07)</option>
                    <option value="vermelha">Limpeza Costeira - Praia Vermelha (26/07)</option>
                    <option value="mangue">Ação de Despoluição Manguezal (09/08)</option>
                  </select>
                </div>
                <button type="submit" className={styles.donationSubmit}>CONFIRMAR INSCRIÇÃO</button>
              </form>
              <p className={styles.formMessage}>{msgInscricao}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`section-content ${styles.footerContent}`}>
          <p>© 2026 Blue Wave</p>
          <div className={styles.footerSocial}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-x-twitter"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}