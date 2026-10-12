"use client";

import { useEffect, useRef, useState } from "react";

const trackWa = () => { if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead"); };

// URL do webhook n8n
const WEBHOOK_URL = "https://n8n.manuai.com.br/webhook/lead-site";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.16 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <Header scrolled={scrolled} openForm={openForm} />
      <Hero openForm={openForm} />
      <Proof />
      <Differentials />
      <VideoBlock />
      <FinalCta openForm={openForm} />
      <Footer openForm={openForm} />
      <CtaFloat openForm={openForm} />
      {formOpen && <LeadModal onClose={() => setFormOpen(false)} />}
    </main>
  );
}

/* ---------------- HEADER ---------------- */
function Header({ scrolled, openForm }) {
  return (
    <header className={`hd ${scrolled ? "hd-on" : ""}`}>
      <div className="hd-in">
        <a href="#" className="hd-logo display">
          átrio<span className="accent">.</span>
        </a>
        <nav className="hd-nav">
          <a href="#prova">Resultado</a>
          <a href="#diferenciais">O que entregamos</a>
          <a href="#video">Como funciona</a>
        </nav>
        <button onClick={openForm} className="hd-cta">
          Falar com especialista
        </button>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ openForm }) {
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden />
      <div className="hero-in">
        <div className="eyebrow reveal">
          <span className="eyebrow-dot" /> Sites para clínicas odontológicas · SEO profissional
        </div>
        <h1 className="hero-h1 display reveal d1">
          Sua clínica no <span className="chrome">topo</span> quando
          <br />procuram por um dentista.
        </h1>
        <p className="hero-sub reveal d2">
          A Átrio cria sites rápidos e otimizados para clínicas odontológicas aparecerem no Google
          quando o paciente procura. Presença orgânica — sem depender só de anúncio.
        </p>

        <SearchDemo />

        <div className="hero-actions reveal d4">
          <button onClick={openForm} className="btn-primary">
            Falar com especialista
            <Arrow />
          </button>
          <a href="#prova" className="btn-ghost">Ver um resultado real</a>
        </div>
      </div>
    </section>
  );
}

/* Signature: busca que digita sozinha e revela a clínica subindo ao topo */
function SearchDemo() {
  const term = "clínica odontológica perto de mim";
  const [typed, setTyped] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [rise, setRise] = useState(false);
  const wrapRef = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          runSequence();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line
  }, []);

  function runSequence() {
    let i = 0;
    const type = () => {
      if (i <= term.length) {
        setTyped(term.slice(0, i));
        i++;
        setTimeout(type, 55 + Math.random() * 50);
      } else {
        setTimeout(() => setShowResults(true), 350);
        setTimeout(() => setRise(true), 1100);
      }
    };
    setTimeout(type, 400);
  }

  return (
    <div className="search-demo reveal d3" ref={wrapRef}>
      <div className="sd-bar">
        <SearchIcon />
        <span className="sd-text">
          {typed}
          <span className="sd-caret" />
        </span>
      </div>
      <div className={`sd-results ${showResults ? "sd-open" : ""}`}>
        <div className={`sd-item sd-winner ${rise ? "sd-rise" : ""}`}>
          <span className="sd-rank">1</span>
          <div className="sd-item-body">
            <div className="sd-item-title">Sua clínica aqui — feita pela Átrio</div>
            <div className="sd-item-url">suaclinica.com.br</div>
          </div>
          <span className="sd-badge">topo</span>
        </div>
        <div className="sd-item sd-ghost"><span className="sd-rank">2</span><div className="sd-line" /></div>
        <div className="sd-item sd-ghost"><span className="sd-rank">3</span><div className="sd-line short" /></div>
      </div>
    </div>
  );
}

/* ---------------- PROVA SOCIAL ---------------- */
function Proof() {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => e.forEach((x) => x.isIntersecting && setGo(true)), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="proof" id="prova" ref={ref}>
      <div className="proof-in">
        <div className="proof-head reveal">
          <div className="eyebrow"><span className="eyebrow-dot" /> Resultado real</div>
          <h2 className="sec-h2 display">
            30 dias no ar. <span className="chrome">1.090 impressões</span> no Google —
            de forma orgânica.
          </h2>
          <p className="sec-lead">
            Um site desenvolvido pela Átrio com SEO profissional, medido direto no Google Search Console.
            Sem anúncio pago para gerar essas buscas.
          </p>
        </div>

        <div className="proof-panel reveal d1">
          <div className="pp-stats">
            <Stat go={go} big="1.090" small="impressões no Google" sub="em 30 dias, orgânicas" />
            <Stat go={go} big="9,4" small="posição média" sub="primeira dobra das buscas" />
            <Stat go={go} big="30" small="dias no ar" sub="do lançamento à medição" />
          </div>
          <Chart go={go} />
          <div className="pp-source">
            <DotGrid /> Fonte: Google Search Console · período personalizado de 30 dias
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ go, big, small, sub }) {
  return (
    <div className={`stat ${go ? "stat-in" : ""}`}>
      <div className="stat-big display chrome">{big}</div>
      <div className="stat-small">{small}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  );
}

/* Gráfico de crescimento que se desenha */
function Chart({ go }) {
  const path = "M0,150 L60,120 L120,60 L180,52 L240,70 L300,64 L360,96 L420,44 L480,58 L540,30 L600,40";
  return (
    <div className="chart">
      <svg viewBox="0 0 600 170" preserveAspectRatio="none" className="chart-svg">
        <defs>
          <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(230,51,41,0.16)" />
            <stop offset="100%" stopColor="rgba(230,51,41,0)" />
          </linearGradient>
          <linearGradient id="stroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8593A0" />
            <stop offset="100%" stopColor="#E63329" />
          </linearGradient>
        </defs>
        <path className={`chart-fill ${go ? "on" : ""}`} d={`${path} L600,170 L0,170 Z`} fill="url(#fill)" />
        <path className={`chart-line ${go ? "on" : ""}`} d={path} fill="none" stroke="url(#stroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="chart-base" />
    </div>
  );
}

/* ---------------- DIFERENCIAIS ---------------- */
function Differentials() {
  const items = [
    { t: "Presença no Google local", d: "Sua clínica aparece quando alguém procura por dentista na sua cidade ou bairro. SEO local pensado para o paciente que está perto e pronto para agendar." },
    { t: "Site rápido e profissional", d: "Design moderno que transmite confiança — essencial para quem escolhe onde cuidar da saúde. Carrega rápido no celular e no computador." },
    { t: "Agendamento facilitado", d: "Botão de WhatsApp e contato direto para o paciente marcar a consulta em um toque, sem fricção e sem perder o momento de interesse." },
    { t: "Credibilidade que converte", d: "Um site bem construído transmite seriedade. Muitas vezes é o primeiro contato do paciente com a sua clínica — e ele decide ali." },
    { t: "Pronto para sua estratégia", d: "Seu site serve de base para todo o marketing da clínica, inclusive tráfego pago, se você já trabalha com anúncios." },
    { t: "Entrega ágil", d: "Do briefing ao ar em pouco tempo, com acompanhamento direto e sem enrolação." },
  ];
  return (
    <section className="diff" id="diferenciais">
      <div className="diff-in">
        <div className="diff-head reveal">
          <div className="eyebrow"><span className="eyebrow-dot" /> O que entregamos</div>
          <h2 className="sec-h2 display">Não é só um site bonito.<br />É um site que <span className="chrome">atrai pacientes</span>.</h2>
        </div>
        <div className="diff-grid">
          {items.map((it, i) => (
            <article key={i} className={`diff-card reveal d${(i % 4) + 1}`}>
              <div className="diff-num display">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="diff-t display">{it.t}</h3>
              <p className="diff-d">{it.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- VÍDEO ---------------- */
function VideoBlock() {
  const [sound, setSound] = useState(false);
  const src =
    "https://www.youtube.com/embed/cfoffvzg1Qg?autoplay=1&mute=" +
    (sound ? "0" : "1") +
    "&loop=1&playlist=cfoffvzg1Qg&controls=0&modestbranding=1&playsinline=1&rel=0&showinfo=0";
  return (
    <section className="video" id="video">
      <div className="video-in">
        <div className="video-head reveal">
          <div className="eyebrow"><span className="eyebrow-dot" /> Como funciona</div>
          <h2 className="sec-h2 display">Veja a Átrio <span className="chrome">em movimento</span>.</h2>
        </div>
        <div className="video-frame reveal d1">
          <div className="vf-phone">
            <iframe
              src={src}
              title="Átrio"
              allow="autoplay; encrypted-media"
              allowFullScreen
              loading="lazy"
            />
            <button className="vf-sound" onClick={() => setSound((s) => !s)} aria-label={sound ? "Desativar som" : "Ativar som"}>
              {sound ? <SoundOn /> : <SoundOff />}
              {sound ? "Som ligado" : "Ativar som"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA FINAL ---------------- */
function FinalCta({ openForm }) {
  return (
    <section className="cta">
      <div className="cta-in reveal">
        <div className="cta-plate display">
          <h2 className="cta-h2 display">
            Seu próximo paciente está<br /><span className="chrome">procurando agora.</span>
          </h2>
          <p className="cta-sub">
            Vamos colocar sua clínica no lugar onde ele procura. Fale com um especialista da Átrio.
          </p>
          <button onClick={openForm} className="btn-primary btn-lg">
            Falar com especialista
            <Arrow />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer({ openForm }) {
  return (
    <footer className="ft">
      <div className="ft-in">
        <div className="ft-top">
          <div className="ft-logo display">átrio<span className="accent">.</span></div>
          <nav className="ft-nav">
            <a href="#prova">Resultado</a>
            <a href="#diferenciais">O que entregamos</a>
            <a href="#video">Como funciona</a>
            <button onClick={openForm} className="ft-linkbtn">Falar com especialista</button>
          </nav>
        </div>
        <p className="ft-disclaimer">
          Os resultados variam conforme segmento, concorrência, histórico do domínio e outros fatores.
          A Átrio entrega desenvolvimento de sites com SEO profissional, sem garantia de posições específicas
          nos mecanismos de busca.
        </p>
        <div className="ft-bottom">
          <span>© 2026 Átrio Marketing</span>
          <span>Sites para clínicas odontológicas · Novo Hamburgo · RS</span>
        </div>
      </div>
    </footer>
  );
}

function CtaFloat({ openForm }) {
  return (
    <button onClick={openForm} className="wa" aria-label="Falar com especialista">
      <Arrow />
      <span className="wa-txt">Falar com especialista</span>
    </button>
  );
}

/* ---------------- MODAL DE CADASTRO ---------------- */
function LeadModal({ onClose }) {
  const [form, setForm] = useState({ nome: "", whatsapp: "", negocio: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const fmtPhone = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  async function submit(e) {
    e.preventDefault();
    if (!form.nome.trim() || form.whatsapp.replace(/\D/g, "").length < 10) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome.trim(),
          whatsapp: form.whatsapp.replace(/\D/g, ""),
          negocio: form.negocio.trim(),
          origem: "landing-odonto-atrio",
        }),
      });
      if (typeof window !== "undefined" && window.fbq) window.fbq("track", "Lead");
      setStatus("ok");
    } catch {
      setStatus("ok");
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Fechar">×</button>

        {status === "ok" ? (
          <div className="modal-done">
            <div className="modal-check">✓</div>
            <h3 className="display">Recebemos seu contato!</h3>
            <p>A Átrio vai falar com você em breve. Fique de olho no seu WhatsApp.</p>
            <button className="btn-primary" onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <>
            <div className="modal-head">
              <div className="eyebrow"><span className="eyebrow-dot" /> Vamos começar</div>
              <h3 className="modal-title display">Site para sua clínica</h3>
              <p className="modal-sub">Preencha e um especialista da Átrio entra em contato.</p>
            </div>
            <form className="modal-form" onSubmit={submit}>
              <label className="field">
                <span>Nome</span>
                <input type="text" value={form.nome} onChange={set("nome")} placeholder="Seu nome" autoFocus />
              </label>
              <label className="field">
                <span>WhatsApp</span>
                <input type="tel" inputMode="numeric" value={form.whatsapp}
                  onChange={(e) => setForm((f) => ({ ...f, whatsapp: fmtPhone(e.target.value) }))}
                  placeholder="(51) 99999-9999" />
              </label>
              <label className="field">
                <span>Nome da clínica <em>(opcional)</em></span>
                <input type="text" value={form.negocio} onChange={set("negocio")} placeholder="Ex: Clínica Sorriso" />
              </label>
              {status === "error" && <div className="field-err">Preencha nome e um WhatsApp válido.</div>}
              <button type="submit" className="btn-primary btn-lg modal-submit" disabled={status === "sending"}>
                {status === "sending" ? "Enviando..." : "Falar com especialista"}
                {status !== "sending" && <Arrow />}
              </button>
              <p className="modal-fine">Seus dados são usados apenas para contato. Sem spam.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------- ICONS ---------------- */
function Arrow() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>; }
function SearchIcon() { return <svg className="sd-ic" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>; }
function SoundOff() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>; }
function SoundOn() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" /></svg>; }
function DotGrid() { return <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" style={{ opacity: 0.5 }}><circle cx="2" cy="2" r="1.3" /><circle cx="7" cy="2" r="1.3" /><circle cx="12" cy="2" r="1.3" /><circle cx="2" cy="7" r="1.3" /><circle cx="7" cy="7" r="1.3" /><circle cx="12" cy="7" r="1.3" /></svg>; }
