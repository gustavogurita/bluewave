import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import styles from './AdminMutiroes.module.css';
import api, { mensagemDeErro } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const STATUS_INFO = {
  aberto: { label: 'Inscrições Abertas', classe: 'open' },
  alerta: { label: 'Poucas Vagas', classe: 'alert' },
  fechado: { label: 'Encerrado', classe: 'closed' },
};

const CAMPO_VAZIO = {
  id: null,
  titulo: '',
  data: '',
  horario: '',
  localizacao: '',
  vagas: '',
  inscritos: 0,
  status: 'aberto',
  descricao: '',
};

const MESES_ABREV = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

export default function AdminMutiroes() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const [menuAtivo, setMenuAtivo] = useState(false);
  const [mutiroes, setMutiroes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroApi, setErroApi] = useState('');
  const [tela, setTela] = useState('lista');
  const [form, setForm] = useState(CAMPO_VAZIO);
  const [erros, setErros] = useState({});
  const [msgSucesso, setMsgSucesso] = useState('');

  const [menuAcessibilidade, setMenuAcessibilidade] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [darkMode, setDarkMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

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
        if (ativo) setErroApi(mensagemDeErro(erro));
      })
      .finally(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
    };
  }, []);

  function sair() {
    logout();
    navigate('/login');
  }

  function abrirNovo() {
    setForm(CAMPO_VAZIO);
    setErros({});
    setMsgSucesso('');
    setTela('form');
  }

  function abrirEdicao(mutirao) {
    // A API devolve "08:30:00"; o input type="time" aceita só "08:30"
    const horarioCurto =
      mutirao.horario && mutirao.horario.length > 5
        ? mutirao.horario.slice(0, 5)
        : mutirao.horario;

    setForm({ ...mutirao, horario: horarioCurto });
    setErros({});
    setMsgSucesso('');
    setTela('form');
  }

  function cancelar() {
    setTela('lista');
  }

  function atualizarCampo(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: null }));
  }

  function validar() {
    const novosErros = {};

    if (!form.titulo.trim()) novosErros.titulo = 'Informe um título.';

    if (!form.data) {
      novosErros.data = 'Informe a data.';
    } else {
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      const dataMutirao = new Date(`${form.data}T00:00:00`);

      if (dataMutirao < hoje) {
        novosErros.data = 'A data não pode ser anterior à data atual.';
      }
    }

    if (!form.horario) novosErros.horario = 'Informe o horário.';
    if (!form.localizacao.trim()) novosErros.localizacao = 'Informe a localização.';
    if (!form.vagas || Number(form.vagas) <= 0) {
      novosErros.vagas = 'Informe um número de vagas válido.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function confirmarAtualizacao(e) {
    e.preventDefault();
    if (!validar()) return;

    const isNovo = form.id == null;
    const registro = { ...form, vagas: Number(form.vagas) };

    try {
      if (isNovo) {
        // POST /api/mutiroes → cria no banco (exige sessão de ADMIN)
        const { data } = await api.post('/mutiroes', registro);
        setMutiroes((lista) => [data, ...lista]);
        setMsgSucesso('Mutirão criado com sucesso!');
      } else {
        // PUT /api/mutiroes/{id} → atualiza no banco
        const { data } = await api.put(`/mutiroes/${registro.id}`, registro);
        setMutiroes((lista) =>
          lista.map((m) => (m.id === data.id ? data : m))
        );
        setMsgSucesso('Mutirão atualizado com sucesso!');
      }

      setTela('lista');
      setTimeout(() => setMsgSucesso(''), 3500);
    } catch (erro) {
      // 401 = sessão expirada | 403 = não é ADMIN | 400 = validação da API
      setErros({ geral: mensagemDeErro(erro) });
    }
  }

  async function excluir(id) {
    const mutirao = mutiroes.find((m) => m.id === id);
    const ok = window.confirm(
      `Excluir o mutirão "${mutirao ? mutirao.titulo : ''}"?`
    );
    if (!ok) return;

    try {
      await api.delete(`/mutiroes/${id}`);
      setMutiroes((lista) => lista.filter((m) => m.id !== id));
      setMsgSucesso('Mutirão excluído com sucesso!');
      setTimeout(() => setMsgSucesso(''), 3500);
    } catch (erro) {
      // 409 = já existem inscrições neste mutirão
      window.alert(mensagemDeErro(erro));
    }
  }

  const [emailsNotificacao, setEmailsNotificacao] = useState([]);
  const [novoEmailNotificacao, setNovoEmailNotificacao] = useState('');
  const [erroEmailNotificacao, setErroEmailNotificacao] = useState('');
  const [msgEmailNotificacao, setMsgEmailNotificacao] = useState('');

  function cadastrarEmailNotificacao(e) {
    e.preventDefault();

    const email = novoEmailNotificacao.trim();
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailValido) {
      setErroEmailNotificacao('Informe um e-mail em um formato válido.');
      setMsgEmailNotificacao('');
      return;
    }

    if (emailsNotificacao.includes(email)) {
      setErroEmailNotificacao(
        'Este e-mail já está cadastrado na lista de notificações.'
      );
      setMsgEmailNotificacao('');
      return;
    }

    setEmailsNotificacao((lista) => [...lista, email]);
    setErroEmailNotificacao('');
    setMsgEmailNotificacao(
      'E-mail adicionado com sucesso à lista de notificações!'
    );
    setNovoEmailNotificacao('');
  }

  function removerEmailNotificacao(email) {
    setEmailsNotificacao((lista) => lista.filter((e) => e !== email));
  }

  return (
    <div
      className={`
        ${styles.pageWrapper}
        ${darkMode ? styles.dark : ''}
        ${highContrast ? styles.highContrast : ''}
      `}
    >
      <header>
        <nav className={`navbar section-content ${styles.navbar}`}>
          <Link to="/" className={styles.navLogo}>
            <h2>Blue Wave</h2>
          </Link>

          <div
            className={styles.hamburger}
            id="hamburger"
            onClick={() => setMenuAtivo(!menuAtivo)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul
            className={`${styles.navMenu} ${
              menuAtivo ? styles.active : ''
            }`}
            id="nav-menu"
          >
            <li>
              <Link to="/blue" className={styles.navLink}>
                ← Voltar
              </Link>
            </li>
            <li>
              <a href="#lista" className={styles.navLink}>
                Mutirões
              </a>
            </li>
            <li>
              <a href="#notificacoes" className={styles.navLink}>
                Notificações
              </a>
            </li>

            <li>
              <button
                type="button"
                className={styles.navLink}
                onClick={sair}
              >
                Sair{usuario ? ` (${usuario.nome})` : ''}
              </button>
            </li>
          </ul>
        </nav>
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
          <button onClick={() => setFontSize(fontSize + 2)}>
            🔎 A+
          </button>

          <button onClick={() => setFontSize(Math.max(12, fontSize - 2))}>
            🔎 A-
          </button>

          <button onClick={() => setDarkMode(!darkMode)}>
            🌙 Escuro
          </button>

          <button onClick={() => setHighContrast(!highContrast)}>
            ◐ Contraste
          </button>
        </div>
      )}

      <main>
        <section className={styles.internalHero}>
          <div className="section-content">
            <h1>Painel Administrativo</h1>
            <p>
              Gerencie os mutirões de limpeza costeira da Blue Wave.
            </p>
          </div>
        </section>

        <section className={styles.adminSection} id="lista">
          <div className="section-content">
            {tela === 'lista' ? (
              <>
                <div className={styles.titleRow}>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      Mutirões de Limpeza
                    </h2>

                    <div className={styles.galleryLine}></div>

                    <p className={styles.pageSubtitle}>
                      {mutiroes.length} mutirão(ões) cadastrado(s)
                    </p>
                  </div>

                  <button
                    type="button"
                    className={styles.btnSubmit}
                    onClick={abrirNovo}
                  >
                    <i className="fas fa-plus"></i> Novo Mutirão
                  </button>
                </div>

                {msgSucesso && (
                  <p className={styles.formMessage}>{msgSucesso}</p>
                )}

                {carregando ? (
                  <div className={styles.empty}>
                    <p className={styles.emptyText}>
                      Carregando mutirões da API...
                    </p>
                  </div>
                ) : erroApi ? (
                  <div className={styles.empty}>
                    <p className={styles.emptyText}>{erroApi}</p>
                  </div>
                ) : mutiroes.length === 0 ? (
                  <div className={styles.empty}>
                    <p className={styles.emptyText}>
                      Nenhum mutirão cadastrado ainda. Clique em "Novo
                      Mutirão" para começar.
                    </p>
                  </div>
                ) : (
                  <div className={styles.eventsGridLayout}>
                    {mutiroes.map((m) => {
                      const info =
                        STATUS_INFO[m.status] || STATUS_INFO.aberto;

                      const [, mes, dia] = m.data
                        ? m.data.split('-')
                        : ['', '', ''];

                      const mesAbrev =
                        MESES_ABREV[Number(mes) - 1] || '';

                      return (
                        <div
                          key={m.id}
                          className={styles.eventModernCard}
                        >
                          <div className={styles.eventHeaderDate}>
                            <span
                              className={`${styles.eventBadge} ${styles[info.classe]}`}
                            >
                              {info.label}
                            </span>

                            <div className={styles.cardActions}>
                              <button
                                type="button"
                                title="Editar"
                                className={styles.iconBtn}
                                onClick={() => abrirEdicao(m)}
                              >
                                <i
                                  className="fas fa-pen"
                                  style={{ color: '#161b44' }}
                                ></i>
                              </button>

                              <button
                                type="button"
                                title="Excluir"
                                className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                                onClick={() => excluir(m.id)}
                              >
                                <i
                                  className="fas fa-trash"
                                  style={{ color: '#de350b' }}
                                ></i>
                              </button>
                            </div>

                            <span className={styles.day}>
                              {dia}/
                            </span>

                            <span className={styles.month}>
                              {mesAbrev}
                            </span>
                          </div>

                          <div className={styles.eventBodyInfo}>
                            <h3>{m.titulo}</h3>

                            <p>
                              <i className="fas fa-map-marker-alt"></i>{' '}
                              {m.localizacao}
                            </p>

                            <p>
                              <i className="fas fa-clock"></i>{' '}
                              {m.horario}
                            </p>

                            <p className={styles.vagasLinha}>
                              <i className="fas fa-users"></i>{' '}
                              {m.inscritos}/{m.vagas} vagas preenchidas
                            </p>

                            <div className={styles.vagasBarTrack}>
                              <div
                                className={styles.vagasBarFill}
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (m.inscritos /
                                      (m.vagas || 1)) *
                                      100
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            ) : (
              <div className={styles.formWrap}>
                <button
                  type="button"
                  onClick={cancelar}
                  className={styles.btnGhost}
                >
                  <i className="fas fa-arrow-left"></i> Voltar para a lista
                </button>

                <div className={styles.registrationCard}>
                  <h2 className={styles.sectionTitle}>
                    {form.id == null
                      ? 'Novo Mutirão'
                      : 'Editar Mutirão'}
                  </h2>

                  <div className={styles.galleryLine}></div>

                  <form
                    onSubmit={confirmarAtualizacao}
                    className={styles.modernForm}
                  >
                    <div className={styles.inputGroup}>
                      <label>Título</label>

                      <input
                        type="text"
                        className={
                          erros.titulo ? styles.inputErro : ''
                        }
                        value={form.titulo}
                        onChange={(e) =>
                          atualizarCampo(
                            'titulo',
                            e.target.value
                          )
                        }
                        placeholder="Ex: Mutirão Praia do Tombo"
                      />

                      {erros.titulo && (
                        <span className={styles.campoErro}>
                          {erros.titulo}
                        </span>
                      )}
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                        <label>Data</label>

                        <input
                          type="date"
                          className={
                            erros.data ? styles.inputErro : ''
                          }
                          value={form.data}
                          onChange={(e) =>
                            atualizarCampo(
                              'data',
                              e.target.value
                            )
                          }
                        />

                        {erros.data && (
                          <span className={styles.campoErro}>
                            {erros.data}
                          </span>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Horário</label>

                        <input
                          type="time"
                          className={
                            erros.horario
                              ? styles.inputErro
                              : ''
                          }
                          value={form.horario}
                          onChange={(e) =>
                            atualizarCampo(
                              'horario',
                              e.target.value
                            )
                          }
                        />

                        {erros.horario && (
                          <span className={styles.campoErro}>
                            {erros.horario}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Localização</label>

                      <input
                        type="text"
                        className={
                          erros.localizacao
                            ? styles.inputErro
                            : ''
                        }
                        value={form.localizacao}
                        onChange={(e) =>
                          atualizarCampo(
                            'localizacao',
                            e.target.value
                          )
                        }
                        placeholder="Ex: Guarujá - SP"
                      />

                      {erros.localizacao && (
                        <span className={styles.campoErro}>
                          {erros.localizacao}
                        </span>
                      )}
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.inputGroup}>
                        <label>Nº de vagas</label>

                        <input
                          type="number"
                          min="1"
                          className={
                            erros.vagas
                              ? styles.inputErro
                              : ''
                          }
                          value={form.vagas}
                          onChange={(e) =>
                            atualizarCampo(
                              'vagas',
                              e.target.value
                            )
                          }
                          placeholder="Ex: 30"
                        />

                        {erros.vagas && (
                          <span className={styles.campoErro}>
                            {erros.vagas}
                          </span>
                        )}
                      </div>

                      <div className={styles.inputGroup}>
                        <label>Status</label>

                        <select
                          value={form.status}
                          onChange={(e) =>
                            atualizarCampo(
                              'status',
                              e.target.value
                            )
                          }
                        >
                          <option value="aberto">
                            Inscrições Abertas
                          </option>
                          <option value="alerta">
                            Poucas Vagas
                          </option>
                          <option value="fechado">
                            Encerrado
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label>Descrição</label>

                      <textarea
                        value={form.descricao}
                        onChange={(e) =>
                          atualizarCampo(
                            'descricao',
                            e.target.value
                          )
                        }
                        placeholder="Detalhes sobre o mutirão, ponto de encontro, o que levar..."
                      ></textarea>
                    </div>

                    {erros.geral && (
                      <p className={styles.campoErro} role="alert">
                        {erros.geral}
                      </p>
                    )}

                    <div className={styles.formActions}>
                      <button
                        type="button"
                        onClick={cancelar}
                        className={styles.btnGhostOutline}
                      >
                        Cancelar
                      </button>

                      <button
                        type="submit"
                        className={styles.btnSubmit}
                      >
                        Confirmar atualização
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>

        <section
          className={styles.adminSection}
          id="notificacoes"
          style={{ paddingTop: 0 }}
        >
          <div className="section-content">
            <div className={styles.formWrap}>
              <div className={styles.registrationCard}>
                <h2 className={styles.sectionTitle}>
                  Cadastrar E-mail para Notificações
                </h2>

                <div className={styles.galleryLine}></div>

                <p className={styles.pageSubtitle}>
                  Gerencie os e-mails que recebem avisos automáticos
                  sobre novos mutirões ou alterações.
                </p>

                <form
                  onSubmit={cadastrarEmailNotificacao}
                  className={styles.modernForm}
                  style={{ marginTop: '20px' }}
                >
                  <div className={styles.inputGroup}>
                    <label>E-mail para notificações</label>

                    <input
                      type="email"
                      className={
                        erroEmailNotificacao
                          ? styles.inputErro
                          : ''
                      }
                      value={novoEmailNotificacao}
                      onChange={(e) => {
                        setNovoEmailNotificacao(e.target.value);

                        if (erroEmailNotificacao) {
                          setErroEmailNotificacao('');
                        }
                      }}
                      placeholder="exemplo@email.com"
                    />

                    {erroEmailNotificacao && (
                      <span className={styles.campoErro}>
                        {erroEmailNotificacao}
                      </span>
                    )}
                  </div>

                  <div
                    className={styles.formActions}
                    style={{ justifyContent: 'flex-start' }}
                  >
                    <button
                      type="submit"
                      className={styles.btnSubmit}
                    >
                      <i className="fas fa-plus"></i> Adicionar E-mail
                    </button>
                  </div>
                </form>

                {msgEmailNotificacao && (
                  <p className={styles.formMessage}>
                    {msgEmailNotificacao}
                  </p>
                )}

                {emailsNotificacao.length > 0 && (
                  <ul
                    style={{
                      marginTop: '25px',
                      textAlign: 'left',
                    }}
                  >
                    {emailsNotificacao.map((email) => (
                      <li
                        key={email}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 0',
                          borderBottom: '1px solid #eee',
                        }}
                      >
                        <span>
                          <i
                            className="fas fa-envelope"
                            style={{
                              color: '#2c80e0',
                              marginRight: '10px',
                            }}
                          ></i>
                          {email}
                        </span>

                        <button
                          type="button"
                          title="Remover"
                          className={`${styles.iconBtn} ${styles.iconBtnDanger}`}
                          onClick={() =>
                            removerEmailNotificacao(email)
                          }
                        >
                          <i
                            className="fas fa-trash"
                            style={{ color: '#de350b' }}
                          ></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div
          className={`section-content ${styles.footerContent}`}
        >
          <p>© 2026 Blue Wave</p>

          <div className={styles.footerSocial}>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>

            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>

            <a href="#">
              <i className="fab fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}