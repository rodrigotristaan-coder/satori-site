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
      { text: "Crece con ", gold: false },
      { text: "claridad", gold: true },
      { text: " y ", gold: false },
      { text: "dirección", gold: true },
      { text: ".", gold: false }
    ]
  };
  const EN = {
    label: "Our mission",
    parts: [
      { text: "Grow with ", gold: false },
      { text: "clarity", gold: true },
      { text: " and ", gold: false },
      { text: "direction", gold: true },
      { text: ".", gold: false }
    ]
  };
  const c = lang === "en" ? EN : ES;

  return (
    <section
      id="manifesto"
      className="manifesto-section"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "5rem clamp(1.25rem,4vw,2.5rem)",
        background: "rgba(255,255,255,0.82)",
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
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              lineHeight: 1.3,
              letterSpacing: "-0.015em",
              color: SATORI.INK,
              opacity: 0.95,
              margin: "0 auto",
              maxWidth: "min(24ch, 100%)",
              textAlign: "center"
            }}
          >
            {c.parts.map((p, i) =>
              p.gold ? (
                <span key={i} style={{ color: SATORI.GOLD, fontWeight: 500 }}>{p.text}</span>
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
        background: "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(244,244,242,0.78) 60%, rgba(239,239,236,0.85) 100%)",
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
              <span className="grad-gold" style={{ fontSize: "clamp(3.2rem, 11vw, 8rem)" }}>{c.h1b}</span>
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
                  backdropFilter: "blur(10px) saturate(160%)", WebkitBackdropFilter: "blur(10px) saturate(160%)",
                  ...(chip.gold
                    ? { color: SATORI.CREAM, background: "rgba(166,124,0,0.78)", border: "1px solid rgba(166,124,0,0.55)", fontWeight: 600, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)" }
                    : { color: SATORI.GOLD_DEEP, background: "rgba(255,255,255,0.4)", border: `1px solid ${SATORI.GOLD}33`, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)" })
                }}>{chip.t}</span>
              ))}
            </div>
            <div
              style={{ display: "flex", gap: "0.85rem", marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center" }}
              className="fade-up-d3"
            >
              <a href="/sobre-rodrigo" className="cta-btn-gold pulse-gold" style={btnGold}>
                <span>{c.cta1}</span>
                <span className="cta-arrow">→</span>
              </a>
              <a href="/servicios" className="cta-btn-ghost" style={btnGhost}>
                <span>{c.cta2}</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ---------- FUNDADOR (mini-brief, formato WHY de Simon Sinek) ----------
function FounderBrief() {
  const [lang] = useLang();
  const en = lang === "en";
  const T = en ? {
    eyebrow: "The founder",
    role: "Founder of Satori",
    statement: (<>I believe in putting <span style={{ color: SATORI.GOLD }}>technology at the service of people</span>, not the other way around. That's why I founded Satori: I turn strategy, websites, automation and applied AI into <span style={{ color: SATORI.GOLD }}>clear information and growth for your business</span>.</>)
  } : {
    eyebrow: "El fundador",
    role: "Fundador de Satori",
    statement: (<>Creo en poner la <span style={{ color: SATORI.GOLD }}>tecnología al servicio de lo humano</span>, no al revés. Por eso fundé Satori: convierto estrategia, páginas web, automatizaciones y aplicación de IA en <span style={{ color: SATORI.GOLD }}>información clara y crecimiento para tu negocio</span>.</>)
  };
  return (
    <section data-reveal style={{ padding: "5rem clamp(1.25rem,4vw,2.5rem)", background: "rgba(244,244,242,0.85)", position: "relative", zIndex: 1 }}>
      <div className="founder-brief" style={{ maxWidth: "900px", margin: "0 auto", display: "flex", alignItems: "center", gap: "2.6rem" }}>
        <img src="assets/rodrigo.webp" alt="Rodrigo Tristán" loading="lazy"
          style={{ flex: "0 0 150px", width: "150px", height: "150px", objectFit: "cover", borderRadius: "20px", boxShadow: "0 16px 40px rgba(14,14,14,0.16)" }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: TYPE.mono, fontSize: "0.66rem", letterSpacing: "0.28em", textTransform: "uppercase", color: SATORI.INK, opacity: 0.55, marginBottom: "0.9rem" }}>{T.eyebrow}</div>
          <p style={{ fontFamily: TYPE.display, fontWeight: 500, fontSize: "clamp(1.18rem, 2.3vw, 1.65rem)", lineHeight: 1.38, letterSpacing: "-0.01em", color: SATORI.INK, margin: "0 0 1.1rem" }}>
            {T.statement}
          </p>
          <div style={{ fontFamily: TYPE.mono, fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: SATORI.GOLD_DEEP }}>
            Rodrigo Tristán · {T.role}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- QUÉ HACEMOS (5 pilares de servicio — claridad arriba) ----------
function QueHacemos() {
  const [lang] = useLang();
  const en = lang === "en";
  const T = en ? {
    eyebrow: "What we do",
    title: "Seven ways we ",
    titleAccent: "make you grow",
    sub: "Strategy first, then execution. Everything points to one thing: clients arriving with clarity.",
    cta: "See all services",
    items: [
      { video: "assets/showroom/marca-branding.mp4", poster: "assets/showroom/marca-branding-poster.jpg", fit: "cover", t: "Brand & Design", d: "Identity that sets you apart and builds trust." },
      { video: "assets/showroom/web-esmeralda.mp4", poster: "assets/showroom/web-esmeralda-poster.jpg", fit: "cover", objPos: "top", t: "Websites & Positioning", d: "Fast sites that rank and get recommended by AI." },
      { video: "assets/showroom/marketing-moneyshop.mp4", poster: "assets/showroom/marketing-moneyshop-poster.jpg", fit: "cover", objPos: "left", t: "Marketing & Ads", d: "Campaigns that bring qualified leads to your business." },
      { video: "assets/showroom/automatizacion-flow.mp4", poster: "assets/showroom/automatizacion-flow-poster.jpg", fit: "cover", bg: "#0E0E0E", t: "AI Automation & Bots", d: "Bots and systems that attend, capture and follow up on their own." },
      { video: "assets/showroom/satori-contenido-ia.mp4", poster: "assets/showroom/satori-contenido-ia-poster.jpg", fit: "cover", bg: SATORI.CREAM, t: "AI Content", d: "Cinematic brand video, reels and ads created end-to-end with AI." },
      { video: "assets/showroom/estudios-mercado.mp4", poster: "assets/showroom/estudios-mercado-poster.jpg", fit: "cover", bg: "#0E0E0E", t: "Market Research", d: "Real data on your market, competitors and pricing to decide with clarity." },
      { video: "assets/showroom/mycfo-chat.mp4", poster: "assets/showroom/mycfo-chat-poster.jpg", bg: SATORI.CREAM, t: "MyCFO", d: "Your AI CFO: manage your business finances by chat, with clear reports and a daily status.", featured: true, badge: "Satori product" }
    ]
  } : {
    eyebrow: "Qué hacemos",
    title: "Siete formas de ",
    titleAccent: "hacerte crecer",
    sub: "Primero estrategia, luego ejecución. Todo apunta a lo mismo: clientes llegando con claridad.",
    cta: "Ver todos los servicios",
    items: [
      { video: "assets/showroom/marca-branding.mp4", poster: "assets/showroom/marca-branding-poster.jpg", fit: "cover", t: "Marca & Diseño", d: "Identidad que te distingue y genera confianza." },
      { video: "assets/showroom/web-esmeralda.mp4", poster: "assets/showroom/web-esmeralda-poster.jpg", fit: "cover", objPos: "top", t: "Páginas Web & Posicionamiento", d: "Sitios rápidos, que rankean y que la IA recomienda." },
      { video: "assets/showroom/marketing-moneyshop.mp4", poster: "assets/showroom/marketing-moneyshop-poster.jpg", fit: "cover", objPos: "left", t: "Marketing & Ads", d: "Campañas que traen prospectos calificados a tu negocio." },
      { video: "assets/showroom/automatizacion-flow.mp4", poster: "assets/showroom/automatizacion-flow-poster.jpg", fit: "cover", bg: "#0E0E0E", t: "Automatización & Bots con IA", d: "Bots y sistemas que atienden, captan y dan seguimiento solos." },
      { video: "assets/showroom/satori-contenido-ia.mp4", poster: "assets/showroom/satori-contenido-ia-poster.jpg", fit: "cover", bg: SATORI.CREAM, t: "Contenido con IA", d: "Video de marca, reels y ads cinematográficos hechos con IA de punta a punta." },
      { video: "assets/showroom/estudios-mercado.mp4", poster: "assets/showroom/estudios-mercado-poster.jpg", fit: "cover", bg: "#0E0E0E", t: "Estudios de Mercado", d: "Datos reales de tu mercado, competencia y precios para decidir con claridad." },
      { video: "assets/showroom/mycfo-chat.mp4", poster: "assets/showroom/mycfo-chat-poster.jpg", bg: SATORI.CREAM, t: "MyCFO", d: "Tu CFO con IA: controla las finanzas de tu negocio por chat, con reportes claros y estatus diario.", featured: true, badge: "Producto Satori" }
    ]
  };
  return (
    <section id="que-hacemos" data-reveal style={{
      padding: "7rem clamp(1.25rem,4vw,2.5rem)", background: "rgba(244,244,242,0.85)",
      position: "relative", zIndex: 1
    }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ ...eyebrowStyle, justifyContent: "center" }}>{T.eyebrow}</div>
          <h2 style={h2Style}>{T.title}<span className="grad-gold">{T.titleAccent}</span></h2>
          <p style={{ ...bodyStyle, maxWidth: "560px", margin: "1rem auto 0" }}>{T.sub}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.2rem" }}>
          {T.items.map((it, i) => (
            <div key={i} className={it.featured ? "pillar-card pillar-featured" : "pillar-card"} style={{
              background: "rgba(255,255,255,0.55)",
              border: it.featured ? `1px solid ${SATORI.GOLD}55` : "1px solid rgba(255,255,255,0.65)",
              backdropFilter: "blur(14px) saturate(160%)", WebkitBackdropFilter: "blur(14px) saturate(160%)",
              borderRadius: "18px", overflow: "hidden",
              boxShadow: it.featured
                ? "0 20px 55px -22px rgba(14,14,14,0.22), 0 0 0 1px rgba(166,124,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)"
                : "0 14px 40px -22px rgba(14,14,14,0.18), inset 0 1px 0 rgba(255,255,255,0.55)",
              display: "flex", alignItems: "stretch",
              ...(it.featured ? { gridColumn: "1 / -1" } : {})
            }}>
              <div style={{
                flex: it.featured ? "0 0 42%" : "0 0 33.333%", minWidth: "96px",
                minHeight: it.featured ? "260px" : undefined,
                background: it.bg || (it.logo ? SATORI.CREAM : `${SATORI.INK}07`),
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                {it.video ? (
                  <video src={it.video} poster={it.poster} autoPlay muted loop playsInline preload="metadata"
                    style={{ width: "100%", height: "100%", objectFit: it.fit || "contain", objectPosition: it.objPos || "center", display: "block" }} />
                ) : (
                  <img src={it.img} alt={it.logo ? it.t : ""} loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: it.fit || (it.logo ? "contain" : "cover"), objectPosition: it.objPos || "center", padding: it.logo ? "0.85rem" : 0, display: "block" }} />
                )}
              </div>
              <div style={{ flex: 1, minWidth: 0, padding: it.featured ? "2.2rem 2.4rem" : "1.5rem 1.6rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.5rem" }}>
                  <span style={{ fontFamily: TYPE.mono, fontSize: "0.78rem", letterSpacing: "0.1em", color: SATORI.GOLD, opacity: 0.85 }}>{String(i + 1).padStart(2, "0")}</span>
                  {it.badge && (
                    <span style={{
                      fontFamily: TYPE.mono, fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase",
                      color: SATORI.GOLD_DEEP, background: "rgba(166,124,0,0.08)", border: `1px solid ${SATORI.GOLD}44`,
                      borderRadius: "999px", padding: "0.28rem 0.7rem"
                    }}>{it.badge}</span>
                  )}
                </div>
                <h3 style={{ fontFamily: TYPE.display, fontSize: it.featured ? "1.55rem" : "1.2rem", fontWeight: 500, color: SATORI.INK, margin: "0 0 0.5rem" }}>{it.t}</h3>
                <p style={{ ...bodyStyle, fontSize: it.featured ? "1.02rem" : "0.96rem", margin: 0, maxWidth: it.featured ? "48ch" : undefined }}>{it.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a href="/servicios" style={btnGhost}>{T.cta}</a>
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
        <h2 style={{ ...h2Style, color: SATORI.CREAM }}>{T.title}<span className="grad-gold-dark">{T.titleAccent}</span></h2>
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
        <a href="/proyectos" style={btnGold}>{T.cta}</a>
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
        background: "linear-gradient(180deg, rgba(239,239,236,0.85) 0%, rgba(244,244,242,0.85) 100%)",
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
    { n: "+6", l: "CIUDADES" },
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
        background: "rgba(244,244,242,0.85)",
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

        <GrowthPathTimeline items={lang === "en" ? stepsEn : stepsEs} />
      </div>
    </section>
  );
}

// ---------- SATORI GLOBE (ortografico, interactivo) ----------
// EN CANVAS, NO EN SVG — y el porque importa:
// La version en SVG reproyectaba toda la geometria mundial en cada frame y le
// entregaba a React dos strings gigantes (land ~45KB + graticule ~14KB) que
// Chrome tenia que re-parsear y re-rasterizar. Ademas la rotacion vivia en
// useState, asi que cada grado disparaba un render de React completo. En algunas
// Macs eso saturaba el hilo principal hasta que Chrome mataba la pestana:
// "Aw, Snap — RESULT_CODE_HUNG", pantalla en negro.
//
// Aqui la rotacion vive en un ref y se dibuja directo al contexto 2D: React no
// participa en la animacion, no se genera texto, no hay DOM que reconciliar.
// d3.geoPath acepta un contexto de canvas y traza directo sobre el.
function SatoriGlobe() {
  const [lang] = useLang();
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef(null);
  const geo = useRef({ land: null, graticule: null });
  // La rotacion NO es estado de React: si lo fuera, cada frame re-renderizaria.
  const view = useRef({ rot: 305, tilt: -18 });
  const dragState = useRef({ active: false, lastX: 0, lastY: 0, lastT: 0, vRot: 0, vTilt: 0, idleAt: 0 });

  const SIZE = 560;
  const CENTER = SIZE / 2;
  const RADIUS = SIZE * 0.4;

  // Ciudades — coordenadas reales (lng, lat)
  const cities = [
    { name: "CDMX", lng: -99.1332, lat: 19.4326 },
    { name: "Guadalajara", lng: -103.3496, lat: 20.6597 },
    { name: "Tijuana", lng: -117.0382, lat: 32.5149 },
    { name: "Acapulco", lng: -99.8237, lat: 16.8531 },
    { name: lang === "en" ? "Mexico State" : "Edo. de México", lng: -99.7233, lat: 19.4969 },
    { name: lang === "en" ? "La Rioja · Spain" : "La Rioja · España", lng: -2.4449, lat: 42.4627 }
  ];

  // Carga d3-geo + topojson + el mapa — SELF-HOSTED (assets/vendor/, version fija).
  // Solo se usan geoOrthographic / geoPath / geoGraticule, asi que basta
  // d3-array + d3-geo (53 KB) en vez del bundle d3 completo (273 KB).
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
        // d3-array primero: d3-geo lo consume desde el global d3.
        await loadScript("/assets/vendor/d3-array.min.js");
        await loadScript("/assets/vendor/d3-geo.min.js");
        await loadScript("/assets/vendor/topojson-client.min.js");
        if (cancelled) return;
        const res = await fetch("/assets/vendor/land-110m.json");
        const data = await res.json();
        if (cancelled) return;
        geo.current.land = window.topojson.feature(data, data.objects.land);
        geo.current.graticule = window.d3.geoGraticule().step([20, 20])();
        setReady(true);
      } catch (e) {
        console.warn("[SATORI globe] load failed, using fallback", e);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Bucle de dibujo. Corre una sola vez montado; no depende del estado de React.
  useEffect(() => {
    if (!ready || !canvasRef.current || !window.d3) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Nitidez en pantallas retina, con tope en 2x: por encima el costo sube al
    // cuadrado y no se nota la diferencia a 560 px.
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const proj = window.d3.geoOrthographic()
      .scale(RADIUS).translate([CENTER, CENTER]).clipAngle(90);
    const pathGen = window.d3.geoPath(proj, ctx);

    // Degradados creados UNA vez: van en coordenadas del disco, no de la tierra,
    // asi que no cambian al girar (si dependieran de la geometria, bailarian).
    const oceano = ctx.createRadialGradient(
      CENTER - RADIUS * 0.32, CENTER - RADIUS * 0.38, RADIUS * 0.05,
      CENTER - RADIUS * 0.32, CENTER - RADIUS * 0.38, RADIUS * 1.45
    );
    oceano.addColorStop(0, "#5FA8D8");
    oceano.addColorStop(0.55, "#2F7CB4");
    oceano.addColorStop(1, "#12456F");

    // Tierra por bandas de latitud: en ortografica la Y del disco equivale mas o
    // menos a la latitud, asi que salen solos los polos claros, el verde boreal,
    // el ocre de los desiertos (~30 N/S) y el verde tropical.
    const tierra = ctx.createLinearGradient(0, CENTER - RADIUS, 0, CENTER + RADIUS);
    [[0, "#E8EDE8"], [0.10, "#4E7A47"], [0.24, "#2F6B3C"], [0.36, "#C9B063"], [0.46, "#D8C070"],
     [0.56, "#3E8149"], [0.68, "#2F6B3C"], [0.82, "#C0A868"], [1, "#E8EDE8"]]
      .forEach(([o, c]) => tierra.addColorStop(o, c));

    // Sombra esferica: lo que hace que se lea como bola y no como calcomania.
    const sombra = ctx.createRadialGradient(
      CENTER - RADIUS * 0.3, CENTER - RADIUS * 0.34, RADIUS * 0.4,
      CENTER - RADIUS * 0.3, CENTER - RADIUS * 0.34, RADIUS * 1.35
    );
    sombra.addColorStop(0, "rgba(0,0,0,0)");
    sombra.addColorStop(0.62, "rgba(0,0,0,0.17)");
    sombra.addColorStop(1, "rgba(0,18,31,0.34)");

    const atmosfera = ctx.createRadialGradient(CENTER, CENTER, RADIUS, CENTER, CENTER, RADIUS + 30);
    atmosfera.addColorStop(0, "rgba(127,182,220,0)");
    atmosfera.addColorStop(0.55, "rgba(127,182,220,0.22)");
    atmosfera.addColorStop(1, "rgba(127,182,220,0)");

    const discoPath = () => { ctx.beginPath(); ctx.arc(CENTER, CENTER, RADIUS, 0, Math.PI * 2); };

    const draw = (t) => {
      const { rot, tilt } = view.current;
      proj.rotate([-rot, tilt, 0]);
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Halo de atmosfera
      ctx.beginPath();
      ctx.arc(CENTER, CENTER, RADIUS + 30, 0, Math.PI * 2);
      ctx.fillStyle = atmosfera;
      ctx.fill();

      ctx.save();
      discoPath();
      ctx.clip();

      discoPath();
      ctx.fillStyle = oceano;
      ctx.fill();

      ctx.beginPath();
      pathGen(geo.current.land);
      ctx.fillStyle = tierra;
      ctx.fill();
      ctx.lineWidth = 0.4;
      ctx.strokeStyle = "rgba(31,74,44,0.45)";
      ctx.stroke();

      ctx.beginPath();
      pathGen(geo.current.graticule);
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = "rgba(255,255,255,0.30)";
      ctx.stroke();

      discoPath();
      ctx.fillStyle = sombra;
      ctx.fill();
      ctx.restore();

      // Borde apenas insinuado
      discoPath();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(14,14,14,0.12)";
      ctx.stroke();

      // Puntos de ciudad (dorado de marca). El pulso sale del reloj, no de <animate>.
      const c0 = proj.rotate();
      const lambda0 = (-c0[0] * Math.PI) / 180;
      const phi0 = (-c0[1] * Math.PI) / 180;
      cities.forEach((c, i) => {
        const phi = (c.lat * Math.PI) / 180;
        const lambda = (c.lng * Math.PI) / 180;
        const cosC = Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * Math.cos(phi) * Math.cos(lambda - lambda0);
        if (cosC < 0) return; // cara oculta del globo
        const p = proj([c.lng, c.lat]);
        if (!p) return;
        const fade = Math.min(1, cosC * 3.2);
        const pulso = (Math.sin(t / (1200 + i * 150)) + 1) / 2;

        const glow = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 18 + pulso * 12);
        glow.addColorStop(0, `rgba(166,124,0,${0.85 * fade})`);
        glow.addColorStop(0.55, `rgba(166,124,0,${0.22 * fade})`);
        glow.addColorStop(1, "rgba(166,124,0,0)");
        ctx.beginPath();
        ctx.arc(p[0], p[1], 18 + pulso * 12, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p[0], p[1], 5 + pulso * 11, 0, Math.PI * 2);
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = `rgba(166,124,0,${(1 - pulso) * 0.9 * fade})`;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(p[0], p[1], 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(166,124,0,${fade})`;
        ctx.fill();
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = `rgba(255,255,255,${0.8 * fade})`;
        ctx.stroke();
      });
    };

    let raf;
    let last = performance.now();
    let visible = true;
    const AUTO_SPIN = 0.006; // deg/ms ~ 6 grados/s
    const DECAY = 0.96;
    const MIN_V = 0.0008;

    // Pausa cuando el globo no esta en pantalla (CPU y bateria)
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        ([e]) => { visible = e.isIntersecting; if (visible) last = performance.now(); },
        { threshold: 0 }
      );
      io.observe(canvas);
    }

    const tick = (t) => {
      const dt = Math.min(64, t - last); // clamp: tras una pausa larga no da un salto
      last = t;
      if (visible) {
        const st = dragState.current;
        if (!st.active) {
          if (Math.abs(st.vRot) > MIN_V || Math.abs(st.vTilt) > MIN_V) {
            view.current.rot = (view.current.rot + st.vRot * dt) % 360;
            view.current.tilt = Math.max(-80, Math.min(80, view.current.tilt + st.vTilt * dt));
            const k = Math.pow(DECAY, dt / 16.67);
            st.vRot *= k;
            st.vTilt *= k;
            st.idleAt = t;
          } else {
            st.vRot = 0;
            st.vTilt = 0;
            if (t - st.idleAt > 1200) view.current.rot = (view.current.rot + dt * AUTO_SPIN) % 360;
          }
        }
        draw(t);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); if (io) io.disconnect(); };
  }, [ready, lang]);

  // Drag sobre un hit-target circular que cubre EXACTAMENTE el disco.
  // Mueve refs, no estado: el dibujo lo recoge en el siguiente frame.
  const onPointerDown = (e) => {
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (_) {}
    dragState.current = {
      active: true, lastX: e.clientX, lastY: e.clientY,
      lastT: performance.now(), vRot: 0, vTilt: 0, idleAt: performance.now()
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
    st.lastX = e.clientX; st.lastY = e.clientY; st.lastT = now;
    // direccion INVERTIDA (el globo gira en contra del dedo, como una bola real)
    const dRot = dx * -0.45;
    const dTilt = dy * -0.35;
    const blend = 0.25;
    st.vRot = st.vRot * (1 - blend) + (dRot / dt) * blend;
    st.vTilt = st.vTilt * (1 - blend) + (dTilt / dt) * blend;
    view.current.rot = (view.current.rot + dRot) % 360;
    view.current.tilt = Math.max(-80, Math.min(80, view.current.tilt + dTilt));
  };
  const endDrag = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    dragState.current.idleAt = performance.now();
    setDragging(false);
    try { e.currentTarget?.releasePointerCapture?.(e.pointerId); } catch (_) {}
  };

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
      <canvas
        ref={canvasRef}
        aria-label={lang === "en" ? "Interactive globe with Satori presence" : "Globo interactivo con la presencia de Satori"}
        role="img"
        style={{ width: "100%", height: "100%", display: "block", pointerEvents: "none" }}
      />

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

      {!ready && (
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
    h1a: "Satori",
    h1b: "Map",
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
      <NeuralBackground opacity={0.55} />
      <Nav current="home" />
      <SectionRail sections={[
        { id: "manifesto", label: { es: "Inicio", en: "Home" } },
        { id: "inicio", label: { es: "Filosofía", en: "Philosophy" } },
        { id: "que-hacemos", label: { es: "Qué hacemos", en: "What we do" } },
        { id: "metodologia", label: { es: "Metodología", en: "Method" } },
        { id: "showroom", label: { es: "Showroom", en: "Showroom" } },
        { id: "resenas", label: { es: "Reseñas", en: "Reviews" } }
      ]} />
      <BrandManifesto />
      <HomeHero />
      <FounderBrief />
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
