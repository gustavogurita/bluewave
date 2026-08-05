import React, { useState } from 'react';
import { Link } from 'react-router';
import styles from './blue.module.css';

export default function blue() {
  const [menuAtivo, setMenuAtivo] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  // Doação
  const [valorSelecionado, setValorSelecionado] = useState(null);
  const [valorPersonalizado, setValorPersonalizado] = useState('');
  const [msgDoacao, setMsgDoacao] = useState('');

  function escolherValorFixo(valor) {
    setValorSelecionado(valor);
    setValorPersonalizado('');
    setMsgDoacao('');
  }

  function alterarValorPersonalizado(valor) {
    setValorPersonalizado(valor);
    setValorSelecionado(null);
    setMsgDoacao('');
  }

  function confirmarDoacao(e) {
    e.preventDefault();
    const nome = e.target.elements['doador-nome'].value.trim();
    const email = e.target.elements['doador-email'].value.trim();
    const pagamento = e.target.elements['payment'].value;
    const valor = valorSelecionado ?? Number(valorPersonalizado);

    if (!valor || valor <= 0) {
      setMsgDoacao('Escolha um valor fixo ou informe um valor personalizado maior que zero.');
      return;
    }
    if (!nome || !email || !email.includes('@')) {
      setMsgDoacao('Preencha nome e um e-mail válido para continuar.');
      return;
    }
    if (!pagamento) {
      setMsgDoacao('Selecione uma forma de pagamento.');
      return;
    }

    setMsgDoacao(`Obrigado, ${nome}! Sua doação de R$ ${valor} via ${pagamento} foi registrada com sucesso.`);
    e.target.reset();
    setValorSelecionado(null);
    setValorPersonalizado('');
  }

  // Contato
  const [msgContato, setMsgContato] = useState('');

  function enviarContato(e) {
    e.preventDefault();
    const nome = e.target.elements['nome'].value.trim();
    const email = e.target.elements['email'].value.trim();
    const mensagem = e.target.elements['mensagem'].value.trim();

    if (!nome || !email || !email.includes('@') || !mensagem) {
      setMsgContato('Preencha nome, e-mail e mensagem corretamente antes de enviar.');
      return;
    }

    setMsgContato('Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.');
    e.target.reset();
  }

  return (
    <>
      <header>
        <nav className={`navbar section-content ${styles.navbar}`}>
          <a href="#" className={styles.navLogo}>
            <h2>Blue Wave</h2>
          </a>

          <div className={styles.hamburger} id="hamburger" onClick={() => setMenuAtivo(!menuAtivo)}>
            <span></span><span></span><span></span>
          </div>

          <ul className={`${styles.navMenu} ${menuAtivo ? styles.active : ''}`} id="nav-menu">
            <li><a href="#" className={styles.navLink}>Início</a></li>
            <li><a href="#sobre" className={styles.navLink}>Sobre</a></li>
            <li><a href="#galeria" className={styles.navLink}>Doações</a></li>
            <li><a href="#menu" className={styles.navLink}>Projetos</a></li>
            <li><a href="#contato" className={styles.navLink}>Contato</a></li>
            <li><Link to="/admin" className={styles.navLink}>Admin</Link></li>
          </ul>
        </nav>
      </header>

      <main style={{ paddingTop: '80px' }}>
        {/* HERO */}
        <section className={styles.heroSection}>
          <div className="section-content">
            <div className={styles.heroDetails}>
              <h2 className={styles.heroTitle}>Vida e Conservação Marinha</h2>
              <h3 className={styles.heroSubtitle}>Ajudando o meio-ambiente!</h3>

              <p className={styles.heroDescription}>
                O oceano também é seu. Aqui, cada escolha ajuda a proteger a vida marinha e manter nossos mares cheios de vida e beleza.
                Navegue com consciência e faça parte dessa corrente do bem.
              </p>

              <div className={styles.heroButtons}>
                <a href="#galeria" className={`${styles.button} ${styles.orderNow}`}>Doe Aqui!</a>
                <a href="#contato" className={`${styles.button} ${styles.contactUs}`}>Ajude de outras formas</a>
              </div>
            </div>

            <div className={styles.heroImageWrapper}>
              <img src="https://images.vexels.com/media/users/3/137592/isolated/preview/be53dc3255f7a4814face57ffd6f8b0d-silhueta-de-animais-de-pesca-peixe.png" alt="Peixes" />
            </div>
          </div>
        </section>

        {/* SOBRE */}
        <section className={styles.aboutSection} id="sobre">
          <div className="section-content">
            <div className={styles.aboutContainer}>
              <div className={styles.aboutImage}>
                <img src="https://t4.ftcdn.net/jpg/03/10/31/11/360_F_310311131_zbUsU5sbQK6VOUZKYoQyCIWfqVdXVgTL.jpg" alt="Sobre" />
              </div>

              <div className={styles.aboutText}>
                <h2>SOBRE NÓS</h2>
                <div className={`${styles.line} ${styles.line2}`}></div>

                <p>
                  Na Blue Wave, temos orgulho de ser um espaço dedicado à preservação dos oceanos e à valorização da vida marinha.
                </p>

                <p>
                  Criamos um ambiente acolhedor onde você pode aprender, se conectar com a natureza e fazer parte de um movimento que protege nossos mares.
                </p>

                <div className={styles.social}>
                  <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
                  <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="fab fa-x-twitter"></i></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DOAÇÃO */}
        <section className={styles.gallerySection} id="galeria">
          <div className="section-content">
            <h2 className={styles.galleryTitle}>DOE AQUI</h2>
            <div className={styles.galleryLine}></div>

            <form className={styles.galleryGrid} onSubmit={confirmarDoacao}>
              <div className={styles.donationValues}>
                {[10, 25, 50, 100].map((valor) => (
                  <button
                    type="button"
                    key={valor}
                    className={styles.donationBtn}
                    style={valorSelecionado === valor ? { background: '#29588d', outline: '2px solid #6191c9' } : undefined}
                    onClick={() => escolherValorFixo(valor)}
                  >
                    R$ {valor}
                  </button>
                ))}
              </div>

              <div className={styles.donationCustom}>
                <label htmlFor="custom-value">Outro valor:</label>
                <input
                  type="number"
                  id="custom-value"
                  min="1"
                  placeholder="Digite o valor"
                  value={valorPersonalizado}
                  onChange={(e) => alterarValorPersonalizado(e.target.value)}
                />
              </div>

              <div className={styles.donationForm}>
                <input type="text" name="doador-nome" placeholder="Seu nome" required />
                <input type="email" name="doador-email" placeholder="Seu email" required />
              </div>

              <div className={styles.donationPayment}>
                <label>
                  <input type="radio" name="payment" value="Cartão de Crédito" required /> Cartão de Crédito
                </label>
                <label>
                  <input type="radio" name="payment" value="Cartão de Débito" /> Cartão de Débito
                </label>
                <label>
                  <input type="radio" name="payment" value="Pix" /> Pix
                </label>
              </div>

              <div className={styles.donationAction}>
                <button type="submit" className={styles.donationSubmit}>DOAR AGORA</button>
              </div>

              {msgDoacao && <p className={styles.formMessage}>{msgDoacao}</p>}
            </form>
          </div>
        </section>

        <section className={styles.hero} id="menu">
          <h1>Nossos Projetos Ambientais</h1>
        </section>

        <section className="section">
          <div className={styles.grid}>
            <div className={styles.card}>
              <img src="https://images.unsplash.com/photo-1514907283155-ea5f4094c70c?q=80&w=1170" alt="Monitoramento de Recifes" />
              <div className={styles.cardContent}>
                <span className={styles.tag}>Pesquisa</span>
                <h3>Monitoramento de Recifes</h3>
                <p>Análise científica contínua da saúde dos recifes de coral e impactos das mudanças climáticas.</p>
                <a className={styles.cardLink} href="/recife">Saiba mais</a>
              </div>
            </div>

            <div className={styles.card}>
              <img src="https://images.unsplash.com/photo-1618277043431-1c85e8462f70?q=80&w=1155" alt="Mutirões de Limpeza" />
              <div className={styles.cardContent}>
                <span className={styles.tag}>Conservação</span>
                <h3>Multirões de Limpeza</h3>
                <p>Ações periódicas para remoção de resíduos e conscientização comunitária.</p>
                <a className={styles.cardLink} href="/multiroes">Saiba mais</a>
              </div>
            </div>

            <div className={styles.card}>
              <img src="https://images.unsplash.com/photo-1690559490662-bd2afb76e1bd?q=80&w=1172" alt="Combate ao Plástico" />
              <div className={styles.cardContent}>
                <span className={styles.tag}>Conservação</span>
                <h3>Combate ao Plástico</h3>
                <p>Iniciativas para reduzir plásticos descartáveis e incentivar alternativas sustentáveis.</p>
                <Link className={styles.cardLink} to="/combate">Saiba mais</Link>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section className={styles.contactSection} id="contato">
          <div className="section-content">
            <h2 className={styles.contactTitle}>CONTATO</h2>
            <div className={styles.contactLine}></div>

            <div className={styles.contactContainer}>
              <div className={styles.contactInfo}>
                <p><i className="fas fa-map-marker-alt"></i> Rua Exemplo, Barueri - SP</p>
                <p><i className="fas fa-envelope"></i> contato@bluewave.com</p>
                <p><i className="fas fa-phone"></i> (11) 99999-9999</p>
                <p><i className="fas fa-clock"></i> Seg - Sex: 09:00 - 18:00</p>
                <p><i className="fas fa-clock"></i> Sábado: 10:00 - 15:00</p>
                <p><i className="fas fa-clock"></i> Domingo: Fechado</p>
              </div>

              <div className={styles.contactForm}>
                <form onSubmit={enviarContato}>
                  <input type="text" name="nome" placeholder="Seu nome" required />
                  <input type="email" name="email" placeholder="Seu email" required />
                  <textarea name="mensagem" placeholder="Sua mensagem" required></textarea>
                  <button type="submit">Enviar</button>
                </form>
                {msgContato && <p className={styles.formMessage}>{msgContato}</p>}
              </div>
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

          <p>Política de Privacidade • Termos</p>
        </div>
      </footer>
    </>
  );
}