/* SATORI — Proyectos (proyectos.html). ES/EN. */

const { useState, useEffect } = React;

const PROYECTOS_ES = [
  {
    titulo: "My CFO",
    cat: "Soluciones IA",
    producto: true,
    year: "2025",
    descripcion: "Bot de finanzas personales con registro y reporting automático por WhatsApp. Categorización por IA y reportes mensuales claros, sin tocar hojas de cálculo.",
    tags: ["WhatsApp", "Registro automático", "Reportes IA"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Invitación de boda — V&C",
    cat: "Web",
    year: "2025",
    descripcion: "Invitación de boda digital: sobre interactivo que se abre con música, galería, itinerario, confirmación de asistencia (RSVP), mesa de regalos y gestión de reservas con IA. Diseño y desarrollo por Satori.",
    tags: ["Landing", "Invitación digital", "RSVP", "Reservas con IA"],
    video: "assets/showroom/invitacion-boda-famsalasglez-16x9.mp4",
    poster: "assets/showroom/invitacion-boda-famsalasglez-poster.jpg"
  },
  {
    titulo: "Esmeralda Lakes — Landing & Reservas",
    cat: "Web",
    year: "2025",
    descripcion: "Landing bilingüe con reservas directas, calendario y sincronización con Airbnb.",
    tags: ["Landing", "Reservas", "Airbnb", "Bilingüe"],
    url: "https://esmeraldalakes.com",
    video: "assets/showroom/landing-esmeralda-airbnb-green-16x9.mp4",
    poster: "assets/showroom/landing-esmeralda-airbnb-green-poster.jpg"
  },
  {
    titulo: "Landing Pages",
    cat: "Identidad",
    year: "2025",
    descripcion: "Sistema de landings de alta conversión para campañas, eventos e invitaciones: copy, diseño, formularios conectados a CRM y experimentación A/B continua.",
    tags: ["Eventos", "Invitaciones", "Campañas"],
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Bots de Ventas",
    cat: "Soluciones IA",
    year: "2025",
    descripcion: "Atención y prospección automatizada en WhatsApp, Instagram y redes: responde, agenda, califica leads y resume conversaciones en bullets accionables.",
    tags: ["WhatsApp Business", "Instagram", "Lead scoring"],
    img: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Sesión de fotos",
    cat: "Identidad",
    year: "2024",
    descripcion: "Dirección creativa para sesiones de marca: moodboard, locación, vestuario y guion de tomas. Material listo para 3 meses de contenido.",
    tags: ["Dirección creativa", "Moodboard", "Plan 3 meses"],
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Branding",
    cat: "Identidad",
    year: "2024",
    descripcion: "Identidad visual y verbal completa: naming, logotipo, sistema gráfico, paleta, tipografía y manual de marca aplicable a todos los puntos de contacto.",
    tags: ["Naming", "Sistema gráfico", "Manual de marca"],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Posicionamiento Online",
    cat: "Posicionamiento",
    year: "2024",
    descripcion: "Estrategia integral de contenido, redes sociales y publicidad pagada para construir autoridad en el sector.",
    tags: ["Contenido", "Ads", "SEO"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&q=75&auto=format&fit=crop"
  }
];

const PROYECTOS_EN = [
  {
    titulo: "My CFO",
    cat: "AI Solutions",
    producto: true,
    year: "2025",
    descripcion: "Personal-finance bot with automatic logging and reporting over WhatsApp. AI categorization and clear monthly reports — no spreadsheets.",
    tags: ["WhatsApp", "Auto-logging", "AI reports"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Wedding invitation — V&C",
    cat: "Web",
    year: "2025",
    descripcion: "Digital wedding invitation: an interactive envelope that opens with music, gallery, itinerary, RSVP, gift registry and AI-powered booking management. Designed and developed by Satori.",
    tags: ["Landing", "Digital invite", "RSVP", "AI booking"],
    video: "assets/showroom/invitacion-boda-famsalasglez-16x9.mp4",
    poster: "assets/showroom/invitacion-boda-famsalasglez-poster.jpg"
  },
  {
    titulo: "Esmeralda Lakes — Landing & Booking",
    cat: "Web",
    year: "2025",
    descripcion: "Bilingual landing with direct booking, calendar and Airbnb sync.",
    tags: ["Landing", "Booking", "Airbnb", "Bilingual"],
    url: "https://esmeraldalakes.com",
    video: "assets/showroom/landing-esmeralda-airbnb-green-16x9.mp4",
    poster: "assets/showroom/landing-esmeralda-airbnb-green-poster.jpg"
  },
  {
    titulo: "Landing Pages",
    cat: "Identity",
    year: "2025",
    descripcion: "High-conversion landing-page system for campaigns, events and invitations: copy, design, CRM-wired forms and continuous A/B testing.",
    tags: ["Events", "Invitations", "Campaigns"],
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Sales Bots",
    cat: "AI Solutions",
    year: "2025",
    descripcion: "Automated attention and prospecting on WhatsApp, Instagram and social: answers, books, qualifies leads, summarizes conversations into actionable bullets.",
    tags: ["WhatsApp Business", "Instagram", "Lead scoring"],
    img: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Photo session",
    cat: "Identity",
    year: "2024",
    descripcion: "Creative direction for brand photo sessions: moodboard, location, wardrobe and shot list. Material ready for 3 months of content.",
    tags: ["Creative direction", "Moodboard", "3-month plan"],
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Branding",
    cat: "Identity",
    year: "2024",
    descripcion: "Complete visual and verbal identity: naming, logo, graphic system, palette, typography and brand manual — ready to apply across every touchpoint.",
    tags: ["Naming", "Graphic system", "Brand manual"],
    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Online Positioning",
    cat: "Positioning",
    year: "2024",
    descripcion: "Integrated content, social and paid-media strategy to build sector authority.",
    tags: ["Content", "Ads", "SEO"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=720&q=75&auto=format&fit=crop"
  }
];

// ---------- HEADER ----------
function ProjectsHero() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "Selected work",
    title: "Projects.",
    accent: "Live.",
    sub: "A curated selection of what we've built — from our own products to client work. Each case, a clear path: identity → positioning → AI automation."
  } : {
    eyebrow: "Selección de trabajo",
    title: "Proyectos.",
    accent: "En vivo.",
    sub: "Una selección curada de lo que hemos construido — de productos propios a trabajo para clientes. Cada caso, una ruta clara: identidad → posicionamiento → automatización con IA."
  };
  return (
    <PageHero
      eyebrow={c.eyebrow}
      title={c.title}
      accent={c.accent}
      sub={c.sub}
    />
  );
}

// ---------- GRID (sin filtros) ----------
function ProjectsGrid() {
  const [lang] = useLang();
  const items = lang === "en" ? PROYECTOS_EN : PROYECTOS_ES;
  return (
    <section
      style={{
        padding: "3rem clamp(1.25rem,4vw,2.5rem) 5rem",
        background: `linear-gradient(180deg, ${SATORI.CREAM} 0%, ${SATORI.CREAM_2} 100%)`,
        position: "relative",
        zIndex: 1,
        borderTop: `1px solid ${SATORI.INK}08`
      }}
    >
      <div className="container">
        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem"
          }}
        >
          {items.map((p) => (
            <article
              key={p.titulo}
              data-card
              data-reveal
              className="project-card"
              style={{
                background: SATORI.WHITE,
                borderRadius: "22px",
                overflow: "hidden",
                border: `1px solid ${SATORI.INK}10`,
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
            >
              <div className="project-image" style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3", background: SATORI.INK }}>
                {p.video ? (
                  <video
                    src={p.video}
                    poster={p.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={p.titulo}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                ) : (
                  <img
                    src={p.img}
                    alt={p.titulo}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform 1s cubic-bezier(.2,.7,.2,1), filter .8s ease"
                    }}
                  />
                )}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 50%, ${SATORI.INK}55 100%)`,
                    pointerEvents: "none"
                  }}
                />
                <div
                  className="project-accent"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: SATORI.GOLD,
                    transform: "scaleX(0)",
                    transformOrigin: "left center",
                    transition: "transform .7s cubic-bezier(.2,.7,.2,1)"
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    color: SATORI.CREAM,
                    fontFamily: TYPE.mono,
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    opacity: 0.85
                  }}
                >
                  {p.year}
                </span>
                {p.producto && (
                  <span
                    style={{
                      position: "absolute",
                      top: "1rem",
                      left: "1rem",
                      background: SATORI.GOLD,
                      color: SATORI.INK,
                      fontFamily: TYPE.mono,
                      fontSize: "0.55rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      padding: "0.3rem 0.6rem",
                      borderRadius: "999px"
                    }}
                  >
                    {lang === "en" ? "Satori Product" : "Producto Satori"}
                  </span>
                )}
              </div>
              <div style={{ padding: "1.5rem 1.75rem 1.75rem", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: TYPE.display,
                    fontWeight: 500,
                    fontSize: "1.55rem",
                    lineHeight: 1.15,
                    margin: 0,
                    color: SATORI.INK,
                    letterSpacing: "-0.015em"
                  }}
                >
                  {p.titulo}
                </h3>
                <p
                  style={{
                    ...bodyStyle,
                    fontSize: "0.95rem",
                    marginTop: "0.65rem",
                    marginBottom: "1.25rem",
                    flex: 1
                  }}
                >
                  {p.descripcion}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    paddingTop: "1.25rem",
                    borderTop: `1px solid ${SATORI.INK}10`
                  }}
                >
                  {p.tags.map((m) => (
                    <span
                      key={m}
                      style={{
                        fontFamily: TYPE.mono,
                        fontSize: "0.6rem",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "999px",
                        background: `${SATORI.INK}06`,
                        color: SATORI.INK,
                        opacity: 0.85
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener"
                    style={{
                      marginTop: "1.1rem",
                      fontFamily: TYPE.mono,
                      fontSize: "0.66rem",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      color: SATORI.GOLD_DEEP,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem"
                    }}
                  >
                    {lang === "en" ? "View site" : "Ver sitio"} <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- METODOLOGÍA (horizontal animada) ----------
function Metodologia() {
  const [lang] = useLang();
  const pasosEs = [
    { key: "01", num: "01", label: "Inmersión", desc: "Sesión de 60 min para entender tu negocio." },
    { key: "02", num: "02", label: "Diagnóstico", desc: "Auditoría honesta de marca, presencia y conversión." },
    { key: "03", num: "03", label: "Plan", desc: "Ruta de 90 días con entregables y métricas claras." },
    { key: "04", num: "04", label: "Ejecución", desc: "Sprints de dos semanas, sin reuniones de relleno." }
  ];
  const pasosEn = [
    { key: "01", num: "01", label: "Immersion", desc: "60-min session to understand your business." },
    { key: "02", num: "02", label: "Diagnosis", desc: "Honest audit of brand, presence and conversion." },
    { key: "03", num: "03", label: "Plan", desc: "90-day roadmap with deliverables and clear metrics." },
    { key: "04", num: "04", label: "Execution", desc: "Two-week sprints, zero filler meetings." }
  ];
  const c = lang === "en" ? {
    eyebrow: "How we work",
    h1: "Same method in",
    h2: "every project."
  } : {
    eyebrow: "Cómo trabajamos",
    h1: "Misma metodología",
    h2: "en cada proyecto."
  };
  return (
    <section
      style={{
        padding: "5rem clamp(1.25rem,4vw,2.5rem) 6rem",
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
        <HorizontalTimeline items={lang === "en" ? pasosEn : pasosEs} />
      </div>
    </section>
  );
}

// ---------- APP ----------
function App() {
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

  const ctaTitulo = { es: "¿Tu proyecto es el siguiente?", en: "Is your project next?" };
  const ctaSub = {
    es: "Si te identificas con lo que ves, conversemos. 30 minutos, sin compromiso.",
    en: "If you connect with what you see, let's talk. 30 minutes, no commitment."
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: SATORI.CREAM }}>
      <MatrixBackground opacity={0.035} color={SATORI.GOLD} />
      <Nav current="productos" />
      <ProjectsHero />
      <ProjectsGrid />
      <Metodologia />
      <CtaBlock titulo={ctaTitulo} sub={ctaSub} />
      <Footer social="satori" />
      <MobileMenuFab current="productos" />
      <FloatingWhatsApp />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
