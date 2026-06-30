import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Recife() {
  const [menuAtivo, setMenuAtivo] = useState(false);

  return (
    <>
      <header>
        <nav className="navbar section-content">
          <Link to="/" className="nav-logo">
            <h2>Blue Wave</h2>
          </Link>
          <div className="hamburger" id="hamburger" onClick={() => setMenuAtivo(!menuAtivo)}>
            <span></span><span></span><span></span>
          </div>
          <ul className={`nav-menu ${menuAtivo ? 'active' : ''}`} id="nav-menu">
            <li><Link to="/" className="nav-link">← Voltar</Link></li>
            <li><a href="#monitoramento" className="nav-link">Monitoramento</a></li>
            <li><a href="#impactos" className="nav-link">Impactos</a></li>
            <li><a href="#catalogo" className="nav-link">Catálogo</a></li>
          </ul>
        </nav>
      </header>

      <main style={{ paddingTop: '80px' }}>
        {/* SEÇÃO MONITORAMENTO E EXPLICAÇÃO */}
        <section className="about-section" id="monitoramento">
          <div className="section-content">
            <div className="about-container">
              <div className="about-text">
                <h2>O MONITORAMENTO DOS RECIFES</h2>
                <div className="line" style={{ margin: '10px auto 30px' }}></div>
                <p>O monitoramento de recifes de coral é uma prática fundamental para a preservação da biodiversidade marinha. Através de expedições científicas e sensores subaquáticos, acompanhamos o estado de saúde desses ecossistemas que são verdadeiros berçários da vida marinha.</p>
                <p>Nossa abordagem foca na observação da temperatura da água, pH e taxas de crescimento, permitindo antecipar fenômenos de branqueamento provocados por anomalias climáticas. Com esses dados, conseguimos atuar de forma preventiva, protegendo áreas que ainda apresentam alta resiliência.</p>
              </div>
              <div className="about-image">
                <img src="https://www.brasildefato.com.br/wp-content/uploads/2024/09/image_processing20230329-1314-cp3229.jpeg" alt="Cientista monitorando recifes" style={{ width: '480px', height: '320px', borderRadius: '18px', objectFit: 'cover', boxShadow: '0 8px 20px rgba(0,0,0,.15)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO DE IMPACTOS NACIONAIS */}
        <section className="about-section" id="impactos" style={{ background: 'white' }}>
  <div className="section-content">
    <div className="about-container" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
      
      {/* Texto à esquerda */}
      <div className="about-text" style={{ flex: 1 }}>
        <h2>IMPACTOS DO PROJETO EM NÍVEL NACIONAL</h2>
        <div className="line" style={{ 
            margin: '10px 0 30px 200px', 
            width: '100px'              
            }}></div>
        <p>Nosso projeto tem transformado a gestão costeira no Brasil através de dados sólidos e ações práticas:</p>
        <ul style={{ textAlign: 'left', lineHeight: '2' }}>
          <li>✅ <b>Redução de Branqueamento:</b> Queda de 15% nos registros de branqueamento severo.</li>
          <li>✅ <b>Extensão de Costa:</b> Monitoramos mais de 800 km de recifes.</li>
          <li>✅ <b>Preservação:</b> Criação de 5 novas zonas de exclusão de pesca.</li>
          <li>✅ <b>Engajamento:</b> Capacitação de 200 mergulhadores voluntários.</li>
        </ul>
      </div>

      {/* Imagem vertical à direita */}
      <div className="about-image" style={{ flex: '0 0 300px' }}>
        <img 
          src="https://images.pexels.com/photos/35252461/pexels-photo-35252461/free-photo-of-silhueta-de-um-mergulhador-explorando-uma-caverna-subaquatica.jpeg?cs=tinysrgb&dpr=1&w=500" 
          alt="Impacto Ambiental" 
          style={{ 
            width: '100%', 
            height: '500px', 
            borderRadius: '18px', 
            objectFit: 'cover', 
            boxShadow: '0 8px 20px rgba(0,0,0,.15)' 
          }} 
        />
      </div>
    </div>
  </div>
</section>

        {/* CATÁLOGO DE ESPÉCIES */}
        <section className="section" id="catalogo">
          <h1 className="hero">Catálogo de Espécies Protegidas</h1>
          <p style={{ textAlign: 'center', marginBottom: '40px' }}>Conheça algumas das espécies que estão sob nosso monitoramento constante.</p>
          
          <div className="grid">
            <div className="card">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/56/Brain_coral.jpg" alt="Coral Cérebro" />
              <div className="card-content">
                <h3>Coral Cérebro</h3>
                <p><b>Status:</b> Vulnerável</p>
                <p>Um dos pilares estruturais dos recifes brasileiros, sua estrutura calcária forma verdadeiros labirintos que protegem diversas outras espécies de peixes e crustáceos.</p>
                <button className="btn-submit" style={{ marginTop: '10px' }}>Ver Detalhes</button>
              </div>
            </div>

            <div className="card">
              <img src="https://i0.wp.com/abuddive.com.br/wp-content/uploads/2024/04/Millepora-alcicornis.jpeg?fit=810%2C456&ssl=1" alt="Coral de Fogo" />
              <div className="card-content">
                <h3>Coral de Fogo</h3>
                <p><b>Status:</b> Em Perigo</p>
                <p>Altamente sensível a variações térmicas. Este coral é o primeiro a apresentar sinais de estresse, servindo como um "alerta" biológico para todo o sistema recifal.</p>
                <button className="btn-submit" style={{ marginTop: '10px' }}>Ver Detalhes</button>
              </div>
            </div>

            <div className="card">
              <img src="https://vault-us-east-1.pulsarimagens.com.br/file/thumb/15AS138.jpg" alt="Coral Abanador" />
              <div className="card-content">
                <h3>Coral Abanador</h3>
                <p><b>Status:</b> Ameaçado</p>
                <p>Com formato elegante de leque, esta espécie possui papel vital na filtração da água, removendo partículas suspensas e auxiliando na transparência do ecossistema local.</p>
                <button className="btn-submit" style={{ marginTop: '10px' }}>Ver Detalhes</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="section-content footer-content">
          <p>© 2026 Blue Wave</p>
          <div className="footer-social">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-x-twitter"></i></a>
          </div>
        </div>
      </footer>
    </>
  );
}