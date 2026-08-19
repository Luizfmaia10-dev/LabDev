import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [lang, setLang] = useState('pt');
  const timelineLineRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    // Animação do Cartaz "WANTED" no Hero
    gsap.fromTo(
      heroRef.current,
      { y: -80, opacity: 0, rotate: -3 },
      { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'bounce.out' }
    );

    // Traçado dinâmico da linha do tempo no Scroll
    gsap.fromTo(
      timelineLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#projetos',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: true,
        },
      }
    );

    // Revelação dos cards de projetos ao rolar
    gsap.utils.toArray('.project-card').forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        }
      );
    });
  }, []);

  const content = {
    pt: {
      aboutTitle: 'SOBRE MIM',
      aboutDesc: 'Desenvolvedor Full Stack apaixonado por arquitetura de software, interfaces rústicas e código performático. Explorando as fronteiras do desenvolvimento web.',
      projectsTitle: 'LINHA DO TEMPO DE PROJETOS',
      expTitle: 'EXPERIÊNCIAS DE CAMPO',
      contactTitle: 'MENSAGEM VIA TELEGRÁFO',
    },
    en: {
      aboutTitle: 'ABOUT ME',
      aboutDesc: 'Full Stack Developer passionate about software architecture, rustic interfaces, and high-performance code. Exploring the frontiers of web development.',
      projectsTitle: 'PROJECTS TIMELINE',
      expTitle: 'FIELD EXPERIENCES',
      contactTitle: 'TELEGRAPH MESSAGE',
    },
  };

  return (
    <div className="bg-[#1a110a] text-[#e6d3b3] min-h-screen font-serif selection:bg-[#c68a35] selection:text-[#1a110a]">
      {/* Header Fixo Estilo Taberna */}
      <header className="fixed top-0 left-0 w-full bg-[#2b1810]/90 backdrop-blur-md border-b-2 border-[#5c3a21] z-50 px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-xl font-bold text-[#c68a35] tracking-widest uppercase">
          🤠 Portfólio
        </h1>
        <nav className="flex gap-6 text-sm font-semibold tracking-wider">
          <a href="#sobre" className="hover:text-[#c68a35] transition-colors">Sobre</a>
          <a href="#projetos" className="hover:text-[#c68a35] transition-colors">Projetos</a>
          <a href="#experiencias" className="hover:text-[#c68a35] transition-colors">Experiências</a>
          <a href="#contato" className="hover:text-[#c68a35] transition-colors">Contato</a>
        </nav>
      </header>

      {/* Hero Section - Cartaz Wanted */}
      <section className="min-h-screen flex items-center justify-center pt-20 px-4">
        <div
          ref={heroRef}
          className="bg-[#e6d3b3] text-[#2b1810] p-8 md:p-12 border-8 border-[#5c3a21] rounded-sm max-w-lg text-center shadow-2xl relative"
        >
          <span className="block text-xs font-bold uppercase tracking-widest border-b-2 border-[#2b1810] pb-1 mb-4">
            Procurado Vivo ou Morto
          </span>
          <h2 className="text-4xl font-black tracking-tight mb-2">DESENVOLVEDOR WEB</h2>
          <p className="italic mb-6 text-sm">"Recompensa por soluções eficientes e código limpo"</p>
          <div className="w-32 h-32 mx-auto bg-[#5c3a21] rounded-full mb-6 border-4 border-[#2b1810] overflow-hidden flex items-center justify-center text-4xl">
            🤠
          </div>
          <a
            href="#projetos"
            className="inline-block bg-[#5c3a21] text-[#e6d3b3] px-6 py-3 font-bold border-2 border-[#2b1810] hover:bg-[#c68a35] hover:text-[#2b1810] transition-all transform hover:scale-105"
          >
            VER EXPEDIÇÕES
          </a>
        </div>
      </section>

      {/* Sobre Mim - Com Toggle PT/EN */}
      <section id="sobre" className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-[#2b1810] border-2 border-[#c68a35] p-8 rounded-lg shadow-xl relative">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#c68a35] uppercase">{content[lang].aboutTitle}</h3>
            {/* Toggle Idioma */}
            <button
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
              className="bg-[#5c3a21] text-[#e6d3b3] px-3 py-1 text-xs font-bold border border-[#c68a35] rounded hover:bg-[#c68a35] hover:text-[#1a110a] transition-all"
            >
              {lang === 'pt' ? 'Mudar para EN 🇺🇸' : 'Switch to PT 🇧🇷'}
            </button>
          </div>
          <p className="text-lg leading-relaxed text-[#d9c4a5]">{content[lang].aboutDesc}</p>
        </div>
      </section>

      {/* Projetos - Linha do Tempo Animada */}
      <section id="projetos" className="py-20 px-6 max-w-4xl mx-auto relative">
        <h3 className="text-3xl font-bold text-center text-[#c68a35] mb-12 uppercase">
          {content[lang].projectsTitle}
        </h3>

        {/* Linha vertical que cresce com o Scroll */}
        <div
          ref={timelineLineRef}
          className="absolute left-1/2 transform -translate-x-1/2 top-36 bottom-20 w-1 bg-[#c68a35] origin-top hidden md:block"
        />

        <div className="space-y-12 relative">
          {/* Card Projeto 1 (Mais Antigo) */}
          <div className="project-card bg-[#e6d3b3] text-[#2b1810] p-6 border-4 border-[#5c3a21] rounded shadow-lg md:w-5/12 ml-auto">
            <span className="text-xs font-bold text-[#5c3a21] block mb-1">01. Projeto Inicial</span>
            <h4 className="text-xl font-bold mb-2">Sistema Saloon v1.0</h4>
            <p className="text-sm mb-4">Primeira aplicação para gerenciamento de inventário e pedidos rústicos.</p>
            <div className="flex gap-2 mb-4">
              <span className="bg-[#5c3a21] text-[#e6d3b3] text-xs px-2 py-0.5 rounded">HTML</span>
              <span className="bg-[#5c3a21] text-[#e6d3b3] text-xs px-2 py-0.5 rounded">CSS</span>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-bold underline hover:text-[#c68a35]">
              Ver no GitHub →
            </a>
          </div>

          {/* Card Projeto 2 (Mais Recente) */}
          <div className="project-card bg-[#e6d3b3] text-[#2b1810] p-6 border-4 border-[#5c3a21] rounded shadow-lg md:w-5/12 mr-auto">
            <span className="text-xs font-bold text-[#5c3a21] block mb-1">02. Projeto Recente</span>
            <h4 className="text-xl font-bold mb-2">Cyber-FarWest Platform</h4>
            <p className="text-sm mb-4">Aplicação moderna desenvolvida em React com animações GSAP avançadas.</p>
            <div className="flex gap-2 mb-4">
              <span className="bg-[#5c3a21] text-[#e6d3b3] text-xs px-2 py-0.5 rounded">React</span>
              <span className="bg-[#5c3a21] text-[#e6d3b3] text-xs px-2 py-0.5 rounded">GSAP</span>
            </div>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs font-bold underline hover:text-[#c68a35]">
              Ver no GitHub →
            </a>
          </div>
        </div>
      </section>

      {/* Experiências */}
      <section id="experiencias" className="py-20 px-6 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center text-[#c68a35] mb-12 uppercase">
          {content[lang].expTitle}
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#2b1810] border-2 border-[#5c3a21] p-6 rounded">
            <h4 className="text-lg font-bold text-[#c68a35]">PUC Minas</h4>
            <p className="text-xs text-gray-400 mb-2">Estudante de Ciência da Computação | 2024 - Presente</p>
            <p className="text-sm">Desenvolvimento de software, arquitetura de computadores e algoritmos avançados.</p>
          </div>
          <div className="bg-[#2b1810] border-2 border-[#5c3a21] p-6 rounded">
            <h4 className="text-lg font-bold text-[#c68a35]">Desenvolvedor Freelancer</h4>
            <p className="text-xs text-gray-400 mb-2">Autônomo | 2025 - Presente</p>
            <p className="text-sm">Criação de landing pages responsivas, componentes otimizados e integrações com APIs.</p>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 px-6 max-w-xl mx-auto">
        <div className="bg-[#e6d3b3] text-[#2b1810] p-8 border-4 border-[#5c3a21] rounded shadow-2xl">
          <h3 className="text-2xl font-bold mb-6 text-center uppercase">{content[lang].contactTitle}</h3>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1">NOME</label>
              <input type="text" className="w-full bg-[#1a110a] text-[#e6d3b3] p-2 border border-[#5c3a21] rounded" placeholder="Seu nome" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">E-MAIL</label>
              <input type="email" className="w-full bg-[#1a110a] text-[#e6d3b3] p-2 border border-[#5c3a21] rounded" placeholder="seu@email.com" />
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">MENSAGEM</label>
              <textarea rows="4" className="w-full bg-[#1a110a] text-[#e6d3b3] p-2 border border-[#5c3a21] rounded" placeholder="Escreva sua mensagem..."></textarea>
            </div>
            <button className="w-full bg-[#5c3a21] text-[#e6d3b3] py-3 font-bold uppercase hover:bg-[#c68a35] hover:text-[#1a110a] transition-all">
              ENVIAR TELEGRAMA
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-[#2b1810] text-xs text-gray-500">
        © 2026 Portfólio Velho Oeste — Todos os direitos reservados.
      </footer>
    </div>
  );
}