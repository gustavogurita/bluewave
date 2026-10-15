import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import styles from './multiroes.module.css';
import api, { mensagemDeErro } from '../../services/api';

const MESES_CURTO = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export default function Multiroes() {
  const [menuAtivo, setMenuAtivo] = useState(false);

  const [msgNotificacao, setMsgNotificacao] = useState("");
  const [msgInscricao, setMsgInscricao] = useState("");

  // Mutirões vindos da API
  const [mutiroes, setMutiroes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [enviandoInscricao, setEnviandoInscricao] = useState(false);

  // ACESSIBILIDADE
  const [menuAcessibilidade, setMenuAcessibilidade] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);


  // Controle da fonte
  useEffect(() => {
    document.body.style.fontSize = `${fontSize}px`;

    return () => {
      document.body.style.fontSize = '';
    };
  }, [fontSize]);

  // Carrega os mutirões REAIS do bd_bluewave (GET /api/mutiroes)
  useEffect(() => {
    let ativo = true;

    api
      .get('/mutiroes')
      .then(({ data }) => {
        if (ativo) setMutiroes(data);
      })
      .catch((erro) => {
        if (ativo) setErroLista(mensagemDeErro(erro));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);


  const handleNotificacao = (e) => {
    e.preventDefault();

    const email =
      e.target.elements['email-notificacao'].value.trim();

    if (email === "" || !email.includes("@")) {
      setMsgNotificacao(
        "Por favor, insira um e-mail válido."
      );
    } else {
      setMsgNotificacao(
        "Sucesso! Você receberá alertas sobre os próximos mutirões."
      );

      e.target.reset();
    }
  };


  const handleInscricao = async (e) => {
    e.preventDefault();

    const formulario = e.target;
    const nome = formulario.elements['nome'].value.trim();
    const email = formulario.elements['email'].value.trim();
    const mutiraoId = formulario.elements['mutirao'].value;

    if (!nome || !email || !email.includes('@')) {
      setMsgInscricao('Informe seu nome e um e-mail válido.');
      return;
    }

    if (!mutiraoId) {
      setMsgInscricao('Escolha um mutirão para se inscrever.');
      return;
    }

    setEnviandoInscricao(true);

    try {
      // POST /api/inscricoes → grava no banco e soma 1 em mutirao.inscritos
      const { data } = await api.post('/inscricoes', {
        mutiraoId: Number(mutiraoId),
        nome,
        email,
      });

      setMsgInscricao(
        `Inscrição confirmada no mutirão "${data.mutirao.titulo}"! Enviamos os detalhes para ${email}.`
      );

      // Atualiza o contador de vagas no card sem recarregar a página
      setMutiroes((lista) =>
        lista.map((m) =>
          m.id === Number(mutiraoId)
            ? { ...m, inscritos: m.inscritos + 1 }
            : m
        )
      );

      formulario.reset();
    } catch (erro) {
      // 409 = sem vagas / encerrado / já inscrito
      setMsgInscricao(mensagemDeErro(erro));
    } finally {
      setEnviandoInscricao(false);
    }
  };


  return (
    <div
      className={`
        ${darkMode ? styles.dark : ""}
        ${highContrast ? styles.highContrast : ""}
      `}
    >

      {/* =========================
          NAVBAR
      ========================= */}

      <header>

        <nav
          className={`navbar section-content ${styles.navbar}`}
        >

          <Link
            to="/"
            className={styles.navLogo}
          >
            <h2>Blue Wave</h2>
          </Link>


          <div
            className={styles.hamburger}
            onClick={() =>
              setMenuAtivo(!menuAtivo)
            }
          >
            <span></span>
            <span></span>
            <span></span>
          </div>


          <ul
            className={`
              ${styles.navMenu}
              ${menuAtivo ? styles.active : ''}
            `}
          >

            <li>
              <Link
                to="/blue"
                className={styles.navLink}
              >
                ← Voltar
              </Link>
            </li>

            <li>
              <a
                href="#alertas"
                className={styles.navLink}
              >
                Alertas
              </a>
            </li>

            <li>
              <a
                href="#proximos"
                className={styles.navLink}
              >
                Próximos Mutirões
              </a>
            </li>

            <li>
              <a
                href="#inscricao"
                className={styles.navLink}
              >
                Inscrição
              </a>
            </li>

          </ul>

        </nav>

      </header>


      {/* =========================
          ACESSIBILIDADE
      ========================= */}

      <button
        className={styles.accessibilityButton}
        onClick={() =>
          setMenuAcessibilidade(
            !menuAcessibilidade
          )
        }
        aria-label="Abrir menu de acessibilidade"
      >
        ♿
      </button>


      {menuAcessibilidade && (

        <div
          className={styles.accessibilityMenu}
        >

          <button
            onClick={() =>
              setFontSize(fontSize + 2)
            }
          >
            🔎 A+
          </button>


          <button
            onClick={() =>
              setFontSize(
                Math.max(12, fontSize - 2)
              )
            }
          >
            🔎 A-
          </button>


          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            🌙 Escuro
          </button>


          <button
            onClick={() =>
              setHighContrast(!highContrast)
            }
          >
            ◐ Contraste
          </button>

        </div>

      )}


      {/* =========================
          CONTEÚDO
      ========================= */}

      <main>


        {/* HERO */}

        <section
          className={styles.internalHero}
        >

          <div className="section-content">

            <h1>
              Mutirões de Limpeza
            </h1>

            <p>
              Transformando praias, protegendo oceanos.
              Junte-se a nós na próxima ação!
            </p>

          </div>

        </section>


        {/* NEWSLETTER */}

        <section
          className={styles.newsletterSection}
          id="alertas"
        >

          <div className="section-content">

            <div
              className={styles.newsletterCard}
            >

              <div
                className={styles.newsletterIcon}
              >
                <i className="fas fa-envelope-open-text"></i>
              </div>


              <h3>
                Fique por dentro das próximas ações
              </h3>


              <p>
                Receba alertas por e-mail sempre que
                um novo mutirão for agendado na sua região.
              </p>


              <form
                onSubmit={handleNotificacao}
                className={
                  styles.newsletterFormInline
                }
              >

                <input
                  type="email"
                  name="email-notificacao"
                  placeholder="Digite seu melhor e-mail"
                  required
                />

                <button
                  type="submit"
                  className={styles.btnSubmit}
                >
                  Receber Alertas
                </button>

              </form>


              <p
                className={styles.formMessage}
              >
                {msgNotificacao}
              </p>

            </div>

          </div>

        </section>


        {/* PRÓXIMOS MUTIRÕES */}

        <section
          className={styles.eventsSection}
          id="proximos"
        >

          <div className="section-content">

            <h2
              className={styles.sectionTitle}
            >
              Próximos Mutirões Agendados
            </h2>


            <div
              className={styles.galleryLine}
            ></div>


            <div
              className={
                styles.eventsGridLayout
              }
            >


              {/* MUTIRÕES VINDOS DA API (GET /api/mutiroes) */}

              {carregando ? (
                <p>Carregando mutirões...</p>
              ) : erroLista ? (
                <p>{erroLista}</p>
              ) : mutiroes.length === 0 ? (
                <p>Nenhum mutirão agendado no momento.</p>
              ) : (
                mutiroes.map((m, indice) => {
                  const [, mes, dia] = m.data.split('-');
                  const mesAbrev = MESES_CURTO[Number(mes) - 1] || '';
                  const cheio = m.inscritos >= m.vagas;

                  const badge =
                    m.status === 'fechado' || cheio
                      ? { classe: styles.closed, texto: 'Encerrado' }
                      : m.status === 'alerta'
                        ? { classe: styles.alert, texto: 'Poucas Vagas' }
                        : { classe: styles.open, texto: 'Inscrições Abertas' };

                  return (
                    <div
                      key={m.id}
                      className={styles.eventModernCard}
                      id={indice === 0 ? 'inscricao' : undefined}
                    >
                      <div
                        className={`${styles.eventBadge} ${badge.classe}`}
                      >
                        {badge.texto}
                      </div>

                      <div className={styles.eventHeaderDate}>
                        <span className="day">{dia}/</span>
                        <span className="month">{mesAbrev}</span>
                      </div>

                      <div className={styles.eventBodyInfo}>
                        <h3>{m.titulo}</h3>

                        <p>
                          <i className="fas fa-map-marker-alt"></i>
                          {m.localizacao}
                        </p>

                        <p>
                          <i className="fas fa-clock"></i>
                          {m.horario ? m.horario.slice(0, 5) : ''}
                        </p>

                        <p>
                          <i className="fas fa-users"></i>
                          {m.inscritos}/{m.vagas} vagas
                        </p>
                      </div>
                    </div>
                  );
                })
              )}


              {/* EVENTO 2 - removido: cards agora vêm da API acima */}


              {/* EVENTO 3 - removido: cards agora vêm da API acima */}

            </div>

          </div>

        </section>


        {/* INSCRIÇÃO */}

        <section
          className={styles.registrationSection}
        >

          <div className="section-content">

            <div
              className={styles.registrationCard}
            >

              <h2
                className={styles.sectionTitle}
              >
                Inscrição para Voluntários
              </h2>


              <div
                className={styles.galleryLine}
              ></div>


                <form
                  onSubmit={handleInscricao}
                  className={styles.modernForm}
                >

                <div
                  className={styles.inputGroup}
                >

                  <label>
                    Nome Completo
                  </label>

                  <input
                    type="text"
                    name="nome"
                    required
                  />

                </div>


                <div
                  className={styles.inputGroup}
                >

                  <label>
                    E-mail de Contato
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                  />

                </div>


                <div
                  className={styles.inputGroup}
                >

                  <label>
                    Escolha o Mutirão
                  </label>

                  <select name="mutirao" defaultValue="" required>

                    <option
                      value=""
                      disabled
                    >
                      Selecione uma ação...
                    </option>

                    {mutiroes.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.titulo} (
                        {m.data.split('-').reverse().slice(0, 2).join('/')})
                      </option>
                    ))}

                  </select>

                </div>


                <button
                  type="submit"
                  className={styles.donationSubmit}
                  disabled={enviandoInscricao}
                >
                  {enviandoInscricao
                    ? 'ENVIANDO...'
                    : 'CONFIRMAR INSCRIÇÃO'}
                </button>

              </form>


              <p
                className={styles.formMessage}
              >
                {msgInscricao}
              </p>

            </div>

          </div>

        </section>

      </main>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className={styles.footer}>

        <div
          className={`section-content ${styles.footerContent}`}
        >

          <p>
            © 2026 Blue Wave
          </p>


          <div
            className={styles.footerSocial}
          >

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>


            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>


            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >
              <i className="fab fa-x-twitter"></i>
            </a>

          </div>

        </div>

      </footer>

    </div>
  );
}