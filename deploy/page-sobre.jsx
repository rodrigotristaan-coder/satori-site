/* SATORI — Sobre Rodrigo (sobre-rodrigo.html)
   ES/EN. Milestones unificados (formación + carrera + rounds + emprendimientos).
*/

const { useState, useEffect } = React;

// ---------- HERO ----------
function AboutHero() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "About me",
    name: "Rodrigo",
    accent: "Tristán.",
    role: "Founder · Project Manager · Applied AI",
    p1: "I'm the bridge between strategic project management, deep business understanding and Artificial Intelligence applied to the enterprise.",
    p2: "I have led 40+ simultaneous projects, implemented continuous improvement methodologies, and operated every functional area of a business — marketing, sales, operations, HR and finance. SATORI is where all that learning lands at the service of entrepreneurs who value their time.",
    cta1: "Contact me",
    cta2: "Call me",
    find: "Find me",
    photoCaption: <React.Fragment>Satori. <span style={{ color: SATORI.GOLD }}>Sensei</span></React.Fragment>,
    photoYear: "ACTIVE"
  } : {
    eyebrow: "Sobre mí",
    name: "Rodrigo",
    accent: "Tristán.",
    role: "Fundador · Project Manager · IA aplicada",
    p1: "Soy el puente entre la gestión estratégica de proyectos, el entendimiento profundo del negocio y la Inteligencia Artificial aplicada a la empresa.",
    p2: "He liderado +40 proyectos simultáneos, implementado metodologías de mejora continua y operado cada área funcional de un negocio — marketing, ventas, operaciones, RRHH y finanzas. SATORI es donde todo ese aprendizaje aterriza al servicio de empresarios que valoran su tiempo.",
    cta1: "Contactarme",
    cta2: "Llamar",
    find: "Encuéntrame",
    photoCaption: <React.Fragment>Satori. <span style={{ color: SATORI.GOLD }}>Sensei</span></React.Fragment>,
    photoYear: "EN OPERACIÓN"
  };

  return (
    <section
      style={{
        padding: "10rem clamp(1.25rem,4vw,2.5rem) 5rem",
        position: "relative",
        zIndex: 1,
        background: `linear-gradient(180deg, ${SATORI.WHITE} 0%, ${SATORI.CREAM} 100%)`,
        borderBottom: `1px solid ${SATORI.INK}08`
      }}
    >
      <div
        className="container about-hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "4rem",
          alignItems: "center"
        }}
      >
        <div className="grid-2-inline" style={{ display: "contents" }}>
          <div className="fade-up">
            <p style={eyebrowStyle}>
              <span className="satori-rule" style={{ width: "18px" }} />
              {c.eyebrow}
            </p>
            <h1
              style={{
                fontFamily: TYPE.display,
                fontWeight: 500,
                fontSize: "clamp(2.6rem,8vw,5.6rem)",
                lineHeight: 0.98,
                letterSpacing: "-0.035em",
                margin: 0,
                color: SATORI.INK
              }}
            >
              {c.name}
              <br />
              <span style={{ color: SATORI.GOLD }}>{c.accent}</span>
            </h1>
            <p
              style={{
                fontFamily: TYPE.mono,
                fontSize: "0.78rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginTop: "1.5rem",
                opacity: 0.65
              }}
            >
              {c.role}
            </p>
            <p style={{ ...bodyStyle, fontSize: "1.15rem", marginTop: "2rem", maxWidth: "44ch" }}>
              {c.p1}
            </p>
            <p style={{ ...bodyStyle, marginTop: "1.25rem", maxWidth: "44ch" }}>
              {c.p2}
            </p>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
              <a href="#contacto" className="cta-btn-gold pulse-gold" style={btnGold}>
                <span>{c.cta1}</span>
                <span className="cta-arrow">→</span>
              </a>
              <a href="tel:+525625018281" className="cta-btn-ghost" style={btnGhost}>
                <span>{c.cta2}</span>
              </a>
            </div>

            <div style={{ marginTop: "2.5rem" }}>
              <p
                style={{
                  fontFamily: TYPE.mono,
                  fontSize: "0.62rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  opacity: 0.55,
                  marginBottom: "0.75rem"
                }}
              >
                {c.find}
              </p>
              <SocialRow links={SATORI.RRSS_RODRIGO} color={SATORI.INK} />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "420px",
                aspectRatio: "3/4",
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                background: SATORI.CREAM_2,
                boxShadow: "0 30px 80px -30px rgba(14,14,14,0.3)"
              }}
            >
              <img
                src="assets/rodrigo.webp"
                alt="Rodrigo Tristán"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(1) contrast(1.05)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "1.25rem",
                  left: "1.25rem",
                  right: "1.25rem",
                  padding: "0.9rem 1.1rem",
                  background: "rgba(244,244,242,0.88)",
                  backdropFilter: "blur(14px)",
                  borderRadius: "14px"
                }}
              >
                <div style={{ fontFamily: TYPE.mono, fontSize: "0.6rem", letterSpacing: "0.24em", opacity: 0.55 }}>
                  {c.photoYear}
                </div>
                <div style={{ fontFamily: TYPE.display, fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.1 }}>
                  {c.photoCaption}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- MILESTONES ----------
function Milestones() {
  const [lang] = useLang();

  // Visible years column: only show "2018", "2020", "2024", "Actualidad/Now".
  // Highlights in gold via `highlight: true` + optional `kpi` chip.
  const itemsEs = [
    { yearShown: "2018", title: "Cierre de bachillerato", desc: "Foundation. Primer contacto con mercadotecnia y negocios." },
    { title: "Primer rol en marketing", desc: "E-commerce desde cero en menos de 6 meses, rebranding y social ads." },
    { title: "Fundamentos del marketing", desc: "Estudios formales. Base técnica del oficio." },
    { yearShown: "2020", title: "1° Emprendimiento personal", desc: "Marca de joyería: branding, web, carrito y logística end-to-end.", highlight: true, kpi: "1° EMPRENDIMIENTO" },
    { title: "Sistema Comercial de Alto Impacto (SCAI)", desc: "Implementación de la metodología SCAI en 3+ empresas." },
    { title: "Digitalización con Power BI", desc: "Performance del equipo comercial en dashboards en vivo. De instinto a datos.", highlight: true, kpi: "POWER BI" },
    { title: "Cinta Negra 1° Dan · Taekwondo (2021)", desc: "Disciplina, control y mentalidad de largo plazo.", highlight: true, kpi: "🥋 1° DAN" },
    { title: "Entrenamiento estratégico · rotación 360°", desc: "Marketing, RRHH, ventas B2B, operaciones y embarques. Vista integral." },
    { yearShown: "2024", title: "Project Manager · Innovación y Desarrollo", desc: "+40 proyectos simultáneos, MS Project + Kaizen, reporte a Dirección General.", highlight: true, kpi: "+40 PROYECTOS · KAIZEN" },
    { title: "Campeón Nacional · Muay Thai IBMA (2024)", desc: "Categoría amateur. Foco y carácter aplicados fuera del ring.", highlight: true, kpi: "🥊 CAMPEÓN NACIONAL" },
    { title: "Graduado del programa Management Skills · ICAMI", desc: "Centro de perfeccionamiento directivo (2025–2026).", highlight: true, kpi: "ICAMI · GRADUADO" },
    { yearShown: "Actualidad", title: "Fundador SATORI", desc: "Estrategia digital, IA y operaciones para empresarios que valoran su tiempo.", highlight: true, kpi: "FUNDADOR" },
    { title: "Consultoría a negocios · Innovación e IA", desc: "Acompañamiento ejecutivo para integrar IA, estructurar operaciones y acelerar crecimiento.", highlight: true, kpi: "TU TURNO" }
  ];

  const itemsEn = [
    { yearShown: "2018", title: "High school complete", desc: "Foundation. First contact with marketing and business." },
    { title: "First marketing role", desc: "E-commerce from scratch in under 6 months, rebrand and social ads." },
    { title: "Marketing fundamentals", desc: "Formal studies. Technical base of the craft." },
    { yearShown: "2020", title: "First personal venture", desc: "Jewelry brand: branding, web, cart and end-to-end logistics.", highlight: true, kpi: "FIRST VENTURE" },
    { title: "High-Impact Sales System (SCAI)", desc: "SCAI methodology implemented across 3+ companies." },
    { title: "Digitization with Power BI", desc: "Sales-team performance in live dashboards. Gut to data.", highlight: true, kpi: "POWER BI" },
    { title: "1st Dan Black Belt · Taekwondo (2021)", desc: "Discipline, control and long-term mindset.", highlight: true, kpi: "🥋 1ST DAN" },
    { title: "Strategic training · 360° rotation", desc: "Marketing, HR, B2B sales, operations and shipping. Full-business view." },
    { yearShown: "2024", title: "Project Manager · Innovation & Development", desc: "40+ simultaneous projects, MS Project + Kaizen, reporting to General Management.", highlight: true, kpi: "+40 PROJECTS · KAIZEN" },
    { title: "National Champion · Muay Thai IBMA (2024)", desc: "Amateur category. Focus and character outside the ring.", highlight: true, kpi: "🥊 NATIONAL CHAMPION" },
    { title: "ICAMI Management Skills · graduate", desc: "Executive development center (2025–2026).", highlight: true, kpi: "ICAMI · GRADUATE" },
    { yearShown: "Now", title: "Founder of SATORI", desc: "Digital strategy, AI and operations for entrepreneurs who value their time.", highlight: true, kpi: "FOUNDER" },
    { title: "Business consulting · Innovation & AI", desc: "Executive accompaniment to integrate AI, structure operations and accelerate growth.", highlight: true, kpi: "YOUR MOVE" }
  ];

  const items = lang === "en" ? itemsEn : itemsEs;

  const T = lang === "en" ? {
    eyebrow: "Trajectory",
    title: "Milestones in",
    accent: "my journey.",
    sub: "From the agency floor to in-house operations to founder. Milestone by milestone — no filler."
  } : {
    eyebrow: "Trayectoria",
    title: "Milestones en",
    accent: "mi trayectoria.",
    sub: "De agencia, in-house y como fundador. Un milestone a la vez, sin relleno."
  };

  return (
    <section
      id="trayectoria"
      style={{
        padding: "7rem clamp(1.25rem,4vw,2.5rem)",
        background: `linear-gradient(180deg, ${SATORI.CREAM} 0%, ${SATORI.CREAM_2} 100%)`,
        borderTop: `1px solid ${SATORI.INK}08`,
        position: "relative",
        zIndex: 1
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={eyebrowStyle}>
            <span className="satori-rule" style={{ width: "18px" }} />
            {T.eyebrow}
          </p>
          <h2 style={h2Style} data-reveal>
            {T.title} <span style={{ color: SATORI.GOLD }}>{T.accent}</span>
          </h2>
          <p style={{ ...bodyStyle, maxWidth: "52ch", margin: "1.25rem auto 0" }}>
            {T.sub}
          </p>
        </div>

        <InteractiveTimeline items={items} />
      </div>
    </section>
  );
}

// Interactive milestone timeline with scroll progress, hover and click-to-expand.
function InteractiveTimeline({ items }) {
  const rootRef = React.useRef(null);
  const [progress, setProgress] = useState(0);
  const [openIdx, setOpenIdx] = useState(-1);
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
      const p = Math.max(0, Math.min(1, passed / total));
      setProgress(p);

      // Determine active milestone by finding row closest to focus line (~45% viewport)
      const focusY = viewportH * 0.45;
      let bestIdx = 0;
      let bestDist = Infinity;
      rowRefs.current.forEach((row, i) => {
        if (!row) return;
        const r = row.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - focusY);
        if (dist < bestDist) {
          bestDist = dist;
          bestIdx = i;
        }
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
    <div ref={rootRef} style={{ position: "relative", maxWidth: "960px", margin: "0 auto" }}>
      {/* base spine */}
      <div
        style={{
          position: "absolute",
          left: "140px",
          top: 0,
          bottom: 0,
          width: "1px",
          background: `${SATORI.INK}15`
        }}
        className="timeline-spine"
      />
      {/* gold progress spine */}
      <div
        style={{
          position: "absolute",
          left: "139px",
          top: 0,
          height: `${progress * 100}%`,
          width: "3px",
          background: `linear-gradient(180deg, ${SATORI.GOLD} 0%, #C9920A 100%)`,
          boxShadow: `0 0 14px ${SATORI.GOLD}88`,
          transition: "height .15s linear",
          borderRadius: "2px"
        }}
        className="timeline-spine"
        aria-hidden="true"
      />

      {items.map((it, i) => {
        const isOpen = openIdx === i;
        const isHover = hoverIdx === i;
        const isActive = activeIdx === i;
        return (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="timeline-row"
            data-reveal
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(-1)}
            onClick={() => setOpenIdx(isOpen ? -1 : i)}
            style={{
              display: "grid",
              gridTemplateColumns: "140px 1fr",
              gap: "2.5rem",
              paddingBottom: "2.5rem",
              position: "relative",
              cursor: "pointer"
            }}
          >
            {/* year column */}
            <div
              className="timeline-year-col"
              style={{
                fontFamily: TYPE.display,
                fontSize: it.yearShown ? "1.55rem" : "1rem",
                fontWeight: 500,
                color: it.yearShown
                  ? (it.highlight ? SATORI.GOLD : SATORI.INK)
                  : "transparent",
                textAlign: "right",
                paddingTop: it.yearShown ? "0.25rem" : "0.95rem",
                letterSpacing: "-0.01em",
                position: "relative",
                transition: "transform .35s cubic-bezier(.2,.9,.3,1.4)",
                transform: isHover ? "translateX(-4px)" : "translateX(0)"
              }}
            >
              {it.yearShown || "·"}
              {!it.yearShown && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translate(50%, -50%)",
                    width: "4px",
                    height: "4px",
                    borderRadius: "999px",
                    background: `${SATORI.INK}25`
                  }}
                />
              )}
            </div>
            {/* content */}
            <div
              className="timeline-content"
              style={{
                position: "relative",
                paddingLeft: "2rem",
                padding: "0.65rem 1rem 0.65rem 2rem",
                borderRadius: "14px",
                background: isActive ? `${SATORI.GOLD}10` : (isHover || isOpen ? `${SATORI.GOLD}06` : "transparent"),
                transition: "background .35s ease, transform .35s cubic-bezier(.2,.9,.3,1.4)",
                transform: isHover ? "translateX(4px)" : "translateX(0)"
              }}
            >
              {/* node */}
              <div
                style={{
                  position: "absolute",
                  left: "-7px",
                  top: "1.05rem",
                  width: isActive || isHover || isOpen ? "18px" : "14px",
                  height: isActive || isHover || isOpen ? "18px" : "14px",
                  borderRadius: "999px",
                  background: isActive || it.highlight ? SATORI.GOLD : SATORI.WHITE,
                  border: `2px solid ${isActive || it.highlight ? SATORI.GOLD : SATORI.INK}`,
                  boxShadow: isActive
                    ? `0 0 0 14px ${SATORI.GOLD}30, 0 0 28px ${SATORI.GOLD}60`
                    : (it.highlight
                        ? `0 0 0 ${isHover || isOpen ? "12px" : "8px"} ${SATORI.GOLD}28`
                        : (isHover || isOpen ? `0 0 0 6px ${SATORI.INK}15` : "none")),
                  transition: "all .35s cubic-bezier(.2,.9,.3,1.4)",
                  zIndex: 2
                }}
              />
              <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
                {it.kpi && (
                  <span
                    style={{
                      fontFamily: TYPE.mono,
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      padding: "0.3rem 0.75rem",
                      borderRadius: "999px",
                      background: SATORI.GOLD,
                      color: SATORI.CREAM,
                      transform: isHover || isActive ? "scale(1.05)" : "scale(1)",
                      transition: "transform .35s cubic-bezier(.2,.9,.3,1.4)"
                    }}
                  >
                    {it.kpi}
                  </span>
                )}
              </div>
              <h3
                style={{
                  fontFamily: TYPE.display,
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                  lineHeight: 1.2,
                  marginTop: it.kpi ? "0.65rem" : 0,
                  marginBottom: 0,
                  maxWidth: "60ch",
                  fontSize: "clamp(1.1rem, 1.7vw, 1.25rem)",
                  color: isActive ? SATORI.INK : `${SATORI.INK}55`,
                  filter: isActive ? "none" : "saturate(0.6)",
                  transition: "color .35s ease, filter .35s ease"
                }}
              >
                {it.desc}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// (interactive timeline ends; mobile responsive css carried by satori-shared.css)

// ---------- RECOMENDACIÓN (con quotes animadas en amarillo) ----------
function Recomendacion() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "Professional recommendation",
    title: "A director's",
    accent: "voice.",
    quote: <React.Fragment>
      Rodrigo stood out for his <strong style={{ color: SATORI.GOLD }}>commitment, work ethic and ability to lead complex projects</strong>. His skill at coordinating multidisciplinary teams, planning tasks, anticipating risks and keeping clear communication was fundamental to reaching strategic objectives.
      <br /><br />
      He's a man of integrity, reliable and dedicated. His presence raised the workplace atmosphere and made a very valuable impact on the team. I'm convinced he'll deliver the same level of excellence, commitment and leadership in any organization where he decides to continue his professional development.
    </React.Fragment>,
    role: "Chief Marketing Officer",
    badge: "ORIGINAL LETTER"
  } : {
    eyebrow: "Recomendación profesional",
    title: "La voz de un",
    accent: "director.",
    quote: <React.Fragment>
      Rodrigo destacó por su <strong style={{ color: SATORI.GOLD }}>compromiso, ética de trabajo y capacidad para liderar proyectos complejos</strong>. Su habilidad para coordinar equipos multidisciplinarios, planear tareas, anticipar riesgos y mantener una comunicación clara fue fundamental para alcanzar los objetivos estratégicos.
      <br /><br />
      Es un <strong style={{ color: SATORI.GOLD }}>hombre íntegro, confiable y dedicado</strong>. Su presencia elevó el ambiente laboral y generó un impacto muy valioso en el equipo. Estoy convencido de que aportará el mismo nivel de <strong style={{ color: SATORI.GOLD }}>excelencia, compromiso y liderazgo</strong> en cualquier organización donde decida continuar su desarrollo profesional.
    </React.Fragment>,
    role: "Dirección de Mercadotecnia",
    badge: "CARTA ORIGINAL"
  };

  return (
    <section
      style={{
        padding: "7rem clamp(1.25rem,4vw,2.5rem)",
        background: `linear-gradient(180deg, ${SATORI.CREAM_2} 0%, ${SATORI.CREAM} 100%)`,
        borderTop: `1px solid ${SATORI.INK}08`,
        position: "relative",
        zIndex: 1,
        overflow: "hidden"
      }}
    >
      {/* Floating quote glyphs (animated, amarillo) */}
      <FloatingQuotes />

      <div className="container-narrow" style={{ position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={eyebrowStyle}>
            <span className="satori-rule" style={{ width: "18px" }} />
            {c.eyebrow}
          </p>
          <h2 style={{ ...h2Style, fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)" }} data-reveal>
            {c.title} <span style={{ color: SATORI.GOLD }}>{c.accent}</span>
          </h2>
        </div>
        <article
          data-card
          data-reveal
          style={{
            background: SATORI.WHITE,
            border: `1px solid ${SATORI.INK}10`,
            borderRadius: "24px",
            padding: "3rem clamp(1.5rem, 4vw, 3rem)",
            position: "relative",
            overflow: "hidden",
            backdropFilter: "blur(8px)"
          }}
        >
          {/* big static quote glyph as decoration */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-2.5rem",
              left: "1rem",
              fontFamily: TYPE.display,
              fontSize: "clamp(3.5rem, 16vw, 12rem)",
              lineHeight: 1,
              color: SATORI.GOLD,
              opacity: 0.18,
              pointerEvents: "none",
              userSelect: "none"
            }}
          >
            "
          </span>

          <blockquote
            style={{
              margin: 0,
              fontFamily: TYPE.display,
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              lineHeight: 1.55,
              fontWeight: 400,
              color: SATORI.INK,
              letterSpacing: "-0.005em",
              position: "relative"
            }}
          >
            {c.quote}
          </blockquote>

          <div
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.75rem",
              borderTop: `1px solid ${SATORI.INK}10`,
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap"
            }}
          >
            <div
              style={{
                width: "52px",
                height: "52px",
                borderRadius: "999px",
                background: `${SATORI.GOLD}18`,
                color: SATORI.GOLD,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: TYPE.display,
                fontSize: "1.2rem",
                fontWeight: 500
              }}
            >
              LV
            </div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div
                style={{
                  fontFamily: TYPE.body,
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: SATORI.INK
                }}
              >
                Luis Alberto Vargas
              </div>
              <div
                style={{
                  fontFamily: TYPE.mono,
                  fontSize: "0.66rem",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: SATORI.INK,
                  opacity: 0.6,
                  marginTop: "0.25rem"
                }}
              >
                {c.role}
              </div>
            </div>
            <span
              style={{
                fontFamily: TYPE.mono,
                fontSize: "0.6rem",
                letterSpacing: "0.22em",
                color: SATORI.GOLD,
                padding: "0.4rem 0.9rem",
                borderRadius: "999px",
                background: `${SATORI.GOLD}15`
              }}
            >
              {c.badge}
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}

// Floating, drifting yellow quote glyphs that move slowly across the section
function FloatingQuotes() {
  const glyphs = [
    { ch: "\u201C", left: "5%", top: "12%", size: "clamp(3.5rem, 16vw, 12rem)", dur: "26s", delay: "0s", opacity: 0.10 },
    { ch: "\u201D", left: "82%", top: "8%", size: "9rem", dur: "32s", delay: "4s", opacity: 0.09 },
    { ch: "\u201C", left: "70%", top: "62%", size: "14rem", dur: "38s", delay: "2s", opacity: 0.07 },
    { ch: "\u201D", left: "10%", top: "70%", size: "8rem", dur: "30s", delay: "6s", opacity: 0.12 }
  ];
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {glyphs.map((g, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: g.left,
            top: g.top,
            fontFamily: TYPE.display,
            fontWeight: 500,
            fontSize: g.size,
            lineHeight: 1,
            color: SATORI.GOLD,
            opacity: g.opacity,
            transformOrigin: "center",
            animation: `quoteDrift ${g.dur} ease-in-out ${g.delay} infinite alternate`
          }}
        >
          {g.ch}
        </span>
      ))}
      <style>{`
        @keyframes quoteDrift {
          0%   { transform: translate(0, 0) rotate(-6deg); }
          50%  { transform: translate(40px, -20px) rotate(6deg); }
          100% { transform: translate(-30px, 25px) rotate(-3deg); }
        }
      `}</style>
    </div>
  );
}

// ---------- FORMULARIO + CALENDLY COMPACTO ----------
function ContactForm() {
  const [lang] = useLang();
  const [sent, setSent] = useState(false);
  const c = lang === "en" ? {
    eyebrow: "Let's talk",
    title: "Reach",
    accent: "out.",
    sub: "Fill out the form or book directly. I reply personally within 24 business hours.",
    method_email: "EMAIL",
    method_wa: "WHATSAPP",
    method_zoom: "FORM",
    method_zoom_value: "Send a message",
    f_name: "Name",
    f_name_ph: "Your name",
    f_company: "Company",
    f_company_ph: "My business",
    f_email: "Email",
    f_phone: "WhatsApp",
    f_budget: "Approx. budget",
    f_budget_ph: "Choose a range…",
    f_message: "Tell me about your project",
    f_message_ph: "What you do, where you are today and what you want to solve.",
    submit: "Send via WhatsApp →",
    submit_sent: "Sent ✓",
    privacy: "Privacy notice",
    calendly_label: "DIRECT CONTACT",
    contact_form_note: "Prefer a form? Scroll down for the full message form below.",
    contact_form_cta: "Open form",
    budgets: [
      "Less than $20,000 MXN/month",
      "$20,000 – $50,000 MXN/month",
      "$50,000 – $120,000 MXN/month",
      "More than $120,000 MXN/month",
      "Not sure yet"
    ]
  } : {
    eyebrow: "Platiquemos",
    title: "Contáctame",
    accent: "directo.",
    sub: "Llena el formulario o agenda directo. Respondo personalmente en menos de 24 horas hábiles.",
    method_email: "EMAIL",
    method_wa: "WHATSAPP",
    method_zoom: "FORMULARIO",
    method_zoom_value: "Enviar mensaje",
    f_name: "Nombre",
    f_name_ph: "Tu nombre",
    f_company: "Empresa",
    f_company_ph: "Mi negocio",
    f_email: "Email",
    f_phone: "WhatsApp",
    f_budget: "Presupuesto aproximado",
    f_budget_ph: "Selecciona un rango…",
    f_message: "Cuéntame tu proyecto",
    f_message_ph: "A qué te dedicas, dónde estás hoy y qué quieres resolver.",
    submit: "Enviar por WhatsApp →",
    submit_sent: "Enviado ✓",
    privacy: "Aviso de privacidad",
    calendly_label: "CONTACTO DIRECTO",
    contact_form_note: "¿Prefieres el formulario? Baja para el mensaje completo.",
    contact_form_cta: "Ir al formulario",
    budgets: [
      "Hasta $20,000 MXN/mes",
      "$20,000 – $50,000 MXN/mes",
      "$50,000 – $120,000 MXN/mes",
      "Más de $120,000 MXN/mes",
      "Aún no lo sé"
    ]
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const nombre = data.get("nombre") || "";
    const empresa = data.get("empresa") || "";
    const mensaje = data.get("mensaje") || "";
    const presupuesto = data.get("presupuesto") || "";
    // keepalive: el lead se envía aunque naveguemos a la página de gracias
    fetch(N8N_FORM_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({
        nombre, empresa, presupuesto, mensaje,
        pagina: typeof document !== "undefined" ? document.title : "",
        url: typeof location !== "undefined" ? location.href : ""
      })
    }).catch(() => {});
    window.location.href = "gracias.html";
  };

  return (
    <section
      id="contacto"
      style={{
        padding: "7rem clamp(1.25rem,4vw,2.5rem)",
        position: "relative",
        zIndex: 1,
        background: SATORI.CREAM,
        borderTop: `1px solid ${SATORI.INK}08`
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={eyebrowStyle}>
            <span className="satori-rule" style={{ width: "18px" }} />
            {c.eyebrow}
          </p>
          <h2 style={h2Style} data-reveal>
            {c.title} <span style={{ color: SATORI.GOLD }}>{c.accent}</span>
          </h2>
          <p style={{ ...bodyStyle, maxWidth: "48ch", margin: "1.25rem auto 0" }}>
            {c.sub}
          </p>
        </div>

        <div
          className="contact-methods"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1rem",
            marginBottom: "2rem",
            maxWidth: "1100px",
            marginLeft: "auto",
            marginRight: "auto"
          }}
        >
          {[
            [c.method_email, SATORI.EMAIL, `mailto:${SATORI.EMAIL}`, "✉"],
            [c.method_wa, "+52 56 2501 8281", SATORI.WHATSAPP, "✆"],
            [c.method_zoom, c.method_zoom_value, "#contacto", "▸"]
          ].map(([label, value, href, glyph]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-card
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.1rem 1.25rem",
                borderRadius: "16px",
                background: SATORI.WHITE,
                border: `1px solid ${SATORI.INK}10`
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "44px",
                  height: "44px",
                  flexShrink: 0,
                  borderRadius: "999px",
                  background: `${SATORI.GOLD}15`,
                  color: SATORI.GOLD,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                  fontFamily: TYPE.display
                }}
              >
                {glyph}
              </span>
              <div>
                <div style={{ fontFamily: TYPE.mono, fontSize: "0.58rem", letterSpacing: "0.28em", color: SATORI.GOLD, marginBottom: "0.2rem" }}>
                  {label}
                </div>
                <div style={{ fontFamily: TYPE.body, fontSize: "0.98rem", fontWeight: 400, color: SATORI.INK }}>
                  {value}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div
          className="form-grid"
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            gap: "1.25rem",
            alignItems: "stretch"
          }}
        >
          <form
            onSubmit={onSubmit}
            style={{
              padding: "2.25rem",
              background: SATORI.WHITE,
              borderRadius: "24px",
              border: `1px solid ${SATORI.INK}10`,
              display: "flex",
              flexDirection: "column",
              gap: "1.1rem"
            }}
          >
            <div className="grid-2-tight" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <label>
                <span className="satori-label">{c.f_name}</span>
                <input className="satori-input" name="nombre" required placeholder={c.f_name_ph} />
              </label>
              <label>
                <span className="satori-label">{c.f_company}</span>
                <input className="satori-input" name="empresa" placeholder={c.f_company_ph} />
              </label>
            </div>
            <div className="grid-2-tight" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
              <label>
                <span className="satori-label">{c.f_email}</span>
                <input className="satori-input" name="email" type="email" required placeholder="correo@ejemplo.com" />
              </label>
              <label>
                <span className="satori-label">{c.f_phone}</span>
                <input className="satori-input" name="telefono" type="tel" placeholder="+52 55 1234 5678" />
              </label>
            </div>
            <label>
              <span className="satori-label">{c.f_budget}</span>
              <select className="satori-select" name="presupuesto" defaultValue="">
                <option value="" disabled>{c.f_budget_ph}</option>
                {c.budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </label>
            <label style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <span className="satori-label">{c.f_message}</span>
              <textarea
                className="satori-textarea"
                name="mensaje"
                rows={4}
                placeholder={c.f_message_ph}
                style={{ flex: 1, minHeight: "120px", resize: "vertical" }}
              />
            </label>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
              <button type="submit" className="cta-btn-gold" style={{ ...btnPrimary, border: "none" }}>
                {sent ? c.submit_sent : c.submit}
              </button>
              <p style={{ fontFamily: TYPE.mono, fontSize: "0.6rem", letterSpacing: "0.22em", opacity: 0.55, margin: 0 }}>
                <a href="privacidad.html" style={{ color: SATORI.INK }}>{c.privacy}</a>
              </p>
            </div>
          </form>

          <div
            style={{
              background: SATORI.WHITE,
              borderRadius: "24px",
              border: `1px solid ${SATORI.INK}10`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column"
            }}
          >
          <div
            style={{
              padding: "1rem 1.25rem",
              borderBottom: `1px solid ${SATORI.INK}10`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <div style={{ fontFamily: TYPE.mono, fontSize: "0.6rem", letterSpacing: "0.28em", color: SATORI.GOLD }}>
              {c.calendly_label}
            </div>
          </div>
          <div style={{
            padding: "2.5rem 1.75rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            minHeight: "460px",
            textAlign: "center"
          }}>
            <p style={{ ...bodyStyle, opacity: 0.7, maxWidth: "28ch", margin: 0 }}>
              {c.contact_form_note}
            </p>
            <a
              href="#contacto"
              style={{
                ...btnGold,
                marginTop: "0.5rem"
              }}
            >
              {c.contact_form_cta} →
            </a>
          </div>
        </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-methods { grid-template-columns: 1fr !important; }
          .form-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .grid-2-tight { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ---------- APP ----------
function App() {
  const [lang] = useLang();
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
  }, [lang]);

  const ctaTitulo = { es: "¿Conversamos?", en: "Shall we talk?" };
  const ctaSub = {
    es: "Una llamada de 30 minutos. Si encajamos, seguimos. Si no, te quedas con claridad.",
    en: "A 30-minute call. If we click, we continue. If not, you leave with clarity."
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: SATORI.CREAM }}>
      <MatrixBackground opacity={0.035} color={SATORI.GOLD} />
      <Nav current="sobre" />
      <AboutHero />
      <Milestones />
      <Recomendacion />
      <CtaBlock titulo={ctaTitulo} sub={ctaSub} />
      <Footer social="rodrigo" />
      <MobileMenuFab current={"sobre"} />
      <FloatingWhatsApp />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
