import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './multiroes.css'; 

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
  <nav className="navbar section-content">
    <Link to="/" className="nav-logo">
      <h2>Blue Wave</h2>
    </Link>

    <div className="hamburger" id="hamburger" onClick={() => setMenuAtivo(!menuAtivo)}>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <ul className={`nav-menu ${menuAtivo ? 'active' : ''}`} id="nav-menu">
      <li><Link to="/" className="nav-link">← Voltar</Link></li>
      <li><a href="#alertas" className="nav-link">Alertas</a></li>
      <li><a href="#proximos" className="nav-link">Próximos Mutirões</a></li>
      <li><a href="#inscricao" className="nav-link">Inscrição</a></li>
    </ul>
  </nav>
</header>

      <main>
        <section className="internal-hero">
          <div className="section-content">
            <h1>Mutirões de Limpeza</h1>
            <p>Transformando praias, protegendo oceanos. Junte-se a nós na próxima ação!</p>
          </div>
        </section>

        <section className="newsletter-section" id="alertas">
          <div className="section-content">
            <div className="newsletter-card">
              <div className="newsletter-icon"><i className="fas fa-envelope-open-text"></i></div>
              <h3>Fique por dentro das próximas ações</h3>
              <p>Receba alertas por e-mail sempre que um novo mutirão for agendado na sua região.</p>
              <form onSubmit={handleNotificacao} className="newsletter-form-inline">
                <input type="email" name="email-notificacao" placeholder="Digite seu melhor e-mail" required />
                <button type="submit" className="btn-submit">Receber Alertas</button>
              </form>
              <p className="form-message">{msgNotificacao}</p>
            </div>
          </div>
        </section>

        <section className="events-section" id="proximos">
          <div className="section-content">
            <h2 className="section-title">Próximos Mutirões Agendados</h2>
            <div className="gallery-line"></div>
            <div className="events-grid-layout">
              <div className="event-modern-card">
                <div className="event-badge open">Inscrições Abertas</div>
                <div className="event-header-date"><span className="day">12</span><span className="month">Jul</span></div>
                <div className="event-body-info">
                  <h3>Mutirão Praia do Tombo</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Guarujá - SP</p>
                  <p><i className="fas fa-clock"></i> 08:30 às 12:00</p>
                </div>
              </div>
              <div className="event-modern-card" id="inscricao">
                <div className="event-badge open">Inscrições Abertas</div>
                <div className="event-header-date"><span className="day">26</span><span className="month">Jul</span></div>
                <div className="event-body-info">
                  <h3>Limpeza Costeira - Praia Vermelha</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Ubatuba - SP</p>
                  <p><i className="fas fa-clock"></i> 09:00 às 13:00</p>
                </div>
              </div>
              <div className="event-modern-card">
                <div className="event-badge alert">Poucas Vagas</div>
                <div className="event-header-date text-alert"><span className="day">09</span><span className="month">Ago</span></div>
                <div className="event-body-info">
                  <h3>Ação de Despoluição Manguezal</h3>
                  <p><i className="fas fa-map-marker-alt"></i> Santos - SP</p>
                  <p><i className="fas fa-clock"></i> 08:00 às 11:30</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="registration-section">
          <div className="section-content">
            <div className="registration-card">
              <h2 className="section-title">Inscrição para Voluntários</h2>
              <div className="gallery-line"></div>
              <form onSubmit={handleInscricao} className="modern-form">
                <div className="input-group">
                  <label>Nome Completo</label>
                  <input type="text" required />
                </div>
                <div className="input-group">
                  <label>E-mail de Contato</label>
                  <input type="email" required />
                </div>
                <div className="input-group">
                  <label>Escolha o Mutirão</label>
                  <select defaultValue="">
                    <option value="" disabled>Selecione uma ação...</option>
                    <option value="tombo">Mutirão Praia do Tombo (12/07)</option>
                    <option value="vermelha">Limpeza Costeira - Praia Vermelha (26/07)</option>
                    <option value="mangue">Ação de Despoluição Manguezal (09/08)</option>
                  </select>
                </div>
                <button type="submit" className="donation-submit">CONFIRMAR INSCRIÇÃO</button>
              </form>
              <p className="form-message">{msgInscricao}</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="section-content footer-content">
          <p>© 2026 Blue Wave</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-x-twitter"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}