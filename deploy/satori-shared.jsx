/* SATORI — Compartido entre páginas.
   Atoms, Nav multi-página, Footer y CTAs flotantes (WhatsApp + Top).
   Carga ANTES de los archivos de página.
*/

const { useState, useEffect, useRef } = React;

// ---------- CONSTANTES GLOBALES ----------
const SATORI = {
  WHITE: "#FFFFFF",
  CREAM: "#F4F4F2",
  CREAM_2: "#EFEFEC",
  INK: "#0E0E0E",
  INK_SOFT: "#1A1A1A",
  GOLD: "#A67C00",
  GOLD_SOFT: "#C9920A",
  GOLD_DEEP: "#806000", // dorado AA-compliant para texto chico sobre fondo claro
  WHATSAPP: "https://wa.me/525625018281?text=Hola,%20vi%20la%20p%C3%A1gina%20de%20SATORI%20y%20me%20gustar%C3%ADa%20conversar.",
  CALENDLY: "https://calendly.com/rodrigo-tristaan",
  EMAIL: "hola@satorimkt.com",
  RRSS_SATORI: {
    instagram: "https://www.instagram.com/hola.satori/",
    facebook: "https://www.facebook.com/profile.php?id=61589907217774&locale=es_LA"
  },
  RRSS_RODRIGO: {
    instagram: "https://www.instagram.com/tristaan.dlp/",
    facebook: "https://www.facebook.com/rodrigo.delapena.169?locale=es_LA"
  }
};

const waInterest = (topic) =>
  `https://wa.me/525625018281?text=Hola%20Rodrigo,%20me%20interesa%20${encodeURIComponent(topic)}`;

// Webhook de n8n -> grupo de Telegram (los leads del formulario caen ahí)
const N8N_FORM_WEBHOOK = "https://n8n.satorimkt.com/webhook/53c20586-fc46-4646-a88f-d349c8267233";

// ---------- TIPOGRAFÍA / TOKENS ----------
const TYPE = {
  // DM Sans para todo. JetBrains Mono solo para etiquetas/eyebrows.
  display: "'DM Sans', system-ui, sans-serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace"
};

const eyebrowStyle = {
  fontFamily: TYPE.mono,
  fontSize: "0.66rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: SATORI.INK,
  opacity: 0.55,
  fontWeight: 400,
  marginBottom: "1.5rem",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.7rem"
};

const h2Style = {
  fontFamily: TYPE.display,
  fontSize: "clamp(2.2rem,5vw,4rem)",
  fontWeight: 500,
  lineHeight: 1.05,
  letterSpacing: "-0.03em",
  margin: 0,
  color: SATORI.INK
};

const bodyStyle = {
  fontFamily: TYPE.body,
  fontSize: "1.05rem",
  lineHeight: 1.65,
  fontWeight: 300,
  color: SATORI.INK,
  opacity: 0.78
};

// ---------- BOTONES ----------
const btnPrimary = {
  padding: "1rem 1.8rem",
  background: SATORI.INK,
  color: SATORI.CREAM,
  fontSize: "0.7rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 500,
  fontFamily: TYPE.body,
  border: "none",
  textDecoration: "none",
  borderRadius: "999px",
  cursor: "pointer",
  display: "inline-block"
};
const btnGhost = {
  padding: "1rem 1.8rem",
  background: "transparent",
  color: SATORI.INK,
  border: "1px solid #0E0E0E30",
  fontSize: "0.7rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 500,
  fontFamily: TYPE.body,
  textDecoration: "none",
  borderRadius: "999px",
  cursor: "pointer",
  display: "inline-block"
};
const btnGold = {
  padding: "1rem 1.8rem",
  background: SATORI.GOLD,
  color: SATORI.CREAM,
  fontSize: "0.7rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 500,
  fontFamily: TYPE.body,
  border: "none",
  textDecoration: "none",
  borderRadius: "999px",
  cursor: "pointer",
  display: "inline-block"
};

// ---------- LOGO / MARK ----------
// onDark: logo transparente con texto cream + dorado para usar sobre fondo oscuro
// onLight: logo transparente con texto negro (para usar sobre fondo claro)
// gold: variante ícono dorado
function SatoriMark({ height = 42, variant = "onDark" }) {
  const M = {
    onDark: { src: "assets/logo-satori-agency-cream-transparent.webp", w: 900, h: 180 },
    gold:   { src: "assets/logo-satori-agency-gold.webp", w: 1093, h: 157 },
    onLight:{ src: "assets/logo-satori-agency.webp", w: 1100, h: 220 }
  };
  const m = M[variant] || M.onLight;
  return (
    <img
      src={m.src}
      width={m.w}
      height={m.h}
      alt="SATORI"
      style={{
        height: height + "px",
        width: "auto",
        display: "inline-block",
        verticalAlign: "middle"
      }}
    />
  );
}

// ---------- ENSŌ ----------
function Enso({ size = 360, opacity = 0.92, spinning = true, color = "#8a8a8a", className = "" }) {
  const c = (color || "").toLowerCase();
  let bg = "#8c8c8c";
  if (c === "#f4f4f2") bg = SATORI.CREAM;
  else if (c === "#0e0e0e") bg = SATORI.INK;
  else if (c) bg = color;
  const maskStyle = {
    width: size,
    height: size,
    opacity,
    backgroundColor: bg,
    WebkitMaskImage: "url(assets/enso.png)",
    maskImage: "url(assets/enso.png)",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    userSelect: "none",
    pointerEvents: "none"
  };
  return (
    <div
      className={`enso-host ${className}`.trim()}
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: spinning ? "ensoSpin 22s linear infinite" : "none"
      }}
    >
      <div className="enso-shape" style={maskStyle} aria-label="Ensō" role="img" />
    </div>
  );
}

// ---------- MATRIX BACKGROUND ----------
function MatrixBackground({ opacity = 0.06, color = "#A67C00" }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 22);
    const drops = Array(cols).fill(1);
    let id;
    const draw = () => {
      ctx.fillStyle = "rgba(244,244,242,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "13px 'JetBrains Mono', monospace";
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.94 ? color : color + "44";
        ctx.fillText(Math.random() < 0.5 ? "1" : "0", i * 22, y * 22);
        if (y * 22 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, [color]);
  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, opacity, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

// ---------- IMAGE PLACEHOLDER ----------
function ImagePlaceholder({ label, ratio = "4/3", treatment = "bw", height }) {
  const filter =
    treatment === "duotone"
      ? "grayscale(1) sepia(1) hue-rotate(-10deg) saturate(1.2) brightness(0.9)"
      : treatment === "bw"
      ? "grayscale(1) contrast(1.05)"
      : "grayscale(0.6) contrast(1.05)";
  const stripeColor = treatment === "duotone" ? SATORI.GOLD : SATORI.INK;
  const baseStyle = height
    ? { height }
    : { aspectRatio: ratio };
  return (
    <div
      style={{
        ...baseStyle,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        background: `repeating-linear-gradient(135deg, ${stripeColor}10 0px, ${stripeColor}10 8px, ${stripeColor}05 8px, ${stripeColor}05 16px)`,
        filter
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: TYPE.mono,
          fontSize: "0.65rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: SATORI.INK,
          opacity: 0.5,
          padding: "1rem",
          textAlign: "center"
        }}
      >
        {label}
      </div>
    </div>
  );
}

// ---------- LANG (toggle global ES/EN) ----------
function useLang() {
  const [lang, setLangState] = useState(() => {
    try { return localStorage.getItem("satori-lang") || "es"; } catch (e) { return "es"; }
  });
  useEffect(() => {
    const onChange = (e) => setLangState(e.detail || "es");
    window.addEventListener("satori-lang", onChange);
    return () => window.removeEventListener("satori-lang", onChange);
  }, []);
  const setLang = (l) => {
    try { localStorage.setItem("satori-lang", l); } catch (e) {}
    window.dispatchEvent(new CustomEvent("satori-lang", { detail: l }));
  };
  return [lang, setLang];
}

// ---------- NAV MULTI-PÁGINA ----------
// `current` = "home" | "sobre" | "proyectos" | "servicios"
const NAV_LINKS = [
  { key: "home", href: "index.html", label: { es: "Inicio", en: "Home" } },
  { key: "servicios", href: "servicios.html", label: { es: "Servicios", en: "Services" } },
  { key: "productos", href: "proyectos.html", label: { es: "Proyectos en vivo", en: "Live projects" } },
  { key: "sobre", href: "sobre-rodrigo.html", label: { es: "Fundador", en: "Founder" } },
  { key: "blog", href: "blog.html", label: { es: "Blog", en: "Blog" } }
];

function Nav({ current }) {
  const [lang, setLang] = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // En móvil, ocultar el nav hasta pasar la primera sección (manifesto / logo / hero)
  const [pastFirst, setPastFirst] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // primera sección = #manifesto si existe, si no la primera <section> del main
      const first =
        document.getElementById("manifesto") ||
        document.querySelector("main section");
      if (first) {
        const rect = first.getBoundingClientRect();
        setPastFirst(rect.bottom <= 12);
      } else {
        setPastFirst(window.scrollY > window.innerHeight * 0.6);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  const ctaLabel = lang === "en" ? "Contact" : "Contactar";
  return (
    <React.Fragment>
      {/* Floating glass-pill nav (Apple-style, light) */}
      <nav
        className={`satori-nav-pill ${pastFirst ? "" : "nav-hidden-mobile"}`}
        style={{
          position: "fixed",
          top: scrolled ? "0.75rem" : "1.1rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          backdropFilter: "blur(22px) saturate(180%)",
          WebkitBackdropFilter: "blur(22px) saturate(180%)",
          background: scrolled
            ? "rgba(255,255,255,0.78)"
            : "rgba(255,255,255,0.62)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: "999px",
          padding: "0.5rem 0.5rem 0.5rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.25rem",
          width: "min(94%, 1040px)",
          boxShadow: scrolled
            ? "0 18px 45px -18px rgba(14,14,14,0.22), 0 0 0 1px rgba(166,124,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)"
            : "0 14px 40px -22px rgba(14,14,14,0.18), inset 0 1px 0 rgba(255,255,255,0.55)",
          transition: "background .35s ease, top .35s ease, box-shadow .35s ease"
        }}
      >
        <a
          href="index.html"
          style={{ display: "inline-flex", alignItems: "center", textDecoration: "none", lineHeight: 0 }}
        >
          <SatoriMark height={14} variant="gold" />
        </a>

        <div
          className="nav-links-desktop"
          style={{ display: "flex", alignItems: "center", gap: "1.6rem" }}
        >
          {NAV_LINKS.map((l) => {
            const active = l.key === current;
            return (
              <a
                key={l.key}
                href={l.href}
                className="satori-nav-link"
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.22em",
                  color: active ? SATORI.INK : `${SATORI.INK}99`,
                  textDecoration: "none",
                  fontFamily: TYPE.body,
                  position: "relative",
                  padding: "0.45rem 0"
                }}
              >
                {l.label[lang] || l.label.es}
                {active && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: "50%",
                      bottom: "-2px",
                      transform: "translateX(-50%)",
                      width: "5px",
                      height: "5px",
                      borderRadius: "999px",
                      background: SATORI.GOLD,
                      boxShadow: `0 0 0 4px ${SATORI.GOLD}25`
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }} className="nav-tail-desktop">
          <button
            className="nav-lang"
            aria-label="Cambiar idioma"
            onClick={() => {
              setLang(lang === "en" ? "es" : "en");
              // give state a tick to persist, then reload so all sections update cleanly
              setTimeout(() => window.location.reload(), 60);
            }}
            style={{
              fontFamily: TYPE.mono,
              fontSize: "0.62rem",
              letterSpacing: "0.2em",
              padding: "0.5rem 0.85rem",
              borderRadius: "999px",
              border: `1px solid ${SATORI.INK}20`,
              background: "transparent",
              color: SATORI.INK,
              opacity: 0.75,
              cursor: "pointer",
              fontWeight: 500
            }}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <a
            href="#contacto"
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: SATORI.CREAM,
              padding: "0.7rem 1.25rem",
              textDecoration: "none",
              borderRadius: "999px",
              background: `linear-gradient(135deg, ${SATORI.INK} 0%, #2A2622 100%)`,
              fontFamily: TYPE.body,
              fontWeight: 500,
              boxShadow: `0 8px 22px -10px rgba(14,14,14,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
            }}
          >
            {ctaLabel}
          </a>
        </div>

        <button
          className="nav-burger"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menú"
          style={{
            display: "none",
            background: "transparent",
            border: `1px solid ${SATORI.INK}20`,
            borderRadius: "999px",
            padding: "0.55rem 0.9rem",
            cursor: "pointer",
            fontFamily: TYPE.mono,
            fontSize: "0.62rem",
            letterSpacing: "0.18em",
            color: SATORI.INK
          }}
        >
          {mobileOpen ? "✕" : "≡"}
        </button>
      </nav>

      {/* Toggle de idioma fijo arriba-derecha (solo móvil; en desktop lo tiene el nav-tail) */}
      <button
        className="nav-lang-mobile"
        aria-label="Cambiar idioma"
        onClick={() => {
          setLang(lang === "en" ? "es" : "en");
          setTimeout(() => window.location.reload(), 60);
        }}
        style={{
          position: "fixed",
          top: "1.15rem",
          right: "1rem",
          zIndex: 60,
          display: "none",
          fontFamily: TYPE.mono,
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          padding: "0.5rem 0.8rem",
          borderRadius: "999px",
          border: `1px solid ${SATORI.INK}20`,
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "blur(12px) saturate(180%)",
          WebkitBackdropFilter: "blur(12px) saturate(180%)",
          color: SATORI.INK,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 6px 18px -8px rgba(14,14,14,0.25)"
        }}
      >
        {lang === "en" ? "ES" : "EN"}
      </button>

      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: "4.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 49,
            width: "min(94%, 1040px)",
            background: "rgba(255,255,255,0.94)",
            backdropFilter: "blur(22px) saturate(180%)",
            WebkitBackdropFilter: "blur(22px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.7)",
            borderRadius: "24px",
            padding: "1rem 1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            boxShadow: "0 18px 45px -18px rgba(14,14,14,0.25)"
          }}
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              style={{
                padding: "0.9rem 0.5rem",
                fontSize: "0.82rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: SATORI.INK,
                opacity: l.key === current ? 1 : 0.65,
                textDecoration: "none",
                fontFamily: TYPE.body,
                fontWeight: 500,
                borderBottom: `1px solid ${SATORI.INK}10`
              }}
            >
              {l.label[lang] || l.label.es}
            </a>
          ))}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <button
              onClick={() => {
                setLang(lang === "en" ? "es" : "en");
                setTimeout(() => window.location.reload(), 60);
              }}
              style={{
                fontFamily: TYPE.mono,
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                padding: "0.55rem 1rem",
                borderRadius: "999px",
                border: `1px solid ${SATORI.INK}20`,
                background: "transparent",
                color: SATORI.INK,
                cursor: "pointer",
                fontWeight: 500
              }}
            >
              {lang === "en" ? "ES" : "EN"}
            </button>
            <a
              href="#contacto"
              style={{
                padding: "0.85rem 1.5rem",
                textAlign: "center",
                background: SATORI.INK,
                color: SATORI.CREAM,
                borderRadius: "999px",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontFamily: TYPE.body,
                fontWeight: 500,
                flex: 1
              }}
            >
              {ctaLabel}
            </a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
// ---------- FOOTER ----------
function SocialIcon({ kind }) {
  // simple geometric glyphs, mono / line
  const map = {
    instagram: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6H17V4.3c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.6V14h2.7v8h3.2z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="7.5" y1="10" x2="7.5" y2="17" />
        <circle cx="7.5" cy="7.2" r="0.7" fill="currentColor" stroke="none" />
        <path d="M11 17v-4.5a2.5 2.5 0 015 0V17" />
        <line x1="11" y1="10" x2="11" y2="17" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M13 4v10.5a3 3 0 11-3-3" />
        <path d="M13 4c.5 2.5 2.4 4.3 5 4.5" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="M11 9l4 3-4 3z" fill="currentColor" stroke="none" />
      </svg>
    ),
    x: (
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4">
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
      </svg>
    )
  };
  return map[kind] || null;
}

function SocialRow({ links, color = SATORI.INK }) {
  const entries = Object.entries(links);
  return (
    <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
      {entries.map(([kind, href]) => (
        <a
          key={kind}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={kind}
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "999px",
            border: `1px solid ${color}25`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color,
            textDecoration: "none"
          }}
        >
          <SocialIcon kind={kind} />
        </a>
      ))}
    </div>
  );
}

function Footer({ social = "satori" }) {
  const [lang] = useLang();
  const rrss = social === "rodrigo" ? SATORI.RRSS_RODRIGO : SATORI.RRSS_SATORI;
  const T = lang === "en" ? {
    desc: "Digital strategy for entrepreneurs who value their time. Identity, positioning and AI solutions.",
    navigate: "Navigate",
    contact: "Contact",
    legal: "Legal",
    whatsapp: "Direct WhatsApp",
    zoom: "Contact form",
    privacy: "Privacy notice",
    location: "CDMX · MEXICO",
    copy: "© 2026 SATORI · DIGITAL STRATEGY",
    tagline: "INSIGHT · CLARITY · GROWTH"
  } : {
    desc: "Estrategia digital para empresarios que valoran su tiempo. Identidad, posicionamiento y soluciones con IA.",
    navigate: "Navegar",
    contact: "Contacto",
    legal: "Legal",
    whatsapp: "WhatsApp directo",
    zoom: "Formulario de contacto",
    privacy: "Aviso de privacidad",
    location: "CDMX · MÉXICO",
    copy: "© 2026 SATORI · ESTRATEGIA DIGITAL",
    tagline: "INSIGHT · CLARIDAD · CRECIMIENTO"
  };
  return (
    <footer
      style={{
        background: SATORI.INK,
        color: SATORI.CREAM,
        padding: "0 clamp(0.85rem,2vw,1.25rem) 2.5rem clamp(0.85rem,2vw,1.25rem)",
        position: "relative",
        zIndex: 1
      }}
    >
      {/* fade-in halo: deeper gradient from page → ink with gold thread */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-320px",
          left: 0,
          right: 0,
          height: "320px",
          background: `linear-gradient(180deg,
            transparent 0%,
            rgba(14,14,14,0.04) 18%,
            rgba(14,14,14,0.16) 42%,
            rgba(14,14,14,0.48) 70%,
            rgba(14,14,14,0.85) 90%,
            ${SATORI.INK} 100%)`,
          pointerEvents: "none"
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${SATORI.GOLD}55 50%, transparent 100%)`,
          pointerEvents: "none"
        }}
      />
      <div style={{ paddingTop: "6rem", position: "relative" }}>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: "3.5rem"
        }}
        className="footer-grid"
      >
        <div style={{ marginLeft: "-0.5rem" }}>
          <SatoriMark height={46} variant="onDark" />
          <p
            style={{
              ...bodyStyle,
              color: SATORI.CREAM,
              opacity: 0.55,
              marginTop: "1.5rem",
              maxWidth: "26rem",
              fontSize: "0.95rem"
            }}
          >
            {T.desc}
          </p>
          <div style={{ marginTop: "2rem" }}>
            <SocialRow links={rrss} color={SATORI.CREAM} />
          </div>
        </div>

        <div>
          <p style={{ ...eyebrowStyle, color: SATORI.CREAM, opacity: 0.45, marginBottom: "1.2rem" }}>{T.navigate}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.key}
                href={l.href}
                style={{
                  color: SATORI.CREAM,
                  opacity: 0.92,
                  textDecoration: "none",
                  fontFamily: TYPE.body,
                  fontSize: "1.05rem",
                  fontWeight: 400,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem"
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "999px",
                    background: SATORI.GOLD,
                    display: "inline-block"
                  }}
                />
                {l.label[lang] || l.label.es}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p style={{ ...eyebrowStyle, color: SATORI.CREAM, opacity: 0.45, marginBottom: "1.2rem" }}>{T.contact}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <a
              href={`mailto:${SATORI.EMAIL}`}
              style={{ color: SATORI.CREAM, opacity: 0.92, textDecoration: "none", fontFamily: TYPE.body, fontSize: "1.05rem" }}
            >
              {SATORI.EMAIL}
            </a>
            <a
              href={SATORI.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: SATORI.CREAM, opacity: 0.92, textDecoration: "none", fontFamily: TYPE.body, fontSize: "1.05rem" }}
            >
              {T.whatsapp}
            </a>
            <a
              href="#contacto"
              style={{ color: SATORI.CREAM, opacity: 0.92, textDecoration: "none", fontFamily: TYPE.body, fontSize: "1.05rem" }}
            >
              {T.zoom}
            </a>
          </div>
        </div>

        <div>
          <p style={{ ...eyebrowStyle, color: SATORI.CREAM, opacity: 0.45, marginBottom: "1.2rem" }}>{T.legal}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <a
              href="privacidad.html"
              style={{ color: SATORI.CREAM, opacity: 0.92, textDecoration: "none", fontFamily: TYPE.body, fontSize: "1.05rem" }}
            >
              {T.privacy}
            </a>
            <span
              style={{ color: SATORI.CREAM, opacity: 0.4, fontFamily: TYPE.mono, fontSize: "0.72rem", letterSpacing: "0.18em" }}
            >
              {T.location}
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1280px",
          margin: "4rem auto 0",
          paddingTop: "1.75rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem"
        }}
      >
        <span style={{ fontFamily: TYPE.mono, fontSize: "0.7rem", letterSpacing: "0.18em", opacity: 0.5 }}>
          {T.copy}
        </span>
        <span style={{ fontFamily: TYPE.mono, fontSize: "0.7rem", letterSpacing: "0.18em", opacity: 0.5 }}>
          {T.tagline}
        </span>
      </div>
      </div>
    </footer>
  );
}

// ---------- MOBILE FAB MENU (above WhatsApp) ----------
function MobileMenuFab({ current }) {
  const [lang, setLang] = useLang();
  // Inicia ABIERTO en móvil; se cierra solo a los 10s
  const [open, setOpen] = useState(true);
  const [autoCloseArmed, setAutoCloseArmed] = useState(true);
  // Auto-close after 10s when open
  useEffect(() => {
    if (!open || !autoCloseArmed) return;
    const id = setTimeout(() => setOpen(false), 2000);
    return () => clearTimeout(id);
  }, [open, autoCloseArmed]);
  // Una vez que el usuario interactúa, desarmamos el auto-cierre forzado para el siguiente open
  const handleToggle = () => {
    setAutoCloseArmed(false);
    setOpen((v) => !v);
  };
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const ctaLabel = lang === "en" ? "Contact" : "Contactar";
  return (
    <div
      className="satori-mobile-fab"
      style={{
        position: "fixed",
        bottom: "5.7rem",
        right: "1.5rem",
        zIndex: 90,
        display: "none",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "0.6rem",
        pointerEvents: "none"
      }}
    >
      {/* nav items - speed dial column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "0.45rem",
          pointerEvents: open ? "auto" : "none"
        }}
      >
        {NAV_LINKS.map((l, i) => {
          const isActive = l.key === current;
          return (
            <a
              key={l.key}
              href={l.href}
              style={{
                opacity: open ? 1 : 0,
                transform: open
                  ? "translateY(0) scale(1)"
                  : `translateY(${(NAV_LINKS.length - i) * 10}px) scale(0.85)`,
                transition: `opacity .35s cubic-bezier(.2,.9,.3,1.4) ${open ? i * 60 : (NAV_LINKS.length - i - 1) * 30}ms, transform .35s cubic-bezier(.2,.9,.3,1.4) ${open ? i * 60 : (NAV_LINKS.length - i - 1) * 30}ms`,
                padding: "0.7rem 1.15rem",
                background: isActive ? SATORI.INK : "rgba(255,255,255,0.94)",
                color: isActive ? SATORI.CREAM : SATORI.INK,
                fontFamily: TYPE.body,
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                borderRadius: "999px",
                textDecoration: "none",
                boxShadow: "0 8px 24px -10px rgba(14,14,14,0.35), 0 0 0 1px rgba(166,124,0,0.12)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                whiteSpace: "nowrap"
              }}
            >
              {l.label[lang] || l.label.es}
            </a>
          );
        })}
        {/* Action row: lang + agendar */}
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(8px)",
            transition: `opacity .35s ease ${open ? NAV_LINKS.length * 60 : 0}ms, transform .35s ease ${open ? NAV_LINKS.length * 60 : 0}ms`
          }}
        >
          <a
            href="#contacto"
            style={{
              padding: "0.55rem 1rem",
              background: `linear-gradient(135deg, #B98A0A 0%, ${SATORI.GOLD} 100%)`,
              color: SATORI.CREAM,
              fontFamily: TYPE.body,
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              borderRadius: "999px",
              textDecoration: "none",
              boxShadow: `0 8px 20px -8px ${SATORI.GOLD}80`
            }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>

      {/* Trigger button */}
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={handleToggle}
        style={{
          pointerEvents: "auto",
          width: "58px",
          height: "58px",
          borderRadius: "999px",
          background: open
            ? `linear-gradient(135deg, ${SATORI.INK} 0%, #2A2622 100%)`
            : `linear-gradient(135deg, ${SATORI.INK} 0%, #1A1814 100%)`,
          color: SATORI.CREAM,
          border: `1px solid ${SATORI.GOLD}45`,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: open
            ? `0 14px 32px -8px ${SATORI.GOLD}55, 0 2px 6px rgba(14,14,14,0.18)`
            : "0 14px 32px -8px rgba(14,14,14,0.55), 0 2px 6px rgba(14,14,14,0.18)",
          transform: open ? "rotate(180deg)" : "rotate(0)",
          transition: "transform .45s cubic-bezier(.2,.9,.3,1.4), box-shadow .35s ease, background .35s ease"
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <React.Fragment>
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="14" x2="20" y2="14" />
              <circle cx="20" cy="8" r="1.5" fill="#A67C00" stroke="#A67C00" />
            </React.Fragment>
          )}
        </svg>
      </button>
    </div>
  );
}

// ---------- FLOATING WHATSAPP ----------
function FloatingWhatsApp({ topic }) {
  const href = topic ? waInterest(topic) : SATORI.WHATSAPP;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="satori-wa-fab"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 80,
        width: "58px",
        height: "58px",
        borderRadius: "999px",
        background: "#25D366",
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 14px 32px -8px rgba(37,211,102,0.5), 0 2px 6px rgba(14,14,14,0.12)",
        textDecoration: "none",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.6)",
        transition: "opacity .5s ease, transform .5s cubic-bezier(.2,.9,.3,1.4)"
      }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9 3 3.4 8.6 3.4 15.6c0 2.4.6 4.6 1.8 6.6L3 29l7-1.8c1.9 1 4 1.6 6 1.6 7 0 12.6-5.6 12.6-12.6S23 3 16 3zm0 22.7c-1.8 0-3.6-.5-5.1-1.4l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1-1.6-1.5-3.4-1.5-5.2 0-5.8 4.6-10.4 10.4-10.4 2.8 0 5.4 1.1 7.4 3.1s3.1 4.6 3.1 7.4c0 5.7-4.7 10.4-10.6 10.4zm5.6-7.8c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-.9 1.2c-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1s0-.5.1-.6c.1-.1.3-.3.4-.5l.3-.4c.1-.2 0-.3 0-.5l-.6-1.5c-.3-.7-.5-.6-.7-.6h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3 2.1 3.2 5 4.5c.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 2-1.4s.3-1.3.2-1.4c-.1-.2-.3-.2-.6-.4z" />
      </svg>
    </a>
  );
}

// ---------- BLOQUE CTA + CALENDLY (gradient suave) ----------
// ---------- CALENDLY INLINE WIDGET (oficial) ----------
function CalendlyInline({ height = 700, params = "hide_gdpr_banner=1" }) {
  const ref = React.useRef(null);
  useEffect(() => {
    // The widget script is loaded via <script src="https://assets.calendly.com/assets/external/widget.js"> in each HTML head.
    // If already loaded, initWidget will pick up the div by class. If not, we wait.
    const tryInit = () => {
      if (window.Calendly && ref.current) {
        window.Calendly.initInlineWidget({
          url: `${SATORI.CALENDLY}?${params}`,
          parentElement: ref.current,
          prefill: {},
          utm: {}
        });
        return true;
      }
      return false;
    };
    if (tryInit()) return;
    const id = setInterval(() => {
      if (tryInit()) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, [params]);

  return (
    <div
      ref={ref}
      className="calendly-inline-widget"
      style={{
        width: "100%",
        minHeight: `${height}px`,
        height: `${height}px`,
        background: "#FFFFFF",
        overflow: "hidden"
      }}
    />
  );
}

// ---------- TYPEWRITER TITLE (re-anima cuando entra al viewport) ----------
function TypewriterTitle({ text, className }) {
  const [out, setOut] = useState("");
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVisible(true);
        });
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    setOut("");
    setDone(false);
    let i = 0;
    let timer;
    const start = setTimeout(() => {
      timer = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(timer);
          setDone(true);
        }
      }, 55);
    }, 250);
    return () => { clearTimeout(start); clearInterval(timer); };
  }, [text, visible]);

  return (
    <h2
      ref={ref}
      className={className}
      style={{
        fontFamily: TYPE.display,
        fontWeight: 500,
        fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
        lineHeight: 1.04,
        letterSpacing: "-0.035em",
        margin: 0,
        color: SATORI.CREAM,
        minHeight: "1.2em"
      }}
    >
      <span>{out || "\u00a0"}</span>
      <span
        aria-hidden="true"
        style={{
          display: "inline-block",
          width: "0.55ch",
          marginLeft: "0.06em",
          background: SATORI.GOLD,
          height: "0.9em",
          verticalAlign: "-0.12em",
          animation: "ctaCursorBlink 1s steps(1) infinite",
          opacity: done ? 1 : 1
        }}
      />
    </h2>
  );
}

// ---------- BLOQUE CTA + FORMULARIO (transición refinada) ----------
function CtaBlock({ titulo = "Hablemos.", sub = "30 minutos. Salimos con claridad.", calendly = true }) {
  const [lang] = useLang();
  const pick = (v) => (v && typeof v === "object" ? (v[lang] || v.es) : v);
  const [form, setForm] = useState({ nombre: "", empresa: "", sitioWeb: "", email: "", telefono: "", presupuesto: "", mensaje: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const T = lang === "en" ? {
    eyebrow: "Next step",
    nombre: "Name",
    empresa: "Company",
    sitioWeb: "Company website (optional)",
    email: "Email",
    telefono: "Phone (optional)",
    presupuesto_ph: "Approx. budget (optional)",
    budgets: ["Up to $20,000 MXN/mo", "$20,000 – $50,000 MXN/mo", "$50,000 – $120,000 MXN/mo", "Over $120,000 MXN/mo", "Not sure yet"],
    mensaje: "Briefly tell us about your business",
    submit: "Send message",
    sending: "Sending…",
    sent_t: "Message sent!",
    sent_d: "Thanks, we got your message. We'll reply within 24h. In a hurry? Message us on WhatsApp.",
    legal: "By sending you accept our",
    legalLink: "Privacy Notice",
    or: "or",
    whats: "WhatsApp",
    microcopy: "Free · 24h reply · With clarity"
  } : {
    eyebrow: "Siguiente paso",
    nombre: "Nombre",
    empresa: "Empresa",
    sitioWeb: "Sitio web de empresa (opcional)",
    email: "Email",
    telefono: "Teléfono (opcional)",
    presupuesto_ph: "Presupuesto aproximado (opcional)",
    budgets: ["Hasta $20,000 MXN/mes", "$20,000 – $50,000 MXN/mes", "$50,000 – $120,000 MXN/mes", "Más de $120,000 MXN/mes", "Aún no lo sé"],
    mensaje: "Cuéntanos brevemente sobre tu negocio",
    submit: "Enviar mensaje",
    sending: "Enviando…",
    sent_t: "¡Mensaje enviado!",
    sent_d: "Gracias, recibimos tu mensaje. Te respondemos en menos de 24h. ¿Urge? Escríbenos por WhatsApp.",
    legal: "Al enviar aceptas nuestro",
    legalLink: "Aviso de Privacidad",
    or: "o",
    whats: "WhatsApp",
    microcopy: "Gratis · respuesta en 24h · con claridad"
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // keepalive: el lead se envía aunque naveguemos a la página de gracias
    fetch(N8N_FORM_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        nombre: form.nombre,
        empresa: form.empresa,
        sitioWeb: form.sitioWeb,
        email: form.email,
        telefono: form.telefono,
        presupuesto: form.presupuesto,
        mensaje: form.mensaje,
        pagina: typeof document !== "undefined" ? document.title : "",
        url: typeof location !== "undefined" ? location.href : ""
      })
    }).catch(() => {});
    window.location.href = "gracias.html";
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem 1.15rem",
    background: "rgba(244,244,242,0.04)",
    border: "1px solid rgba(244,244,242,0.16)",
    borderRadius: "14px",
    color: SATORI.CREAM,
    fontFamily: TYPE.body,
    fontSize: "0.96rem",
    fontWeight: 400,
    outline: "none",
    transition: "border-color .25s ease, background .25s ease"
  };

  return (
    <section
      id="contacto"
      className="cta-cinema"
      style={{
        padding: "9rem clamp(1.25rem,4vw,2.5rem) 7rem",
        background: SATORI.INK,
        color: SATORI.CREAM,
        position: "relative",
        zIndex: 1,
        overflow: "hidden"
      }}
    >
      {/* SOFT FADE — transición página → ink, sin línea dorada que cruce el formulario */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-1px",
          left: 0,
          right: 0,
          height: "320px",
          background: `linear-gradient(180deg,
            ${SATORI.CREAM_2} 0%,
            rgba(244,244,242,0.94) 10%,
            rgba(180,176,168,0.65) 32%,
            rgba(74,70,64,0.55) 56%,
            rgba(26,24,20,0.82) 78%,
            ${SATORI.INK} 100%)`,
          pointerEvents: "none",
          zIndex: 0
        }}
      />

      {/* Animated gold particles (kept, no enso) */}
      <CtaParticles />

      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        position: "relative",
        zIndex: 2,
        display: "grid",
        gridTemplateColumns: "1fr 1.1fr",
        gap: "4rem",
        alignItems: "start"
      }} className="cta-grid">
        {/* LEFT: heading + microcopy + alt contact */}
        <div>
          <TypewriterTitle text={pick(titulo)} className="cta-title" />

          <p
            style={{
              fontFamily: TYPE.body,
              fontSize: "1.08rem",
              color: SATORI.CREAM,
              opacity: 0.72,
              maxWidth: "32ch",
              lineHeight: 1.6,
              margin: "1.5rem 0 2rem",
              fontWeight: 300
            }}
          >
            {pick(sub)}
          </p>

          <div
            style={{
              paddingTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.85rem"
            }}
          >
            <a
              href={`mailto:${SATORI.EMAIL}`}
              style={{
                color: SATORI.GOLD,
                textDecoration: "none",
                fontFamily: TYPE.display,
                fontStyle: "italic",
                fontSize: "1.15rem",
                fontWeight: 400
              }}
            >
              {SATORI.EMAIL}
            </a>
            <a
              href={SATORI.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: SATORI.CREAM,
                opacity: 0.7,
                textDecoration: "none",
                fontFamily: TYPE.body,
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M16 3C9 3 3.4 8.6 3.4 15.6c0 2.4.6 4.6 1.8 6.6L3 29l7-1.8c1.9 1 4 1.6 6 1.6 7 0 12.6-5.6 12.6-12.6S23 3 16 3z" />
              </svg>
              {T.or} {T.whats}
            </a>
            <p
              style={{
                marginTop: "0.75rem",
                fontFamily: TYPE.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: SATORI.CREAM,
                opacity: 0.4
              }}
            >
              {T.microcopy}
            </p>
          </div>
        </div>

        {/* RIGHT: form */}
        <div>
          {sent ? (
            <div style={{
              padding: "3rem 2rem",
              border: `1px solid ${SATORI.GOLD}40`,
              borderRadius: "24px",
              background: `${SATORI.GOLD}10`,
              textAlign: "center"
            }}>
              <p style={{
                fontFamily: TYPE.mono,
                fontSize: "0.7rem",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: SATORI.GOLD,
                marginBottom: "1rem"
              }}>✓ {T.sent_t}</p>
              <p style={{
                fontSize: "1rem",
                lineHeight: 1.6,
                color: SATORI.CREAM,
                opacity: 0.82,
                fontWeight: 300,
                margin: 0,
                fontFamily: TYPE.body
              }}>{T.sent_d}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} style={{ display: "grid", gap: "0.85rem", fontFamily: TYPE.body }}>
              <div className="cta-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <input required className="cta-input" type="text" placeholder={T.nombre}
                  value={form.nombre} onChange={set("nombre")} style={inputStyle} />
                <input className="cta-input" type="text" placeholder={T.empresa}
                  value={form.empresa} onChange={set("empresa")} style={inputStyle} />
              </div>
              <div className="cta-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
                <input required className="cta-input" type="email" placeholder={T.email}
                  value={form.email} onChange={set("email")} style={inputStyle} />
                <input className="cta-input" type="tel" placeholder={T.telefono}
                  value={form.telefono} onChange={set("telefono")} style={inputStyle} />
              </div>
              <input className="cta-input" type="url" placeholder={T.sitioWeb}
                value={form.sitioWeb} onChange={set("sitioWeb")} style={inputStyle} />
              <select className="cta-input" value={form.presupuesto} onChange={set("presupuesto")}
                style={{ ...inputStyle, fontFamily: TYPE.body, color: form.presupuesto ? SATORI.CREAM : "rgba(244,244,242,0.5)" }}>
                <option value="" style={{ color: SATORI.INK }}>{T.presupuesto_ph}</option>
                {T.budgets.map((b) => (
                  <option key={b} value={b} style={{ color: SATORI.INK }}>{b}</option>
                ))}
              </select>
              <textarea required className="cta-input" placeholder={T.mensaje}
                value={form.mensaje} onChange={set("mensaje")} rows={5}
                style={{ ...inputStyle, resize: "vertical", minHeight: "130px", fontFamily: TYPE.body }} />
              <button
                type="submit"
                className="cta-mega-btn"
                style={{
                  marginTop: "0.5rem",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "1.15rem 1.9rem",
                  background: `linear-gradient(135deg, #B98A0A 0%, ${SATORI.GOLD} 50%, #8A6500 100%)`,
                  backgroundSize: "200% 100%",
                  color: SATORI.CREAM,
                  fontFamily: TYPE.body,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  borderRadius: "999px",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: `0 14px 38px -14px ${SATORI.GOLD}66, inset 0 1px 0 rgba(255,255,255,0.12)`
                }}
              >
                <span>{T.submit}</span>
                <span className="cta-mega-arrow" aria-hidden="true">→</span>
              </button>
              <p style={{
                fontSize: "0.66rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: SATORI.CREAM,
                opacity: 0.4,
                margin: "0.5rem 0 0",
                fontFamily: TYPE.body
              }}>
                {T.legal}{" "}
                <a href="privacidad.html" style={{ color: SATORI.CREAM, opacity: 0.85, textDecoration: "underline", textUnderlineOffset: "3px" }}>{T.legalLink}</a>
              </p>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ctaCursorBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        @keyframes ctaDotPulse {
          0%, 100% { box-shadow: 0 0 0 0 ${SATORI.GOLD}55; }
          50% { box-shadow: 0 0 0 8px ${SATORI.GOLD}00; }
        }
        .cta-input:focus { border-color: ${SATORI.GOLD} !important; background: rgba(244,244,242,0.08) !important; }
        .cta-input::placeholder { color: rgba(244,244,242,0.5); }
        .cta-mega-btn { transition: transform .4s cubic-bezier(.2,.9,.3,1.4), box-shadow .4s ease, background-position .8s ease; }
        .cta-mega-btn:hover { transform: translateY(-3px) scale(1.01); box-shadow: 0 25px 60px -10px ${SATORI.GOLD}A0, inset 0 1px 0 rgba(255,255,255,0.3); background-position: 100% 0; }
        .cta-mega-btn:hover .cta-mega-arrow { transform: translateX(6px); }
        .cta-mega-arrow { transition: transform .4s cubic-bezier(.2,.9,.3,1.4); display: inline-block; }
        @media (max-width: 820px) {
          .cta-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .cta-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// Floating gold particle dots inside the CTA section
function CtaParticles() {
  const dots = React.useMemo(() => Array.from({ length: 18 }).map((_, i) => ({
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 3,
    dur: 12 + Math.random() * 14,
    delay: -(Math.random() * 18),
    opacity: 0.18 + Math.random() * 0.35
  })), []);
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {dots.map((d, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            borderRadius: "999px",
            background: SATORI.GOLD,
            opacity: d.opacity,
            boxShadow: `0 0 ${d.size * 3}px ${SATORI.GOLD}`,
            animation: `ctaFloat ${d.dur}s ease-in-out ${d.delay}s infinite alternate`
          }}
        />
      ))}
      <style>{`
        @keyframes ctaFloat {
          0%   { transform: translate(0, 0); }
          100% { transform: translate(${-30 + Math.random() * 60}px, ${-40 + Math.random() * 80}px); }
        }
      `}</style>
    </div>
  );
}

// ---------- SECCIÓN HERO REUTILIZABLE ----------
function PageHero({ eyebrow, title, sub, accent = "", align = "left", id }) {
  const [lang] = useLang();
  const pick = (v) => (v && typeof v === "object" ? (v[lang] || v.es) : v);
  return (
    <section
      id={id}
      style={{
        padding: "11rem clamp(1.25rem,4vw,2.5rem) 5rem",
        position: "relative",
        zIndex: 1,
        borderBottom: "1px solid #0E0E0E10"
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", textAlign: align }}>
        <p style={eyebrowStyle}>
          <span style={{ width: "18px", height: "1px", background: SATORI.GOLD, display: "inline-block" }} />
          {pick(eyebrow)}
        </p>
        <h1
          style={{
            fontFamily: TYPE.display,
            fontWeight: 500,
            fontSize: "clamp(2.6rem,7.5vw,5.4rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.035em",
            margin: 0,
            color: SATORI.INK,
            maxWidth: "22ch"
          }}
        >
          {pick(title)}{" "}
          {accent && (
            <span style={{ color: SATORI.GOLD, fontWeight: 500 }}>{pick(accent)}</span>
          )}
        </h1>
        {sub && (
          <p style={{ ...bodyStyle, marginTop: "1.5rem", maxWidth: "52ch" }}>{pick(sub)}</p>
        )}
      </div>
    </section>
  );
}

// ---------- WELCOME / SPLASH ANIMATION ----------
function WelcomeAnimation({ duration = 3400, onComplete, storageKey = "satori_seen_welcome" }) {
  const [phase, setPhase] = useState("intro"); // intro → bloom → exit → done
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("bloom"), 900);
    const t2 = setTimeout(() => setPhase("exit"), duration - 700);
    const t3 = setTimeout(() => {
      setHidden(true);
      try { sessionStorage.setItem(storageKey, "1"); } catch (e) {}
      if (onComplete) onComplete();
    }, duration);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [duration, onComplete, storageKey]);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: phase === "intro"
          ? "#0E0E0E"
          : phase === "bloom"
          ? "linear-gradient(135deg, #0E0E0E 0%, #2C2A26 50%, #0E0E0E 100%)"
          : `linear-gradient(180deg, #0E0E0E 0%, ${SATORI.CREAM_2} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "exit" ? 0 : 1,
        transition: "background 1.4s ease, opacity .7s ease",
        perspective: "1200px",
        overflow: "hidden"
      }}
    >
      {/* ambient rings */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "min(85vmin, 760px)",
          height: "min(85vmin, 760px)",
          borderRadius: "999px",
          border: `1px solid ${SATORI.GOLD}30`,
          opacity: phase === "intro" ? 0 : 0.7,
          transform: `scale(${phase === "intro" ? 0.6 : phase === "bloom" ? 1 : 1.6}) rotate(${phase === "exit" ? 90 : 0}deg)`,
          transition: "transform 2s cubic-bezier(.2,.7,.2,1), opacity 1.4s ease"
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "min(55vmin, 480px)",
          height: "min(55vmin, 480px)",
          borderRadius: "999px",
          border: `1px solid ${SATORI.GOLD}55`,
          opacity: phase === "intro" ? 0 : 1,
          transform: `scale(${phase === "intro" ? 0.4 : phase === "bloom" ? 1 : 1.8})`,
          transition: "transform 2s cubic-bezier(.2,.7,.2,1), opacity 1.2s ease"
        }}
      />

      {/* High-tech enso — color cycles gold → cyan → blue → magenta → gold */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: phase === "intro" ? 0 : phase === "exit" ? 0 : 1,
          transform: `scale(${phase === "intro" ? 0.7 : 1.05}) rotate(${phase === "exit" ? -30 : 0}deg)`,
          transition: "transform 1.8s cubic-bezier(.2,.7,.2,1), opacity 1.2s ease"
        }}
      >
        <div
          className="welcome-enso"
          style={{
            width: "min(56vmin, 460px)",
            height: "min(56vmin, 460px)",
            WebkitMaskImage: "url(assets/enso.png)",
            maskImage: "url(assets/enso.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            animation: "welcomeEnsoHueCycle 3.6s cubic-bezier(.4,0,.2,1) 1 both, ensoSpin 16s linear infinite"
          }}
        />
        {/* glow halo behind the enso, also color-cycling */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-12%",
            borderRadius: "999px",
            filter: "blur(36px)",
            opacity: 0.55,
            animation: "welcomeEnsoGlowCycle 3.6s cubic-bezier(.4,0,.2,1) 1 both",
            pointerEvents: "none",
            zIndex: -1
          }}
        />
      </div>

      <style>{`
        @keyframes welcomeEnsoHueCycle {
          0%   { background-color: #6B5630; filter: brightness(0.75); }
          25%  { background-color: #A67C00; filter: brightness(1.0); }
          50%  { background-color: #D4A52E; filter: brightness(1.15) drop-shadow(0 0 22px rgba(212,165,46,0.55)); }
          75%  { background-color: #C9920A; filter: brightness(1.1) drop-shadow(0 0 18px rgba(201,146,10,0.5)); }
          100% { background-color: #A67C00; filter: brightness(0.95) drop-shadow(0 0 12px rgba(166,124,0,0.45)); }
        }
        @keyframes welcomeEnsoGlowCycle {
          0%   { background: radial-gradient(ellipse at center, rgba(107,86,48,0.35) 0%, transparent 60%); }
          25%  { background: radial-gradient(ellipse at center, rgba(166,124,0,0.55) 0%, transparent 65%); }
          50%  { background: radial-gradient(ellipse at center, rgba(212,165,46,0.7) 0%, transparent 65%); }
          75%  { background: radial-gradient(ellipse at center, rgba(244,244,242,0.5) 0%, transparent 60%); }
          100% { background: radial-gradient(ellipse at center, rgba(166,124,0,0.55) 0%, transparent 65%); }
        }
      `}</style>

      {/* 3D logo */}
      <div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transform:
            phase === "intro"
              ? "rotateX(40deg) rotateY(-25deg) translateZ(-60px) scale(0.78)"
              : phase === "bloom"
              ? "rotateX(0deg) rotateY(0deg) translateZ(60px) scale(1)"
              : "rotateX(-10deg) rotateY(0deg) translateZ(0px) scale(1.15)",
          transition:
            "transform 1.6s cubic-bezier(.2,.7,.2,1), filter 1.4s ease",
          filter:
            phase === "intro"
              ? "drop-shadow(0 8px 24px rgba(166,124,0,0.55)) blur(2px)"
              : phase === "bloom"
              ? "drop-shadow(0 30px 60px rgba(166,124,0,0.45)) blur(0)"
              : "drop-shadow(0 12px 30px rgba(166,124,0,0.25)) blur(0)",
          opacity: phase === "intro" ? 0.35 : 1
        }}
      >
        <img
          src="assets/logo-satori-agency-cream-transparent.webp"
          alt="SATORI"
          style={{
            width: "min(72vmin, 560px)",
            height: "auto",
            display: "block"
          }}
        />
        {/* gold halo behind logo (CSS radial gradient instead of overlay PNG) */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-20%",
            background: `radial-gradient(ellipse at center, ${SATORI.GOLD}66 0%, transparent 55%)`,
            filter: "blur(28px)",
            opacity: phase === "bloom" ? 1 : 0.3,
            transition: "opacity 1.4s ease",
            pointerEvents: "none",
            zIndex: -1
          }}
        />
      </div>

      {/* tagline */}
      <div
        style={{
          position: "absolute",
          bottom: "12%",
          textAlign: "center",
          color: SATORI.CREAM,
          opacity: phase === "bloom" ? 0.75 : 0,
          transform: `translateY(${phase === "bloom" ? 0 : 12}px)`,
          transition: "opacity .9s ease, transform .9s ease",
          letterSpacing: "0.5em",
          fontFamily: TYPE.mono,
          fontSize: "0.7rem",
          textTransform: "uppercase"
        }}
      >
        ESTRATEGIA · MARCA · CRECIMIENTO
      </div>

      {/* skip */}
      <button
        onClick={() => { setPhase("exit"); setTimeout(() => setHidden(true), 700); }}
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          padding: "0.55rem 1rem",
          background: "transparent",
          color: SATORI.CREAM,
          opacity: 0.5,
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "999px",
          fontFamily: TYPE.mono,
          fontSize: "0.62rem",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          cursor: "pointer"
        }}
      >
        Saltar
      </button>
    </div>
  );
}

// ---------- HORIZONTAL TIMELINE / RUTA ----------
// items: [{ key, num, label, desc }]
function HorizontalTimeline({ items, accent = SATORI.GOLD }) {
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!rootRef.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setVisible(true); });
    }, { threshold: 0.3 });
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="htimeline" style={{ position: "relative", width: "100%" }}>
      {/* the rail */}
      <div
        style={{
          position: "relative",
          height: "220px",
          marginTop: "2rem"
        }}
        className="htimeline-rail-wrap"
      >
        {/* base line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: "1px",
            background: `${SATORI.INK}15`
          }}
        />
        {/* animated line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            height: "2px",
            background: `linear-gradient(90deg, ${accent} 0%, ${accent}55 100%)`,
            width: visible ? "100%" : "0%",
            transition: "width 1.6s cubic-bezier(.2,.7,.2,1)"
          }}
        />

        {/* nodes */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
            alignItems: "center"
          }}
        >
          {items.map((it, i) => {
            const isActive = active === i;
            const delay = i * 180;
            return (
              <div
                key={it.key || i}
                style={{
                  position: "relative",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
              >
                {/* node circle */}
                <div
                  style={{
                    width: isActive ? "22px" : "14px",
                    height: isActive ? "22px" : "14px",
                    borderRadius: "999px",
                    background: isActive ? accent : SATORI.WHITE,
                    border: `2px solid ${accent}`,
                    boxShadow: isActive ? `0 0 0 8px ${accent}22` : "none",
                    transition: "all .35s cubic-bezier(.2,.9,.3,1.4)",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 2
                  }}
                />
                {/* label above (number only) */}
                <div
                  className="htl-above"
                  style={{
                    position: "absolute",
                    bottom: "calc(50% + 38px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "min(220px, 90%)",
                    textAlign: "center",
                    pointerEvents: "none"
                  }}
                >
                  <div
                    style={{
                      fontFamily: TYPE.mono,
                      fontSize: "0.72rem",
                      letterSpacing: "0.3em",
                      color: accent,
                      marginBottom: "0.4rem"
                    }}
                  >
                    {it.num}
                  </div>
                </div>
                {/* desc below */}
                <div
                  className="htl-below"
                  style={{
                    position: "absolute",
                    top: "calc(50% + 38px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "min(220px, 90%)",
                    textAlign: "center",
                    opacity: isActive ? 1 : 0.55,
                    transition: "opacity .35s ease",
                    pointerEvents: "none"
                  }}
                >
                  <p
                    style={{
                      ...bodyStyle,
                      fontSize: "0.85rem",
                      margin: 0,
                      lineHeight: 1.45
                    }}
                  >
                    {it.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ---------- RESEÑAS (lista + formulario; backend n8n + Telegram) ----------
// GET aprobadas / POST nueva (queda pendiente hasta aprobar por Telegram).
const N8N_REVIEWS_LIST = "https://n8n.satorimkt.com/webhook/satori-reviews";
const N8N_REVIEWS_NEW = "https://n8n.satorimkt.com/webhook/satori-reviews-new";

// Redimensiona la foto elegida a un cuadrado pequeño -> data URL JPEG ligero.
// IMPORTANTE: se carga vía FileReader -> data: URL (NO createObjectURL/blob:,
// que la CSP img-src no permite y haría fallar la lectura -> foto vacía).
function fileToAvatarDataUrl(file, size = 256) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const s = Math.min(img.width, img.height);
        const sx = (img.width - s) / 2, sy = (img.height - s) / 2;
        const c = document.createElement("canvas");
        c.width = c.height = size;
        c.getContext("2d").drawImage(img, sx, sy, s, s, 0, 0, size, size);
        resolve(c.toDataURL("image/jpeg", 0.82));
      };
      img.onerror = () => reject(new Error("img"));
      img.src = reader.result; // data: URL — permitido por la CSP
    };
    reader.onerror = () => reject(new Error("read"));
    reader.readAsDataURL(file);
  });
}

function ReviewCard({ rv, en }) {
  const rating = Math.max(1, Math.min(5, rv.rating || 5));
  const initial = (rv.name || "?").trim().slice(0, 1).toUpperCase();
  const text = en && rv.text_en ? rv.text_en : rv.text;
  return (
    <figure style={{
      background: SATORI.INK, border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: "18px", padding: "1.8rem", margin: 0,
      display: "flex", flexDirection: "column", boxShadow: "0 12px 34px rgba(14,14,14,0.18)"
    }}>
      <div aria-label={`${rating} de 5`} style={{ color: SATORI.GOLD, fontSize: "1.1rem", letterSpacing: "2px" }}>
        {"★".repeat(rating)}<span style={{ color: "rgba(255,255,255,0.22)" }}>{"★".repeat(5 - rating)}</span>
      </div>
      <blockquote style={{
        ...bodyStyle, color: SATORI.CREAM, opacity: 0.94, fontStyle: "italic", flex: 1,
        margin: "0.85rem 0 1.25rem", fontSize: "1rem"
      }}>“{text}”</blockquote>
      <figcaption style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginTop: "auto" }}>
        {rv.photo
          ? <img src={rv.photo} alt={rv.name} width="48" height="48" loading="lazy"
              style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", flex: "none" }} />
          : <span aria-hidden="true" style={{
              width: 48, height: 48, borderRadius: "50%", flex: "none",
              background: SATORI.GOLD, color: SATORI.INK, display: "flex",
              alignItems: "center", justifyContent: "center", fontWeight: 600, fontFamily: TYPE.display
            }}>{initial}</span>}
        <span style={{ fontWeight: 600, color: SATORI.WHITE, fontFamily: TYPE.body }}>{rv.name}</span>
      </figcaption>
    </figure>
  );
}

function ReviewsSection() {
  const [lang] = useLang();
  const en = lang === "en";
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [company, setCompany] = useState(""); // honeypot anti-bots
  const [photoData, setPhotoData] = useState("");

  useEffect(() => {
    let alive = true;
    fetch(N8N_REVIEWS_LIST)
      .then((r) => r.json())
      .then((d) => { if (alive && d && Array.isArray(d.reviews)) setReviews(d.reviews); })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const T = en ? {
    eyebrow: "Reviews", title: "What our clients say",
    sub: "Real words from teams we've worked with.",
    empty: "No reviews yet — be the first to leave one.",
    cta: "Leave a review", formTitle: "Leave your review",
    note: "Published after a quick review by the team.",
    name: "Your name", rating: "Rating", review: "Your review",
    photo: "Profile photo (optional)", submit: "Submit review", sending: "Sending…",
    thanks: "Thank you! Your review will appear after a quick check.",
    err: "Couldn't send. Please try again.", needed: "Please add your name and review."
  } : {
    eyebrow: "Reseñas", title: "Lo que dicen nuestros clientes",
    sub: "Palabras reales de equipos con los que hemos trabajado.",
    empty: "Aún no hay reseñas — sé el primero en dejar una.",
    cta: "Dejar una reseña", formTitle: "Deja tu reseña",
    note: "Se publica tras una breve revisión del equipo.",
    name: "Tu nombre", rating: "Calificación", review: "Tu reseña",
    photo: "Foto de perfil (opcional)", submit: "Enviar reseña", sending: "Enviando…",
    thanks: "¡Gracias! Tu reseña aparecerá tras una breve revisión.",
    err: "No se pudo enviar. Intenta de nuevo.", needed: "Completa tu nombre y reseña."
  };

  const onPhoto = async (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) { setPhotoData(""); return; }
    try { setPhotoData(await fileToAvatarDataUrl(f)); } catch (err) { setPhotoData(""); }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) { setStatus(T.needed); return; }
    setSending(true); setStatus(T.sending);
    try {
      const res = await fetch(N8N_REVIEWS_NEW, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), rating, text: text.trim(), photo: photoData, company })
      });
      if (!res.ok) throw new Error("bad");
      setDone(true); setStatus(T.thanks);
    } catch (err) { setStatus(T.err); }
    finally { setSending(false); }
  };

  const inputStyle = {
    width: "100%", padding: "0.85rem 1rem", background: SATORI.WHITE,
    border: "1px solid rgba(14,14,14,0.16)", borderRadius: "12px",
    color: SATORI.INK, fontFamily: TYPE.body, fontSize: "0.96rem", outline: "none"
  };
  const fieldLabel = { ...eyebrowStyle, marginBottom: "0.5rem", display: "block", opacity: 0.6 };

  return (
    <section id="resenas" data-reveal style={{
      padding: "7rem clamp(1.25rem,4vw,2.5rem)", background: SATORI.CREAM_2,
      position: "relative", zIndex: 1
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ ...eyebrowStyle, justifyContent: "center" }}>{T.eyebrow}</div>
          <h2 style={h2Style}>{T.title}</h2>
          <p style={{ ...bodyStyle, maxWidth: "560px", margin: "1rem auto 0" }}>{T.sub}</p>
        </div>

        {reviews.length > 0 ? (
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
            gap: "1.4rem"
          }}>
            {reviews.map((rv, i) => <ReviewCard key={i} rv={rv} en={en} />)}
          </div>
        ) : (
          <p style={{ ...bodyStyle, textAlign: "center", opacity: 0.6 }}>{T.empty}</p>
        )}

        {/* CTA / formulario */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          {!open && !done && (
            <button type="button" onClick={() => setOpen(true)} style={{ ...btnGold, border: "none" }}>
              ★ {T.cta}
            </button>
          )}
        </div>

        {done && (
          <p style={{
            ...bodyStyle, textAlign: "center", marginTop: "1.5rem",
            color: SATORI.GOLD_DEEP, fontWeight: 500
          }}>{T.thanks}</p>
        )}

        {open && !done && (
          <div style={{
            maxWidth: "620px", margin: "2rem auto 0", background: SATORI.WHITE,
            border: "1px solid rgba(14,14,14,0.08)", borderRadius: "20px",
            padding: "2rem", boxShadow: "0 16px 40px rgba(14,14,14,0.07)"
          }}>
            <h3 style={{ fontFamily: TYPE.display, fontSize: "1.3rem", fontWeight: 500, color: SATORI.INK, margin: "0 0 0.25rem" }}>{T.formTitle}</h3>
            <p style={{ ...bodyStyle, fontSize: "0.9rem", margin: "0 0 1.4rem" }}>{T.note}</p>
            <form onSubmit={submit} style={{ display: "grid", gap: "1.1rem" }}>
              <div>
                <label htmlFor="rv-name" style={fieldLabel}>{T.name}</label>
                <input id="rv-name" type="text" maxLength={60} value={name}
                  onChange={(e) => setName(e.target.value)} style={inputStyle} required />
              </div>
              <div>
                <span style={fieldLabel}>{T.rating}</span>
                <div role="group" aria-label={T.rating} style={{ display: "flex", gap: "0.2rem", fontSize: "1.9rem", lineHeight: 1 }}>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <button key={v} type="button" aria-label={`${v}`}
                      onClick={() => setRating(v)}
                      onMouseEnter={() => setHover(v)} onMouseLeave={() => setHover(0)}
                      style={{
                        background: "none", border: 0, cursor: "pointer", padding: "0 2px", lineHeight: 1,
                        color: (hover || rating) >= v ? SATORI.GOLD : "rgba(14,14,14,0.2)"
                      }}>★</button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="rv-text" style={fieldLabel}>{T.review}</label>
                <textarea id="rv-text" rows={4} maxLength={800} value={text}
                  onChange={(e) => setText(e.target.value)} style={{ ...inputStyle, resize: "vertical" }} required />
              </div>
              <div>
                <label htmlFor="rv-photo" style={fieldLabel}>{T.photo}</label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <input id="rv-photo" type="file" accept="image/*" onChange={onPhoto}
                    style={{ fontFamily: TYPE.body, fontSize: "0.88rem", color: SATORI.INK }} />
                  {photoData && (
                    <img src={photoData} alt="preview" width="46" height="46"
                      style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover", flex: "none" }} />
                  )}
                </div>
              </div>
              {/* honeypot oculto */}
              <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              <button type="submit" disabled={sending} style={{ ...btnPrimary, border: "none", opacity: sending ? 0.6 : 1 }}>
                {sending ? T.sending : T.submit}
              </button>
              {status && (
                <p style={{ ...bodyStyle, fontSize: "0.9rem", margin: 0, fontWeight: 500, color: status === T.err || status === T.needed ? "#B23B3B" : SATORI.GOLD_DEEP }}>{status}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- SECTION RAIL (scrollspy lateral izquierdo, por página) ----------
// sections = [{ id, label: { es, en } }]. Resalta la sección visible al hacer scroll.
// Barra fija ABAJO (centrada): muestra TODAS las secciones por nombre (sin
// bullets); la activa se resalta como pill dorado. Scroll horizontal si no caben.
function SectionRail({ sections = [] }) {
  const [lang] = useLang();
  const [active, setActive] = useState(sections[0] ? sections[0].id : "");
  const navRef = React.useRef(null);
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);
  // mantener el item activo a la vista en la barra (cuando hace scroll horizontal)
  useEffect(() => {
    const nav = navRef.current; if (!nav) return;
    const on = nav.querySelector('[aria-current="true"]');
    if (on && on.scrollIntoView) on.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);
  return (
    <nav
      ref={navRef}
      className="section-rail"
      aria-label="Secciones de la página"
      style={{
        position: "fixed",
        bottom: "1rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 70,
        maxWidth: "min(94vw, 720px)",
        display: "flex",
        alignItems: "center",
        gap: "0.15rem",
        padding: "0.4rem 0.5rem",
        background: `${SATORI.CREAM}f2`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${SATORI.INK}14`,
        borderRadius: "999px",
        boxShadow: "0 10px 30px rgba(14,14,14,0.16)",
        overflowX: "auto"
      }}
    >
      {sections.map((s) => {
        const on = s.id === active;
        const lbl = (s.label && (s.label[lang] || s.label.es)) || s.id;
        return (
          <a
            key={s.id}
            href={"#" + s.id}
            aria-current={on ? "true" : undefined}
            className="rail-item"
            style={{
              flex: "none",
              textDecoration: "none",
              fontFamily: TYPE.mono,
              fontSize: "0.6rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              padding: "0.4rem 0.7rem",
              borderRadius: "999px",
              color: on ? SATORI.CREAM : `${SATORI.INK}88`,
              background: on ? SATORI.GOLD : "transparent",
              transition: "color .3s ease, background .3s ease"
            }}
          >
            {lbl}
          </a>
        );
      })}
    </nav>
  );
}

// ---------- SHOWCASE VIDEO (muestra el poster/portada `delay` ms y luego reproduce) ----------
// Sin autoplay: se queda en la portada hasta que el video entra en pantalla; ahí
// espera `delay` ms (1s) y arranca. Muted/loop/playsInline para reproducir sin gesto.
function ShowcaseVideo({ src, poster, label, style, delay = 1000 }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    let timer = null;
    const start = () => { if (v.play) { const p = v.play(); if (p && p.catch) p.catch(() => {}); } };
    if (typeof IntersectionObserver === "undefined") {
      timer = setTimeout(start, delay);
      return () => { if (timer) clearTimeout(timer); };
    }
    const io = new IntersectionObserver((entries) => {
      if (entries[0] && entries[0].isIntersecting && timer === null) {
        timer = setTimeout(start, delay); // portada visible -> espera 1s -> reproduce
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(v);
    return () => { io.disconnect(); if (timer) clearTimeout(timer); };
  }, [delay]);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      style={style}
    />
  );
}

// Timeline vertical con la MISMA animación que los Milestones de Fundador:
// spine + progreso dorado guiado por scroll; el paso activo (centro del viewport)
// se ilumina y los demás quedan atenuados. Reusa las clases timeline-* (responsive).
function GrowthPathTimeline({ items }) {
  const rootRef = React.useRef(null);
  const [progress, setProgress] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(-1);
  const [activeIdx, setActiveIdx] = useState(0);
  const rowRefs = React.useRef([]);

  useEffect(() => {
    const onScroll = () => {
      const el = rootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const start = viewportH * 0.7;
      const end = -rect.height + viewportH * 0.3;
      const total = start - end;
      const passed = start - rect.top;
      setProgress(Math.max(0, Math.min(1, passed / total)));
      const focusY = viewportH * 0.45;
      let bestIdx = 0, bestDist = Infinity;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const r = row.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - focusY);
        if (dist < bestDist) { bestDist = dist; bestIdx = i; }
      });
      setActiveIdx(bestIdx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div ref={rootRef} className="growth-timeline" style={{ position: "relative", maxWidth: "760px", margin: "0 auto" }}>
      <div className="timeline-spine" style={{ position: "absolute", left: "110px", top: 0, bottom: 0, width: "1px", background: `${SATORI.INK}15` }} />
      <div className="timeline-spine" aria-hidden="true" style={{ position: "absolute", left: "109px", top: 0, height: `${progress * 100}%`, width: "3px", background: `linear-gradient(180deg, ${SATORI.GOLD} 0%, #C9920A 100%)`, boxShadow: `0 0 14px ${SATORI.GOLD}88`, transition: "height .15s linear", borderRadius: "2px" }} />
      {items.map((it, i) => {
        const isHover = hoverIdx === i;
        const isActive = activeIdx === i;
        return (
          <div
            key={it.key}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="timeline-row"
            data-reveal
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(-1)}
            style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "2.5rem", paddingBottom: "2.5rem", position: "relative" }}
          >
            <div
              className="timeline-year-col"
              style={{
                fontFamily: TYPE.display,
                fontSize: "1.55rem",
                fontWeight: 500,
                color: isActive ? SATORI.GOLD : `${SATORI.INK}55`,
                textAlign: "right",
                paddingTop: "0.1rem",
                letterSpacing: "-0.01em",
                transition: "color .35s ease, transform .35s cubic-bezier(.2,.9,.3,1.4)",
                transform: isHover ? "translateX(-4px)" : "translateX(0)"
              }}
            >
              {it.num}
            </div>
            <div
              className="timeline-content"
              style={{
                position: "relative",
                padding: "0.5rem 1rem 0.5rem 2rem",
                borderRadius: "14px",
                background: isActive ? `${SATORI.GOLD}10` : (isHover ? `${SATORI.GOLD}06` : "transparent"),
                transition: "background .35s ease, transform .35s cubic-bezier(.2,.9,.3,1.4)",
                transform: isHover ? "translateX(4px)" : "translateX(0)"
              }}
            >
              <div
                className="timeline-dot"
                style={{
                  position: "absolute",
                  left: "-7px",
                  top: "0.9rem",
                  width: isActive || isHover ? "18px" : "14px",
                  height: isActive || isHover ? "18px" : "14px",
                  borderRadius: "999px",
                  background: isActive ? SATORI.GOLD : SATORI.WHITE,
                  border: `2px solid ${isActive ? SATORI.GOLD : SATORI.INK}`,
                  boxShadow: isActive
                    ? `0 0 0 14px ${SATORI.GOLD}30, 0 0 28px ${SATORI.GOLD}60`
                    : (isHover ? `0 0 0 6px ${SATORI.INK}15` : "none"),
                  transition: "all .35s cubic-bezier(.2,.9,.3,1.4)",
                  zIndex: 2
                }}
              />
              <h3
                style={{
                  fontFamily: TYPE.display,
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.15,
                  margin: 0,
                  fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)",
                  color: isActive ? SATORI.INK : `${SATORI.INK}55`,
                  filter: isActive ? "none" : "saturate(0.6)",
                  transition: "color .35s ease, filter .35s ease"
                }}
              >
                {it.label}
              </h3>
              <p
                style={{
                  fontFamily: TYPE.body,
                  margin: "0.35rem 0 0",
                  fontSize: "1.02rem",
                  lineHeight: 1.5,
                  color: isActive ? `${SATORI.INK}aa` : `${SATORI.INK}55`,
                  transition: "color .35s ease"
                }}
              >
                {it.desc}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// expose
Object.assign(window, {
  SATORI, TYPE, waInterest, useLang,
  eyebrowStyle, h2Style, bodyStyle,
  btnPrimary, btnGhost, btnGold,
  SatoriMark, Enso, MatrixBackground, ImagePlaceholder,
  Nav, Footer, SocialRow, SocialIcon,
  FloatingWhatsApp, CtaBlock, PageHero, CalendlyInline,
  WelcomeAnimation, HorizontalTimeline, MobileMenuFab,
  ReviewsSection, SectionRail, ShowcaseVideo,
  GrowthPathTimeline
});
