/* SATORI — Home (index.html) */

const { useState, useEffect, useRef } = React;

// ---------- VIDEO INTRO (primera sección: video controlado por scroll) ----------
function VideoIntro() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    video.muted = true;
    video.playsInline = true;
    video.pause();

    const apply = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      const sectionHeight = section.offsetHeight;
      const vh = window.innerHeight;
      const scrub = Math.max(1, sectionHeight - vh);
      const passed = Math.max(0, Math.min(scrub, window.scrollY - sectionTop));
      const progress = passed / scrub;
      const dur = video.duration;
      if (dur && isFinite(dur) && dur > 0) {
        const target = Math.max(0, Math.min(dur - 0.05, progress * dur));
        // Solo actualizamos si hay diferencia mensurable (evita jitter)
        if (Math.abs(video.currentTime - target) > 0.012) {
          try { video.currentTime = target; } catch (_) {}
        }
      }
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        apply();
      });
    };

    const onLoaded = () => apply();
    video.addEventListener("loadedmetadata", onLoaded);
    video.addEventListener("loadeddata", onLoaded);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    apply();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onLoaded);
      video.removeEventListener("loadeddata", onLoaded);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro-video"
      style={{
        position: "relative",
        zIndex: 1,
        height: "280vh",
        background: SATORI.INK
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: SATORI.INK
        }}
      >
        <video
          ref={videoRef}
          src="assets/intro.mp4"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            minHeight: "100%",
            width: "auto",
            height: "auto",
            maxWidth: "none",
            objectFit: "cover",
            pointerEvents: "none"
          }}
        />
      </div>
    </section>
  );
}

// ---------- BRAND MANIFESTO (intro · pantalla completa, sin animación) ----------
function BrandManifesto() {
  const [lang] = useLang();
  const ES = {
    label: "Nuestra misión",
    parts: [
      { text: "Que el ", gold: false },
      { text: "avance tecnológico", gold: true },
      { text: " del mundo, esté a ", gold: false },
      { text: "tu alcance", gold: true },
      { text: ".", gold: false }
    ]
  };
  const EN = {
    label: "Our mission",
    parts: [
      { text: "May the ", gold: false },
      { text: "technological progress", gold: true },
      { text: " of the world be within ", gold: false },
      { text: "your reach", gold: true },
      { text: ".", gold: false }
    ]
  };
  const c = lang === "en" ? EN : ES;

  return (
    <section
      id="manifesto"
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        padding: "5rem clamp(1.25rem,4vw,2.5rem)",
        background: SATORI.WHITE,
        textAlign: "center",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1280px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "2.5rem"
        }}
      >
        {/* logo SATORI — centrado, estático (reducido 5%) */}
        <div
          className="manifesto-logo"
          style={{
            lineHeight: 0,
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            maxWidth: "100%"
          }}
        >
          <div className="manifesto-logo-typewriter" style={{ maxWidth: "100%" }}>
            <SatoriMark height={107} variant="gold" />
            <span className="manifesto-logo-cursor" aria-hidden="true" />
          </div>
        </div>

        {/* slogan de misión */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "0.85rem", width: "100%", maxWidth: "100%" }}>
          <p
            style={{
              fontFamily: TYPE.display,
              fontWeight: 400,
              fontStyle: "italic",
              fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)",
              lineHeight: 1.5,
              letterSpacing: "-0.005em",
              color: SATORI.INK,
              opacity: 0.85,
              margin: "0 auto",
              maxWidth: "min(44ch, 100%)",
              textAlign: "center"
            }}
          >
            {c.parts.map((p, i) =>
              p.gold ? (
                <span key={i} style={{ color: SATORI.GOLD_DEEP, fontWeight: 500 }}>{p.text}</span>
              ) : (
                <React.Fragment key={i}>{p.text}</React.Fragment>
              )
            )}
          </p>
        </div>
      </div>

      <style>{`
        /* Logo manifesto: en móvil, prioriza ancho y nunca rebasa la viewport */
        @media (max-width: 900px) {
          .manifesto-logo img {
            height: auto !important;
            width: 100% !important;
            max-width: 78vw !important;
            display: block;
            margin: 0 auto;
          }
        }
        @media (max-width: 560px) {
          .manifesto-logo img { max-width: 82vw !important; }
        }
        @media (max-width: 380px) {
          .manifesto-logo img { max-width: 86vw !important; }
        }
        @media (max-width: 320px) {
          .manifesto-logo img { max-width: 88vw !important; }
        }

        /* ----- TYPEWRITER REVEAL del logo ----- */
        .manifesto-logo-typewriter {
          position: relative;
          display: inline-block;
          line-height: 0;
          clip-path: inset(0 100% 0 0);
          animation: manifestoTypewrite 2.4s cubic-bezier(.55,.06,.18,1) .35s forwards;
        }
        @keyframes manifestoTypewrite {
          0%   { clip-path: inset(0 100% 0 0); }
          12%  { clip-path: inset(0 92% 0 0); }
          26%  { clip-path: inset(0 80% 0 0); }
          42%  { clip-path: inset(0 60% 0 0); }
          60%  { clip-path: inset(0 38% 0 0); }
          78%  { clip-path: inset(0 18% 0 0); }
          100% { clip-path: inset(0 0 0 0); }
        }

        .manifesto-logo-cursor {
          position: absolute;
          top: 6%;
          bottom: 6%;
          left: 0;
          width: 4px;
          background: ${SATORI.GOLD};
          box-shadow: 0 0 18px ${SATORI.GOLD}AA;
          border-radius: 2px;
          opacity: 0;
          animation:
            manifestoCursorMove 2.4s cubic-bezier(.55,.06,.18,1) .35s forwards,
            manifestoCursorBlink .65s steps(1) 3s infinite;
        }
        @keyframes manifestoCursorMove {
          0%   { left: 0;     opacity: 0; }
          6%   { opacity: 1; }
          12%  { left: 8%; }
          26%  { left: 20%; }
          42%  { left: 40%; }
          60%  { left: 62%; }
          78%  { left: 82%; }
          98%  { left: 100%; opacity: 1; }
          100% { left: 100%; opacity: 1; }
        }
        @keyframes manifestoCursorBlink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .manifesto-logo-typewriter { animation: none !important; clip-path: none !important; }
          .manifesto-logo-cursor { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
    </section>
  );
}

// ---------- HERO BANNER ----------
function HomeHero() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    h1a: "More strategy.",
    h1b: "More clarity.",
    lead: "Technology for business owners who want to grow with clarity.",
    chips: [{ t: "Brand" }, { t: "Web" }, { t: "Marketing" }, { t: "Ads" }, { t: "Automation" }, { t: "AI", gold: true }],
    cta1: "Founder",
    cta2: "See services"
  } : {
    h1a: "Más estrategia.",
    h1b: "Más claridad.",
    lead: "Tecnología para empresarios que quieren crecer con claridad.",
    chips: [{ t: "Marca" }, { t: "Web" }, { t: "Marketing" }, { t: "Ads" }, { t: "Automatización" }, { t: "IA", gold: true }],
    cta1: "Fundador",
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
        className="container home-hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "4rem",
          alignItems: "center"
        }}
      >
        <div className="grid-2-col fade-up" style={{ display: "contents" }}>
          <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto" }}>
            <h1
              style={{
                fontFamily: TYPE.display,
                fontWeight: 400,
                fontSize: "clamp(2.8rem, 9vw, 6.6rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                margin: 0
              }}
              className="fade-up-d1"
            >
              <span style={{ color: SATORI.INK }}>{c.h1a}</span>
              <br />
              <span style={{ color: SATORI.GOLD, fontSize: "clamp(3.2rem, 11vw, 8rem)" }}>{c.h1b}</span>
            </h1>
            <p
              style={{
                ...bodyStyle,
                fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)",
                fontWeight: 400,
                opacity: 0.82,
                maxWidth: "640px",
                margin: "1.6rem auto 0"
              }}
              className="fade-up-d2"
            >
              {c.lead}
            </p>
            <div
              style={{ display: "flex", gap: "0.5rem", marginTop: "1.75rem", flexWrap: "wrap", justifyContent: "center" }}
              className="fade-up-d2"
            >
              {c.chips.map((chip) => (
                <span key={chip.t} style={{
                  fontFamily: TYPE.mono, fontSize: "0.66rem", letterSpacing: "0.18em",
                  textTransform: "uppercase", borderRadius: "999px", padding: "0.4rem 0.85rem",
                  ...(chip.gold
                    ? { color: SATORI.CREAM, background: SATORI.GOLD, border: `1px solid ${SATORI.GOLD}`, fontWeight: 600 }
                    : { color: SATORI.GOLD_DEEP, background: `${SATORI.GOLD}0a`, border: `1px solid ${SATORI.GOLD}33` })
                }}>{chip.t}</span>
              ))}
            </div>
            <div
              style={{ display: "flex", gap: "0.85rem", marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}
              className="fade-up-d3"
            >
              <a href="sobre-rodrigo.html" className="cta-btn-gold pulse-gold" style={btnGold}>
                <span>{c.cta1}</span>
                <span className="cta-arrow">→</span>
              </a>
              <a href="servicios.html" className="cta-btn-ghost" style={btnGhost}>
                <span>{c.cta2}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ---------- QUÉ HACEMOS (4 pilares de servicio — claridad arriba) ----------
function QueHacemos() {
  const [lang] = useLang();
  const en = lang === "en";
  const T = en ? {
    eyebrow: "What we do",
    title: "Six ways we ",
    titleAccent: "make you grow",
    sub: "Strategy first, then execution. Everything points to one thing: clients arriving with clarity.",
    cta: "See all services",
    items: [
      { t: "Brand & Design", d: "Identity that sets you apart and builds trust." },
      { t: "Web & Positioning", d: "Fast sites that rank and get recommended by AI." },
      { t: "Marketing & Ads", d: "Campaigns that bring qualified leads to your business." },
      { t: "AI Automation & Bots", d: "Bots and systems that attend, capture and follow up on their own." },
      { t: "MyCFO", d: "Your AI CFO: manage your business finances by chat." },
      { t: "Web Invitations", d: "Digital invitations for weddings and events, with RSVP." }
    ]
  } : {
    eyebrow: "Qué hacemos",
    title: "Seis formas de ",
    titleAccent: "hacerte crecer",
    sub: "Primero estrategia, luego ejecución. Todo apunta a lo mismo: clientes llegando con claridad.",
    cta: "Ver todos los servicios",
    items: [
      { t: "Marca & Diseño", d: "Identidad que te distingue y genera confianza." },
      { t: "Web & Posicionamiento", d: "Sitios rápidos, que rankean y que la IA recomienda." },
      { t: "Marketing & Ads", d: "Campañas que traen prospectos calificados a tu negocio." },
      { t: "Automatización & Bots con IA", d: "Bots y sistemas que atienden, captan y dan seguimiento solos." },
      { t: "MyCFO", d: "Tu CFO con IA: controla las finanzas de tu negocio por chat." },
      { t: "Invitaciones Web", d: "Invitaciones digitales para bodas y eventos, con RSVP." }
    ]
  };
  return (
    <section id="que-hacemos" data-reveal style={{
      padding: "7rem clamp(1.25rem,4vw,2.5rem)", background: SATORI.CREAM,
      position: "relative", zIndex: 1
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ ...eyebrowStyle, justifyContent: "center" }}>{T.eyebrow}</div>
          <h2 style={h2Style}>{T.title}<span style={{ color: SATORI.GOLD }}>{T.titleAccent}</span></h2>
          <p style={{ ...bodyStyle, maxWidth: "560px", margin: "1rem auto 0" }}>{T.sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.2rem" }}>
          {T.items.map((it, i) => (
            <div key={i} style={{
              background: SATORI.WHITE, border: "1px solid rgba(14,14,14,0.08)",
              borderRadius: "18px", padding: "1.8rem", boxShadow: "0 10px 30px rgba(14,14,14,0.04)"
            }}>
              <div style={{ fontFamily: TYPE.mono, fontSize: "0.8rem", color: SATORI.GOLD, marginBottom: "0.9rem" }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ fontFamily: TYPE.display, fontSize: "1.2rem", fontWeight: 500, color: SATORI.INK, margin: "0 0 0.5rem" }}>{it.t}</h3>
              <p style={{ ...bodyStyle, fontSize: "0.96rem", margin: 0 }}>{it.d}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="servicios.html" style={btnGhost}>{T.cta}</a>
        </div>
      </div>
    </section>
  );
}

// ---------- SHOWROOM (teaser -> página Productos) ----------
function ShowroomTeaser() {
  const [lang] = useLang();
  const en = lang === "en";
  const T = en ? {
    eyebrow: "Showroom",
    title: "See what we've ",
    titleAccent: "built",
    sub: "Our products like MyCFO, plus landing pages, sales bots, branding and more.",
    caption: "Live example: Esmeralda Lakes — landing & booking",
    cta: "Explore projects"
  } : {
    eyebrow: "Showroom",
    title: "Mira lo que hemos ",
    titleAccent: "construido",
    sub: "Nuestros productos como MyCFO, además de landing pages, bots de ventas, branding y más.",
    caption: "Ejemplo en vivo: Esmeralda Lakes — landing & reservas",
    cta: "Ver proyectos"
  };
  return (
    <section id="showroom" data-reveal style={{
      padding: "6rem clamp(1.25rem,4vw,2.5rem)", background: SATORI.INK,
      color: SATORI.CREAM, position: "relative", zIndex: 1, textAlign: "center"
    }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ ...eyebrowStyle, justifyContent: "center", color: SATORI.GOLD, opacity: 1 }}>{T.eyebrow}</div>
        <h2 style={{ ...h2Style, color: SATORI.CREAM }}>{T.title}<span style={{ color: SATORI.GOLD }}>{T.titleAccent}</span></h2>
        <p style={{ ...bodyStyle, color: SATORI.CREAM, opacity: 0.8, maxWidth: "560px", margin: "1rem auto 1.75rem" }}>{T.sub}</p>
        <ShowcaseVideo
          src="assets/showroom/landing-esmeralda-airbnb-green-16x9.mp4"
          poster="assets/showroom/landing-esmeralda-airbnb-green-poster.jpg"
          label={T.caption}
          style={{
            width: "100%",
            maxWidth: "760px",
            aspectRatio: "16 / 9",
            objectFit: "cover",
            borderRadius: "16px",
            display: "block",
            margin: "0 auto 0.9rem",
            boxShadow: "0 24px 60px rgba(14,14,14,0.45)"
          }}
        />
        <p style={{ fontFamily: TYPE.mono, fontSize: "0.66rem", letterSpacing: "0.14em", textTransform: "uppercase", color: SATORI.GOLD, opacity: 0.85, margin: "0 0 2rem" }}>{T.caption}</p>
        <a href="proyectos.html" style={btnGold}>{T.cta}</a>
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

// SVG/CSS-animated brand reel — cycles through scenes with cinematic transitions (sin enso)
function BrandReel() {
  const [scene, setScene] = useState(0);
  const total = 6;
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
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(14,14,14,0.55) 100%)",
          pointerEvents: "none",
          zIndex: 3
        }}
      />

      {/* scenes (sin enso) */}
      <ReelScene active={scene === 0}>
        <ReelWordsScene />
      </ReelScene>
      <ReelScene active={scene === 1}>
        <ReelLineScene />
      </ReelScene>
      <ReelScene active={scene === 2}>
        <ReelGridScene />
      </ReelScene>
      <ReelScene active={scene === 3}>
        <ReelStatsScene />
      </ReelScene>
      <ReelScene active={scene === 4}>
        <ReelTextureScene />
      </ReelScene>
      <ReelScene active={scene === 5}>
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
      id="metodologia"
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

// ---------- SATORI GLOBE (orthographic, interactivo + transparente) ----------
function SatoriGlobe() {
  const [lang] = useLang();
  const [d3Ready, setD3Ready] = useState(false);
  const [land, setLand] = useState(null);
  const [graticule, setGraticule] = useState(null);
  const [rotation, setRotation] = useState(40);
  const [tilt, setTilt] = useState(-20);
  const [dragging, setDragging] = useState(false);
  // momentum: vRot / vTilt in deg/ms; idleAt marks when we should resume auto-spin
  const dragState = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    lastT: 0,
    vRot: 0,
    vTilt: 0,
    idleAt: 0
  });
  const svgRef = useRef(null);

  // Carga d3 + topojson + el land map desde CDN
  useEffect(() => {
    let cancelled = false;
    const loadScript = (src) =>
      new Promise((res, rej) => {
        if (document.querySelector(`script[src="${src}"]`)) return res();
        const s = document.createElement("script");
        s.src = src;
        s.onload = res;
        s.onerror = rej;
        document.head.appendChild(s);
      });
    (async () => {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js");
        await loadScript("https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js");
        if (cancelled) return;
        const res = await fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json");
        const data = await res.json();
        if (cancelled) return;
        const landFeature = window.topojson.feature(data, data.objects.land);
        const gra = window.d3.geoGraticule10();
        setLand(landFeature);
        setGraticule(gra);
        setD3Ready(true);
      } catch (e) {
        console.warn("[SATORI globe] load failed, using fallback", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Rotación automática lenta + momentum tras swipe (pausa cuando se arrastra)
  useEffect(() => {
    if (!d3Ready) return;
    let raf;
    let last = performance.now();
    let visible = true;
    const AUTO_SPIN = 0.006; // deg/ms ≈ 6°/s
    const DECAY = 0.96; // multiplicador por frame (~16ms)
    const MIN_V = 0.0008; // umbral debajo del cual paramos el momentum
    // Pausa el globo cuando NO está en pantalla (ahorra CPU y batería en móvil)
    let io;
    if (svgRef.current && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([e]) => { visible = e.isIntersecting; if (visible) last = performance.now(); },
        { threshold: 0 }
      );
      io.observe(svgRef.current);
    }
    const tick = (t) => {
      const dt = t - last;
      last = t;
      if (visible) {
        const st = dragState.current;
        if (!st.active) {
          // ¿Aún hay momentum?
          if (Math.abs(st.vRot) > MIN_V || Math.abs(st.vTilt) > MIN_V) {
            setRotation((r) => (r + st.vRot * dt) % 360);
            setTilt((tt) => Math.max(-80, Math.min(80, tt + st.vTilt * dt)));
            // decaimiento normalizado por frame
            const k = Math.pow(DECAY, dt / 16.67);
            st.vRot *= k;
            st.vTilt *= k;
            st.idleAt = t;
          } else {
            st.vRot = 0;
            st.vTilt = 0;
            const idleFor = t - st.idleAt;
            if (idleFor > 1200) {
              setRotation((r) => (r + dt * AUTO_SPIN) % 360);
            }
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, [d3Ready]);

  // Drag handlers (se montan en un hit-target circular que cubre EXACTAMENTE el disco)
  const onPointerDown = (e) => {
    const target = e.currentTarget;
    try { target.setPointerCapture?.(e.pointerId); } catch (_) {}
    dragState.current = {
      active: true,
      lastX: e.clientX,
      lastY: e.clientY,
      lastT: performance.now(),
      vRot: 0,
      vTilt: 0,
      idleAt: performance.now()
    };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    const st = dragState.current;
    if (!st.active) return;
    const now = performance.now();
    const dx = e.clientX - st.lastX;
    const dy = e.clientY - st.lastY;
    const dt = Math.max(1, now - st.lastT);
    st.lastX = e.clientX;
    st.lastY = e.clientY;
    st.lastT = now;
    // dirección INVERTIDA (giro hacia donde apunta el dedo en sentido contrario)
    const ROT_GAIN = -0.45;
    const TILT_GAIN = -0.35;
    const dRot = dx * ROT_GAIN;
    const dTilt = dy * TILT_GAIN;
    // Velocidades instantáneas (deg/ms), suavizadas
    const blend = 0.25;
    st.vRot = st.vRot * (1 - blend) + (dRot / dt) * blend;
    st.vTilt = st.vTilt * (1 - blend) + (dTilt / dt) * blend;
    setRotation((r) => (r + dRot) % 360);
    setTilt((t) => Math.max(-80, Math.min(80, t + dTilt)));
  };
  const endDrag = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    dragState.current.idleAt = performance.now();
    setDragging(false);
    try { e.currentTarget?.releasePointerCapture?.(e.pointerId); } catch (_) {}
  };

  // Ciudades — coordenadas reales (lng, lat)
  const cities = [
    { name: "CDMX", lng: -99.1332, lat: 19.4326 },
    { name: "Guadalajara", lng: -103.3496, lat: 20.6597 },
    { name: "Tijuana", lng: -117.0382, lat: 32.5149 },
    { name: "Acapulco", lng: -99.8237, lat: 16.8531 },
    { name: lang === "en" ? "Mexico State" : "Edo. de México", lng: -99.7233, lat: 19.4969 },
    { name: lang === "en" ? "La Rioja · Spain" : "La Rioja · España", lng: -2.4449, lat: 42.4627 }
  ];

  const SIZE = 560;
  const CENTER = SIZE / 2;
  const RADIUS = SIZE * 0.4;

  let landPath = null;
  let graticulePath = null;
  let dots = [];

  if (d3Ready && window.d3 && land) {
    const proj = window.d3
      .geoOrthographic()
      .scale(RADIUS)
      .translate([CENTER, CENTER])
      .rotate([-rotation, tilt, 0])
      .clipAngle(90);
    const pathGen = window.d3.geoPath(proj);
    landPath = pathGen(land);
    graticulePath = graticule ? pathGen(graticule) : null;

    const center = proj.rotate();
    const lambda0 = (-center[0] * Math.PI) / 180;
    const phi0 = (-center[1] * Math.PI) / 180;
    cities.forEach((c) => {
      const phi = (c.lat * Math.PI) / 180;
      const lambda = (c.lng * Math.PI) / 180;
      const cosC = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * Math.cos(phi) * Math.cos(lambda - lambda0);
      if (cosC < 0) return;
      const projected = proj([c.lng, c.lat]);
      if (projected) {
        const edgeFade = Math.min(1, cosC * 3.2);
        dots.push({ x: projected[0], y: projected[1], name: c.name, opacity: edgeFade });
      }
    });
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: `${SIZE}px`,
        margin: "0 auto",
        aspectRatio: "1"
      }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
          userSelect: "none"
        }}
      >
        <defs>
          <radialGradient id="globeAtmosphere" cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor={SATORI.GOLD} stopOpacity="0" />
            <stop offset="94%" stopColor={SATORI.GOLD} stopOpacity="0.11" />
            <stop offset="100%" stopColor={SATORI.GOLD} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={SATORI.GOLD} stopOpacity="0.7" />
            <stop offset="55%" stopColor={SATORI.GOLD} stopOpacity="0.18" />
            <stop offset="100%" stopColor={SATORI.GOLD} stopOpacity="0" />
          </radialGradient>
          <clipPath id="globeClip">
            <circle cx={CENTER} cy={CENTER} r={RADIUS} />
          </clipPath>
        </defs>

        {/* Atmosphere ring (gold halo) */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 30} fill="url(#globeAtmosphere)" />

        {/* Globe disc — transparente, solo borde sutil */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="transparent"
          stroke={SATORI.INK}
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <g clipPath="url(#globeClip)">
          {/* Graticule — más sutil sobre fondo transparente */}
          {graticulePath && (
            <path d={graticulePath} fill="none" stroke={SATORI.INK} strokeOpacity="0.13" strokeWidth="0.7" />
          )}

          {/* Land — silueta sutil, transparenta el fondo */}
          {landPath && (
            <path
              d={landPath}
              fill={SATORI.INK}
              fillOpacity="0.32"
              stroke={SATORI.INK}
              strokeOpacity="0.42"
              strokeWidth="0.4"
            />
          )}
        </g>

        {/* City dots */}
        {dots.map((d, i) => (
          <g key={`${d.name}-${i}`} style={{ opacity: d.opacity }}>
            <circle cx={d.x} cy={d.y} r="22" fill="url(#dotGlow)">
              <animate attributeName="r" values="18;30;18" dur={`${3.2 + i * 0.3}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;1;0.7" dur={`${3.2 + i * 0.3}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={d.x} cy={d.y} r="9" fill="none" stroke={SATORI.GOLD} strokeWidth="1.6">
              <animate attributeName="r" values="5;16;5" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur={`${2.4 + i * 0.4}s`} repeatCount="indefinite" />
            </circle>
            <circle cx={d.x} cy={d.y} r="4" fill={SATORI.GOLD} />
          </g>
        ))}
      </svg>

      {/* Hit target circular: SOLO captura toques dentro del disco real del globo */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        style={{
          position: "absolute",
          // El disco ocupa RADIUS/CENTER del SIZE; con RADIUS=SIZE*0.4 y CENTER=SIZE/2,
          // el disco va del 10% al 90% del contenedor.
          top: "10%",
          left: "10%",
          width: "80%",
          height: "80%",
          borderRadius: "50%",
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "none",
          userSelect: "none",
          background: "transparent"
        }}
      />

      {/* Hint de interacción */}
      <div style={{
        position: "absolute",
        bottom: "-2rem",
        left: 0, right: 0,
        textAlign: "center",
        fontFamily: TYPE.mono,
        fontSize: "0.58rem",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: SATORI.INK,
        opacity: dragging ? 0.85 : 0.42,
        pointerEvents: "none",
        transition: "opacity .3s ease"
      }}>
        {dragging
          ? (lang === "en" ? "— rotating —" : "— rotando —")
          : (lang === "en" ? "drag to explore" : "arrastra para girar")}
      </div>

      {!d3Ready && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: TYPE.mono,
            fontSize: "0.62rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: SATORI.INK,
            opacity: 0.4
          }}
        >
          {lang === "en" ? "Loading globe…" : "Cargando globo…"}
        </div>
      )}
    </div>
  );
}

// ---------- MAPA SATORI (globo terráqueo + cinta dinámica) ----------
function MapaPresencia() {
  const [lang] = useLang();
  const CIUDADES = lang === "en"
    ? ["Mexico City", "Guadalajara", "Mexico State", "Tijuana", "Acapulco", "La Rioja · Spain", "Monterrey", "Querétaro", "Puebla"]
    : ["Ciudad de México", "Guadalajara", "Estado de México", "Tijuana", "Acapulco", "La Rioja · España", "Monterrey", "Querétaro", "Puebla"];

  const c = lang === "en" ? {
    h1a: "Satori Map",
    h1b: "Satori",
    sub: "Satori isn't a place — it's a philosophy. Remote operation. We work with entrepreneurs across Mexico and Spain."
  } : {
    h1a: "Mapa",
    h1b: "Satori",
    sub: "Satori no es un lugar — es una filosofía. Operación remota. Trabajamos con empresarios en México y España."
  };

  return (
    <section
      style={{
        background: `linear-gradient(180deg, ${SATORI.CREAM} 0%, ${SATORI.CREAM_2} 100%)`,
        padding: "7rem clamp(1.25rem,4vw,2.5rem) 5rem",
        borderTop: `1px solid ${SATORI.INK}08`,
        position: "relative",
        zIndex: 1,
        overflow: "hidden"
      }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <h2 style={{ ...h2Style, fontSize: "clamp(2.4rem, 5.5vw, 4.4rem)" }} data-reveal>
          {c.h1a} <span style={{ color: SATORI.GOLD }}>{c.h1b}.</span>
        </h2>
        <p style={{
          fontFamily: TYPE.body,
          fontSize: "0.95rem",
          lineHeight: 1.6,
          color: SATORI.INK,
          opacity: 0.6,
          fontWeight: 300,
          maxWidth: "46ch",
          margin: "1rem auto 3.5rem"
        }}>
          {c.sub}
        </p>

        <div data-reveal style={{ maxWidth: "640px", margin: "0 auto" }} className="globe-wrap">
          <SatoriGlobe />
        </div>
      </div>

      {/* CINTA DINÁMICA — marquee con ciudades */}
      <div
        style={{
          marginTop: "5rem",
          padding: "1.75rem 0",
          borderTop: `1px solid ${SATORI.INK}15`,
          borderBottom: `1px solid ${SATORI.INK}15`,
          overflow: "hidden",
          position: "relative",
          background: "transparent"
        }}
      >
        <div
          className="ciudades-marquee"
          style={{
            display: "flex",
            gap: "3rem",
            width: "max-content",
            animation: "ciudadesScroll 42s linear infinite",
            whiteSpace: "nowrap",
            alignItems: "center"
          }}
        >
          {[...CIUDADES, ...CIUDADES, ...CIUDADES].map((it, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "1.5rem",
                fontFamily: TYPE.display,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)",
                color: SATORI.INK,
                letterSpacing: "-0.02em"
              }}
            >
              {it}
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: SATORI.GOLD,
                  display: "inline-block",
                  flexShrink: 0
                }}
              />
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ciudadesScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        .ciudades-marquee:hover { animation-play-state: paused; }
        @media (max-width: 860px) {
          .globe-wrap { max-width: 320px !important; }
        }
        @media (max-width: 560px) {
          .globe-wrap { max-width: 240px !important; }
        }
        @media (max-width: 380px) {
          .globe-wrap { max-width: 200px !important; }
        }
        @media (max-width: 320px) {
          .globe-wrap { max-width: 170px !important; }
        }
      `}</style>
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
      <SectionRail sections={[
        { id: "inicio", label: { es: "Inicio", en: "Home" } },
        { id: "que-hacemos", label: { es: "Qué hacemos", en: "What we do" } },
        { id: "metodologia", label: { es: "Metodología", en: "Method" } },
        { id: "showroom", label: { es: "Showroom", en: "Showroom" } },
        { id: "resenas", label: { es: "Reseñas", en: "Reviews" } }
      ]} />
      <BrandManifesto />
      <HomeHero />
      <QueHacemos />
      <RutaCrecimiento />
      <ShowroomTeaser />
      <MapaPresencia />
      <ReviewsSection />
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
