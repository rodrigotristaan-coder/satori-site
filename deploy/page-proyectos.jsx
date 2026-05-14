/* SATORI — Proyectos (proyectos.html) */


const { useState, useEffect } = React;

const PROYECTOS = [
  {
    titulo: "Bot IA Finanzas",
    cat: "Soluciones IA",
    year: "2025",
    descripcion: "Asistente conversacional para finanzas personales: registro de gastos por voz, categorización automática y reportes mensuales por WhatsApp.",
    tags: ["WhatsApp", "Categorización IA", "Reportes auto"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Landing Pages",
    cat: "Identidad",
    year: "2025",
    descripcion: "Sistema de landings de alta conversión: copy, diseño, formularios conectados a CRM y experimentación A/B continua.",
    tags: ["Copy + diseño", "A/B testing", "CRM-ready"],
    img: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Resumidor de WhatsApp",
    cat: "Soluciones IA",
    year: "2025",
    descripcion: "IA que resume grupos y chats largos en bullets accionables. Filtra ruido, deja lo importante en formato listo para decidir.",
    tags: ["IA conversacional", "Grupos", "Bullets"],
    img: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Branding · Sesión de fotos",
    cat: "Identidad",
    year: "2024",
    descripcion: "Dirección creativa para sesiones de marca: moodboard, locación, vestuario y guion de tomas. Identidad lista para 3 meses de contenido.",
    tags: ["Dirección creativa", "Moodboard", "Plan 3 meses"],
    img: "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=720&q=75&auto=format&fit=crop"
  },
  {
    titulo: "Bot de Ventas de Redes Sociales",
    cat: "Soluciones IA",
    year: "2024",
    descripcion: "Atención y prospección automatizada en Instagram y WhatsApp con calificación de leads y agenda directa al calendario.",
    tags: ["Instagram", "Auto-agenda", "Lead scoring"],
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=720&q=75&auto=format&fit=crop"
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

const CATEGORIAS = ["Todos", "Identidad", "Posicionamiento", "Soluciones IA"];

// ---------- HEADER ----------
function ProjectsHero() {
  return (
    <PageHero
      eyebrow="Selección de trabajo"
      title="Proyectos."
      accent="En vivo."
      sub="Una selección curada de lo que hemos construido. Cada caso, una ruta clara: identidad → posicionamiento → automatización con IA."
    />
  );
}

// ---------- FILTROS + GRID ----------
function ProjectsGrid() {
  const [cat, setCat] = useState("Todos");
  const filtered = cat === "Todos" ? PROYECTOS : PROYECTOS.filter((p) => p.cat === cat);

  return (
    <section
      style={{
        padding: "5rem clamp(1.25rem,4vw,2.5rem) 7rem",
        background: `linear-gradient(180deg, ${SATORI.CREAM} 0%, ${SATORI.CREAM_2} 100%)`,
        position: "relative",
        zIndex: 1,
        borderTop: `1px solid ${SATORI.INK}08`
      }}
    >
      <div className="container">
        {/* filtros */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "3.5rem"
          }}
        >
          {CATEGORIAS.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  padding: "0.7rem 1.4rem",
                  borderRadius: "999px",
                  background: active ? SATORI.INK : SATORI.WHITE,
                  color: active ? SATORI.CREAM : SATORI.INK,
                  border: `1px solid ${active ? SATORI.INK : SATORI.INK + "20"}`,
                  fontFamily: TYPE.mono,
                  fontSize: "0.66rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  fontWeight: 500
                }}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* grid */}
        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem"
          }}
        >
          {filtered.map((p) => (
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
              <div className="project-image" style={{ position: "relative", overflow: "hidden", aspectRatio: "4/3" }}>
                <img
                  src={p.img}
                  alt={p.titulo}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 1s cubic-bezier(.2,.7,.2,1), filter .8s ease"
                  }}
                />
                {/* dark gradient overlay */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(180deg, transparent 50%, ${SATORI.INK}55 100%)`,
                    pointerEvents: "none"
                  }}
                />
                {/* gold accent line at bottom (animates in on hover) */}
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
                {/* corner category chip */}
                <span
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    padding: "0.35rem 0.75rem",
                    borderRadius: "999px",
                    background: "rgba(14,14,14,0.55)",
                    backdropFilter: "blur(10px)",
                    color: SATORI.CREAM,
                    fontFamily: TYPE.mono,
                    fontSize: "0.58rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase"
                  }}
                >
                  {p.cat}
                </span>
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
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p style={{ ...bodyStyle, textAlign: "center", marginTop: "3rem" }}>
            Aún no hay proyectos públicos en esta categoría.
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- METODOLOGÍA (horizontal animada) ----------
function Metodologia() {
  const pasos = [
    { key: "01", num: "01", label: "Inmersión", desc: "Sesión de 60 min para entender tu negocio." },
    { key: "02", num: "02", label: "Diagnóstico", desc: "Auditoría honesta de marca, presencia y conversión." },
    { key: "03", num: "03", label: "Plan", desc: "Ruta de 90 días con entregables y métricas claras." },
    { key: "04", num: "04", label: "Ejecución", desc: "Sprints de dos semanas, sin reuniones de relleno." }
  ];
  return (
    <section
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
            Cómo trabajamos
          </p>
          <h2 style={h2Style} data-reveal>
            Misma metodología <span style={{ color: SATORI.GOLD }}>en cada proyecto.</span>
          </h2>
        </div>
        <HorizontalTimeline items={pasos} />
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

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: SATORI.CREAM }}>
      <MatrixBackground opacity={0.035} color={SATORI.GOLD} />
      <Nav current="proyectos" />
      <ProjectsHero />
      <ProjectsGrid />
      <Metodologia />
      <CtaBlock
        titulo="¿Tu proyecto es el siguiente?"
        sub="Si te identificas con lo que ves, conversemos. 30 minutos, sin compromiso."
      />
      <Footer social="satori" />
      <FloatingWhatsApp />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
