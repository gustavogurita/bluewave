import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './combate.module.css';

export default function combate() {
  const [menuAtivo, setMenuAtivo] = useState(false);

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
            <li><Link to="/" className={styles.navLink}>← Voltar</Link></li>
            <li><a href="#inicio" className={styles.navLink}>Início</a></li>
            <li><a href="#dicas" className={styles.navLink}>Dicas</a></li>
            <li><a href="#acoes" className={styles.navLink}>Ações</a></li>
            <li><a href="#importancia" className={styles.navLink}>Importância</a></li>
            <li><a href="#final" className={styles.navLink}>Conclusão</a></li>
          </ul>
        </nav>
      </header>

      <main style={{ paddingTop: '80px' }}>
        {/* INTRODUÇÃO */}
        <section className={styles.aboutSection} id="inicio">
          <div className="section-content">
            <div className={styles.aboutContainer}>
              <div className={styles.aboutText}>
                <h2>COMBATE AO PLÁSTICO</h2>
                <div className={styles.line} style={{ margin: '10px auto 30px' }}></div>

                <p>
                  O plástico representa uma das maiores ameaças aos oceanos.
                  Todos os anos, milhões de toneladas de resíduos chegam aos
                  mares, colocando em risco peixes, tartarugas, aves e outros
                  animais marinhos.
                </p>

                <p>
                  Muitas espécies confundem plástico com alimento ou ficam
                  presas em embalagens descartadas. Pequenas atitudes da
                  população podem reduzir esse impacto e preservar a vida
                  marinha.
                </p>
              </div>

              <div className={styles.aboutImage}>
                <img
                  src="https://autossustentavel.com/wp-content/uploads/2018/06/plasticos-426187984.jpg"
                  alt="Poluição por plástico"
                  style={{
                    width: '480px',
                    height: '320px',
                    borderRadius: '18px',
                    objectFit: 'cover',
                    marginLeft: '0',
                    boxShadow: '0 8px 20px rgba(0,0,0,.15)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* DICAS */}
        <section className={styles.aboutSection} id="dicas" style={{ background: 'white' }}>
          <div className="section-content">
            <div className={styles.aboutContainer}>
              <div className={styles.aboutImage}></div>

              <div className={styles.aboutText}>
                <h2>DICAS PARA REDUZIR A POLUIÇÃO</h2>
                <div className={styles.line}></div>

                <p>✔ Utilize garrafas reutilizáveis.</p>
                <p>✔ Evite copos e canudos descartáveis.</p>
                <p>✔ Prefira sacolas reutilizáveis.</p>
                <p>✔ Separe corretamente o lixo reciclável.</p>
                <p>✔ Nunca descarte lixo em praias ou rios.</p>
                <p>✔ Reutilize embalagens sempre que possível.</p>
                <p>✔ Consuma produtos com menos plástico.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AÇÕES */}
        <section className="section" id="acoes">
          <h1 className={styles.hero}>Ações Sustentáveis</h1>
          <br /><br />

          <div className={styles.grid}>
            <div className={styles.card}>
              <img src="https://static.todamateria.com.br/upload/co/le/coletaseletiva-cke.jpg" alt="Reciclagem" />
              <div className={styles.cardContent}>
                <span className={styles.tag}>Reciclagem</span>
                <h3>Separe os Resíduos</h3>
                <p>
                  Faça a separação correta de plástico, papel,
                  metal e vidro para facilitar a reciclagem.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <img src="https://ambiental.sc/wp-content/uploads/2023/12/reducao-do-consumo-de-plastico.jpg" alt="Reduzir plástico" />
              <div className={styles.cardContent}>
                <span className={styles.tag}>Consumo Consciente</span>
                <h3>Reduza o Descartável</h3>
                <p>
                  Prefira produtos reutilizáveis e diminua o
                  consumo de embalagens plásticas.
                </p>
              </div>
            </div>

            <div className={styles.card}>
              <img src="https://caminharsaudavel.com.br/2023/wp-content/uploads/2022/02/Texto-02-Como-incentivar-as-criancas-a-pratica-da-reciclagem-Biologa.jpg" alt="Educação Ambiental" />
              <div className={styles.cardContent}>
                <span className={styles.tag}>Conscientização</span>
                <h3>Incentive Outras Pessoas</h3>
                <p>
                  Compartilhe boas práticas e participe de
                  ações ambientais na sua comunidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* IMPORTÂNCIA */}
        <section className={styles.aboutSection} id="importancia">
          <div className="section-content">
            <div className={styles.aboutContainer}>
              <div className={styles.aboutText}>
                <h2>POR QUE COMBATER O PLÁSTICO?</h2>
                <div className={styles.line} style={{ margin: '10px auto 30px' }}></div>

                <p>
                  O plástico pode permanecer na natureza por
                  centenas de anos. Durante esse tempo, ele se
                  transforma em microplásticos que contaminam a
                  água e entram na cadeia alimentar.
                </p>

                <p>
                  Além dos prejuízos aos animais marinhos,
                  o acúmulo de lixo reduz a qualidade de vida,
                  prejudica o turismo e causa impactos na pesca
                  e na economia.
                </p>

                <p>
                  Cada pequena atitude contribui para um oceano
                  mais limpo e saudável.
                </p>
              </div>

              <div className={styles.aboutImage}>
                <img
                  src="https://www.politize.com.br/wp-content/uploads/2024/09/O-ODS-14-protege-a-vida-marinha_.webp"
                  alt="Vida marinha"
                  style={{
                    width: '480px',
                    height: '320px',
                    borderRadius: '18px',
                    objectFit: 'cover',
                    marginLeft: '0',
                    boxShadow: '0 8px 20px rgba(0,0,0,.15)'
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* IMAGEM FINAL */}
        <section className={styles.gallerySection} id="final">
          <div className="section-content">
            <h2 className={styles.galleryTitle}>Juntos Fazemos a Diferença</h2>
            <div className={styles.galleryLine}></div>

            <div style={{ textAlign: 'center' }}>
              <img
                src="https://viajarverde.com.br/wp-content/uploads/2022/06/Ubatuba-foto-Mirella-Badaoui.jpg"
                alt="Praia de Ubatuba limpa"
                style={{
                  width: '100%',
                  maxWidth: '1100px',
                  height: '500px',
                  objectFit: 'cover',
                  borderRadius: '20px',
                  boxShadow: '0 8px 20px rgba(0,0,0,.15)'
                }}
              />
            </div>

            <br />

            <p style={{ textAlign: 'center', maxWidth: '900px', margin: 'auto' }}>
              Preservar os oceanos é uma responsabilidade de todos.
              Reduzir o uso de plástico, reciclar corretamente e
              conscientizar outras pessoas são atitudes simples que
              geram grandes impactos para o planeta.
            </p>

            <br />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={`section-content ${styles.footerContent}`}>
          <p>© 2026 Blue Wave</p>

          <div className={styles.footerSocial}>
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-x-twitter"></i></a>
          </div>

          <p>Política de Privacidade • Termos</p>
        </div>
      </footer>
    </>
  );
}