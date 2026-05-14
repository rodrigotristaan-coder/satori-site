/* SATORI — Servicios (servicios.html) */


const { useState, useEffect } = React;

const SERVICIOS_EN = [
  {
    num: "01",
    tag: "Brand",
    titulo: "Own brand",
    subtitulo: "Identity · Presence · Authority",
    descripcion: "The identity a serious entrepreneur deserves. We define how you look, sound and how you're remembered.",
    benefits: [
      "Naming, manual and brand kit",
      "Complete visual & verbal identity",
      "CEO positioning",
      "Templates for the whole team"
    ],
    img: "assets/marca-propia.png"
  },
  {
    num: "02",
    tag: "Image",
    titulo: "Online positioning",
    subtitulo: "Reputation · Visibility · Trust",
    descripcion: "Your company in front of the right people. We build real authority, not vanity metrics.",
    benefits: [
      "Social media management",
      "Paid advertising & campaigns",
      "SEO & organic content",
      "Verifiable reputation"
    ],
    img: "assets/posicionamiento.png"
  },
  {
    num: "03",
    tag: "AI",
    titulo: "AI Solutions",
    subtitulo: "Automation · Data · Scale",
    descripcion: "Custom tools that automate tasks, attend clients and summarize information non-stop.",
    benefits: [
      "Personal finance bots",
      "Automated news for your sector",
      "WhatsApp chat & group summaries",
      "Sales bots on social media"
    ],
    img: "assets/marketing-ia.png"
  }
];

const PAQUETES_EN = [
  {
    nombre: "Essential",
    descripcion: "For those building their first serious digital presence.",
    features: [
      "Basic identity and brand manual",
      "2 social media channels managed",
      "8 posts / month",
      "Monthly report",
      "WhatsApp support"
    ],
    cta: "Quote Essential",
    tono: "claro"
  },
  {
    nombre: "Professional",
    descripcion: "For entrepreneurs who need to accelerate brand, content and acquisition.",
    features: [
      "Complete identity + CEO positioning",
      "3 channels + LinkedIn",
      "16 posts / month + reels",
      "1 active ads campaign",
      "Basic WhatsApp automation",
      "Bi-weekly meeting with Rodrigo"
    ],
    cta: "Quote Professional",
    tono: "oro",
    destacado: true
  },
  {
    nombre: "Premium AI",
    descripcion: "Complete digital operation for companies growing seriously.",
    features: [
      "Everything in Professional",
      "AI Solutions implemented",
      "Multi-channel campaigns",
      "CRM and automated funnels",
      "SEO & positioning",
      "Weekly meetings + direct Slack"
    ],
    cta: "Quote Premium",
    tono: "oscuro"
  }
];

const SERVICIOS = [
  {
    num: "01",
    tag: "Marca",
    titulo: "Marca propia",
    subtitulo: "Identidad · Presencia · Autoridad",
    descripcion: "La identidad que un empresario serio merece. Definimos cómo te ves, cómo suenas y cómo te recuerdan.",
    benefits: [
      "Naming, manual y kit de marca",
      "Identidad visual y verbal completa",
      "Posicionamiento de CEO",
      "Plantillas para todo el equipo"
    ],
    img: "assets/marca-propia.png"
  },
  {
    num: "02",
    tag: "Imagen",
    titulo: "Posicionamiento online",
    subtitulo: "Reputación · Visibilidad · Confianza",
    descripcion: "Tu empresa frente a las personas correctas. Construimos autoridad real, no métricas de vanidad.",
    benefits: [
      "Gestión de redes sociales",
      "Publicidad pagada y campañas",
      "SEO y contenido orgánico",
      "Reputación verificable"
    ],
    img: "assets/posicionamiento.png"
  },
  {
    num: "03",
    tag: "IA",
    titulo: "Soluciones con IA",
    subtitulo: "Automatización · Datos · Escala",
    descripcion: "Herramientas a tu medida que automatizan tareas, atienden clientes y resumen información sin parar.",
    benefits: [
      "Bots de finanzas personales",
      "Noticias automatizadas de tu sector",
      "Resúmenes de chats y grupos de WhatsApp",
      "Bots de venta en redes sociales"
    ],
    img: "assets/marketing-ia.png"
  }
];

const PAQUETES = [
  {
    nombre: "Esencial",
    descripcion: "Para quienes están construyendo su primera presencia digital seria.",
    features: [
      "Identidad básica y manual de marca",
      "Gestión de 2 redes sociales",
      "8 publicaciones / mes",
      "Reporte mensual",
      "Soporte por WhatsApp"
    ],
    cta: "Cotizar Esencial",
    tono: "claro"
  },
  {
    nombre: "Profesional",
    descripcion: "Para empresarios que necesitan acelerar marca, contenido y captación.",
    features: [
      "Identidad completa + posicionamiento CEO",
      "Gestión de 3 redes + LinkedIn",
      "16 publicaciones / mes + reels",
      "1 campaña de ads activa",
      "Automatización WhatsApp básica",
      "Reunión quincenal con Rodrigo"
    ],
    cta: "Cotizar Profesional",
    tono: "oro",
    destacado: true
  },
  {
    nombre: "Premium IA",
    descripcion: "Operación digital completa para empresas en crecimiento serio.",
    features: [
      "Todo lo de Profesional",
      "Soluciones con IA implementadas",
      "Campañas multi-canal",
      "CRM y embudos automatizados",
      "SEO y posicionamiento",
      "Reuniones semanales y Slack directo"
    ],
    cta: "Cotizar Premium",
    tono: "oscuro"
  }
];

// ---------- HERO ----------
function ServiciosHero() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "Three solutions. One partner.",
    title: "Services.",
    accent: "With criterion.",
    sub: "Each service is designed for entrepreneurs who grow with strategy. Start with what you need today and we scale when it makes sense."
  } : {
    eyebrow: "Tres soluciones. Un socio.",
    title: "Servicios.",
    accent: "Con criterio.",
    sub: "Cada servicio está diseñado para empresarios que crecen con estrategia. Empieza por lo que necesitas hoy y escalamos cuando tenga sentido."
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

// ---------- SERVICIOS DETALLE (más compactos, animados) ----------
function ServiciosDetalle() {
  const [lang] = useLang();
  const list = lang === "en" ? SERVICIOS_EN : SERVICIOS;
  const ctaInteresa = lang === "en" ? "I'm interested" : "Me interesa";
  return (
    <section
      id="detalle"
      style={{
        background: `linear-gradient(180deg, ${SATORI.CREAM} 0%, ${SATORI.CREAM_2} 100%)`,
        padding: "5rem clamp(1.25rem,4vw,2.5rem) 7rem",
        borderTop: `1px solid ${SATORI.INK}08`,
        position: "relative",
        zIndex: 1
      }}
    >
      <div
        className="container grid-3"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem"
        }}
      >
        {list.map((s, i) => (
          <article
            key={s.num}
            data-reveal
            className="service-card"
            style={{
              background: SATORI.WHITE,
              borderRadius: "24px",
              border: `1px solid ${SATORI.INK}10`,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              animationDelay: `${i * 0.1}s`
            }}
          >
            <div className="service-image" style={{ position: "relative", overflow: "hidden", aspectRatio: "16/10" }}>
              <img
                src={s.img}
                alt={s.titulo}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "grayscale(1) contrast(1.05)",
                  transition: "transform 1s cubic-bezier(.2,.7,.2,1), filter .8s ease"
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, transparent 40%, ${SATORI.INK}80 100%)`,
                  pointerEvents: "none"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                  fontFamily: TYPE.mono,
                  fontSize: "0.58rem",
                  letterSpacing: "0.28em",
                  color: SATORI.GOLD,
                  padding: "0.35rem 0.75rem",
                  borderRadius: "999px",
                  background: "rgba(14,14,14,0.7)",
                  backdropFilter: "blur(10px)"
                }}
              >
                {s.num} · {s.tag.toUpperCase()}
              </div>
              <div
                aria-hidden="true"
                className="service-accent"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "3px",
                  background: SATORI.GOLD,
                  width: "100%",
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                  transition: "transform .8s cubic-bezier(.2,.7,.2,1)"
                }}
              />
            </div>

            <div style={{ padding: "1.75rem 1.75rem 1.5rem", flex: 1, display: "flex", flexDirection: "column" }}>
              <h3
                style={{
                  fontFamily: TYPE.display,
                  fontWeight: 500,
                  fontSize: "1.6rem",
                  lineHeight: 1.1,
                  margin: 0,
                  color: SATORI.INK,
                  letterSpacing: "-0.025em"
                }}
              >
                {s.titulo}
              </h3>
              <p
                style={{
                  fontFamily: TYPE.body,
                  fontSize: "0.7rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.55,
                  marginTop: "0.55rem",
                  marginBottom: 0
                }}
              >
                {s.subtitulo}
              </p>
              <p style={{ ...bodyStyle, fontSize: "0.95rem", marginTop: "1rem" }}>
                {s.descripcion}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "1.25rem 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.55rem",
                  flex: 1
                }}
              >
                {s.benefits.map((b, j) => (
                  <li
                    key={b}
                    className="service-benefit"
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.6rem",
                      fontFamily: TYPE.body,
                      fontSize: "0.92rem",
                      transitionDelay: `${j * 60}ms`
                    }}
                  >
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "999px",
                        background: SATORI.GOLD,
                        flexShrink: 0,
                        marginTop: "0.3rem",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6.5L5 9l4.5-6" stroke="#F4F4F2" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
                  <a
                    href={waInterest(s.titulo)}
                    target="_blank"
                    rel="noopener"
                    className="cta-btn-gold"
                    style={{
                      ...btnPrimary,
                      marginTop: "1.5rem",
                      textAlign: "center",
                      justifyContent: "center"
                    }}
                  >
                    <span>{ctaInteresa}</span>
                    <span className="cta-arrow">→</span>
                  </a>
            </div>
          </article>
        ))}
      </div>

      <style>{`
        .service-card { transition: transform .45s cubic-bezier(.2,.9,.3,1.2), box-shadow .45s ease; will-change: transform; }
        .service-card:hover { transform: translateY(-6px); box-shadow: 0 30px 60px -25px rgba(14,14,14,0.25), 0 0 0 1px rgba(166,124,0,0.18); }
        .service-card:hover .service-image img { transform: scale(1.06); filter: grayscale(0.4) contrast(1.05); }
        .service-card:hover .service-accent { transform: scaleX(1) !important; }
        .service-benefit { transition: transform .4s ease, opacity .4s ease; }
        .service-card:hover .service-benefit { transform: translateX(3px); }
      `}</style>
    </section>
  );
}

// ---------- PAQUETES (sin precios) ----------
function Paquetes() {
  const [lang] = useLang();
  const list = lang === "en" ? PAQUETES_EN : PAQUETES;
  const tagline = lang === "en" ? "Packages" : "Paquetes";
  const h1 = lang === "en" ? "Three paths." : "Tres rutas.";
  const h2 = lang === "en" ? "One conversation." : "Una conversación.";
  const subText = lang === "en"
    ? "No blind terms. We work month-to-month and the investment adjusts to the real scope of each project."
    : "Sin términos a ciegas. Trabajamos mes a mes y la inversión se ajusta según el alcance real de cada proyecto.";
  const popular = lang === "en" ? "Most chosen" : "Más elegido";
  const askMore = lang === "en" ? "Need something different?" : "¿Necesitas algo distinto?";
  const customLink = lang === "en" ? "Custom quote" : "Cotiza a medida";
  return (
    <section
      id="paquetes"
      style={{
        padding: "7rem clamp(1.25rem,4vw,2.5rem)",
        position: "relative",
        zIndex: 1,
        background: SATORI.CREAM,
        borderTop: `1px solid ${SATORI.INK}08`
      }}
    >
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={eyebrowStyle}>
            <span className="satori-rule" style={{ width: "18px" }} />
            {tagline}
          </p>
          <h2 style={h2Style} data-reveal>
            {h1} <span style={{ color: SATORI.GOLD }}>{h2}</span>
          </h2>
          <p style={{ ...bodyStyle, maxWidth: "52ch", margin: "1.25rem auto 0" }}>
            {subText}
          </p>
          <p style={{ ...bodyStyle, maxWidth: "52ch", margin: "1.25rem auto 0" }}>
            {subText}
          </p>
        </div>

        <div
          className="grid-3"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
            alignItems: "stretch"
          }}
        >
          {list.map((p) => {
            const oscuro = p.tono === "oscuro";
            const oro = p.tono === "oro";
            const bg = oscuro ? SATORI.INK : SATORI.WHITE;
            const fg = oscuro ? SATORI.CREAM : SATORI.INK;
            const accent = SATORI.GOLD;
            return (
              <div
                key={p.nombre}
                data-card
                data-reveal
                style={{
                  background: bg,
                  color: fg,
                  border: oro ? `2px solid ${SATORI.GOLD}` : `1px solid ${oscuro ? "rgba(255,255,255,0.1)" : SATORI.INK + "12"}`,
                  borderRadius: "24px",
                  padding: "2.75rem 2rem 2.25rem",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transform: p.destacado ? "translateY(-12px)" : "translateY(0)",
                  boxShadow: p.destacado ? `0 30px 60px -30px ${SATORI.GOLD}55` : "none"
                }}
              >
                {p.destacado && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-14px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      padding: "0.45rem 1rem",
                      borderRadius: "999px",
                      background: SATORI.GOLD,
                      color: SATORI.CREAM,
                      fontFamily: TYPE.mono,
                      fontSize: "0.6rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap"
                    }}
                  >
                    {popular}
                  </div>
                )}

                <div
                  style={{
                    fontFamily: TYPE.mono,
                    fontSize: "0.66rem",
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: accent,
                    marginBottom: "1rem"
                  }}
                >
                  {p.nombre}
                </div>

                <div
                  style={{
                    fontFamily: TYPE.display,
                    fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.025em"
                  }}
                >
                  {p.nombre}
                </div>

                <p
                  style={{
                    ...bodyStyle,
                    color: fg,
                    opacity: oscuro ? 0.7 : 0.78,
                    marginTop: "1.25rem"
                  }}
                >
                  {p.descripcion}
                </p>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "1.5rem 0 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.65rem",
                    flex: 1
                  }}
                >
                  {p.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                        fontFamily: TYPE.body,
                        fontSize: "0.95rem",
                        color: fg,
                        opacity: oscuro ? 0.88 : 0.9
                      }}
                    >
                      <span style={{ color: SATORI.GOLD, fontFamily: TYPE.mono, fontSize: "0.9rem" }}>+</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={waInterest(`paquete ${p.nombre}`)}
                  target="_blank"
                  rel="noopener"
                  className="cta-btn-gold"
                  style={{
                    marginTop: "2rem",
                    padding: "1rem 1.5rem",
                    background: oro ? SATORI.GOLD : oscuro ? SATORI.GOLD : SATORI.INK,
                    color: SATORI.CREAM,
                    borderRadius: "999px",
                    textDecoration: "none",
                    fontFamily: TYPE.body,
                    fontSize: "0.7rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    textAlign: "center",
                    display: "inline-flex",
                    justifyContent: "center",
                    gap: "0.6rem"
                  }}
                >
                  <span>{p.cta}</span>
                  <span className="cta-arrow">→</span>
                </a>
              </div>
            );
          })}
        </div>

        <p
          style={{
            textAlign: "center",
            fontFamily: TYPE.mono,
            fontSize: "0.66rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.55,
            marginTop: "3rem"
          }}
        >
          {askMore} <a href={SATORI.WHATSAPP} target="_blank" rel="noopener" style={{ color: SATORI.INK }}>{customLink}</a>
        </p>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function Faq() {
  const [lang] = useLang();
  const itemsEs = [
    { q: "¿Cuánto tarda en ver resultados?", a: "Marca propia: primeras semanas. Posicionamiento: 1–3 meses. Soluciones con IA: desde la activación." },
    { q: "¿Necesito saber de tecnología?", a: "Para nada. Nos encargamos de toda la parte técnica. Tú nos cuentas tu negocio, nosotros hacemos el resto." },
    { q: "¿Firmo contrato largo?", a: "No. Trabajamos mes a mes. Cancela cuando quieras, con 30 días de aviso." },
    { q: "¿Qué necesito para empezar?", a: "Una llamada de 30 minutos. Entendemos tu negocio, proponemos la ruta, te damos un precio claro." },
    { q: "¿Con qué tipo de negocios trabajan?", a: "Empresarios y pymes en México — despachos, constructoras, clínicas, consultoras y servicios profesionales." },
    { q: "¿Ofrecen garantía?", a: "30 días. Si no sientes que el valor supera la inversión, seguimos 20 días más sin costo. Sin preguntas." }
  ];
  const itemsEn = [
    { q: "How long until I see results?", a: "Own brand: first weeks. Positioning: 1–3 months. AI Solutions: from activation." },
    { q: "Do I need to know tech?", a: "Not at all. We handle everything technical. You tell us your business, we do the rest." },
    { q: "Do I sign a long contract?", a: "No. Month-to-month. Cancel anytime with 30 days notice." },
    { q: "What do I need to start?", a: "A 30-minute call. We understand your business, propose the path, give you a clear price." },
    { q: "What kinds of businesses?", a: "Entrepreneurs and SMEs in Mexico — firms, contractors, clinics, consultancies and professional services." },
    { q: "Do you offer a guarantee?", a: "30 days. If you don't feel value exceeds the investment, we continue 20 days at no cost. No questions." }
  ];
  const items = lang === "en" ? itemsEn : itemsEs;
  const eyebrowTxt = lang === "en" ? "FAQ" : "Preguntas frecuentes";
  const headPre = lang === "en" ? "The" : "Lo";
  const headAccent = lang === "en" ? "essentials." : "esencial.";
  const [open, setOpen] = useState(0);
  return (
    <section
      style={{
        padding: "7rem clamp(1.25rem,4vw,2.5rem)",
        background: `linear-gradient(180deg, ${SATORI.CREAM} 0%, ${SATORI.CREAM_2} 100%)`,
        borderTop: `1px solid ${SATORI.INK}08`,
        position: "relative",
        zIndex: 1
      }}
    >
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={eyebrowStyle}>
            <span className="satori-rule" style={{ width: "18px" }} />
            {eyebrowTxt}
          </p>
          <h2 style={h2Style} data-reveal>
            {headPre} <span style={{ color: SATORI.GOLD }}>{headAccent}</span>
          </h2>
        </div>
        <div
          style={{
            background: SATORI.WHITE,
            borderRadius: "24px",
            border: `1px solid ${SATORI.INK}10`,
            overflow: "hidden"
          }}
        >
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                style={{
                  borderBottom: i === items.length - 1 ? "none" : `1px solid ${SATORI.INK}10`
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: "1.5rem 1.75rem",
                    textAlign: "left",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    cursor: "pointer",
                    fontFamily: TYPE.body,
                    color: SATORI.INK
                  }}
                >
                  <span
                    style={{
                      fontFamily: TYPE.display,
                      fontSize: "1.15rem",
                      lineHeight: 1.3,
                      fontWeight: 500
                    }}
                  >
                    {it.q}
                  </span>
                  <span
                    style={{
                      fontFamily: TYPE.mono,
                      fontSize: "1.2rem",
                      color: SATORI.GOLD,
                      transition: "transform .3s ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div
                    style={{
                      padding: "0 1.75rem 1.5rem",
                      ...bodyStyle,
                      maxWidth: "62ch"
                    }}
                  >
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
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
      <Nav current="servicios" />
      <ServiciosHero />
      <ServiciosDetalle />
      <Paquetes />
      <Faq />
      <CtaBlock
        titulo={{ es: "¿Listo para tu siguiente etapa?", en: "Ready for your next stage?" }}
        sub={{
          es: "Empezamos con 30 minutos. Te digo qué paquete encaja y cómo lo activaríamos.",
          en: "We start with 30 minutes. I'll tell you which package fits and how we'd activate it."
        }}
      />
      <Footer social="satori" />
      <MobileMenuFab current={"servicios"} />
      <FloatingWhatsApp />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
