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
          preload="metadata"
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
            {/* Doble transformación: la ventana entra desde la izquierda y el
                contenido se compensa hacia la derecha con el mismo recorrido y la
                misma curva, así que el logo se ve quieto y lo que barre es el
                borde de la ventana. Mismo efecto que el clip-path, pero solo con
                transform: va por GPU y no repinta. */}
            <span className="manifesto-logo-mask">
              <span className="manifesto-logo-inner">
                <SatoriMark height={107} variant="gold" />
              </span>
            </span>
            <span className="manifesto-logo-cursor-track" aria-hidden="true"><span className="manifesto-logo-cursor" /></span>
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
        /* NADA de animar clip-path aqui. Animar clip-path no va por GPU: obliga a
           REPINTAR el logo en cada frame, y en esta pagina eso bastaba para colgar
           la pestana en Chrome (aislado por biseccion: el bloque con la animacion
           no cargaba, el mismo bloque sin ella si).
           En su lugar, la ventana (mask) entra desde la izquierda y el contenido
           (inner) se compensa a la derecha con el MISMO recorrido, duracion y
           curva, asi que se cancelan: el logo se ve quieto y lo que barre es el
           borde de la ventana. Solo transform -> compuesto por GPU, sin repintar. */
        .manifesto-logo-typewriter {
          position: relative;
          display: inline-block;
          line-height: 0;
        }
        .manifesto-logo-mask {
          display: inline-block;
          line-height: 0;
          overflow: hidden;
          will-change: transform;
          animation: manifestoMask 2.4s cubic-bezier(.55,.06,.18,1) .35s both;
        }
        .manifesto-logo-inner {
          display: inline-block;
          line-height: 0;
          will-change: transform;
          animation: manifestoInner 2.4s cubic-bezier(.55,.06,.18,1) .35s both;
        }
        @keyframes manifestoMask  { from { transform: translateX(-100%); } to { transform: translateX(0); } }
        @keyframes manifestoInner { from { transform: translateX(100%); }  to { transform: translateX(0); } }

        /* El cursor se mueve con TRANSFORM, nunca con \`left\`.
           Animar \`left\` obliga al navegador a recalcular el diseno en cada frame
           (reflow); en una pagina con cientos de elementos eso recorre el
           documento entero 60 veces por segundo y puede colgar la pestana.
           \`transform\` va por GPU y no toca el diseno.
           El truco del carril: translateX en porcentaje se mide sobre el ancho
           del PROPIO elemento, asi que el carril ocupa todo el ancho del logo y
           el cursor viaja pegado a su borde izquierdo. Visualmente identico. */
        .manifesto-logo-cursor-track {
          position: absolute;
          top: 6%;
          bottom: 6%;
          left: 0;
          right: 0;
          pointer-events: none;
          opacity: 0;
          will-change: transform;
          animation: manifestoCursorMove 2.4s cubic-bezier(.55,.06,.18,1) .35s forwards;
        }
        .manifesto-logo-cursor {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          width: 4px;
          background: ${SATORI.GOLD};
          box-shadow: 0 0 18px ${SATORI.GOLD}AA;
          border-radius: 2px;
          /* 12 parpadeos y para. Antes era \`infinite\`: una animacion corriendo
             para siempre, aunque el logo ya estuviera escrito. */
          animation: manifestoCursorBlink .65s steps(1) 3s 12 forwards;
        }
        @keyframes manifestoCursorMove {
          0%   { transform: translateX(0);    opacity: 0; }
          6%   { opacity: 1; }
          12%  { transform: translateX(8%); }
          26%  { transform: translateX(20%); }
          42%  { transform: translateX(40%); }
          60%  { transform: translateX(62%); }
          78%  { transform: translateX(82%); }
          98%  { transform: translateX(100%); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes manifestoCursorBlink {
          0%, 49%   { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .manifesto-logo-mask, .manifesto-logo-inner { animation: none !important; transform: none !important; }
          .manifesto-logo-cursor-track { animation: none !important; opacity: 0 !important; }
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

// ---------- QUÉ HACEMOS (5 pilares de servicio — claridad arriba) ----------
// Anclas de /servicios en el MISMO orden (por rentabilidad) que T.items.
const SLUGS_SERVICIOS = ["web", "bots", "ads", "contenido", "marca", "estudios", "mycfo"];
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
      // Orden por rentabilidad para Satori (Rodrigo, 2026-08-10)
      { img: "assets/showroom/lina-cristinedae.jpg", fit: "cover", objPos: "top", t: "Websites & Positioning", d: "Fast sites that rank and get recommended by AI." },
      { img: "assets/showroom/automatizacion-flow-horizontal.jpg", fit: "cover", bg: "#0E0E0E", t: "AI Automation & Bots", d: "Bots and systems that attend, capture and follow up on their own." },
      { img: "assets/showroom/marketing-moneyshop-poster.jpg", fit: "cover", objPos: "left", t: "Marketing & Ads", d: "Campaigns that bring qualified leads to your business." },
      { video: "assets/showroom/satori-contenido-ia.mp4", poster: "assets/showroom/satori-contenido-ia-poster.jpg", fit: "cover", bg: SATORI.CREAM, t: "AI Content", d: "Cinematic brand video, reels and ads created end-to-end with AI." },
      { img: "assets/showroom/marca-branding-poster.jpg", fit: "cover", t: "Brand & Design", d: "Identity that sets you apart and builds trust." },
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
      // Orden por rentabilidad para Satori (Rodrigo, 2026-08-10)
      { img: "assets/showroom/lina-cristinedae.jpg", fit: "cover", objPos: "top", t: "Páginas Web & Posicionamiento", d: "Sitios rápidos, que rankean y que la IA recomienda." },
      { img: "assets/showroom/automatizacion-flow-horizontal.jpg", fit: "cover", bg: "#0E0E0E", t: "Automatización & Bots con IA", d: "Bots y sistemas que atienden, captan y dan seguimiento solos." },
      { img: "assets/showroom/marketing-moneyshop-poster.jpg", fit: "cover", objPos: "left", t: "Marketing & Ads", d: "Campañas que traen prospectos calificados a tu negocio." },
      { video: "assets/showroom/satori-contenido-ia.mp4", poster: "assets/showroom/satori-contenido-ia-poster.jpg", fit: "cover", bg: SATORI.CREAM, t: "Contenido con IA", d: "Video de marca, reels y ads cinematográficos hechos con IA de punta a punta." },
      { img: "assets/showroom/marca-branding-poster.jpg", fit: "cover", t: "Marca & Diseño", d: "Identidad que te distingue y genera confianza." },
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
            // Cada tarjeta enlaza a su detalle en /servicios (mismo orden que SLUGS_SERVICIOS)
            <a key={i} href={`/servicios#${SLUGS_SERVICIOS[i]}`} className={it.featured ? "pillar-card pillar-featured" : "pillar-card"} style={{
              background: "rgba(255,255,255,0.55)",
              border: it.featured ? `1px solid ${SATORI.GOLD}55` : "1px solid rgba(255,255,255,0.65)",
              backdropFilter: "blur(14px) saturate(160%)", WebkitBackdropFilter: "blur(14px) saturate(160%)",
              borderRadius: "18px", overflow: "hidden",
              boxShadow: it.featured
                ? "0 20px 55px -22px rgba(14,14,14,0.22), 0 0 0 1px rgba(166,124,0,0.10), inset 0 1px 0 rgba(255,255,255,0.55)"
                : "0 14px 40px -22px rgba(14,14,14,0.18), inset 0 1px 0 rgba(255,255,255,0.55)",
              display: "flex", flexDirection: "column", alignItems: "stretch",
              textDecoration: "none", color: "inherit",
              ...(it.featured ? { gridColumn: "1 / -1" } : {})
            }}>
              {/* Media arriba en formato horizontal: los assets apaisados (dashboards,
                  webs) se aprecian completos; el texto va abajo a todo lo ancho. */}
              <div className="pillar-media" style={{
                flex: "none", width: "100%",
                aspectRatio: it.featured ? undefined : "16 / 9",
                height: it.featured ? "420px" : undefined,
                background: it.bg || (it.logo ? SATORI.CREAM : `${SATORI.INK}07`),
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden"
              }}>
                {it.video ? (
                  <VideoEnPantalla src={it.video} poster={it.poster} fit={it.fit} objPos={it.objPos} />
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
            </a>
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

// Video que SOLO se reproduce mientras esta en pantalla.
//
// Antes los 7 videos del showroom llevaban `autoPlay muted loop`: siete
// decodificadores de video corriendo en bucle a la vez, para siempre, aunque
// estuvieran fuera del viewport. Cada uno reserva sus buferes y consume CPU/GPU
// de forma permanente. En equipos con poca RAM eso agota el proceso de la
// pestana y Chrome acaba matandola ("la pagina no responde" / pantalla en negro),
// mientras que el resto de pestanas del navegador siguen tan tranquilas: ninguna
// otra pagina normal mantiene 7 videos en bucle.
//
// Safari y los navegadores moviles ya hacian esto por su cuenta (pausan lo que no
// se ve); Chrome de escritorio no. Por eso el sitio abria en el movil y en Safari
// pero no en Chrome.
//
// Con preload="none" ademas no se descarga nada hasta que hace falta.
function VideoEnPantalla({ src, poster, fit, objPos }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        v.dataset.vis = "1";
        if (!v.src) { v.src = src; v.preload = "auto"; }  // se carga la primera vez que se ve
        // No llamar play() hasta tener frames decodificables: WebKit descarta el
        // poster en cuanto arranca el playback y deja la caja vacia mientras
        // bufferea (en movil eran segundos de tarjetas en blanco).
        const tryPlay = () => {
          if (v.dataset.vis !== "1") return;              // ya salio de pantalla
          const p = v.play();
          if (p && p.catch) p.catch(() => {});            // autoplay bloqueado: se queda el poster
        };
        if (v.readyState >= 3) tryPlay();
        else v.addEventListener("canplay", tryPlay, { once: true });
      } else {
        v.dataset.vis = "0";
        v.pause();
      }
    }, { threshold: 0.1 });
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return (
    <video
      ref={ref} poster={poster} muted loop playsInline preload="none"
      style={{ width: "100%", height: "100%", objectFit: fit || "contain", objectPosition: objPos || "center", display: "block" }}
    />
  );
}

// ---------- SATORI GLOBE (ortografico, interactivo, dorado translucido) ----------
// Look: esfera transparente con la tierra en dorado de marca (el "globo dorado"
// del 31-jul que Rodrigo prefirio sobre la textura satelital; recuperado el
// 11-sep-2026). La geometria sale de world-atlas land-110m (Natural Earth,
// dominio publico, 55 KB) que se decodifica aqui mismo sin topojson-client ni
// d3 y se rasteriza UNA vez a una mascara equirectangular de tierra/mar.
//
// COMO FUNCIONA: para cada pixel del disco se invierte la proyeccion ortografica
// a (lat, lon) y se muestrea la mascara. Hacer eso entero en cada frame seria
// carisimo; el truco es que AL GIRAR SOLO CAMBIA LA LONGITUD, asi que la tabla
// pixel -> (lat, lon base) se calcula una vez y cada frame solo suma el desfase
// de rotacion y muestrea. La tabla se recalcula unicamente cuando cambia la
// inclinacion (arrastre vertical), cuantizada a 1 grado para no rehacerla en
// cada frame del drag.
function SatoriGlobe() {
  const [lang] = useLang();
  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);

  const canvasRef = useRef(null);
  const tex = useRef(null); // mascara de tierra { data (RGBA, alpha = tierra), w, h }
  // La rotacion NO es estado de React: si lo fuera, cada frame re-renderizaria.
  const view = useRef({ rot: 305, tilt: -18 });
  const dragState = useRef({ active: false, lastX: 0, lastY: 0, lastT: 0 });
  const redibujarRef = useRef(null);   // el drag pide repintado; en reposo no se dibuja nada

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

  // Carga la geometria de tierra (topojson) y la rasteriza a una mascara
  // equirectangular: alpha 255 = tierra, 0 = mar. Decodificar topojson es
  // trivial (arcos con deltas cuantizados), asi que no hace falta libreria.
  useEffect(() => {
    let cancelled = false;
    const decodificarTopo = (topo) => {
      const { scale, translate } = topo.transform;
      const arcs = topo.arcs.map((arc) => {
        let x = 0, y = 0;
        return arc.map(([dx, dy]) => { x += dx; y += dy; return [x * scale[0] + translate[0], y * scale[1] + translate[1]]; });
      });
      const anillo = (idxs) => {
        const pts = [];
        idxs.forEach((i) => {
          const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
          a.forEach((p, k) => { if (k === 0 && pts.length) return; pts.push(p); });
        });
        return pts;
      };
      const geom = topo.objects.land.geometries[0];
      const polys = geom.type === "MultiPolygon" ? geom.arcs : [geom.arcs];
      return polys.map((poly) => poly.map(anillo));
    };
    fetch("/assets/vendor/land-110m.json")
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        const W = 2048, H = 1024;
        const c = document.createElement("canvas");
        c.width = W; c.height = H;
        const cx = c.getContext("2d", { willReadFrequently: true });
        cx.fillStyle = "#fff";
        decodificarTopo(topo).forEach((poly) => {
          cx.beginPath();
          poly.forEach((ring) => {
            ring.forEach(([lon, lat], k) => {
              const x = ((lon + 180) / 360) * W;
              const y = ((90 - lat) / 180) * H;
              k === 0 ? cx.moveTo(x, y) : cx.lineTo(x, y);
            });
            cx.closePath();
          });
          cx.fill("evenodd");
        });
        // Los arcos terminan en translate.y (~85.6 S, el bbox dice -90 pero esta
        // sin cuantizar); de ahi al polo es Antartida.
        const yPolo = ((90 - topo.transform.translate[1]) / 180) * H;
        // Se pisa 4 filas del interior del poligono para que no quede una costura
        // antialiasada (se veia como un anillo claro alrededor del polo).
        cx.fillRect(0, Math.floor(yPolo) - 4, W, H);
        const d = cx.getImageData(0, 0, W, H);
        tex.current = { data: d.data, w: W, h: H };
        setReady(true);
      })
      .catch(() => { if (!cancelled) { tex.current = null; setReady(true); } }); // respaldo: solo el contorno
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    // Capa de tierra a 1x: son ~157k pixeles del disco. A 2x serian 630k por
    // frame, cuatro veces el costo, y luego se escala suavizado igual. Los
    // vectores de encima (puntos, halo) si van a 2x y quedan nitidos.
    const D = Math.ceil(RADIUS * 2) + 2;
    const buf = document.createElement("canvas");
    buf.width = D; buf.height = D;
    const bctx = buf.getContext("2d");
    const imgData = bctx.createImageData(D, D);
    const out = imgData.data;
    const OFF = CENTER - RADIUS - 1; // esquina del recuadro dentro del disco

    const TAU = Math.PI * 2;
    // Tablas por pixel del disco (se rehacen solo al cambiar la inclinacion).
    // CLAVE para girar fluido a resolucion COMPLETA: aqui se precalcula, por
    // pixel, la columna base (uT) y la fila (rowT) de la mascara. Rotar el
    // globo es entonces solo sumar un desplazamiento constante a las columnas
    // (sin trigonometria ni normalizacion por pixel en cada frame).
    let idx = null, uT = null, rowT = null, tiltTabla = null;
    const construirTablas = (phi0) => {
      const t = tex.current;
      const tw = t ? t.w : 1, th = t ? t.h : 1;
      const dentro = [];
      const sinP = Math.sin(phi0), cosP = Math.cos(phi0);
      for (let py = 0; py < D; py++) {
        for (let px = 0; px < D; px++) {
          const x = px + OFF - CENTER;
          const y = py + OFF - CENTER;
          const rho2 = x * x + y * y;
          if (rho2 > RADIUS * RADIUS) continue;
          const rho = Math.sqrt(rho2);
          const sinC = rho / RADIUS;
          const cosC = Math.sqrt(Math.max(0, 1 - sinC * sinC));
          let lat, lon;
          if (rho < 1e-6) { lat = phi0; lon = 0; }
          else {
            lat = Math.asin(cosC * sinP + (-y * sinC * cosP) / rho);
            lon = Math.atan2(x * sinC, rho * cosC * cosP + y * sinC * sinP);
          }
          let u = ((lon + Math.PI) / TAU) * tw;          // columna base en [0, tw)
          if (u >= tw) u -= tw; else if (u < 0) u += tw;
          let v = (((Math.PI / 2 - lat) / Math.PI) * th) | 0;
          v = v < 0 ? 0 : (v >= th ? th - 1 : v);
          dentro.push(py * D + px, u, v * tw);
        }
      }
      const n = dentro.length / 3;
      idx = new Int32Array(n); uT = new Float32Array(n); rowT = new Int32Array(n);
      for (let i = 0; i < n; i++) {
        idx[i] = dentro[i * 3] * 4;
        uT[i] = dentro[i * 3 + 1];
        rowT[i] = dentro[i * 3 + 2];
      }
      tiltTabla = phi0;
    };

    // Dorado de marca #A67C00 = (166,124,0). ImageData va sin premultiplicar,
    // asi que el color es fijo y solo cambia el alpha: tierra 0.34, mar 0.05.
    // El alpha de la mascara ya viene antialiasado del rasterizado, y se usa
    // lineal (no umbral) para que las costas no salgan dentadas.
    const A_TIERRA = 87, A_MAR = 13, A_RANGO = (A_TIERRA - A_MAR) / 255;
    const pintarTierra = (lambda0) => {
      const t = tex.current;
      if (!t || !uT) return false;
      const { data: td, w: tw } = t;
      // rotar = correr todas las columnas el mismo desplazamiento en texels
      let shift = ((lambda0 / TAU) * tw) % tw;
      if (shift < 0) shift += tw;
      for (let i = 0; i < idx.length; i++) {
        let u = uT[i] + shift;
        if (u >= tw) u -= tw;
        const s = (rowT[i] + u | 0) * 4;
        const o = idx[i];
        out[o] = 166; out[o + 1] = 124; out[o + 2] = 0;
        out[o + 3] = A_MAR + td[s + 3] * A_RANGO;
      }
      return true;
    };

    // Proyeccion ortografica DIRECTA (para meridianos y puntos de ciudad)
    const proyectar = (lonDeg, latDeg, rotDeg, tiltDeg) => {
      const lat = (latDeg * Math.PI) / 180;
      const dl = ((lonDeg - rotDeg) * Math.PI) / 180;
      const p0 = (tiltDeg * Math.PI) / 180;
      const cosc = Math.sin(p0) * Math.sin(lat) + Math.cos(p0) * Math.cos(lat) * Math.cos(dl);
      if (cosc < 0) return null; // cara oculta
      const x = RADIUS * Math.cos(lat) * Math.sin(dl);
      const y = -RADIUS * (Math.cos(p0) * Math.sin(lat) - Math.sin(p0) * Math.cos(lat) * Math.cos(dl));
      return [CENTER + x, CENTER + y, cosc];
    };

    const esferaRespaldo = () => { // si la geometria no cargo: disco dorado tenue
      ctx.beginPath(); ctx.arc(CENTER, CENTER, RADIUS, 0, TAU);
      ctx.fillStyle = "rgba(166,124,0,0.06)"; ctx.fill();
    };

    const draw = (t) => {
      const { rot, tilt } = view.current;
      const phi0 = (tilt * Math.PI) / 180;
      if (tiltTabla === null || Math.abs(phi0 - tiltTabla) > 0.0175) construirTablas(phi0); // ~1 grado
      ctx.clearRect(0, 0, SIZE, SIZE);

      // Halo de atmosfera (dorado)
      const atm = ctx.createRadialGradient(CENTER, CENTER, RADIUS, CENTER, CENTER, RADIUS + 30);
      atm.addColorStop(0, "rgba(166,124,0,0)");
      atm.addColorStop(0.5, "rgba(166,124,0,0.11)");
      atm.addColorStop(1, "rgba(166,124,0,0)");
      ctx.beginPath(); ctx.arc(CENTER, CENTER, RADIUS + 30, 0, TAU); ctx.fillStyle = atm; ctx.fill();

      ctx.save();
      ctx.beginPath(); ctx.arc(CENTER, CENTER, RADIUS, 0, TAU); ctx.clip();
      // +rot, no -rot: la proyeccion DIRECTA (puntos y meridianos) centra el disco
      // en lon = rot, asi que la INVERSA debe sumar +rot para caer en el mismo
      // hemisferio. Con el signo invertido la tierra mostraba Africa mientras los
      // puntos de Mexico se dibujaban sobre el Sahara.
      if (pintarTierra((rot * Math.PI) / 180)) {
        bctx.putImageData(imgData, 0, 0);
        ctx.drawImage(buf, OFF, OFF);
      } else {
        esferaRespaldo();
      }

      // Meridianos y paralelos, muy tenues: dan la lectura de "globo terraqueo"
      ctx.beginPath();
      // Los meridianos llegan hasta los polos: si se cortan en 80 grados, sus
      // colas vistas de canto parecen un anillo de guiones alrededor del polo.
      for (let lo = -180; lo < 180; lo += 30) {
        let mover = true;
        for (let la = -90; la <= 90; la += 5) {
          const p = proyectar(lo, la, rot, tilt);
          if (!p) { mover = true; continue; }
          mover ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
          mover = false;
        }
      }
      for (let la = -60; la <= 60; la += 30) {
        let mover = true;
        for (let lo = -180; lo <= 180; lo += 5) {
          const p = proyectar(lo, la, rot, tilt);
          if (!p) { mover = true; continue; }
          mover ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
          mover = false;
        }
      }
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = "rgba(166,124,0,0.20)";
      ctx.stroke();
      ctx.restore();

      // Borde del disco
      ctx.beginPath(); ctx.arc(CENTER, CENTER, RADIUS, 0, TAU);
      ctx.lineWidth = 1; ctx.strokeStyle = "rgba(166,124,0,0.22)"; ctx.stroke();

      // Puntos de ciudad en dorado de marca. El pulso sale del reloj.
      cities.forEach((c, i) => {
        const p = proyectar(c.lng, c.lat, rot, tilt);
        if (!p) return;
        const fade = Math.min(1, p[2] * 3.2);
        const pulso = (Math.sin(t / (1200 + i * 150)) + 1) / 2;
        const g = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], 18 + pulso * 12);
        g.addColorStop(0, `rgba(166,124,0,${0.9 * fade})`);
        g.addColorStop(0.55, `rgba(166,124,0,${0.25 * fade})`);
        g.addColorStop(1, "rgba(166,124,0,0)");
        ctx.beginPath(); ctx.arc(p[0], p[1], 18 + pulso * 12, 0, TAU); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p[0], p[1], 5 + pulso * 11, 0, TAU);
        ctx.lineWidth = 1.6; ctx.strokeStyle = `rgba(166,124,0,${(1 - pulso) * 0.9 * fade})`; ctx.stroke();
        ctx.beginPath(); ctx.arc(p[0], p[1], 4, 0, TAU);
        ctx.fillStyle = `rgba(166,124,0,${fade})`; ctx.fill();
      });
    };

    // Giro automatico CONTENIDO. El bucle a 30-60fps permanente tumbaba equipos
    // modestos (historico: pantalla en negro), asi que el auto-giro respeta tres
    // limites: (1) SOLO corre con el globo en viewport (IntersectionObserver),
    // (2) va a ~15fps (el repintado de textura cuesta lo mismo que un drag),
    // (3) se pausa mientras el usuario arrastra. Fuera de pantalla: costo cero.
    let raf = 0;
    const repintar = () => {
      if (raf) return;                       // como mucho un repintado por frame
      raf = requestAnimationFrame((t) => { raf = 0; draw(t); });
    };
    redibujarRef.current = repintar;
    repintar();

    let animRaf = 0, lastT = 0, visible = false;
    const paso = (t) => {
      animRaf = 0;
      if (!visible) return;
      if (!dragState.current.active) {
        const dt = Math.min(50, lastT ? t - lastT : 16);    // fluido: cada frame (~60fps)
        view.current.rot = (view.current.rot + dt * 0.012) % 360;  // ~12°/s
        draw(t);
      }
      lastT = t;
      animRaf = requestAnimationFrame(paso);
    };
    const ioGiro = typeof IntersectionObserver !== "undefined"
      ? new IntersectionObserver(([e]) => {
          visible = e.isIntersecting;
          if (visible && !animRaf) { lastT = performance.now(); animRaf = requestAnimationFrame(paso); }
        }, { threshold: 0.15 })
      : null;
    if (ioGiro) ioGiro.observe(canvas);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (animRaf) cancelAnimationFrame(animRaf);
      if (ioGiro) ioGiro.disconnect();
      redibujarRef.current = null;
    };
  }, [ready, lang]);

  // Drag sobre un hit-target circular que cubre EXACTAMENTE el disco.
  // Mueve refs, no estado: el dibujo lo recoge en el siguiente frame.
  const onPointerDown = (e) => {
    try { e.currentTarget.setPointerCapture?.(e.pointerId); } catch (_) {}
    dragState.current = { active: true, lastX: e.clientX, lastY: e.clientY, lastT: performance.now() };
    setDragging(true);
  };
  const onPointerMove = (e) => {
    const st = dragState.current;
    if (!st.active) return;
    const now = performance.now();
    const dx = e.clientX - st.lastX, dy = e.clientY - st.lastY;
    st.lastX = e.clientX; st.lastY = e.clientY; st.lastT = now;
    // Sentido de arrastre validado a mano por Rodrigo (2026-08-10): el globo
    // sigue al cursor en ambos ejes con estos signos.
    view.current.rot = (view.current.rot + dx * -0.45) % 360;
    view.current.tilt = Math.max(-80, Math.min(80, view.current.tilt + dy * 0.35));
    if (redibujarRef.current) redibujarRef.current();   // repinta solo mientras arrastras
  };
  const endDrag = (e) => {
    if (!dragState.current.active) return;
    dragState.current.active = false;
    setDragging(false);
    try { e.currentTarget?.releasePointerCapture?.(e.pointerId); } catch (_) {}
  };

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: `${SIZE}px`, margin: "0 auto", aspectRatio: "1" }}>
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={lang === "en" ? "Interactive globe with Satori presence" : "Globo interactivo con la presencia de Satori"}
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
    // js-reveal: desactiva el fallback CSS (revelado sin JS) y activa el reveal por scroll
    document.documentElement.classList.add("js-reveal");
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
        { id: "resenas", label: { es: "Reseñas", en: "Reviews" } }
      ]} />
      <BrandManifesto />
      <HomeHero />
      <QueHacemos />
      <RutaCrecimiento />
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
