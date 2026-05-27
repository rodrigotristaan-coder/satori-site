/* SATORI — Blog (blog.html). ES/EN. */

const { useState, useEffect } = React;

// ---------- ARTÍCULOS ----------
const ARTICULOS = [
  {
    slug: "marketing-llm-recomienda",
    fecha: { es: "Mayo 2026", en: "May 2026" },
    minutos: { es: "6 min de lectura", en: "6 min read" },
    categoria: { es: "Estrategia · IA", en: "Strategy · AI" },
    titulo: {
      es: "El nuevo marketing: que los LLMs te recomienden.",
      en: "The new marketing: get LLMs to recommend you."
    },
    bajada: {
      es: "Tus prospectos ya no preguntan en Google. Le preguntan a ChatGPT, Claude y Gemini. Si tu marca no aparece ahí, no existe.",
      en: "Your prospects don't ask Google anymore. They ask ChatGPT, Claude and Gemini. If your brand isn't there, it doesn't exist."
    },
    cover: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=80&auto=format&fit=crop",
    destacado: true
  }
];

// ---------- HERO ----------
function BlogHero() {
  const [lang] = useLang();
  const c = lang === "en" ? {
    eyebrow: "Some of our thoughts",
    title: "Satori.",
    accent: "Blog.",
    sub: "Strategy, AI and growth — written from the trenches. No hype, no fluff."
  } : {
    eyebrow: "Algunos de nuestros pensamientos",
    title: "Satori.",
    accent: "Blog.",
    sub: "Estrategia, IA y crecimiento — escrito desde la trinchera. Sin hype, sin relleno."
  };
  return (
    <PageHero eyebrow={c.eyebrow} title={c.title} accent={c.accent} sub={c.sub} />
  );
}

// ---------- ARTICLE BODY ----------
function ArticleBody() {
  const [lang] = useLang();
  const a = ARTICULOS[0];

  const bodyEs = (
    <React.Fragment>
      <p style={pLead}>
        Durante 20 años el juego fue claro: Google. Ranquear, hacer ads, comprar palabras clave,
        invertir en SEO y rezar para aparecer arriba.
      </p>
      <p style={pStyle}>
        Hoy, una parte cada vez más grande de tus prospectos no abre Google. Abre ChatGPT.
        Pregunta a Claude. Le pide a Gemini que le recomiende una agencia, un despacho,
        una clínica o un constructor. Y el modelo le da un nombre — o ninguno.
      </p>

      <h2 style={h2Article}>El canal nuevo: la recomendación de una IA.</h2>
      <p style={pStyle}>
        Las landing pages siguen importando. Los ads, también. Pero hay un canal nuevo,
        gratis y casi invisible: ser <strong style={emphasize}>recomendado por un LLM</strong>.
        Cuando alguien pregunta "¿quién es el mejor para X en mi ciudad?", el modelo elige
        a partir de lo que ha leído de ti en internet — no de tus ads, sino de tu rastro.
      </p>

      <h2 style={h2Article}>¿Cómo te leen los modelos?</h2>
      <ul style={ulStyle}>
        <li><strong style={emphasize}>Contenido propio</strong> — artículos, casos, manifiesto, página de "Acerca de", reseñas en tu sitio.</li>
        <li><strong style={emphasize}>Menciones de terceros</strong> — medios, directorios, podcasts, entrevistas, casos publicados.</li>
        <li><strong style={emphasize}>Datos estructurados</strong> — Schema.org, FAQs, datos limpios de contacto, ubicación, horarios, equipo.</li>
        <li><strong style={emphasize}>Consistencia</strong> — un mensaje claro repetido en muchos lugares, no diez mensajes distintos.</li>
      </ul>

      <h2 style={h2Article}>Cómo lo trabajamos en SATORI.</h2>
      <p style={pStyle}>
        No es magia. Es estrategia. Construimos identidad clara, generamos contenido editorial
        de fondo, sembramos menciones en medios y directorios, y dejamos el sitio en un formato
        que los modelos entienden. El resultado: cuando un prospecto le pregunta a una IA
        por una empresa como la tuya, tu nombre aparece.
      </p>
      <blockquote style={quoteStyle}>
        Hace dos años, el SEO era para Google. Hoy, el SEO también es para ChatGPT.
        El que entendió esto temprano gana los próximos cinco años.
      </blockquote>

      <h2 style={h2Article}>El nuevo embudo, en una línea.</h2>
      <p style={pStyle}>
        Identidad → contenido propio → menciones de terceros → recomendación de un LLM →
        prospecto calificado en tu WhatsApp. Sin ruido. Con dirección.
      </p>
    </React.Fragment>
  );

  const bodyEn = (
    <React.Fragment>
      <p style={pLead}>
        For 20 years the game was clear: Google. Rank, run ads, buy keywords, invest in SEO,
        and pray to show up on page one.
      </p>
      <p style={pStyle}>
        Today, a growing share of your prospects don't open Google. They open ChatGPT.
        They ask Claude. They ask Gemini to recommend an agency, a law firm, a clinic
        or a contractor. The model gives them a name — or none.
      </p>

      <h2 style={h2Article}>The new channel: AI's recommendation.</h2>
      <p style={pStyle}>
        Landing pages still matter. Ads still matter. But there's a new channel,
        free and almost invisible: being <strong style={emphasize}>recommended by an LLM</strong>.
        When someone asks "who's the best at X in my city?", the model picks based on
        what it has read about you online — not from your ads, but from your trail.
      </p>

      <h2 style={h2Article}>How do models read you?</h2>
      <ul style={ulStyle}>
        <li><strong style={emphasize}>Owned content</strong> — articles, case studies, manifesto, "About" page, on-site reviews.</li>
        <li><strong style={emphasize}>Third-party mentions</strong> — press, directories, podcasts, interviews, published cases.</li>
        <li><strong style={emphasize}>Structured data</strong> — Schema.org, FAQs, clean contact info, location, hours, team.</li>
        <li><strong style={emphasize}>Consistency</strong> — one clear message repeated across many places, not ten different messages.</li>
      </ul>

      <h2 style={h2Article}>How we work it at SATORI.</h2>
      <p style={pStyle}>
        Not magic. Strategy. We build clear identity, generate editorial content with depth,
        seed mentions in press and directories, and leave the site in a format models understand.
        The result: when a prospect asks an AI about a business like yours, your name shows up.
      </p>
      <blockquote style={quoteStyle}>
        Two years ago, SEO was for Google. Today, SEO is also for ChatGPT.
        Whoever understood this early wins the next five years.
      </blockquote>

      <h2 style={h2Article}>The new funnel, in one line.</h2>
      <p style={pStyle}>
        Identity → owned content → third-party mentions → LLM recommendation →
        qualified prospect in your WhatsApp. No noise. With direction.
      </p>
    </React.Fragment>
  );

  return (
    <article
      style={{
        padding: "4rem clamp(1.25rem,4vw,2.5rem) 6rem",
        background: SATORI.CREAM,
        position: "relative",
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        {/* meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
            fontFamily: TYPE.mono,
            fontSize: "0.62rem",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: SATORI.INK,
            opacity: 0.55
          }}
        >
          <span style={{ color: SATORI.GOLD }}>{a.categoria[lang] || a.categoria.es}</span>
          <span>·</span>
          <span>{a.fecha[lang] || a.fecha.es}</span>
          <span>·</span>
          <span>{a.minutos[lang] || a.minutos.es}</span>
        </div>

        {/* title */}
        <h1
          style={{
            fontFamily: TYPE.display,
            fontSize: "clamp(2rem,5vw,3.4rem)",
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: SATORI.INK,
            margin: "0 0 1.5rem"
          }}
        >
          {a.titulo[lang] || a.titulo.es}
        </h1>

        {/* lead */}
        <p
          style={{
            fontFamily: TYPE.display,
            fontStyle: "italic",
            fontSize: "1.35rem",
            lineHeight: 1.5,
            color: SATORI.INK,
            opacity: 0.78,
            margin: "0 0 2.75rem"
          }}
        >
          {a.bajada[lang] || a.bajada.es}
        </p>

        {/* cover — tonos SATORI (sepia hacia oro, persona destacada en dorado) */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: "20px",
            overflow: "hidden",
            background: SATORI.INK,
            marginBottom: "3rem",
            boxShadow: "0 30px 70px -30px rgba(14,14,14,0.35)",
            position: "relative"
          }}
        >
          <img
            src={a.cover}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "grayscale(1) sepia(0.92) hue-rotate(-12deg) saturate(2.1) brightness(0.92) contrast(1.08)"
            }}
          />
          {/* warm overlay para reforzar la paleta SATORI */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(135deg, ${SATORI.INK}40 0%, transparent 45%, ${SATORI.GOLD}25 100%)`,
              mixBlendMode: "multiply",
              pointerEvents: "none"
            }}
          />
        </div>

        {/* body */}
        <div style={{ fontFamily: TYPE.body }}>
          {lang === "en" ? bodyEn : bodyEs}
        </div>

        {/* author block */}
        <div
          style={{
            marginTop: "4rem",
            padding: "1.5rem 1.75rem",
            background: SATORI.WHITE,
            borderRadius: "20px",
            border: `1px solid ${SATORI.INK}10`,
            display: "flex",
            alignItems: "center",
            gap: "1.25rem"
          }}
        >
          <img
            src="assets/rodrigo.png"
            alt="Rodrigo Tristán"
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "999px",
              objectFit: "cover",
              filter: "grayscale(1) contrast(1.05)"
            }}
          />
          <div>
            <p style={{ margin: 0, fontFamily: TYPE.display, fontWeight: 500, fontSize: "1.05rem", color: SATORI.INK }}>
              Rodrigo Tristán
            </p>
            <p style={{ margin: "0.25rem 0 0", fontFamily: TYPE.mono, fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: SATORI.INK, opacity: 0.55 }}>
              {lang === "en" ? "Founder · SATORI" : "Fundador · SATORI"}
            </p>
          </div>
        </div>

        {/* inline contact CTA */}
        <div
          style={{
            marginTop: "3rem",
            padding: "2.5rem 2rem",
            borderRadius: "24px",
            background: `linear-gradient(135deg, ${SATORI.GOLD}12 0%, ${SATORI.GOLD}05 100%)`,
            border: `1px solid ${SATORI.GOLD}30`,
            textAlign: "center"
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: TYPE.mono,
              fontSize: "0.66rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: SATORI.GOLD,
              marginBottom: "1rem"
            }}
          >
            {lang === "en" ? "Want to be recommended by AIs?" : "¿Quieres que las IAs te recomienden?"}
          </p>
          <h3
            style={{
              fontFamily: TYPE.display,
              fontSize: "clamp(1.4rem, 2.6vw, 1.9rem)",
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: SATORI.INK,
              margin: "0 0 1.5rem"
            }}
          >
            {lang === "en"
              ? "Let's build your AI-ready positioning."
              : "Trabajemos tu posicionamiento listo para IA."}
          </h3>
          <a
            href="#contacto"
            style={{
              ...btnGold,
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem"
            }}
          >
            {lang === "en" ? "Contact me" : "Contactar"} →
          </a>
        </div>
      </div>
    </article>
  );
}

// styles
const pLead = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "1.2rem",
  lineHeight: 1.7,
  fontWeight: 400,
  color: "#0E0E0E",
  margin: "0 0 1.5rem"
};
const pStyle = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "1.08rem",
  lineHeight: 1.75,
  fontWeight: 300,
  color: "#0E0E0E",
  opacity: 0.85,
  margin: "0 0 1.5rem"
};
const h2Article = {
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "clamp(1.45rem, 2.6vw, 1.9rem)",
  fontWeight: 500,
  lineHeight: 1.2,
  letterSpacing: "-0.02em",
  color: "#0E0E0E",
  margin: "3rem 0 1.25rem"
};
const ulStyle = {
  listStyle: "none",
  padding: 0,
  margin: "0 0 1.75rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.85rem",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontSize: "1.05rem",
  lineHeight: 1.65,
  color: "#0E0E0E",
  opacity: 0.85
};
const emphasize = { color: "#A67C00", fontWeight: 500 };
const quoteStyle = {
  margin: "2.5rem 0",
  padding: "1.5rem 1.75rem",
  borderLeft: "3px solid #A67C00",
  background: "rgba(166,124,0,0.05)",
  fontFamily: "'DM Sans', system-ui, sans-serif",
  fontStyle: "italic",
  fontSize: "1.15rem",
  lineHeight: 1.6,
  color: "#0E0E0E",
  opacity: 0.85,
  borderRadius: "0 14px 14px 0"
};

// ul li bullets via inline render
function _liAccent() { return null; }

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

  const ctaTitulo = {
    es: "¿Listo para que las IAs te recomienden?",
    en: "Ready to be recommended by AIs?"
  };
  const ctaSub = {
    es: "Una llamada de 30 minutos. Te explico cómo posicionamos tu marca en ChatGPT, Claude y Gemini.",
    en: "A 30-minute call. I'll show you how we position your brand inside ChatGPT, Claude and Gemini."
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: SATORI.CREAM }}>
      <MatrixBackground opacity={0.035} color={SATORI.GOLD} />
      <Nav current="blog" />
      <BlogHero />
      <ArticleBody />
      <CtaBlock titulo={ctaTitulo} sub={ctaSub} />
      <Footer social="satori" />
      <MobileMenuFab current={"blog"} />
      <FloatingWhatsApp />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
