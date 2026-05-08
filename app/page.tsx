"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const WA_NUMBER = "525625018182";
const CALENDLY_LINK = "https://calendly.com/satorimkt";
const EMAIL = "hola@satorimkt.com";

function waLink(msg = "") {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ─── PALETA ÚNICA: AMARILLO ───────────────────────────────────────────────────
const THEME = {
  bg: "#0A0A0A",
  surface: "#111111",
  accent: "#F5C500",
  accentDim: "#B8960A",
  accentGlow: "rgba(245,197,0,0.18)",
  text: "#F0EBD8",
  sub: "#A89E80",
  border: "rgba(245,197,0,0.15)",
  logoFilter: "brightness(0) invert(1)",
};
const T = THEME;

// ─── COPY ─────────────────────────────────────────────────────────────────────
const C = {
  nav_links: ["Inicio", "Servicios", "Fundador", "Roadmap", "Contacto"],
  nav_hrefs: ["#inicio", "#servicios", "#fundador", "#roadmap", "#contacto"],
  hero_kicker: "ESTRATEGIA · IMAGEN · RESULTADOS",
  hero_h: "Tu presencia\ndigital define\ntu autoridad.",
  hero_sub: "Ayudamos a empresarios y empresas a construir una imagen de alto nivel, posicionarse como referentes y convertir su presencia digital en su activo más rentable.",
  hero_cta1: "Quiero escalar mi imagen",
  hero_cta2: "Agendar llamada estratégica",

  servicios_label: "NUESTROS PAQUETES",
  servicios_h: "Inversión en tu posicionamiento.",
  servicios_sub: "Tres rutas diseñadas para distintos momentos de tu trayectoria. Todas orientadas a un mismo destino: que te reconozcan como líder en tu industria.",

  paquetes: [
    {
      nombre: "IDENTITI BRANDING",
      badge: "Para Empresarios",
      tagline: "Tu imagen es tu capital más valioso.",
      descripcion: "Diseñado para el empresario que sabe que su reputación personal es su mejor activo. Construimos tu marca personal con la misma precisión con la que gestionas tu negocio.",
      incluye: [
        "Estrategia de marca personal 360°",
        "Identidad visual y posicionamiento",
        "Presencia premium en LinkedIn e Instagram",
        "Narrativa de autoridad y copywriting",
        "Plan de contenido ejecutivo mensual",
        "Sesión estratégica de imagen y estatus",
        "Gestión y crecimiento de comunidad",
        "Reporte mensual de posicionamiento",
      ],
      para: "Directores, CEOs, socios y líderes de industria que quieren ser reconocidos en su sector.",
      cta: "Quiero elevar mi imagen",
    },
    {
      nombre: "BRAND AUTHORITY",
      badge: "Para Empresas",
      tagline: "De empresa local a referente de industria.",
      descripcion: "Posicionamiento e imagen digital integral para empresas que quieren liderar su mercado. Construimos la percepción correcta en los canales correctos.",
      incluye: [
        "Auditoría de imagen y posicionamiento digital",
        "Estrategia de contenido y redes sociales",
        "Identidad de marca actualizada",
        "Gestión de reputación online",
        "SEO y presencia en buscadores",
        "Relaciones con medios digitales",
        "Página web orientada a conversión",
        "Dashboard de métricas ejecutivas",
      ],
      para: "Empresas con presencia establecida que buscan escalar su autoridad de marca online.",
      cta: "Posicionar mi empresa",
    },
    {
      nombre: "AI GROWTH ENGINE",
      badge: "Marketing con IA",
      tagline: "Más clientes. Con inteligencia artificial.",
      descripcion: "Sistema de marketing de conversión impulsado por IA. Automatiza, segmenta y convierte. Más eficiencia, menos desperdicio, resultados escalables.",
      incluye: [
        "Agente IA entrenado con tu negocio",
        "Funnel de captación automatizado",
        "Campañas de ads con optimización IA",
        "Email marketing y secuencias automáticas",
        "CRM y seguimiento de leads con IA",
        "Chatbot de ventas 24/7 en WhatsApp",
        "Analítica avanzada de conversión",
        "Reunión mensual de estrategia y ajuste",
      ],
      para: "Empresas listas para escalar ventas con sistemas inteligentes que trabajan mientras tú duermes.",
      cta: "Activar mi sistema de IA",
    },
  ],

  fundador_label: "EL FUNDADOR",
  fundador_nombre: "Rodrigo Tristán",
  fundador_cargo: "Estratega de Marca · CEO de SATORI",
  fundador_quote: "\"La percepción correcta es la ventaja competitiva más subestimada de cualquier empresario.\"",
  fundador_p1: "Con más de una década construyendo marcas en México y Latinoamérica, Rodrigo combina estrategia de negocio, diseño de identidad e inteligencia artificial para posicionar a empresarios y empresas como referentes de su industria.",
  fundador_p2: "SATORI nació de una premisa simple: el que mejor comunica, gana. No importa cuánto sabes si nadie lo percibe. Nuestra misión es hacer visible tu verdadero nivel.",

  roadmap_label: "EL MÉTODO SATORI",
  roadmap_h: "Cinco pasos hacia\ntu posicionamiento.",
  roadmap_sub: "Un proceso probado para transformar cómo te percibe tu mercado.",
  pasos: [
    {
      num: "01",
      titulo: "Diagnóstico Estratégico",
      sub: "Radiografía de tu imagen actual",
      frente_desc: "Analizamos tu presencia digital, reputación online y posicionamiento vs. tu competencia.",
      beneficios_persona: [
        "Entiendes exactamente cómo te percibe tu mercado",
        "Identificas los vacíos de imagen que te están costando clientes",
        "Obtienes un mapa claro de oportunidades de posicionamiento",
        "Sabes dónde estás parado antes de invertir un peso",
      ],
      beneficios_empresa: [
        "Auditoría completa de brand equity digital",
        "Benchmark competitivo de industria",
        "Identificación de brechas de percepción marca-cliente",
        "Base estratégica para decisiones de inversión en marketing",
      ],
    },
    {
      num: "02",
      titulo: "Estrategia de Marca",
      sub: "Tu posicionamiento en papel",
      frente_desc: "Definimos tu propuesta de valor, narrativa de autoridad y los pilares de contenido que te diferencian.",
      beneficios_persona: [
        "Tienes una narrativa de marca que conecta y vende",
        "Tu propuesta de valor es clara y diferenciada",
        "Sabes exactamente qué comunicar y cómo hacerlo",
        "Tu mensaje atrae al cliente correcto desde el primer contacto",
      ],
      beneficios_empresa: [
        "Arquitectura de marca coherente en todos los puntos de contacto",
        "Posicionamiento único vs. competidores directos",
        "Guía de voz y tono de comunicación corporativa",
        "Estrategia de contenido alineada a objetivos de negocio",
      ],
    },
    {
      num: "03",
      titulo: "Construcción de Imagen",
      sub: "Ejecución con criterio",
      frente_desc: "Diseño visual, contenido y presencia digital construidos con los estándares más altos de cada industria.",
      beneficios_persona: [
        "Tu perfil proyecta autoridad desde el primer vistazo",
        "Contenido que posiciona, no solo que llena el feed",
        "Imagen consistente en todos los canales digitales",
        "Presencia que habla de tu nivel antes de que abras la boca",
      ],
      beneficios_empresa: [
        "Identidad visual renovada y alineada al mercado objetivo",
        "Ecosistema digital construido para convertir",
        "Producción de contenido de alto nivel de forma sistemática",
        "Presencia que respalda tu fuerza comercial",
      ],
    },
    {
      num: "04",
      titulo: "Activación y Crecimiento",
      sub: "Visibilidad con propósito",
      frente_desc: "Estrategias de distribución, comunidad y ads para llevar tu marca a la audiencia correcta en el momento correcto.",
      beneficios_persona: [
        "Tu red de contactos crece con las personas correctas",
        "Tu contenido llega a quienes pueden contratarte",
        "Conversaciones de negocio que llegan a ti, no al revés",
        "Posicionamiento orgánico que trabaja 24/7",
      ],
      beneficios_empresa: [
        "Expansión de alcance con métricas de conversión reales",
        "Comunidad activa de clientes y prospectos calificados",
        "Campañas de paid media optimizadas por IA",
        "Pipeline comercial alimentado por tu imagen de marca",
      ],
    },
    {
      num: "05",
      titulo: "Optimización Continua",
      sub: "Lo que se mide, se mejora",
      frente_desc: "Analítica, ajuste estratégico y evolución constante. Tu marca crece contigo.",
      beneficios_persona: [
        "Sabes exactamente qué está funcionando y qué ajustar",
        "Tu imagen evoluciona a la par de tu crecimiento",
        "Decisiones basadas en datos, no en intuición",
        "Un equipo estratégico que piensa tu marca de manera permanente",
      ],
      beneficios_empresa: [
        "Reportes ejecutivos de posicionamiento e impacto",
        "A/B testing continuo de mensajes y creatividades",
        "Estrategia adaptable a cambios de mercado",
        "Equipo externo que funciona como dirección de marketing interna",
      ],
    },
  ],

  stats: [
    { num: "10+", label: "años de experiencia" },
    { num: "80+", label: "proyectos entregados" },
    { num: "100%", label: "orientación a resultados" },
  ],

  cotizar_h: "¿Listo para ser percibido\ncomo el líder que eres?",
  cotizar_sub: "Una conversación de 30 minutos puede cambiar cómo te percibe tu mercado para siempre.",
  cotizar_cta: "Agendar sesión estratégica gratuita",

  footer: "© 2026 SATORI MARKETING · CDMX, MÉXICO",
};

// ─── MATRIX CANVAS ───────────────────────────────────────────────────────────
function MatrixCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); if (!ctx) return;
    let W = 0, H = 0, cols = 0;
    const drops: number[] = [];
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ01SATORI";
    const fs = 13;
    function resize() {
      if (!canvas) return;
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
      cols = Math.floor(W / fs);
      for (let i = 0; i < cols; i++) drops[i] = drops[i] ?? Math.random() * -100;
    }
    resize();
    window.addEventListener("resize", resize);
    const id = setInterval(() => {
      ctx.fillStyle = "rgba(10,10,10,0.045)";
      ctx.fillRect(0, 0, W, H);
      ctx.font = `${fs}px monospace`;
      for (let i = 0; i < cols; i++) {
        const c = chars[Math.floor(Math.random() * chars.length)];
        const bright = Math.random() > 0.93;
        ctx.fillStyle = bright ? "#F5C500" : "rgba(245,197,0,0.18)";
        ctx.fillText(c, i * fs, drops[i] * fs);
        if (drops[i] * fs > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }, 50);
    return () => { clearInterval(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 0, opacity: 0.22, transform: "translateZ(0)" }} />;
}

// ─── SPINNING ENSO ────────────────────────────────────────────────────────────
function SpinningEnso() {
  return (
    <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }} style={{ position: "absolute", right: "-5%", top: "50%", translateY: "-50%", width: "min(520px,60vw)", height: "min(520px,60vw)", opacity: 0.12, pointerEvents: "none" }}>
      <Image src="/ENSO_NEGRO.png" alt="" fill style={{ objectFit: "contain", filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(35deg)" }} />
    </motion.div>
  );
}

// ─── TYPEWRITER ───────────────────────────────────────────────────────────────
function Typewriter({ text, speed = 38 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return <>{displayed}</>;
}

// ─── ROADMAP FLIP CARDS ───────────────────────────────────────────────────────
function RoadmapFlipCard({ paso, index }: { paso: typeof C.pasos[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const [tab, setTab] = useState<"persona" | "empresa">("persona");

  return (
    <div style={{ perspective: "1200px", cursor: "pointer" }} onClick={() => setFlipped(f => !f)}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        style={{ position: "relative", transformStyle: "preserve-3d", minHeight: 340 }}
      >
        {/* FRENTE */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          border: `1px solid ${T.border}`, padding: "2rem",
          background: `linear-gradient(135deg, ${T.surface} 0%, #0D0D0D 100%)`,
          display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
            <span style={{ fontFamily: "serif", fontSize: "2.8rem", fontWeight: 900, color: T.accent, lineHeight: 1, minWidth: 60 }}>{paso.num}</span>
            <div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: T.text, marginBottom: "0.2rem" }}>{paso.titulo}</h3>
              <p style={{ fontSize: "0.72rem", color: T.accent, textTransform: "uppercase", letterSpacing: "0.1em" }}>{paso.sub}</p>
            </div>
          </div>
          <p style={{ fontSize: "0.85rem", color: T.sub, lineHeight: 1.7, flex: 1 }}>{paso.frente_desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.72rem", color: T.accentDim }}>
            <span>Ver beneficios →</span>
          </div>
        </div>

        {/* REVERSO */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)",
          background: `linear-gradient(135deg, #1A1500 0%, #0F0E00 100%)`,
          border: `1px solid ${T.accent}40`,
          padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem",
        }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.25rem" }}>
            {(["persona", "empresa"] as const).map(t => (
              <button key={t} onClick={e => { e.stopPropagation(); setTab(t); }}
                style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", padding: "0.3rem 0.8rem", borderRadius: "999px", border: `1px solid ${T.accent}`, cursor: "pointer", background: tab === t ? T.accent : "transparent", color: tab === t ? "#0A0A0A" : T.accent, transition: "all 0.2s" }}>
                {t === "persona" ? "👤 Empresario" : "🏢 Empresa"}
              </button>
            ))}
          </div>
          <h4 style={{ fontSize: "0.75rem", fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: "0.08em" }}>{paso.titulo}</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem", flex: 1 }}>
            {(tab === "persona" ? paso.beneficios_persona : paso.beneficios_empresa).map((b, i) => (
              <li key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.8rem", color: T.text, lineHeight: 1.5 }}>
                <span style={{ color: T.accent, marginTop: "0.1rem", flexShrink: 0 }}>✦</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: "0.62rem", color: T.sub, textAlign: "center" }}>Toca para regresar</p>
        </div>
      </motion.div>
    </div>
  );
}

// ─── PAQUETE CARD ─────────────────────────────────────────────────────────────
function PaqueteCard({ p, index }: { p: typeof C.paquetes[0]; index: number }) {
  const popular = index === 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      style={{
        border: popular ? `1.5px solid ${T.accent}` : `1px solid ${T.border}`,
        background: popular ? `linear-gradient(160deg, #1A1300 0%, #0D0D0D 100%)` : `${T.surface}`,
        padding: "2rem 1.75rem",
        position: "relative",
        boxShadow: popular ? `0 0 40px ${T.accentGlow}` : "none",
      }}
    >
      {popular && (
        <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: T.accent, color: "#0A0A0A", fontSize: "0.62rem", fontWeight: 900, letterSpacing: "0.15em", padding: "0.3rem 1.2rem", textTransform: "uppercase" }}>
          MÁS SOLICITADO
        </div>
      )}
      <div style={{ marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: T.accentDim, border: `1px solid ${T.accentDim}50`, padding: "0.2rem 0.7rem" }}>{p.badge}</span>
      </div>
      <h3 style={{ fontFamily: "serif", fontSize: "1.6rem", fontWeight: 700, color: T.text, margin: "0.75rem 0 0.5rem" }}>{p.nombre}</h3>
      <p style={{ fontSize: "0.88rem", fontStyle: "italic", color: T.accent, marginBottom: "1rem", lineHeight: 1.5 }}>{p.tagline}</p>
      <p style={{ fontSize: "0.82rem", color: T.sub, lineHeight: 1.7, marginBottom: "1.5rem" }}>{p.descripcion}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.5rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {p.incluye.map((item, i) => (
          <li key={i} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.8rem", color: T.text }}>
            <span style={{ color: T.accent, flexShrink: 0 }}>✦</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "0.72rem", color: T.sub, borderTop: `1px solid ${T.border}`, paddingTop: "1rem", marginBottom: "1.5rem", lineHeight: 1.6, fontStyle: "italic" }}>
        <span style={{ color: T.accentDim }}>Para quién: </span>{p.para}
      </p>
      <motion.a
        href={waLink(`Hola, me interesa el paquete ${p.nombre} de SATORI.`)}
        target="_blank"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        style={{
          display: "block", textAlign: "center", padding: "0.9rem",
          background: popular ? T.accent : "transparent",
          color: popular ? "#0A0A0A" : T.accent,
          border: `1.5px solid ${T.accent}`,
          fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase",
          letterSpacing: "0.1em", textDecoration: "none",
          transition: "all 0.2s",
        }}
      >
        {p.cta} →
      </motion.a>
    </motion.div>
  );
}

// ─── CURSOR GLOW ─────────────────────────────────────────────────────────────
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) { ref.current.style.left = `${e.clientX}px`; ref.current.style.top = `${e.clientY}px`; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <div ref={ref} style={{ position: "fixed", width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, ${T.accentGlow} 0%, transparent 70%)`, pointerEvents: "none", zIndex: 0, transform: "translate(-50%,-50%)", transition: "left 0.12s ease,top 0.12s ease" }} />;
}

// ─── COUNTER ─────────────────────────────────────────────────────────────────
function Counter({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const dur = 1800, start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(from + (to - from) * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [from, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function SatoriPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main style={{ background: T.bg, color: T.text, minHeight: "100vh", fontFamily: "'Helvetica Neue', Arial, sans-serif", overflowX: "hidden" }}>
      <MatrixCanvas />
      <CursorGlow />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.1rem 2rem", backdropFilter: "blur(16px)", background: "rgba(10,10,10,0.85)", borderBottom: `1px solid ${T.border}` }}
      >
        <a href="#inicio">
          <Image src="/logo-satori.png" alt="SATORI" width={110} height={34} style={{ filter: T.logoFilter }} priority />
        </a>
        {/* Desktop links */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden-mobile">
          {C.nav_links.map((l, i) => (
            <a key={l} href={C.nav_hrefs[i]} style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: T.sub, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = T.accent)} onMouseLeave={e => (e.currentTarget.style.color = T.sub)}>
              {l}
            </a>
          ))}
          <motion.a href={waLink("Hola, me interesa saber más sobre SATORI.")} target="_blank" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
            style={{ fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", padding: "0.55rem 1.4rem", background: T.accent, color: "#0A0A0A", textDecoration: "none", borderRadius: 2 }}>
            Contactar →
          </motion.a>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", color: T.accent, fontSize: "1.4rem" }} className="show-mobile">
          {menuOpen ? "✕" : "☰"}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 99, background: "rgba(10,10,10,0.97)", borderBottom: `1px solid ${T.border}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {C.nav_links.map((l, i) => (
              <a key={l} href={C.nav_hrefs[i]} onClick={() => setMenuOpen(false)} style={{ fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.12em", color: T.text, textDecoration: "none" }}>{l}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "8rem 2rem 5rem", position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto" }}>
        <SpinningEnso />
        <div style={{ maxWidth: 680 }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: T.accentDim, textTransform: "uppercase", marginBottom: "1.5rem" }}>
            {C.hero_kicker}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.8rem,6vw,5.2rem)", fontWeight: 700, lineHeight: 1.05, marginBottom: "1.5rem", color: T.text }}>
            {C.hero_h.split("\n").map((line, i) => (
              <span key={i} style={{ display: "block", color: i === 2 ? T.accent : T.text }}>{line}</span>
            ))}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ fontSize: "1rem", lineHeight: 1.8, color: T.sub, maxWidth: 540, marginBottom: "2.5rem" }}>
            {C.hero_sub}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
            style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <motion.a href={waLink("Hola, quiero elevar mi imagen con SATORI.")} target="_blank" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", padding: "1rem 2rem", background: T.accent, color: "#0A0A0A", fontWeight: 900, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", boxShadow: `0 8px 32px ${T.accentGlow}` }}>
              {C.hero_cta1} →
            </motion.a>
            <motion.a href={CALENDLY_LINK} target="_blank" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{ display: "inline-block", padding: "1rem 2rem", border: `1.5px solid ${T.accent}`, color: T.accent, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}>
              {C.hero_cta2}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, padding: "3rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "2rem", textAlign: "center" }}>
          {C.stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, color: T.accent, margin: 0 }}>{s.num}</p>
              <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: T.sub, margin: "0.3rem 0 0" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICIOS / PAQUETES ── */}
      <section id="servicios" style={{ padding: "7rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: T.accentDim, textTransform: "uppercase", marginBottom: "1rem" }}>{C.servicios_label}</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, marginBottom: "1rem" }}>{C.servicios_h}</h2>
            <p style={{ fontSize: "0.95rem", color: T.sub, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>{C.servicios_sub}</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
            {C.paquetes.map((p, i) => <PaqueteCard key={i} p={p} index={i} />)}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p style={{ fontSize: "0.78rem", color: T.sub, marginBottom: "1rem" }}>¿No sabes cuál es el correcto para ti?</p>
            <motion.a href={waLink("Hola, me gustaría que me orienten sobre qué paquete de SATORI es el correcto para mí.")} target="_blank" whileHover={{ scale: 1.05 }}
              style={{ display: "inline-block", padding: "0.85rem 2rem", border: `1px solid ${T.accent}`, color: T.accent, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}>
              Quiero una orientación gratuita
            </motion.a>
          </div>
        </div>
      </section>

      {/* ── FUNDADOR ── */}
      <section id="fundador" style={{ padding: "7rem 2rem", borderTop: `1px solid ${T.border}`, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "5rem", alignItems: "center" }}>
          {/* Foto a color */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ position: "relative" }}>
            <div style={{ position: "relative", aspectRatio: "3/4", maxWidth: 380, border: `1px solid ${T.border}`, overflow: "hidden" }}>
              <Image src="/rodrigo.png" alt="Rodrigo Tristán" fill style={{ objectFit: "cover", objectPosition: "top" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${T.bg}60 0%, transparent 50%)` }} />
            </div>
            {/* Gold accent bar */}
            <div style={{ position: "absolute", left: -8, top: 24, width: 4, height: "60%", background: T.accent }} />
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.3em", color: T.accentDim, textTransform: "uppercase", marginBottom: "1rem" }}>{C.fundador_label}</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 700, marginBottom: "0.5rem" }}>{C.fundador_nombre}</h2>
            <p style={{ fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.15em", color: T.sub, marginBottom: "2rem" }}>{C.fundador_cargo}</p>
            <p style={{ fontSize: "1.1rem", fontStyle: "italic", fontFamily: "Georgia, serif", color: T.accent, marginBottom: "1.5rem", lineHeight: 1.6 }}>{C.fundador_quote}</p>
            <p style={{ fontSize: "0.88rem", color: T.sub, lineHeight: 1.8, marginBottom: "1rem" }}>{C.fundador_p1}</p>
            <p style={{ fontSize: "0.88rem", color: T.sub, lineHeight: 1.8, marginBottom: "2.5rem" }}>{C.fundador_p2}</p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <motion.a href={CALENDLY_LINK} target="_blank" whileHover={{ scale: 1.04 }}
                style={{ padding: "0.85rem 1.75rem", border: `1.5px solid ${T.accent}`, color: T.accent, fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}>
                Agendar llamada con Rodrigo
              </motion.a>
              <motion.a href={`mailto:${EMAIL}`} whileHover={{ scale: 1.04 }}
                style={{ padding: "0.85rem 1.5rem", color: T.sub, fontWeight: 600, fontSize: "0.72rem", textDecoration: "none", border: "1px solid transparent", letterSpacing: "0.05em" }}>
                {EMAIL}
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ROADMAP ── */}
      <section id="roadmap" style={{ padding: "7rem 2rem", borderTop: `1px solid ${T.border}`, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: T.accentDim, textTransform: "uppercase", marginBottom: "1rem" }}>{C.roadmap_label}</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700, marginBottom: "1rem", whiteSpace: "pre-line" }}>{C.roadmap_h}</h2>
            <p style={{ fontSize: "0.9rem", color: T.sub, maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>{C.roadmap_sub}</p>
            <p style={{ fontSize: "0.72rem", color: T.accentDim, marginTop: "0.75rem" }}>Toca cada paso para ver los beneficios</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "1.25rem" }}>
            {C.pasos.map((paso, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <RoadmapFlipCard paso={paso} index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="contacto" style={{ padding: "7rem 2rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: T.accentDim, textTransform: "uppercase", marginBottom: "1.5rem" }}>DAR EL SIGUIENTE PASO</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.2rem,5vw,3.8rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem", whiteSpace: "pre-line" }}>{C.cotizar_h}</h2>
            <p style={{ fontSize: "0.95rem", color: T.sub, lineHeight: 1.8, marginBottom: "2.5rem" }}>{C.cotizar_sub}</p>
            <motion.a href={CALENDLY_LINK} target="_blank" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", padding: "1.1rem 2.5rem", background: T.accent, color: "#0A0A0A", fontWeight: 900, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none", boxShadow: `0 8px 40px ${T.accentGlow}` }}>
              {C.cotizar_cta} →
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "2.5rem 2rem", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 1 }}>
        <Image src="/logo-satori.png" alt="SATORI" width={88} height={28} style={{ filter: T.logoFilter }} />
        <p style={{ fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.35 }}>{C.footer}</p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        * { -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #F5C500; }
        html { scroll-behavior: smooth; }
      `}</style>
    </main>
  );
}