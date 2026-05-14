/* SATORI — Home (index.html) */

const { useState, useEffect } = React;

// ---------- HERO BANNER ----------
function HomeHero() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "Strategy · Brand · Growth",
    h1a: "More strategy.",
    h1b: "Less noise.",
    p: "Identity, positioning and AI solutions for entrepreneurs who value their time. One direction, no noise.",
    cta1: "Book Zoom",
    cta2: "See services"
  } : {
    eyebrow: "Estrategia · Marca · Crecimiento",
    h1a: "Más estrategia.",
    h1b: "Menos ruido.",
    p: "Identidad, posicionamiento y soluciones con IA para empresarios que valoran su tiempo. Una sola dirección, sin ruido.",
    cta1: "Agendar Zoom",
    cta2: "Ver servicios"
  };
  return (
    <section
      id="inicio"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "10rem clamp(1.25rem,4vw,2.5rem) 6rem",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${SATORI.WHITE} 0%, ${SATORI.CREAM} 60%, ${SATORI.CREAM_2} 100%)`,
        borderBottom: `1px solid ${SATORI.INK}08`
      }}
    >
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "4rem",
          alignItems: "center"
        }}
      >
        <div className="grid-2-col fade-up" style={{ display: "contents" }}>
          <div>
            <p style={eyebrowStyle} className="fade-up">
              <span className="satori-rule" style={{ width: "18px" }} />
              {c.eyebrow}
            </p>
            <h1
              style={{
                fontFamily: TYPE.display,
                fontWeight: 500,
                fontSize: "clamp(2.8rem, 9vw, 6.6rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.04em",
                color: SATORI.INK,
                margin: 0
              }}
              className="fade-up-d1"
            >
              <span style={{ color: SATORI.GOLD }}>{c.h1a}</span>
              <br />
              <span
                style={{
                  fontWeight: 400,
                  color: "#8c8c8c",
                  fontSize: "clamp(1.7rem, 6vw, 4.2rem)"
                }}
              >
                {c.h1b}
              </span>
            </h1>
            <p
              style={{
                ...bodyStyle,
                fontSize: "1.15rem",
                maxWidth: "44ch",
                marginTop: "2rem"
              }}
              className="fade-up-d2"
            >
              {c.p}
            </p>
            <div
              style={{ display: "flex", gap: "0.85rem", marginTop: "2.5rem", flexWrap: "wrap" }}
              className="fade-up-d3"
            >
              <a href={SATORI.CALENDLY} target="_blank" rel="noopener" className="cta-btn-gold pulse-gold" style={btnGold}>
                <span>{c.cta1}</span>
                <span className="cta-arrow">→</span>
              </a>
              <a href="servicios.html" className="cta-btn-ghost" style={btnGhost}>
                <span>{c.cta2}</span>
              </a>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative"
            }}
            className="fade-up-d2 hero-enso-wrap"
          >
            {/* Soft warm halo behind the enso to give it presence without saturation */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "560px",
                height: "560px",
                borderRadius: "999px",
                background: `radial-gradient(ellipse at center, ${SATORI.GOLD}12 0%, transparent 65%)`,
                filter: "blur(20px)",
                pointerEvents: "none"
              }}
            />
            <Enso size={460} color="#3A322A" opacity={0.62} spinning={true} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- VIDEO SNEAK PEEK (CSS-animated brand reel "hecho con IA") ----------
function SneakPeeks() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "Sneak peek",
    h1: "Behind the scenes",
    h2: "of SATORI.",
    p: "Cinematic brand reel — processes, routes and live updates."
  } : {
    eyebrow: "Sneak peek",
    h1: "Lo que pasa",
    h2: "dentro",
    h3: " de SATORI.",
    p: "Reel cinemático de marca — procesos, rutas y avances en vivo."
  };
  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${SATORI.CREAM_2} 0%, ${SATORI.CREAM} 100%)`,
        padding: "7rem clamp(1.25rem,4vw,2.5rem)",
        borderTop: `1px solid ${SATORI.INK}08`,
        position: "relative",
        zIndex: 1
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <p style={eyebrowStyle}>
          <span className="satori-rule" style={{ width: "18px" }} />
          {c.eyebrow}
        </p>
        <h2 style={h2Style} data-reveal>
          {lang === "en" ? (
            <React.Fragment>{c.h1} <span style={{ color: SATORI.GOLD }}>{c.h2}</span></React.Fragment>
          ) : (
            <React.Fragment>{c.h1} <span style={{ color: SATORI.GOLD }}>{c.h2}</span>{c.h3}</React.Fragment>
          )}
        </h2>
        <p style={{ ...bodyStyle, maxWidth: "52ch", margin: "1.25rem auto 3rem" }}>
          {c.p}
        </p>

        <div
          data-reveal
          className="brand-reel"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            aspectRatio: "16/9",
            borderRadius: "28px",
            overflow: "hidden",
            background: "#0A0A0A",
            boxShadow: "0 50px 100px -50px rgba(14,14,14,0.55)"
          }}
        >
          <BrandReel />
        </div>
      </div>
    </section>
  );
}

// SVG/CSS-animated brand reel — cycles through 5 scenes with cinematic transitions
function BrandReel() {
  const [scene, setScene] = useState(0);
  const total = 7;
  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % total), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* film grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
          opacity: 0.13,
          mixBlendMode: "overlay",
          pointerEvents: "none",
          zIndex: 4
        }}
      />

      {/* vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 3
        }}
      />

      {/* scenes */}
      <ReelScene active={scene === 0}>
        <ReelEnsoScene />
      </ReelScene>
      <ReelScene active={scene === 1}>
        <ReelWordsScene />
      </ReelScene>
      <ReelScene active={scene === 2}>
        <ReelLineScene />
      </ReelScene>
      <ReelScene active={scene === 3}>
        <ReelGridScene />
      </ReelScene>
      <ReelScene active={scene === 4}>
        <ReelStatsScene />
      </ReelScene>
      <ReelScene active={scene === 5}>
        <ReelTextureScene />
      </ReelScene>
      <ReelScene active={scene === 6}>
        <ReelLogoScene />
      </ReelScene>

      {/* progress dots */}
      <div
        style={{
          position: "absolute",
          bottom: "1.25rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.55rem",
          zIndex: 5
        }}
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === scene ? "22px" : "6px",
              height: "3px",
              borderRadius: "3px",
              background: i === scene ? SATORI.GOLD : "rgba(244,244,242,0.35)",
              transition: "all .5s cubic-bezier(.2,.9,.3,1.2)"
            }}
          />
        ))}
      </div>

      {/* corner label */}
      <div
        style={{
          position: "absolute",
          top: "1.1rem",
          left: "1.25rem",
          fontFamily: TYPE.mono,
          fontSize: "0.62rem",
          letterSpacing: "0.28em",
          color: SATORI.CREAM,
          opacity: 0.6,
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem"
        }}
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "999px",
            background: "#FF3B30",
            boxShadow: "0 0 0 4px rgba(255,59,48,0.18)",
            animation: "satoriBlink 1.6s ease-in-out infinite"
          }}
        />
        REEL · SATORI 2026
      </div>
      <div
        style={{
          position: "absolute",
          top: "1.1rem",
          right: "1.25rem",
          fontFamily: TYPE.mono,
          fontSize: "0.62rem",
          letterSpacing: "0.28em",
          color: SATORI.CREAM,
          opacity: 0.45,
          zIndex: 5
        }}
      >
        {String(scene + 1).padStart(2, "0")} / 0{total}
      </div>

      <style>{`
        @keyframes satoriBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0.3; } }
        @keyframes reelKenburns {
          0% { transform: scale(1) translate(0,0); }
          100% { transform: scale(1.08) translate(-1%, -1%); }
        }
        @keyframes reelFadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes reelDrift { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
        @keyframes reelDrawLine { from { stroke-dashoffset: 800; } to { stroke-dashoffset: 0; } }
        @keyframes reelPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
      `}</style>
    </div>
  );
}

function ReelScene({ active, children }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: active ? 1 : 0,
        transform: active ? "scale(1)" : "scale(1.02)",
        transition: "opacity 1.1s ease, transform 1.6s cubic-bezier(.2,.7,.2,1)",
        zIndex: active ? 2 : 1
      }}
    >
      {children}
    </div>
  );
}

function ReelEnsoScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 30% 40%, #2C2A26 0%, #0A0A0A 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "reelKenburns 5s ease-in-out both"
      }}
    >
      <Enso size={"min(58vmin, 460px)"} color={SATORI.GOLD} opacity={0.85} spinning={true} />
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "3rem",
          fontFamily: TYPE.display,
          fontSize: "clamp(1.6rem, 4vw, 3rem)",
          fontWeight: 500,
          color: SATORI.CREAM,
          letterSpacing: "-0.025em",
          animation: "reelFadeIn 1.4s ease .4s both"
        }}
      >
        Insight.
      </div>
    </div>
  );
}

function ReelWordsScene() {
  const words = ["Estrategia.", "Marca.", "Crecimiento.", "IA."];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #0A0A0A 0%, #1A1812 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "0 clamp(2rem, 6vw, 5rem)",
        gap: "0.5rem"
      }}
    >
      {words.map((w, i) => (
        <div
          key={w}
          style={{
            fontFamily: TYPE.display,
            fontWeight: 500,
            fontSize: "clamp(2rem, 6vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: i === 2 ? SATORI.GOLD : SATORI.CREAM,
            opacity: 0,
            transform: "translateX(-20px)",
            animation: `reelFadeIn .8s cubic-bezier(.2,.7,.2,1) ${0.2 + i * 0.35}s both`
          }}
        >
          {w}
        </div>
      ))}
    </div>
  );
}

function ReelLineScene() {
  const words = ["Identidad", "Presencia", "Visibilidad", "Automatización", "Ventas"];
  const positions = [100, 280, 400, 540, 720];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
      }}
    >
      <svg viewBox="0 0 800 260" style={{ width: "86%", maxWidth: 880 }}>
        <defs>
          <linearGradient id="reelLineGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A67C00" stopOpacity="0" />
            <stop offset="50%" stopColor="#C9920A" stopOpacity="1" />
            <stop offset="100%" stopColor="#A67C00" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M 20 130 Q 200 50, 400 130 T 780 130"
          stroke="url(#reelLineGrad)"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="800"
          style={{ animation: "reelDrawLine 2s ease-out both" }}
        />
        {positions.map((cx, i) => {
          const cy = 130 + (i % 2 === 0 ? -15 : 15);
          return (
            <g key={cx}>
              <circle
                cx={cx}
                cy={cy}
                r="6"
                fill={SATORI.GOLD}
                style={{
                  opacity: 0,
                  animation: `reelFadeIn .45s ease ${0.35 + i * 0.18}s both`
                }}
              />
              <text
                x={cx}
                y={i % 2 === 0 ? cy - 18 : cy + 28}
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="15"
                letterSpacing="3"
                fill={SATORI.CREAM}
                style={{
                  opacity: 0,
                  textTransform: "uppercase",
                  animation: `reelFadeIn .45s ease ${0.45 + i * 0.18}s both`
                }}
              >
                {words[i].toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>
      <div
        style={{
          position: "absolute",
          top: "12%",
          right: "clamp(2rem, 6vw, 5rem)",
          fontFamily: TYPE.mono,
          fontSize: "0.7rem",
          letterSpacing: "0.32em",
          color: SATORI.GOLD,
          opacity: 0,
          animation: "reelFadeIn 1s ease 1.4s both"
        }}
      >
        RUTA DE CRECIMIENTO
      </div>
    </div>
  );
}

function ReelGridScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#0A0A0A",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        gap: "4px",
        padding: "4px"
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => {
        const isAccent = i === 3 || i === 6 || i === 9;
        return (
          <div
            key={i}
            style={{
              background: isAccent ? SATORI.GOLD : `rgba(244,244,242,${0.04 + (i % 3) * 0.04})`,
              opacity: 0,
              animation: `reelFadeIn .5s ease ${0.05 * i}s both`,
              borderRadius: "3px"
            }}
          />
        );
      })}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "2rem",
          right: "2rem",
          textAlign: "center",
          fontFamily: TYPE.display,
          fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
          fontWeight: 500,
          color: SATORI.CREAM,
          letterSpacing: "-0.025em",
          opacity: 0,
          animation: "reelFadeIn 1s ease 1.4s both"
        }}
      >
        Sistemas que <span style={{ color: SATORI.GOLD }}>escalan.</span>
      </div>
    </div>
  );
}

function ReelStatsScene() {
  const stats = [
    { n: "+40", l: "PROYECTOS" },
    { n: "24/7", l: "AUTOMATIZACIÓN" },
    { n: "4", l: "CIUDADES" },
    { n: "30", l: "DÍAS" }
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at 70% 50%, #1A1812 0%, #0A0A0A 70%)",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: "0",
        padding: "clamp(1.5rem, 4vw, 3rem)"
      }}
    >
      {stats.map((s, i) => (
        <div
          key={s.l}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: i % 2 === 0 ? `1px solid ${SATORI.GOLD}25` : "none",
            borderBottom: i < 2 ? `1px solid ${SATORI.GOLD}25` : "none",
            opacity: 0,
            animation: `reelFadeIn .6s ease ${0.1 + i * 0.18}s both`
          }}
        >
          <div
            style={{
              fontFamily: TYPE.display,
              fontSize: "clamp(2.6rem, 6vw, 4.4rem)",
              fontWeight: 500,
              color: SATORI.GOLD,
              letterSpacing: "-0.04em",
              lineHeight: 1
            }}
          >
            {s.n}
          </div>
          <div
            style={{
              fontFamily: TYPE.mono,
              fontSize: "0.62rem",
              letterSpacing: "0.28em",
              color: SATORI.CREAM,
              opacity: 0.7,
              marginTop: "0.75rem"
            }}
          >
            {s.l}
          </div>
        </div>
      ))}
    </div>
  );
}

function ReelTextureScene() {
  const lines = Array.from({ length: 8 });
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #0A0A0A 0%, #1A1812 50%, #0A0A0A 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* horizontal flowing lines */}
      {lines.map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: `${10 + i * 11}%`,
            left: 0,
            right: 0,
            height: "1px",
            background: `linear-gradient(90deg, transparent 0%, ${SATORI.GOLD} 50%, transparent 100%)`,
            opacity: 0.18 + (i % 3) * 0.12,
            transform: "translateX(-100%)",
            animation: `reelDrift ${5 + (i % 3) * 1.5}s linear ${i * 0.18}s infinite`
          }}
        />
      ))}
      <div
        style={{
          position: "relative",
          fontFamily: TYPE.display,
          fontSize: "clamp(2rem, 5vw, 3.4rem)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          color: SATORI.CREAM,
          textAlign: "center",
          padding: "0 1.5rem",
          opacity: 0,
          animation: "reelFadeIn 1s ease .3s both"
        }}
      >
        Estrategia<span style={{ color: SATORI.GOLD }}>.</span> Marca<span style={{ color: SATORI.GOLD }}>.</span> IA<span style={{ color: SATORI.GOLD }}>.</span>
      </div>
    </div>
  );
}

function ReelLogoScene() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, #1A1812 0%, #0A0A0A 70%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.25rem"
      }}
    >
      <div
        style={{
          fontFamily: TYPE.display,
          fontSize: "clamp(3.5rem, 10vw, 6.5rem)",
          fontWeight: 500,
          color: SATORI.CREAM,
          letterSpacing: "-0.04em",
          opacity: 0,
          animation: "reelFadeIn 1s ease .2s both"
        }}
      >
        SATORI<span style={{ color: SATORI.GOLD }}>.</span>
      </div>
      <div
        style={{
          fontFamily: TYPE.mono,
          fontSize: "0.72rem",
          letterSpacing: "0.45em",
          color: SATORI.GOLD,
          opacity: 0,
          animation: "reelFadeIn 1s ease .8s both"
        }}
      >
        AGENDA TU ZOOM
      </div>
    </div>
  );
}

// ---------- RUTA DE CRECIMIENTO (horizontal animated) ----------
function RutaCrecimiento() {
  const [lang] = useLang();
  const stepsEs = [
    { key: "01", num: "01", label: "Identidad", desc: "Claridad y diferenciación." },
    { key: "02", num: "02", label: "Presencia", desc: "Consistencia y confianza." },
    { key: "03", num: "03", label: "Visibilidad", desc: "Mensaje y oferta de valor." },
    { key: "04", num: "04", label: "Automatización", desc: "Sistemas que generan prospectos." },
    { key: "05", num: "05", label: "Ventas", desc: "Clientes llegando con claridad." }
  ];
  const stepsEn = [
    { key: "01", num: "01", label: "Identity", desc: "Clarity and differentiation." },
    { key: "02", num: "02", label: "Presence", desc: "Consistency and trust." },
    { key: "03", num: "03", label: "Visibility", desc: "Message and value offer." },
    { key: "04", num: "04", label: "Automation", desc: "Systems that generate leads." },
    { key: "05", num: "05", label: "Sales", desc: "Clients arriving with clarity." }
  ];
  const c = lang === "en" ? {
    eyebrow: "SATORI Growth Path",
    h1: "Five steps.",
    h2: "One direction."
  } : {
    eyebrow: "Ruta de Crecimiento Satori",
    h1: "Cinco pasos.",
    h2: "Una dirección."
  };
  return (
    <section
      id="ruta"
      style={{
        padding: "6rem clamp(1.25rem,4vw,2.5rem) 7rem",
        position: "relative",
        zIndex: 1,
        background: SATORI.CREAM,
        borderTop: `1px solid ${SATORI.INK}08`
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <p style={eyebrowStyle}>
            <span className="satori-rule" style={{ width: "18px" }} />
            {c.eyebrow}
          </p>
          <h2 style={h2Style} data-reveal>
            {c.h1} <span style={{ color: SATORI.GOLD }}>{c.h2}</span>
          </h2>
        </div>

        <HorizontalTimeline items={lang === "en" ? stepsEn : stepsEs} />
      </div>
    </section>
  );
}

// ---------- MAPA NACIONAL (4 estados iluminados) ----------
function MapaPresencia() {
  const [lang] = useLang();
  const PUNTOS = [
    { id: "BCN", label: "Tijuana", cx: 119.2, cy: 58.9 },
    { id: "JAL", label: "Guadalajara", cx: 468, cy: 422.9 },
    { id: "MEX", label: lang === "en" ? "Mexico State" : "Edo. de México", cx: 580.7, cy: 453.9 },
    { id: "CMX", label: "CDMX", cx: 597.2, cy: 462 }
  ];
  const c = lang === "en" ? {
    eyebrow: "National footprint",
    h1: "SATORI clients.",
    h2: "And growing.",
    sub: "Remote operation from Mexico City. Today we work with entrepreneurs in 4 key cities."
  } : {
    eyebrow: "Presencia nacional",
    h1: "Clientes SATORI.",
    h2: "Y creciendo.",
    sub: "Operación remota desde CDMX. Hoy trabajamos con empresarios en 4 ciudades clave."
  };
  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${SATORI.CREAM} 0%, ${SATORI.CREAM_2} 100%)`,
        padding: "7rem clamp(1.25rem,4vw,2.5rem)",
        borderTop: `1px solid ${SATORI.INK}08`,
        position: "relative",
        zIndex: 1
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <p style={eyebrowStyle}>
          <span className="satori-rule" style={{ width: "18px" }} />
          {c.eyebrow}
        </p>
        <h2 style={h2Style} data-reveal>
          {c.h1} <span style={{ color: SATORI.GOLD }}>{c.h2}</span>
        </h2>
        <p style={{ ...bodyStyle, maxWidth: "48ch", margin: "1.25rem auto 3rem" }}>
          {c.sub}
        </p>

        <div
          data-reveal
          style={{
            position: "relative",
            maxWidth: "920px",
            margin: "0 auto"
          }}
        >
          {/* base map: dim/desaturated */}
          <img
            src="assets/mexico.svg"
            alt="México"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              opacity: 0.35,
              filter: "grayscale(1)"
            }}
          />

          {/* highlight overlay aligned to same 1000x630 viewBox */}
          <svg
            viewBox="0 0 1000 630"
            preserveAspectRatio="xMidYMid meet"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none"
            }}
          >
            <defs>
              <radialGradient id="cityGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A67C00" stopOpacity="0.7" />
                <stop offset="60%" stopColor="#A67C00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#A67C00" stopOpacity="0" />
              </radialGradient>
            </defs>
            {PUNTOS.map((p, i) => (
              <g key={p.id} style={{ animation: `cityPulse 2.6s ease-in-out ${i * 0.4}s infinite` }}>
                {/* halo */}
                <circle cx={p.cx} cy={p.cy} r="42" fill="url(#cityGlow)" />
                {/* dot */}
                <circle cx={p.cx} cy={p.cy} r="6" fill={SATORI.GOLD} />
                <circle cx={p.cx} cy={p.cy} r="11" fill="none" stroke={SATORI.GOLD} strokeWidth="1.2" opacity="0.7" />
                {/* label */}
                <text
                  x={p.cx + 18}
                  y={p.cy + 5}
                  fontFamily="'JetBrains Mono', monospace"
                  fontSize="14"
                  letterSpacing="2"
                  fill={SATORI.INK}
                  style={{ pointerEvents: "auto" }}
                >
                  {p.label.toUpperCase()}
                </text>
              </g>
            ))}
            <style>{`
              @keyframes cityPulse {
                0%, 100% { opacity: 0.85; }
                50% { opacity: 1; }
              }
            `}</style>
          </svg>
        </div>

        {/* chips */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem"
          }}
        >
          {PUNTOS.map((p) => (
            <span
              key={p.id}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "999px",
                background: SATORI.WHITE,
                border: `1px solid ${SATORI.GOLD}40`,
                color: SATORI.INK,
                fontFamily: TYPE.mono,
                fontSize: "0.66rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase"
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "6px",
                  height: "6px",
                  borderRadius: "999px",
                  background: SATORI.GOLD,
                  marginRight: "0.55rem",
                  verticalAlign: "middle"
                }}
              />
              {p.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- APP ----------
function App() {
  // reveal observer
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.setAttribute("data-revealed", "1");
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 200px 0px" }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: SATORI.CREAM }}>
      <MatrixBackground opacity={0.045} color={SATORI.GOLD} />
      <Nav current="home" />
      <HomeHero />
      <SneakPeeks />
      <RutaCrecimiento />
      <MapaPresencia />
      <CtaBlock
        titulo={{ es: "¿Listo para una ruta clara?", en: "Ready for a clear path?" }}
        sub={{
          es: "Agenda 30 minutos por Zoom. Salimos con un plan, no con una cotización vacía.",
          en: "Book 30 minutes on Zoom. You leave with a plan, not an empty quote."
        }}
      />
      <Footer social="satori" />
      <MobileMenuFab current={"home"} />
      <FloatingWhatsApp />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
