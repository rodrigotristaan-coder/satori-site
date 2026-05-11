/* SATORI — Landing v2 components
   Premium, restrained, mobile-first. Tinta + Papel + Oro como acento.
*/

const { useState, useEffect, useRef } = React;

// ---------- CONTENT ----------
const content = {
  es: {
    nav: { problema: "Problema", servicios: "Servicios", nosotros: "Nosotros", cotizar: "Cotizar", cta: "Agendar" },
    hero: {
      eyebrow: "Estrategia · Marca · Crecimiento",
      h1a: "Más estrategia",
      h1b: "Menos ruido.",
      sub: "Estrategia digital para empresarios que valoran su tiempo. Identidad, posicionamiento y marketing con IA — sin caos, sin promesas vacías.",
      cta1: "Auditoría gratis",
      cta2: "Cómo funciona"
    },
    problema: {
      label: "El problema",
      h: "Lo que resolvemos:",
      items: [
      { q: "No logro diferenciar mi marca personal y/o empresarial.", d: "Sin una identidad clara, te confunden con la competencia y compites por precio en lugar de por valor." },
      { q: "Pierdo clientes por no contestar a tiempo.", d: "El 78% de las ventas las gana quien responde primero. Sin automatización, no compites." },
      { q: "Mis redes están muertas y la competencia gana.", d: "La consistencia construye confianza. Sin tiempo, no hay consistencia." }],

      cta: "Quiero resolverlos",
      hint: "Gratis · sin compromiso"
    },
    stats: [
    { label: "Tu negocio abierto", n: "24/7", desc: "Siempre disponible" },
    { label: "Prospectos perdidos", n: "0", desc: "Cero fugas" },
    { label: "Días para resultados", n: "30", desc: "Garantizados" }],

    servicios: {
      eyebrow: "Tres soluciones. Un socio.",
      h: "Lo que hacemos.",
      sub: "Cada servicio diseñado para empresarios que crecen con estrategia.",
      items: [
      { num: "01", tag: "Marca", t: "Marca propia", sub: "Identidad · Presencia · Autoridad", d: "La identidad que un empresario serio merece.", benefits: ["Imagen que genera confianza", "Diferenciación clara", "Posicionamiento de CEO", "Kit de marca completo"], img: "assets/marca-propia.png" },
      { num: "02", tag: "Imagen", t: "Posicionamiento online", sub: "Reputación · Visibilidad · Confianza", d: "Tu empresa frente a las personas correctas.", benefits: ["Presencia en medios", "Reputación verificable", "Contenido que atrae", "Publicidad y conversión"], img: "assets/posicionamiento.png" },
      { num: "03", tag: "IA", t: "Marketing con IA", sub: "Conversión · Automatización · Escala", d: "Tu motor de crecimiento que nunca duerme.", benefits: ["Prospectos en piloto automático", "Sin oportunidades perdidas", "Campañas auto-optimizadas", "ROI desde el primer mes"], img: "assets/marketing-ia.png" }],

      cta: "Ver detalle"
    },
    ruta: {
      label: "Ruta de Crecimiento Satori",
      steps: [
      { paso: "01", label: "Identidad de Marca", desc: "Claridad y diferenciación." },
      { paso: "02", label: "Presencia en Medios", desc: "Consistencia y Confianza." },
      { paso: "03", label: "Visibilidad y Repetición", desc: "Mensaje y Oferta de valor." },
      { paso: "04", label: "Automatización", desc: "Sistemas que generan prospectos." },
      { paso: "05", label: "Ventas", desc: "Clientes llegando con claridad." }]

    },
    nosotros: {
      label: "Tu socio digital",
      nombre: "Rodrigo Tristán",
      cargo: "Fundador de Satori",
      quote: "Estrategia antes que el ruido",
      p1: "La mayoría de las agencias venden actividad. Yo vendo claridad. Antes de tocar una herramienta, entendemos tu mercado, tu cliente y qué es verdad en tu industria.",
      p2: "Sé lo que cuesta construir un negocio desde adentro. Por eso fundé Satori — para que cada empresario mexicano acceda a las herramientas que usan las empresas más avanzadas del mundo.",
      garantia_t: "Garantía de 30 días.",
      garantia_d: "Si no sientes que el valor supera la inversión, seguimos 20 días más sin costo. Sin preguntas.",
      cta1: "Agendar Zoom",
      cta2: "Email"
    },
    reviews: {
      label: "Lo que dicen",
      h: "Resultados reales.",
      items: [
      { name: "Carlos M.", role: "Restaurantero", text: "Antes perdía clientes por no contestar rápido. Ahora el sistema responde solo y ya agendé tres mesas más esta semana.", stars: 5 },
      { name: "Fernanda R.", role: "Directora de clínica", text: "Mi sitio web nuevo me trajo pacientes que antes ni sabían que existíamos. ROI visible en el primer mes.", stars: 5 },
      { name: "Diego L.", role: "Consultor", text: "En seis semanas duplicamos los mensajes de prospectos. Contenido de muy buena calidad.", stars: 5 }]

    },
    mapa: {
      label: "Presencia nacional",
      h: "Clientes Satori.",
      sub: "Y creciendo."
    },
    faq: {
      label: "Preguntas frecuentes",
      h: "Lo esencial.",
      items: [
      { q: "¿Cuánto tarda en ver resultados?", a: "Marca propia: primeras semanas. Posicionamiento: 1–3 meses. Marketing con IA: desde la activación." },
      { q: "¿Necesito saber de tecnología?", a: "Para nada. Nos encargamos de toda la parte técnica. Tú nos cuentas tu negocio, nosotros hacemos el resto." },
      { q: "¿Firmo contrato largo?", a: "No. Trabajamos mes a mes. Cancela cuando quieras." },
      { q: "¿Qué necesito para empezar?", a: "Una llamada de 30 minutos. Entendemos tu negocio, proponemos la ruta, te damos un precio claro." },
      { q: "¿Con qué tipo de negocios trabajan?", a: "Empresarios y pymes en México — despachos, constructoras, clínicas, consultoras y servicios profesionales." }]

    },
    cotizar: {
      h: "¿Quieres saber más?",
      sub: "Cuéntanos dónde estás hoy y armamos una propuesta a tu medida.",
      cta: "Quiero mi cotización"
    },
    footer: "© 2026 Satori · Estrategia digital · México"
  },
  en: {
    nav: { problema: "Problem", servicios: "Services", nosotros: "About", cotizar: "Quote", cta: "Book" },
    hero: {
      eyebrow: "Strategy · Brand · Growth",
      h1a: "More strategy",
      h1b: "Less noise.",
      sub: "Digital strategy for entrepreneurs who value their time. Identity, positioning and AI marketing — no chaos, no empty promises.",
      cta1: "Free audit",
      cta2: "How it works"
    },
    problema: {
      label: "The problem",
      h: "Sound familiar?",
      items: [
      { q: "I can't tell my personal brand from my business brand.", d: "Without a clear identity, customers confuse you with competitors and you end up competing on price instead of value." },
      { q: "I lose clients because I can't reply fast enough.", d: "78% of sales go to whoever answers first. Without automation, you don't compete." },
      { q: "My social is dead and competitors are winning.", d: "Consistency builds trust. Without time, there's no consistency." }],

      cta: "I want to solve them",
      hint: "Free · no commitment"
    },
    stats: [
    { label: "Your business open", n: "24/7", desc: "Always on" },
    { label: "Leads lost", n: "0", desc: "Zero leaks" },
    { label: "Days to results", n: "30", desc: "Guaranteed" }],

    servicios: {
      eyebrow: "Three solutions. One partner.",
      h: "What we do.",
      sub: "Each service designed for entrepreneurs who grow with strategy.",
      items: [
      { num: "01", tag: "Brand", t: "Brand identity", sub: "Identity · Presence · Authority", d: "The identity a serious entrepreneur deserves.", benefits: ["Instant trust through image", "Clear differentiation", "CEO positioning", "Complete brand kit"], img: "assets/marca-propia.png" },
      { num: "02", tag: "Image", t: "Online positioning", sub: "Reputation · Visibility · Trust", d: "Your company in front of the right people.", benefits: ["Presence in media", "Verifiable reputation", "Content that attracts", "Ads & conversion"], img: "assets/posicionamiento.png" },
      { num: "03", tag: "AI", t: "AI marketing", sub: "Conversion · Automation · Scale", d: "Your growth engine that never sleeps.", benefits: ["Leads on autopilot", "No missed opportunities", "Self-optimizing campaigns", "ROI from month one"], img: "assets/marketing-ia.png" }],

      cta: "See details"
    },
    ruta: {
      label: "Satori Growth Roadmap",
      steps: [
      { paso: "01", label: "Brand Identity", desc: "Clarity and differentiation." },
      { paso: "02", label: "Media Presence", desc: "Consistency and trust." },
      { paso: "03", label: "Visibility & Repetition", desc: "Message and value offer." },
      { paso: "04", label: "Automation", desc: "Systems that generate leads." },
      { paso: "05", label: "Sales", desc: "Clients coming in with clarity." }]

    },
    nosotros: {
      label: "Your digital partner",
      nombre: "Rodrigo Tristán",
      cargo: "Founder of Satori",
      quote: "Strategy before noise",
      p1: "Most agencies sell activity. I sell clarity. Before touching a tool, we understand your market, your client and what's actually true in your industry.",
      p2: "I know what it costs to build a business from the inside. That's why I founded Satori — so every Mexican entrepreneur has access to the same tools as the world's most advanced companies.",
      garantia_t: "30-day guarantee.",
      garantia_d: "If the value doesn't exceed your investment, we keep working 20 more days at no cost. No questions.",
      cta1: "Book a Zoom",
      cta2: "Email"
    },
    reviews: {
      label: "What clients say",
      h: "Real results.",
      items: [
      { name: "Carlos M.", role: "Restaurant owner", text: "I used to lose clients because I didn't respond fast enough. Now the system replies automatically, and I've already booked three more tables this week.", stars: 5 },
      { name: "Fernanda R.", role: "Clinic director", text: "My new website brought in patients who didn't even know we existed before. Visible ROI in the first month.", stars: 5 },
      { name: "Diego L.", role: "Consultant", text: "In six weeks, we doubled our inbound leads. Very high-quality content.", stars: 5 }]

    },
    mapa: {
      label: "National presence",
      h: "Satori clients.",
      sub: "And growing."
    },
    faq: {
      label: "Frequently asked",
      h: "The essentials.",
      items: [
      { q: "How long until results?", a: "Brand: first weeks. Positioning: 1–3 months. AI marketing: from activation." },
      { q: "Do I need to be tech-savvy?", a: "Not at all. We handle every technical detail. You tell us about your business, we do the rest." },
      { q: "Long-term contract?", a: "No. Month to month. Cancel anytime." },
      { q: "What do I need to start?", a: "A 30-minute call. We learn your business, propose the path, give you a clear price." },
      { q: "What businesses do you work with?", a: "Entrepreneurs and SMEs in Mexico — law firms, construction, clinics, consultancies and professional services." }]

    },
    cotizar: {
      h: "Want to know more?",
      sub: "Tell us where you are today and we'll build a proposal for you.",
      cta: "Get my quote"
    },
    footer: "© 2026 Satori · Digital strategy · Mexico"
  }
};

const WHATSAPP_ES = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const WHATSAPP_EN = "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
const WHATSAPP = WHATSAPP_ES;
const waLink = (lang) => lang === "en" ? WHATSAPP_EN : WHATSAPP_ES;
const waInterest = (lang, topic) => lang === "en" ?
`https://wa.me/525625018281?text=Hi%20Rodrigo,%20I'm%20interested%20in%20${encodeURIComponent(topic)}` :
`https://wa.me/525625018281?text=Hola%20Rodrigo,%20me%20interesa%20${encodeURIComponent(topic)}`;
const CALENDLY = "https://calendly.com/rodrigo-tristaan";
const EMAIL = "r.tristaan@outlook.com";

// ---------- SATORI WORDMARK (custom 'o' with 3 o'clock opening) ----------
function SatoriMark({ tail = " Agency", color = "#0E0E0E" }) {
  return <span style={{ color, whiteSpace: "nowrap", fontFamily: "\"DM Sans\"" }}>Satori{tail}</span>;
}

// ---------- ENSŌ (drawn as arc with rough brush) ----------
function Enso({ size = 360, opacity = 0.92, spinning = true, color = "#8a8a8a", className = "" }) {
  // Use CSS mask so the silhouette can be tinted to ANY exact color (e.g. #A67C00).
  const c = (color || "").toLowerCase();
  let bg = "#8c8c8c";
  if (c === "#f4f4f2" || c === "#fff" || c === "#ffffff") bg = "#F4F4F2";
  else if (c === "#0e0e0e" || c === "#000" || c === "#000000") bg = "#0E0E0E";
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
    <div className={`enso-host ${className}`.trim()} style={{
      width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center",
      animation: spinning ? "ensoSpin 22s linear infinite" : "none", opacity: "1.9"
    }}>
      <div className="enso-shape" style={maskStyle} aria-label="Ensō" role="img" />
    </div>);

}

// ---------- MATRIX RAIN ----------
function MatrixBackground({ opacity = 0.08, color = "#A67C00" }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => {canvas.width = window.innerWidth;canvas.height = window.innerHeight;};
    resize();window.addEventListener("resize", resize);
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
    return () => {cancelAnimationFrame(id);window.removeEventListener("resize", resize);};
  }, [color]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, opacity, pointerEvents: "none", zIndex: 0 }} />;
}

// ---------- IMAGE PLACEHOLDER ----------
function ImagePlaceholder({ label, ratio = "4/3", treatment = "duotone" }) {
  const filter = treatment === "duotone" ?
  "grayscale(1) sepia(1) hue-rotate(-10deg) saturate(1.2) brightness(0.9)" :
  treatment === "bw" ?
  "grayscale(1) contrast(1.05)" :
  "grayscale(0.6) contrast(1.05)";
  const stripeColor = treatment === "duotone" ? "#A67C00" : "#0E0E0E";
  return (
    <div style={{
      aspectRatio: ratio, width: "100%", position: "relative", overflow: "hidden",
      background: `repeating-linear-gradient(135deg, ${stripeColor}10 0px, ${stripeColor}10 8px, ${stripeColor}05 8px, ${stripeColor}05 16px)`,
      filter
    }}>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.18em",
        textTransform: "uppercase", color: "#0E0E0E", opacity: 0.45
      }}>{label}</div>
      {treatment === "grain" &&
      <div style={{
        position: "absolute", inset: 0, opacity: 0.2,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")"
      }} />
      }
    </div>);

}

// ---------- LANG POPUP ----------
function LangPopup({ onSelect }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(14,14,14,0.55)", backdropFilter: "blur(14px)"
    }}>
      <div style={{
        padding: "3rem 2.5rem", maxWidth: "22rem", width: "90%", background: "#F4F4F2",
        border: "1px solid #0E0E0E15", borderRadius: "32px", fontFamily: "\"DM Sans\""
      }}>
        <div style={{ textAlign: "center", marginBottom: "2.25rem", fontFamily: "\"DM Sans\"" }}>
          <p style={{ fontSize: "1.65rem", letterSpacing: "-0.01em", color: "#0E0E0E", margin: 0, fontFamily: "\"DM Sans\"" }}><SatoriMark /></p>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#0E0E0E", opacity: 0.45, marginTop: "0.5rem", fontFamily: "\"DM Sans\"" }}>Estrategia digital</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button onClick={() => onSelect("es")} style={{
            width: "100%", padding: "1rem", fontWeight: 500, fontSize: "0.72rem",
            textTransform: "uppercase", letterSpacing: "0.18em", background: "#0E0E0E", color: "#F4F4F2",
            border: "none", cursor: "pointer", borderRadius: "999px", fontFamily: "\"DM Sans\""
          }}>Español</button>
          <button onClick={() => onSelect("en")} style={{
            width: "100%", padding: "1rem", fontWeight: 400, fontSize: "0.72rem",
            textTransform: "uppercase", letterSpacing: "0.18em", background: "transparent", color: "#0E0E0E",
            border: "1px solid #0E0E0E25", cursor: "pointer", borderRadius: "999px", fontFamily: "\"DM Sans\""
          }}>English</button>
        </div>
      </div>
    </div>);

}

// ---------- NAV ----------
function Nav({ c, lang, onLang, onOpenLang }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backdropFilter: "blur(16px)", background: "rgba(244,244,242,0.78)",
      borderBottom: "1px solid #0E0E0E10",
      padding: "1.1rem clamp(1.25rem,4vw,2.5rem)",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <a href="#inicio" style={{
        fontSize: "1.4rem", color: "#0E0E0E",
        textDecoration: "none", letterSpacing: "-0.01em", fontFamily: "\"DM Sans\""
      }}><SatoriMark /></a>
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
        {[["#problema", c.nav.problema], ["#servicios", c.nav.servicios], ["#nosotros", c.nav.nosotros], ["#cotizar", c.nav.cotizar]].map(([href, label]) =>
        <a key={href} href={href} style={{
          fontSize: "0.66rem", fontWeight: 400, textTransform: "uppercase",
          letterSpacing: "0.22em", color: "#0E0E0E", opacity: 0.72, textDecoration: "none", fontFamily: "\"DM Sans\""
        }}>{label}</a>
        )}
        <button onClick={onOpenLang} style={{
          fontSize: "0.62rem", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase",
          background: "transparent", border: "1px solid #0E0E0E20", padding: "0.4rem 0.9rem",
          cursor: "pointer", color: "#0E0E0E", opacity: 0.6, borderRadius: "999px", fontFamily: "\"DM Sans\""
        }}>{lang === "es" ? "EN" : "ES"}</button>
        <a href={CALENDLY} target="_blank" rel="noopener" className="nav-cta-glow" style={{
          fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#F4F4F2", padding: "0.7rem 1.3rem", textDecoration: "none", borderRadius: "999px", background: "rgb(14, 14, 14)", fontFamily: "\"DM Sans\""
        }}>{c.nav.cta}</a>
      </div>
    </nav>);

}

// ---------- HERO ----------
function Hero({ c, layout, ensoGoldSeq }) {
  const eyebrow =
  <p style={{
    fontSize: "0.6rem", letterSpacing: "0.36em", textTransform: "uppercase",
    color: "#0E0E0E", opacity: 0.55, fontWeight: 400, marginBottom: "2rem",
    display: "inline-flex", alignItems: "center", gap: "0.7rem"
  }}><span style={{ width: "18px", height: "1px", background: "#A67C00", display: "inline-block" }}></span>{c.hero.eyebrow}</p>;

  const title =
  <h1 style={{
    fontWeight: 400,
    fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.98, letterSpacing: "-0.025em",
    color: "#0E0E0E", margin: 0, fontFamily: "serif"
  }}>
      {c.hero.h1a}<br />
      <span style={{ fontStyle: "italic", letterSpacing: "-2.4075px", fontWeight: "500", position: "relative", display: "inline-block", fontFamily: "\"DM Sans\"", fontSize: "78px" }}>
        <span style={{ color: "rgb(140, 140, 140)", fontWeight: "300", fontFamily: "serif", textAlign: "center", fontSize: "58px" }}>{c.hero.h1b}</span>
        <span style={{ position: "absolute", left: "0.05em", right: "0.4em", bottom: "0.06em", background: "#A67C00", textAlign: "justify", opacity: "-1", height: "0px" }}></span>
      </span>
    </h1>;

  const sub =
  <p style={{
    fontSize: "1.17rem", lineHeight: 1.7, color: "#0E0E0E", opacity: 0.62,
    maxWidth: "30rem", marginTop: "2rem", fontWeight: 300
  }}>{c.hero.sub}</p>;

  const ctas =
  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2.5rem" }}>
      <a href={CALENDLY} target="_blank" rel="noopener" style={btnPrimary}>{c.hero.cta1}</a>
      <a href="#servicios" style={btnGhost}>{c.hero.cta2}</a>
    </div>;


  if (layout === "center") {
    return (
      <section id="inicio" style={{
        position: "relative", zIndex: 1,
        padding: "9rem 1.5rem 6rem", maxWidth: "62rem", margin: "0 auto",
        textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center"
      }}>
        <div style={{ position: "absolute", top: "10rem", left: "50%", transform: "translateX(-50%)", zIndex: -1, opacity: 0.18 }}>
          <Enso size={520} />
        </div>
        {eyebrow}
        {title}
        <div style={{ maxWidth: "30rem" }}>{sub}</div>
        {ctas}
      </section>);

  }

  return (
    <section id="inicio" style={{
      position: "relative", zIndex: 1,
      padding: "9rem 1.5rem 6rem", maxWidth: "78rem", margin: "0 auto", fontFamily: "\"DM Sans\""
    }}>
      <div className="hero-grid" style={{
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center"
      }}>
        <div style={{ textAlign: "left" }}>
          {eyebrow}
          {title}
          {sub}
          {ctas}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Enso size={420} opacity={0.22} className={ensoGoldSeq ? "hero-enso-gold-seq" : ""} />
        </div>
      </div>
    </section>);

}

const btnPrimary = {
  padding: "1rem 1.8rem", background: "#0E0E0E", color: "#F4F4F2",
  fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
  fontFamily: "inherit", whiteSpace: "nowrap", borderRadius: "999px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease"
};
const btnGhost = {
  padding: "1rem 1.8rem", background: "transparent", color: "#0E0E0E",
  border: "1px solid #0E0E0E30", fontSize: "0.7rem", letterSpacing: "0.22em",
  textTransform: "uppercase", fontWeight: 400, textDecoration: "none",
  display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "inherit", whiteSpace: "nowrap",
  borderRadius: "999px", transition: "transform 0.2s ease, background 0.2s ease"
};
const btnGold = {
  padding: "1rem 1.8rem", background: "#A67C00", color: "#F4F4F2",
  fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
  fontFamily: "inherit", whiteSpace: "nowrap", borderRadius: "999px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease"
};

// ---------- PROBLEMA ----------
function Problema({ c, layout, lang }) {
  const wa = lang === "es" ? WHATSAPP : "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
  return (
    <section id="problema" style={{
      position: "relative", zIndex: 1, padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", fontFamily: "\"Playfair Display\""
    }}>
      <div style={{ maxWidth: "62rem", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <p style={eyebrowStyle}>{c.problema.label}</p>
          <h2 style={h2Style}>{c.problema.h}</h2>
        </div>
        {layout === "list" ?
        <div>
            {c.problema.items.map((it, i) =>
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem",
            padding: "2rem 0", borderTop: i === 0 ? "1px solid #0E0E0E15" : "none",
            borderBottom: "1px solid #0E0E0E15"
          }} className="prob-row">
                <div style={{
              fontFamily: "'Playfair Display', serif", fontSize: "2rem",
              color: "#0E0E0E", opacity: 0.25, fontStyle: "italic", lineHeight: 1
            }}>—</div>
                <div>
                  <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,2.4vw,1.85rem)",
                fontWeight: 400, lineHeight: 1.25, marginBottom: "0.9rem", color: "#0E0E0E",
                letterSpacing: "-0.01em"
              }}>{it.q}</p>
                  <p style={{ fontSize: "1.09rem", lineHeight: 1.7, color: "#0E0E0E", opacity: 0.6, fontWeight: 300, maxWidth: "44rem" }}>{it.d}</p>
                </div>
              </div>
          )}
          </div> :

        <div style={{ display: "grid", gap: "1.25rem" }}>
            {c.problema.items.map((it, i) =>
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "3.5rem 1fr", gap: "1.5rem",
            padding: "1.75rem", border: "1px solid #0E0E0E12", background: "#0E0E0E03", borderRadius: "24px"
          }}>
                <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
              letterSpacing: "0.15em", color: "#A67C00", opacity: 0.7, paddingTop: "0.4rem"
            }}>{String(i + 1).padStart(2, "0")}</div>
                <div>
                  <p style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 400, lineHeight: 1.3, marginBottom: "0.65rem", color: "#0E0E0E", fontSize: "28px"
              }}>{it.q}</p>
                  <p style={{ lineHeight: 1.7, color: "#0E0E0E", opacity: 0.6, fontWeight: 300, fontSize: "1.09rem" }}>{it.d}</p>
                </div>
              </div>
          )}
          </div>
        }
        <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <a href={wa} target="_blank" rel="noopener" style={{ ...btnPrimary, fontFamily: "\"DM Sans\"" }}>{c.problema.cta} →</a>
          <span style={{
            fontSize: "0.7rem", letterSpacing: "0.12em",
            color: "#0E0E0E", opacity: 0.45, fontFamily: "\"DM Sans\""
          }}>{c.problema.hint}</span>
        </div>
      </div>
    </section>);

}

// ---------- STATS ----------
function Stats({ c }) {
  return (
    <section style={{ padding: "6rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "62rem", margin: "0 auto" }}>
        <div className="stats-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px",
          background: "#0E0E0E15"
        }}>
          {c.stats.map((s, i) =>
          <div key={i} style={{
            padding: "3rem 1.5rem", background: "#F4F4F2", textAlign: "center", position: "relative"
          }}>
              {i === 1 && <span style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)", width: "4px", height: "4px", borderRadius: "50%", background: "#A67C00" }}></span>}
              <p style={{
              fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "#0E0E0E", opacity: 0.5, marginBottom: "1.5rem"
            }}>{s.label}</p>
              <p style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem,7vw,5.5rem)",
              fontWeight: 400, color: "#0E0E0E", lineHeight: 1, letterSpacing: "-0.03em"
            }}>{s.n}</p>
              <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
              letterSpacing: "0.16em", textTransform: "uppercase",
              color: "#A67C00", opacity: 0.7, marginTop: "1.25rem"
            }}>{s.desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- RUTA TIMELINE ----------
function Ruta({ c }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ padding: "5rem clamp(1rem,4vw,3rem) 4rem", maxWidth: "78rem", margin: "0 auto", textAlign: "center" }}>
      <h2 style={{ ...h2Style, textAlign: "center", marginBottom: "3rem", maxWidth: "none" }}>{c.ruta.label}</h2>
      <div className="ruta-row" style={{ position: "relative", display: "flex", alignItems: "flex-start", fontFamily: "\"DM Sans\"" }}>
        <div style={{
          position: "absolute", top: "1.65rem", left: "10%", right: "10%", height: "1px",
          background: "#0E0E0E20", zIndex: 0
        }} />
        {c.ruta.steps.map((s, i) => {
          const isH = hovered === i;
          return (
            <div key={i}
            data-ruta-step
            onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
            style={{
              flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
              padding: "0 0.5rem", position: "relative", zIndex: 1,
              transition: "transform .35s ease, opacity .8s ease, filter .8s ease",
              transform: isH ? "translateY(-6px)" : "translateY(0)", textAlign: "right"
            }}>
              <div style={{
                width: "3.4rem", height: "3.4rem", borderRadius: "50%",
                border: `1px solid ${isH ? "#0E0E0E" : "#0E0E0E25"}`,
                background: isH ? "#0E0E0E" : "#F4F4F2",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem", transition: "all .3s ease",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                letterSpacing: "0.05em", color: isH ? "#F4F4F2" : "#0E0E0E", fontWeight: 400
              }}>{s.paso}</div>
              <p style={{
                fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.18em",
                fontWeight: 500, color: "#0E0E0E", marginBottom: "0.65rem"
              }}>{s.label}</p>
              <p style={{
                fontSize: "0.98rem", lineHeight: 1.55, color: "#0E0E0E", opacity: isH ? 0.78 : 0.6,
                fontWeight: 300, transition: "opacity .3s",
                maxHeight: isH ? "6rem" : "3.2rem", overflow: "hidden"
              }}>{s.desc}</p>
            </div>);

        })}
      </div>
    </div>);

}

// ---------- SERVICE IMAGE ----------
function ServiceImage({ src, label, ratio, treatment }) {
  if (!src) return <ImagePlaceholder label={label} ratio={ratio} treatment={treatment} />;
  return (
    <div style={{
      aspectRatio: ratio, width: "100%", overflow: "hidden",
      background: "#EFEFEC", position: "relative", borderRadius: "24px"
    }}>
      <img src={src} alt={label} style={{
        width: "100%", height: "100%", display: "block",
        filter: treatment === "bw" ? "grayscale(1) contrast(1.05)" :
        treatment === "duotone" ? "grayscale(1) sepia(0.6) hue-rotate(-15deg) saturate(1.6) contrast(1.05)" :
        "grayscale(0.15) contrast(1.02)", objectFit: "cover"
      }} />
      {treatment === "grain" && <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18, mixBlendMode: "multiply",
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")"
      }} />}
    </div>);

}

// ---------- SERVICIOS ----------
function Servicios({ c, layout, treatment, lang }) {
  const waPrefix = lang === "es" ? "Hola%20Rodrigo,%20me%20interesa%20" : "Hi%20Rodrigo,%20I'm%20interested%20in%20";
  return (
    <section id="servicios" style={{
      position: "relative", zIndex: 1, borderTop: "1px solid #0E0E0E10",
      background: "#EFEFEC"
    }}>
      <div style={{ padding: "7rem clamp(1.5rem,5vw,3rem) 5rem", maxWidth: "78rem", margin: "0 auto" }}>
        <p style={eyebrowStyle}>{c.servicios.eyebrow}</p>
        <h2 style={{ ...h2Style, maxWidth: "none", whiteSpace: "nowrap" }}>{c.servicios.h}</h2>
        <p className="serv-sub-gold" style={{ fontSize: "1.09rem", lineHeight: 1.7, color: "#0E0E0E", opacity: 0.55, fontWeight: 300, maxWidth: "32rem", marginTop: "1.25rem" }}>{c.servicios.sub}</p>
      </div>

      <div style={{ padding: "0 clamp(1.5rem,5vw,3rem) 7rem", maxWidth: "78rem", margin: "0 auto" }}>
        {layout === "stack" ?
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {c.servicios.items.map((s, i) =>
          <div key={i} className="serv-stack" style={{
            background: "#F4F4F2",
            display: "grid", gridTemplateColumns: "0.8fr 1.2fr", gap: "3rem",
            padding: "3rem", alignItems: "center", borderRadius: "32px"
          }}>
                <div>
                  <ServiceImage src={s.img} label={`${s.tag} · ${s.num}`} ratio="4/5" treatment={treatment} />
                </div>
                <div>
                  <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem",
                letterSpacing: "0.22em", color: "#A67C00", opacity: 0.75,
                textTransform: "uppercase", marginBottom: "1.25rem"
              }}>{s.num} — {s.tag}</p>
                  <h3 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.6rem)",
                fontWeight: 400, lineHeight: 1.05, marginBottom: "0.6rem", letterSpacing: "-0.015em"
              }}>{s.t}</h3>
                  <p style={{
                fontSize: "0.66rem", letterSpacing: "0.22em", textTransform: "uppercase",
                color: "#0E0E0E", opacity: 0.5, marginBottom: "1.5rem", fontWeight: 400
              }}>{s.sub}</p>
                  <p style={{
                fontSize: "1.17rem", lineHeight: 1.65, color: "#0E0E0E", opacity: 0.7,
                marginBottom: "1.75rem", fontWeight: 300, maxWidth: "32rem"
              }}>{s.d}</p>
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "grid", gap: "0.65rem", fontFamily: "\"DM Sans\"" }}>
                    {s.benefits.map((b, bi) =>
                <li key={bi} style={{ display: "flex", gap: "0.85rem", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "#A67C00", opacity: 0.65 }}>—</span>
                        <span style={{ fontSize: "1.06rem", color: "#0E0E0E", opacity: 0.78, fontWeight: 300 }}>{b}</span>
                      </li>
                )}
                  </ul>
                  <a href={`https://wa.me/525625018281?text=${waPrefix}${encodeURIComponent(s.t)}`} target="_blank" rel="noopener" style={{ ...btnPrimary, fontFamily: "\"DM Sans\"" }}>
                    {c.servicios.cta} →
                  </a>
                </div>
              </div>
          )}
          </div> :

        <div className="serv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
            {c.servicios.items.map((s, i) =>
          <div key={i} style={{
            background: "#F4F4F2", padding: "2rem", display: "flex", flexDirection: "column",
            border: "1px solid #0E0E0E12", borderRadius: "28px"
          }} data-bubble>
                <ServiceImage src={s.img} label={s.tag} ratio="4/3" treatment={treatment} />
                <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
              letterSpacing: "0.22em", color: "#A67C00", opacity: 0.75,
              textTransform: "uppercase", marginTop: "1.5rem", marginBottom: "0.75rem"
            }}>{s.num} — {s.tag}</p>
                <h3 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "1.65rem",
              fontWeight: 400, lineHeight: 1.1, marginBottom: "0.5rem", letterSpacing: "-0.01em"
            }}>{s.t}</h3>
                <p style={{
              fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
              color: "#0E0E0E", opacity: 0.45, marginBottom: "1.25rem"
            }}>{s.sub}</p>
                <p style={{ fontSize: "1.06rem", lineHeight: 1.65, color: "#0E0E0E", opacity: 0.65, fontWeight: 300, marginBottom: "1.5rem" }}>{s.d}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "grid", gap: "0.55rem", flex: 1 }}>
                  {s.benefits.map((b, bi) =>
              <li key={bi} style={{ display: "flex", gap: "0.7rem", alignItems: "baseline" }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#A67C00", opacity: 0.6 }}>—</span>
                      <span style={{ fontSize: "0.98rem", color: "#0E0E0E", opacity: 0.78, fontWeight: 300 }}>{b}</span>
                    </li>
              )}
                </ul>
                <a href={`https://wa.me/525625018281?text=${waPrefix}${encodeURIComponent(s.t)}`} target="_blank" rel="noopener" style={{ ...btnGhost, padding: "0.8rem 1.25rem", fontSize: "0.62rem" }}>
                  {c.servicios.cta} →
                </a>
              </div>
          )}
          </div>
        }
      </div>
    </section>);

}

// ---------- NOSOTROS ----------
function Nosotros({ c, treatment }) {
  return (
    <section id="nosotros" style={{ padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div className="nosotros-grid" style={{
        maxWidth: "70rem", margin: "0 auto",
        display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "4rem", alignItems: "center"
      }}>
        <div style={{ position: "relative" }}>
          <div style={{
            aspectRatio: "4/5", width: "100%", overflow: "hidden",
            position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center",
            borderRadius: "32px",
            background: "#EFEFEC"
          }}>
            <img src="assets/rodrigo.png" alt="Rodrigo" style={{
              width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom",
              transformOrigin: "center bottom",
              filter: treatment === "bw" ? "grayscale(1) contrast(1.05)" :
              treatment === "duotone" ? "grayscale(1) sepia(0.6) hue-rotate(-15deg) saturate(1.6) contrast(1.05)" :
              "grayscale(0.15) contrast(1.02)",
              display: "block"
            }} />
            {treatment === "grain" && <div style={{
              position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.18, mixBlendMode: "multiply",
              backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/></svg>\")"
            }} />}
          </div>
        </div>
        <div style={{ fontFamily: "\"DM Sans\"" }}>
          <p style={eyebrowStyle}>{c.nosotros.label}</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)",
            fontWeight: 400, marginBottom: "0.4rem", lineHeight: 1.05, letterSpacing: "-0.015em",
            color: "#A67C00"
          }}>{c.nosotros.nombre}</h2>
          <p style={{
            fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#0E0E0E", opacity: 0.45, marginBottom: "2rem"
          }}>{c.nosotros.cargo}</p>
          <p style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1.6rem",
            fontStyle: "italic", fontWeight: 400, lineHeight: 1.35, marginBottom: "1.5rem",
            color: "#0E0E0E", letterSpacing: "-0.01em"
          }}>"{c.nosotros.quote}"</p>
          <p style={{ fontSize: "1.09rem", lineHeight: 1.75, color: "#0E0E0E", opacity: 0.7, marginBottom: "1.25rem", fontWeight: 300 }}>{c.nosotros.p1}</p>
          <p style={{ fontSize: "1.09rem", lineHeight: 1.75, color: "#0E0E0E", opacity: 0.7, marginBottom: "2rem", fontWeight: 300 }}>{c.nosotros.p2}</p>
          <div style={{
            padding: "1.5rem", border: "1px solid #A67C0030", background: "#A67C0008", marginBottom: "2rem", borderRadius: "24px"
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem",
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#A67C00", opacity: 0.8,
              marginBottom: "0.6rem", fontWeight: 400
            }}>{c.nosotros.garantia_t}</p>
            <p style={{ fontSize: "1.01rem", lineHeight: 1.7, color: "#0E0E0E", opacity: 0.7, fontWeight: 300 }}>{c.nosotros.garantia_d}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href={CALENDLY} target="_blank" rel="noopener" style={btnPrimary}>{c.nosotros.cta1}</a>
            <a href={`mailto:${EMAIL}`} style={btnGhost}>{c.nosotros.cta2}</a>
          </div>
        </div>
      </div>
    </section>);

}

// ---------- REVIEWS ----------
function Reviews({ c }) {
  return (
    <section style={{ padding: "7rem 1.5rem", background: "#EFEFEC", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "70rem", margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={eyebrowStyle}>{c.reviews.label}</p>
          <h2 style={{ ...h2Style, maxWidth: "none", whiteSpace: "nowrap" }}>{c.reviews.h}</h2>
        </div>
        <div className="rev-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
          {c.reviews.items.map((r, i) =>
          <div key={i} style={{ background: "#F4F4F2", padding: "2.25rem", display: "flex", flexDirection: "column", borderRadius: "28px", border: "1px solid #0E0E0E10" }} data-bubble>
              <div style={{ display: "flex", gap: "0.18rem", marginBottom: "1.25rem" }}>
                {[1, 2, 3, 4, 5].map((s) =>
              <span key={s} style={{ color: "#A67C00", fontSize: "0.85rem", opacity: s <= r.stars ? 1 : 0.18 }}>★</span>
              )}
              </div>
              <p style={{
              fontFamily: "'Playfair Display', serif", fontSize: "1.21rem", fontStyle: "italic",
              fontWeight: 400, lineHeight: 1.55, color: "#0E0E0E", marginBottom: "1.5rem", flex: 1
            }}>"{r.text}"</p>
              <div style={{ fontFamily: "serif" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "#0E0E0E" }}>{r.name}</p>
                <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#0E0E0E", opacity: 0.5, marginTop: "0.25rem"
              }}>{r.role}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- MAPA (simplified) ----------
function Mapa({ c }) {
  // Coords on the real SVG viewBox 1000x630 (assets/mexico.svg)
  const dots = [
  { x: 119.2, y: 58.9, label: "B.C.N.", city: "Baja California Norte" },
  { x: 468, y: 422.9, label: "GDL", city: "Guadalajara" },
  { x: 580.7, y: 453.9, label: "EDOMEX", city: "Estado de México" },
  { x: 597.2, y: 460, label: "CDMX", city: "Ciudad de México" }];

  return (
    <section style={{ padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "62rem", margin: "0 auto", textAlign: "center" }}>
        <p style={eyebrowStyle}>{c.mapa.label}</p>
        <h2 style={{ ...h2Style, maxWidth: "30rem", margin: "0 auto 0.6rem" }}>{c.mapa.h}</h2>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: "1.21rem", fontStyle: "italic",
          color: "#0E0E0E", opacity: 0.55, marginBottom: "4rem"
        }}>— {c.mapa.sub}</p>

        <div style={{ position: "relative", maxWidth: "820px", margin: "0 auto", aspectRatio: "1000/630" }}>
          <img src="assets/mexico.svg" alt="México" style={{
            width: "100%", height: "100%", display: "block"
          }} />
          <svg viewBox="0 0 1000 630" preserveAspectRatio="xMidYMid meet" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none"
          }}>
            <defs>
              <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#A67C00" stopOpacity="0.55"/>
                <stop offset="55%" stopColor="#A67C00" stopOpacity="0.18"/>
                <stop offset="100%" stopColor="#A67C00" stopOpacity="0"/>
              </radialGradient>
            </defs>
            {dots.map((d, i) =>
            <g key={`glow-${i}`} style={{ mixBlendMode: "multiply" }}>
                <circle cx={d.x} cy={d.y} r="55" fill="url(#goldGlow)">
                  <animate attributeName="r" values="42;62;42" dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;1;0.7" dur={`${3.2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
              </g>
            )}
            {dots.map((d, i) =>
            <g key={i}>
                <circle cx={d.x} cy={d.y} r="14" fill="none" stroke="#A67C00" strokeWidth="2">
                  <animate attributeName="r" values="8;28;8" dur={`${2.4 + i * 0.6}s`} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur={`${2.4 + i * 0.6}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={d.x} cy={d.y} r="5" fill="#A67C00" />
                <text x={d.x} y={d.y - 16} textAnchor="middle" style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                letterSpacing: "0.08em", fill: "#A67C00", fontWeight: 600
              }}>{d.label}</text>
              </g>
            )}
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {dots.map((d) =>
          <div key={d.city} style={{
            display: "flex", alignItems: "center", gap: "0.6rem",
            fontSize: "0.66rem",
            letterSpacing: "0.16em", textTransform: "uppercase", color: "#0E0E0E", opacity: 0.6, fontFamily: "\"DM Sans\""
          }}>
              <span style={{ width: "6px", height: "6px", background: "#A67C00", borderRadius: "50%" }} />
              {d.city}
            </div>
          )}
        </div>
      </div>
    </section>);

}

// ---------- FAQ ----------
function FaqItem({ q, a, last, first, highlight }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "#F4F4F2", borderRadius: "24px", marginBottom: "0.6rem",
      border: "1px solid #0E0E0E10", overflow: "hidden",
      transition: "box-shadow .25s ease",
      boxShadow: open ? "0 4px 24px -8px #0E0E0E18" : "none"
    }} data-bubble>
      <button onClick={() => setOpen((o) => !o)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.4rem 1.75rem", background: "none", border: "none", cursor: "pointer", textAlign: "left",
        gap: "1rem", fontFamily: "inherit"
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.05rem,1.8vw,1.25rem)",
          fontWeight: 400, color: highlight ? "#A67C00" : "#0E0E0E", lineHeight: 1.4
        }}>{q}</span>
        <span style={{
          flexShrink: 0, fontSize: "1rem", color: "#0E0E0E", opacity: 0.5,
          transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s",
          fontFamily: "'JetBrains Mono', monospace"
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "20rem" : 0, overflow: "hidden", transition: "max-height .35s ease"
      }}>
        <p style={{
          padding: "0 1.75rem 1.4rem", fontSize: "1.09rem", lineHeight: 1.75,
          color: "#0E0E0E", opacity: 0.65, fontWeight: 300, maxWidth: "44rem"
        }}>{a}</p>
      </div>
    </div>);

}

function Faq({ c }) {
  return (
    <section style={{ padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "54rem", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={eyebrowStyle}>{c.faq.label}</p>
          <h2 style={{ ...h2Style, maxWidth: "30rem" }}>{c.faq.h}</h2>
        </div>
        <div style={{ fontFamily: "\"DM Sans\"" }}>
          {c.faq.items.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} last={i === c.faq.items.length - 1} highlight={/qué\s+necesito|what do i need/i.test(f.q)} />)}
        </div>
      </div>
    </section>);

}

// ---------- RUTA SECTION (standalone) ----------
function RutaSection({ c }) {
  return (
    <section id="ruta" style={{ padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1, background: "#EFEFEC" }}>
      <div style={{ maxWidth: "78rem", margin: "0 auto" }}>
        <Ruta c={c} />
      </div>
    </section>);
}

// ---------- COTIZAR ----------
function Cotizar({ c, lang }) {
  const wa = lang === "es" ?
  WHATSAPP :
  "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
  return (
    <section id="cotizar" data-no-gold style={{
      padding: "9rem 1.5rem", borderTop: "1px solid #0E0E0E10",
      position: "relative", zIndex: 1, background: "#0E0E0E", color: "#F4F4F2",
      textAlign: "center"
    }}>
      <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Enso size={120} opacity={0.55} />
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)",
          fontWeight: 400, marginTop: "2rem", marginBottom: "1.25rem", lineHeight: 1, letterSpacing: "-0.02em"
        }}>{c.cotizar.h}</h2>
        <p style={{
          fontSize: "1.15rem", lineHeight: 1.7, opacity: 0.65, fontWeight: 300,
          maxWidth: "28rem", margin: "0 auto 2.5rem"
        }}>{c.cotizar.sub}</p>
        <a href={wa} target="_blank" rel="noopener" style={{
          ...btnGold, padding: "1.1rem 2.2rem", fontSize: "0.72rem", fontFamily: "\"DM Sans\""
        }}>{c.cotizar.cta} →</a>
      </div>
    </section>);

}

// ---------- CTA FINAL ----------
function CtaFinal({ c, lang }) {
  const wa = lang === "es" ?
  WHATSAPP :
  "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
  const heading = lang === "es" ? "Empieza hoy." : "Start today.";
  const sub = lang === "es" ?
  "Una conversación de 30 minutos puede cambiar el rumbo de tu negocio." :
  "A 30-minute conversation can change the course of your business.";
  const cta1 = lang === "es" ? "Hablar por WhatsApp" : "Chat on WhatsApp";
  const cta2 = lang === "es" ? "Agendar Zoom" : "Book a Zoom";
  return (
    <section id="cta-final" style={{
      padding: "8rem 1.5rem", borderTop: "1px solid #0E0E0E10",
      position: "relative", zIndex: 1, textAlign: "center", overflow: "hidden"
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)", zIndex: 0, opacity: 0.22, pointerEvents: "none"
      }}>
        <Enso size={520} />
      </div>
      <div style={{ position: "relative", zIndex: 1, maxWidth: "42rem", margin: "0 auto" }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
          letterSpacing: "0.32em", textTransform: "uppercase", color: "#A67C00",
          opacity: 0.85, marginBottom: "1.5rem"
        }}>{lang === "es" ? "Último paso" : "Final step"}</p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)",
          fontWeight: 400, margin: "0 0 1.25rem", lineHeight: 1, letterSpacing: "-0.02em", color: "#0E0E0E"
        }}>{heading}</h2>
        <p style={{
          fontSize: "1.21rem", lineHeight: 1.65, color: "#0E0E0E", opacity: 0.65,
          fontWeight: 300, maxWidth: "30rem", margin: "0 auto 2.75rem"
        }}>{sub}</p>
        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href={wa} target="_blank" rel="noopener" style={{ ...btnGold, fontFamily: "\"DM Sans\"" }}>{cta1} →</a>
          <a href={CALENDLY} target="_blank" rel="noopener" style={{ ...btnGhost, fontFamily: "\"DM Sans\"" }}>{cta2}</a>
        </div>
      </div>
    </section>);
}

// ---------- FOOTER ----------
function Footer({ c }) {
  return (
    <footer style={{
      padding: "2.5rem 1.5rem", background: "#0E0E0E", color: "#F4F4F2",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem"
    }}>
      <p style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em", fontSize: "28px" }}><SatoriMark color="#F4F4F2" /></p>
      <p style={{
        fontSize: "0.62rem",
        letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.4, fontFamily: "\"DM Sans\""
      }}>{c.footer}</p>
    </footer>);

}

// ---------- FLOATING BUTTONS ----------
function FloatingCTAs({ lang, c }) {
  const wa = lang === "es" ?
  WHATSAPP :
  "https://wa.me/525625018281?text=Hi%20Rodrigo";
  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <a href={wa} target="_blank" rel="noopener" style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.8rem 1.1rem", color: "#F4F4F2",
        textDecoration: "none", fontSize: "0.62rem", letterSpacing: "0.18em",
        textTransform: "uppercase", fontWeight: 500, borderRadius: "999px", background: "rgb(166, 124, 0)", fontFamily: "\"DM Sans\""
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
        WhatsApp
      </a>
    </div>);

}

// ---------- SHARED STYLES ----------
const eyebrowStyle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.66rem", letterSpacing: "0.28em", textTransform: "uppercase",
  color: "#0E0E0E", opacity: 0.55, fontWeight: 400, marginBottom: "1.5rem"
};
const h2Style = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(2.4rem,5.5vw,4.5rem)", fontWeight: 400, lineHeight: 1.0,
  color: "#0E0E0E", letterSpacing: "-0.025em", margin: 0
};

Object.assign(window, {
  content, Enso, MatrixBackground, ImagePlaceholder, ServiceImage, LangPopup, Nav,
  Hero, Problema, Stats, Servicios, Nosotros, Reviews, Mapa, Faq, Cotizar, Footer, FloatingCTAs
});