"use client";

/* SATORI — Landing v2
   Premium, restrained, mobile-first. Tinta + Papel + Oro como acento.
   Adaptado para Next.js 16 + React 19.
*/

import { useState, useEffect, useRef } from "react";

// ---------- CONTENT ----------
const content = {
  es: {
    nav: { problema: "Problema", servicios: "Servicios", nosotros: "Nosotros", cotizar: "Cotizar", cta: "Agendar" },
    hero: {
      eyebrow: "Estrategia · Marca · Crecimiento",
      h1a: "Más Clientes.",
      h1b: "Menos ruido.",
      sub: "Estrategia digital para empresarios que valoran su tiempo. Identidad, posicionamiento y marketing con IA — sin caos, sin promesas vacías.",
      cta1: "Auditoría gratis",
      cta2: "Cómo funciona",
    },
    problema: {
      label: "El problema",
      h: "Lo que resolvemos:",
      items: [
        { q: "Pago anuncios y no llega el cliente correcto.", d: "Tu inversión en ads se pierde sin un sistema que filtre y nutra prospectos antes de que se enfríen." },
        { q: "Pierdo clientes por no contestar a tiempo.", d: "El 78% de las ventas las gana quien responde primero. Sin automatización, no compites." },
        { q: "Mis redes están muertas y la competencia gana.", d: "La consistencia construye confianza. Sin tiempo, no hay consistencia." },
      ],
      cta: "Identifico mi problema",
      hint: "Gratis · sin compromiso",
    },
    stats: [
      { label: "Tu negocio abierto", n: "24/7", desc: "Siempre disponible" },
      { label: "Prospectos perdidos", n: "0", desc: "Cero fugas" },
      { label: "Días para resultados", n: "30", desc: "Garantizados" },
    ],
    servicios: {
      eyebrow: "Tres soluciones. Un socio.",
      h: "Lo que hacemos.",
      sub: "Cada servicio diseñado para empresarios que crecen con estrategia.",
      items: [
        { num: "01", tag: "Marca", t: "Marca propia", sub: "Identidad · Presencia · Autoridad", d: "La identidad que un empresario serio merece.", benefits: ["Imagen que genera confianza", "Diferenciación clara", "Posicionamiento de CEO", "Kit de marca completo"], img: "/assets/marca-propia.png" },
        { num: "02", tag: "Imagen", t: "Posicionamiento online", sub: "Reputación · Visibilidad · Confianza", d: "Tu empresa frente a las personas correctas.", benefits: ["Primero en Google", "Reputación verificable", "Presencia en medios", "Contenido que atrae"], img: "/assets/posicionamiento.png" },
        { num: "03", tag: "IA", t: "Marketing con IA", sub: "Conversión · Automatización · Escala", d: "Tu motor de crecimiento que nunca duerme.", benefits: ["Prospectos en piloto automático", "Sin oportunidades perdidas", "Campañas auto-optimizadas", "ROI desde el primer mes"], img: "/assets/marketing-ia.png" },
      ],
      cta: "Ver detalle",
    },
    ruta: {
      label: "Tu ruta de crecimiento",
      steps: [
        { paso: "01", label: "Redes activas", desc: "Presencia consistente que genera confianza." },
        { paso: "02", label: "Marca clara", desc: "Identidad que te diferencia." },
        { paso: "03", label: "Visibilidad", desc: "Google y medios trabajando a tu favor." },
        { paso: "04", label: "Conversión", desc: "Sistemas que convierten interés en prospectos." },
        { paso: "05", label: "Ventas", desc: "Clientes llegando solos." },
      ],
    },
    nosotros: {
      label: "Tu socio digital",
      nombre: "Rodrigo Tristán",
      cargo: "Fundador de Satori",
      quote: "La estrategia antes que el ruido.",
      p1: "Sé lo que cuesta construir un negocio desde adentro. Por eso fundé Satori — para que cada empresario mexicano acceda a las herramientas que usan las empresas más avanzadas del mundo.",
      p2: "La mayoría de las agencias venden actividad. Yo vendo claridad. Antes de tocar una herramienta, entendemos tu mercado, tu cliente y qué es verdad en tu industria.",
      garantia_t: "Garantía de 30 días.",
      garantia_d: "Si no sientes que el valor supera la inversión, seguimos 20 días más sin costo. Sin preguntas.",
      cta1: "Agendar Zoom",
      cta2: "Email",
    },
    reviews: {
      label: "Lo que dicen",
      h: "Resultados reales.",
      items: [
        { name: "Carlos M.", role: "Restaurantero", text: "Antes perdía clientes por no contestar rápido. Ahora el sistema responde solo y ya agendé tres mesas más esta semana.", stars: 5 },
        { name: "Fernanda R.", role: "Directora de clínica", text: "Mi sitio web nuevo me trajo pacientes que antes ni sabían que existíamos. ROI visible en el primer mes.", stars: 5 },
        { name: "Diego L.", role: "Consultor", text: "En seis semanas duplicamos los mensajes de prospectos. Contenido de muy buena calidad.", stars: 5 },
      ],
    },
    mapa: {
      label: "Presencia nacional",
      h: "Clientes en todo México.",
      sub: "Y creciendo.",
    },
    faq: {
      label: "Preguntas frecuentes",
      h: "Lo esencial.",
      items: [
        { q: "¿Cuánto tarda en ver resultados?", a: "Marca propia: primeras semanas. Posicionamiento: 1–3 meses. Marketing con IA: desde la activación." },
        { q: "¿Necesito saber de tecnología?", a: "Para nada. Nos encargamos de toda la parte técnica. Tú nos cuentas tu negocio, nosotros hacemos el resto." },
        { q: "¿Firmo contrato largo?", a: "No. Trabajamos mes a mes. Cancela cuando quieras." },
        { q: "¿Qué necesito para empezar?", a: "Una llamada de 30 minutos. Entendemos tu negocio, proponemos la ruta, te damos un precio claro." },
        { q: "¿Con qué tipo de negocios trabajan?", a: "Empresarios y pymes en México — despachos, constructoras, clínicas, consultoras y servicios profesionales." },
      ],
    },
    cotizar: {
      h: "¿Listo para crecer?",
      sub: "Cuéntanos dónde estás hoy y armamos una propuesta a tu medida.",
      cta: "Quiero mi cotización",
    },
    footer: "© 2026 Satori · Estrategia digital · México",
  },
  en: {
    nav: { problema: "Problem", servicios: "Services", nosotros: "About", cotizar: "Quote", cta: "Book" },
    hero: {
      eyebrow: "Strategy · Brand · Growth",
      h1a: "More clients.",
      h1b: "Less noise.",
      sub: "Digital strategy for entrepreneurs who value their time. Identity, positioning and AI marketing — no chaos, no empty promises.",
      cta1: "Free audit",
      cta2: "How it works",
    },
    problema: {
      label: "The problem",
      h: "Sound familiar?",
      items: [
        { q: "I pay for ads but the wrong people arrive.", d: "Your ad spend leaks without a system to filter and nurture leads before they go cold." },
        { q: "I lose clients because I can't reply fast enough.", d: "78% of sales go to whoever answers first. Without automation, you don't compete." },
        { q: "My social is dead and competitors are winning.", d: "Consistency builds trust. Without time, there's no consistency." },
      ],
      cta: "I found my problem",
      hint: "Free · no commitment",
    },
    stats: [
      { label: "Your business open", n: "24/7", desc: "Always on" },
      { label: "Leads lost", n: "0", desc: "Zero leaks" },
      { label: "Days to results", n: "30", desc: "Guaranteed" },
    ],
    servicios: {
      eyebrow: "Three solutions. One partner.",
      h: "What we do.",
      sub: "Each service designed for entrepreneurs who grow with strategy.",
      items: [
        { num: "01", tag: "Brand", t: "Brand identity", sub: "Identity · Presence · Authority", d: "The identity a serious entrepreneur deserves.", benefits: ["Instant trust through image", "Clear differentiation", "CEO positioning", "Complete brand kit"], img: "/assets/marca-propia.png" },
        { num: "02", tag: "Image", t: "Online positioning", sub: "Reputation · Visibility · Trust", d: "Your company in front of the right people.", benefits: ["Rank first on Google", "Verifiable reputation", "Presence in media", "Content that attracts"], img: "/assets/posicionamiento.png" },
        { num: "03", tag: "AI", t: "AI marketing", sub: "Conversion · Automation · Scale", d: "Your growth engine that never sleeps.", benefits: ["Leads on autopilot", "No missed opportunities", "Self-optimizing campaigns", "ROI from month one"], img: "/assets/marketing-ia.png" },
      ],
      cta: "See details",
    },
    ruta: {
      label: "Your growth roadmap",
      steps: [
        { paso: "01", label: "Active social", desc: "Consistent presence that builds trust." },
        { paso: "02", label: "Clear brand", desc: "Identity that sets you apart." },
        { paso: "03", label: "Visibility", desc: "Google and media working for you." },
        { paso: "04", label: "Conversion", desc: "Systems that turn interest into leads." },
        { paso: "05", label: "Sales", desc: "Clients coming to you." },
      ],
    },
    nosotros: {
      label: "Your digital partner",
      nombre: "Rodrigo Tristán",
      cargo: "Founder of Satori",
      quote: "Strategy before noise.",
      p1: "I know what it costs to build a business from the inside. That's why I founded Satori — so every Mexican entrepreneur has access to the same tools as the world's most advanced companies.",
      p2: "Most agencies sell activity. I sell clarity. Before touching a tool, we understand your market, your client and what's actually true in your industry.",
      garantia_t: "30-day guarantee.",
      garantia_d: "If the value doesn't exceed your investment, we keep working 20 more days at no cost. No questions.",
      cta1: "Book a Zoom",
      cta2: "Email",
    },
    reviews: {
      label: "What clients say",
      h: "Real results.",
      items: [
        { name: "Carlos M.", role: "Restaurant owner", text: "I used to lose clients because I couldn't reply fast. Now the system handles it and I've booked three more tables this week.", stars: 5 },
        { name: "Fernanda R.", role: "Clinic director", text: "My new website brought patients who didn't even know we existed. ROI visible in the first month.", stars: 5 },
        { name: "Diego L.", role: "Consultant", text: "In six weeks we doubled inbound messages. Content quality is excellent.", stars: 5 },
      ],
    },
    mapa: {
      label: "National presence",
      h: "Clients across Mexico.",
      sub: "And growing.",
    },
    faq: {
      label: "Frequently asked",
      h: "The essentials.",
      items: [
        { q: "How long until results?", a: "Brand: first weeks. Positioning: 1–3 months. AI marketing: from activation." },
        { q: "Do I need to be tech-savvy?", a: "Not at all. We handle every technical detail. You tell us about your business, we do the rest." },
        { q: "Long-term contract?", a: "No. Month to month. Cancel anytime." },
        { q: "What do I need to start?", a: "A 30-minute call. We learn your business, propose the path, give you a clear price." },
        { q: "What businesses do you work with?", a: "Entrepreneurs and SMEs in Mexico — law firms, construction, clinics, consultancies and professional services." },
      ],
    },
    cotizar: {
      h: "Ready to grow?",
      sub: "Tell us where you are today and we'll build a proposal for you.",
      cta: "Get my quote",
    },
    footer: "© 2026 Satori · Digital strategy · Mexico",
  },
} as const;

type Lang = "es" | "en";
type Content = typeof content.es;

const WHATSAPP = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const CALENDLY = "https://calendly.com/rodrigo-tristaan";
const EMAIL = "r.tristaan@outlook.com";

// ---------- SHARED STYLES ----------
const eyebrowStyle: React.CSSProperties = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.66rem", letterSpacing: "0.28em", textTransform: "uppercase",
  color: "#0E0E0E", opacity: 0.55, fontWeight: 400, marginBottom: "1.5rem",
};
const h2Style: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: "clamp(2.4rem,5.5vw,4.5rem)", fontWeight: 400, lineHeight: 1.0,
  color: "#0E0E0E", letterSpacing: "-0.025em", margin: 0,
};
const btnPrimary: React.CSSProperties = {
  padding: "1rem 1.8rem", background: "#0E0E0E", color: "#F4F4F2",
  fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
  fontFamily: "inherit", whiteSpace: "nowrap", borderRadius: "999px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};
const btnGhost: React.CSSProperties = {
  padding: "1rem 1.8rem", background: "transparent", color: "#0E0E0E",
  border: "1px solid #0E0E0E30", fontSize: "0.7rem", letterSpacing: "0.22em",
  textTransform: "uppercase", fontWeight: 400, textDecoration: "none",
  display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "inherit", whiteSpace: "nowrap",
  borderRadius: "999px", transition: "transform 0.2s ease, background 0.2s ease",
};
const btnGold: React.CSSProperties = {
  padding: "1rem 1.8rem", background: "#A67C00", color: "#F4F4F2",
  fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 500,
  textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem",
  fontFamily: "inherit", whiteSpace: "nowrap", borderRadius: "999px",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

// ---------- ENSŌ ----------
function Enso({ size = 360, opacity = 0.92, spinning = true, color = "#0E0E0E" }: { size?: number; opacity?: number; spinning?: boolean; color?: string }) {
  const isLight = color && color.toLowerCase() !== "#0e0e0e" && color.toLowerCase() !== "#000" && color.toLowerCase() !== "#000000";
  return (
    <div style={{
      width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center",
      animation: spinning ? "ensoSpin 22s linear infinite" : "none",
    }}>
      <img
        src="/assets/enso.png"
        alt="Ensō"
        width={size}
        height={size}
        style={{
          width: size,
          height: size,
          opacity,
          objectFit: "contain",
          filter: isLight ? "invert(1)" : "none",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />
    </div>
  );
}

// ---------- MATRIX RAIN ----------
function MatrixBackground({ opacity = 0.07, color = "#A67C00" }: { opacity?: number; color?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 22);
    const drops = Array(cols).fill(1);
    let id: number;
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
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, [color]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, opacity, pointerEvents: "none", zIndex: 0 }} />;
}

// ---------- LANG POPUP ----------
function LangPopup({ onSelect }: { onSelect: (l: Lang) => void }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(14,14,14,0.55)", backdropFilter: "blur(14px)",
    }}>
      <div style={{
        padding: "3rem 2.5rem", maxWidth: "22rem", width: "90%", background: "#F4F4F2",
        border: "1px solid #0E0E0E15", borderRadius: "32px",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2.25rem" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.65rem", letterSpacing: "-0.01em", color: "#0E0E0E", margin: 0 }}>Satori Agency</p>
          <p style={{ fontSize: "0.6rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "#0E0E0E", opacity: 0.45, marginTop: "0.5rem" }}>Estrategia digital</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <button onClick={() => onSelect("es")} style={{
            width: "100%", padding: "1rem", fontWeight: 500, fontSize: "0.72rem",
            textTransform: "uppercase", letterSpacing: "0.18em", background: "#0E0E0E", color: "#F4F4F2",
            border: "none", cursor: "pointer", fontFamily: "inherit", borderRadius: "999px",
          }}>Español</button>
          <button onClick={() => onSelect("en")} style={{
            width: "100%", padding: "1rem", fontWeight: 400, fontSize: "0.72rem",
            textTransform: "uppercase", letterSpacing: "0.18em", background: "transparent", color: "#0E0E0E",
            border: "1px solid #0E0E0E25", cursor: "pointer", fontFamily: "inherit", borderRadius: "999px",
          }}>English</button>
        </div>
      </div>
    </div>
  );
}

// ---------- NAV ----------
function Nav({ c, lang, onOpenLang }: { c: Content; lang: Lang; onOpenLang: () => void }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      backdropFilter: "blur(16px)", background: "rgba(244,244,242,0.78)",
      borderBottom: "1px solid #0E0E0E10",
      padding: "1.1rem clamp(1.25rem,4vw,2.5rem)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <a href="#inicio" style={{
        fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "#0E0E0E",
        textDecoration: "none", letterSpacing: "-0.01em",
      }}>Satori Agency</a>
      <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.25rem" }}>
        {[["#problema", c.nav.problema], ["#servicios", c.nav.servicios], ["#nosotros", c.nav.nosotros], ["#cotizar", c.nav.cotizar]].map(([href, label]) => (
          <a key={href} href={href} style={{
            fontSize: "0.66rem", fontWeight: 400, textTransform: "uppercase",
            letterSpacing: "0.22em", color: "#0E0E0E", opacity: 0.72, textDecoration: "none",
          }}>{label}</a>
        ))}
        <button onClick={onOpenLang} style={{
          fontSize: "0.62rem", fontWeight: 400, letterSpacing: "0.2em", textTransform: "uppercase",
          background: "transparent", border: "1px solid #0E0E0E20", padding: "0.4rem 0.9rem",
          cursor: "pointer", fontFamily: "inherit", color: "#0E0E0E", opacity: 0.6, borderRadius: "999px",
        }}>{lang === "es" ? "EN" : "ES"}</button>
        <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={{
          fontSize: "0.66rem", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "#F4F4F2", padding: "0.7rem 1.3rem", textDecoration: "none", borderRadius: "999px", background: "rgb(14, 14, 14)",
        }}>{c.nav.cta}</a>
      </div>
    </nav>
  );
}

// ---------- HERO ----------
function Hero({ c }: { c: Content }) {
  return (
    <section id="inicio" style={{
      position: "relative", zIndex: 1,
      padding: "9rem 1.5rem 6rem", maxWidth: "78rem", margin: "0 auto",
    }}>
      <div className="hero-grid" style={{
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center",
      }}>
        <div style={{ textAlign: "left" }}>
          <p style={{
            fontSize: "0.6rem", letterSpacing: "0.36em", textTransform: "uppercase",
            color: "#0E0E0E", opacity: 0.55, fontWeight: 400, marginBottom: "2rem",
            display: "inline-flex", alignItems: "center", gap: "0.7rem",
          }}>
            <span style={{ width: "18px", height: "1px", background: "#A67C00", display: "inline-block" }}></span>
            {c.hero.eyebrow}
          </p>
          <h1 style={{
            fontWeight: 400,
            fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.98, letterSpacing: "-0.025em",
            color: "#0E0E0E", margin: 0, fontFamily: "serif",
          }}>
            {c.hero.h1a}<br />
            <span style={{ fontStyle: "italic", letterSpacing: "-2.4075px", fontWeight: 500, position: "relative", display: "inline-block", fontFamily: "\"DM Sans\"", fontSize: "78px" }}>
              <span style={{ color: "rgb(140, 140, 140)" }}>{c.hero.h1b}</span>
            </span>
          </h1>
          <p style={{
            fontSize: "1.02rem", lineHeight: 1.7, color: "#0E0E0E", opacity: 0.62,
            maxWidth: "30rem", marginTop: "2rem", fontWeight: 300,
          }}>{c.hero.sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2.5rem" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={btnPrimary}>{c.hero.cta1}</a>
            <a href="#servicios" style={btnGhost}>{c.hero.cta2}</a>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Enso size={420} opacity={0.13} />
        </div>
      </div>
    </section>
  );
}

// ---------- PROBLEMA ----------
function Problema({ c }: { c: Content }) {
  return (
    <section id="problema" style={{
      position: "relative", zIndex: 1, padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", fontFamily: "\"Playfair Display\"",
    }}>
      <div style={{ maxWidth: "62rem", margin: "0 auto" }}>
        <div style={{ marginBottom: "4rem" }}>
          <p style={eyebrowStyle}>{c.problema.label}</p>
          <h2 style={h2Style}>{c.problema.h}</h2>
        </div>
        <div style={{ display: "grid", gap: "1.25rem" }}>
          {c.problema.items.map((it, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "3.5rem 1fr", gap: "1.5rem",
              padding: "1.75rem", border: "1px solid #0E0E0E12", background: "#0E0E0E03", borderRadius: "24px",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem",
                letterSpacing: "0.15em", color: "#A67C00", opacity: 0.7, paddingTop: "0.4rem",
              }}>{String(i + 1).padStart(2, "0")}</div>
              <div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400, lineHeight: 1.3, marginBottom: "0.65rem", color: "#0E0E0E", fontSize: "28px",
                }}>{it.q}</p>
                <p style={{ lineHeight: 1.7, color: "#0E0E0E", opacity: 0.6, fontWeight: 300, fontSize: "0.95rem" }}>{it.d}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" style={btnPrimary}>{c.problema.cta} →</a>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.12em",
            color: "#0E0E0E", opacity: 0.45,
          }}>{c.problema.hint}</span>
        </div>
      </div>
    </section>
  );
}

// ---------- STATS ----------
function Stats({ c }: { c: Content }) {
  return (
    <section style={{ padding: "6rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "62rem", margin: "0 auto" }}>
        <div className="stats-grid" style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px",
          background: "#0E0E0E15",
        }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{
              padding: "3rem 1.5rem", background: "#F4F4F2", textAlign: "center", position: "relative",
            }}>
              {i === 1 && <span style={{ position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)", width: "4px", height: "4px", borderRadius: "50%", background: "#A67C00" }}></span>}
              <p style={{
                fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase",
                color: "#0E0E0E", opacity: 0.5, marginBottom: "1.5rem",
              }}>{s.label}</p>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem,7vw,5.5rem)",
                fontWeight: 400, color: "#0E0E0E", lineHeight: 1, letterSpacing: "-0.03em",
              }}>{s.n}</p>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem",
                letterSpacing: "0.16em", textTransform: "uppercase",
                color: "#A67C00", opacity: 0.7, marginTop: "1.25rem",
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- RUTA ----------
function Ruta({ c }: { c: Content }) {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ padding: "5rem clamp(1rem,4vw,3rem) 4rem", maxWidth: "78rem", margin: "0 auto" }}>
      <p style={{ ...eyebrowStyle, textAlign: "center", marginBottom: "3rem", fontSize: "0.66rem" }}>{c.ruta.label}</p>
      <div className="ruta-row" style={{ position: "relative", display: "flex", alignItems: "flex-start" }}>
        <div style={{
          position: "absolute", top: "1.65rem", left: "10%", right: "10%", height: "1px",
          background: "#0E0E0E20", zIndex: 0,
        }} />
        {c.ruta.steps.map((s, i) => {
          const isH = hovered === i;
          return (
            <div key={i}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}
              style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                textAlign: "center", padding: "0 0.5rem", position: "relative", zIndex: 1,
                transition: "transform .35s ease",
                transform: isH ? "translateY(-6px)" : "translateY(0)",
              }}>
              <div style={{
                width: "3.4rem", height: "3.4rem", borderRadius: "50%",
                border: `1px solid ${isH ? "#0E0E0E" : "#0E0E0E25"}`,
                background: isH ? "#0E0E0E" : "#F4F4F2",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.25rem", transition: "all .3s ease",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem",
                letterSpacing: "0.05em", color: isH ? "#F4F4F2" : "#0E0E0E", fontWeight: 400,
              }}>{s.paso}</div>
              <p style={{
                fontSize: "0.66rem", textTransform: "uppercase", letterSpacing: "0.18em",
                fontWeight: 500, color: "#0E0E0E", marginBottom: "0.5rem",
              }}>{s.label}</p>
              <p style={{
                fontSize: "0.74rem", lineHeight: 1.6, color: "#0E0E0E", opacity: isH ? 0.65 : 0.4,
                fontWeight: 300, transition: "opacity .3s",
                maxHeight: isH ? "5rem" : "2.6rem", overflow: "hidden",
              }}>{s.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---------- SERVICE IMAGE ----------
function ServiceImage({ src, label, ratio }: { src: string; label: string; ratio: string }) {
  return (
    <div style={{
      aspectRatio: ratio, width: "100%", overflow: "hidden",
      background: "#EFEFEC", position: "relative", borderRadius: "24px",
    }}>
      <img src={src} alt={label} style={{
        width: "100%", height: "100%", display: "block",
        filter: "grayscale(1) sepia(0.6) hue-rotate(-15deg) saturate(1.6) contrast(1.05)",
        objectFit: "cover",
      }} />
    </div>
  );
}

// ---------- SERVICIOS ----------
function Servicios({ c }: { c: Content }) {
  return (
    <section id="servicios" style={{
      position: "relative", zIndex: 1, borderTop: "1px solid #0E0E0E10",
      background: "#EFEFEC",
    }}>
      <div style={{ padding: "7rem clamp(1.5rem,5vw,3rem) 2rem", maxWidth: "78rem", margin: "0 auto" }}>
        <p style={eyebrowStyle}>{c.servicios.eyebrow}</p>
        <h2 style={{ ...h2Style, maxWidth: "32rem" }}>{c.servicios.h}</h2>
        <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#0E0E0E", opacity: 0.55, fontWeight: 300, maxWidth: "32rem", marginTop: "1.25rem" }}>{c.servicios.sub}</p>
      </div>

      <Ruta c={c} />

      <div style={{ padding: "0 clamp(1.5rem,5vw,3rem) 7rem", maxWidth: "78rem", margin: "0 auto" }}>
        <div className="serv-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {c.servicios.items.map((s, i) => (
            <div key={i} style={{
              background: "#F4F4F2", padding: "2rem", display: "flex", flexDirection: "column",
              border: "1px solid #0E0E0E12", borderRadius: "28px",
            }} data-bubble>
              <ServiceImage src={s.img} label={s.tag} ratio="4/3" />
              <p style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
                letterSpacing: "0.22em", color: "#A67C00", opacity: 0.75,
                textTransform: "uppercase", marginTop: "1.5rem", marginBottom: "0.75rem",
              }}>{s.num} — {s.tag}</p>
              <h3 style={{
                fontFamily: "'Playfair Display', serif", fontSize: "1.65rem",
                fontWeight: 400, lineHeight: 1.1, marginBottom: "0.5rem", letterSpacing: "-0.01em",
              }}>{s.t}</h3>
              <p style={{
                fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase",
                color: "#0E0E0E", opacity: 0.45, marginBottom: "1.25rem",
              }}>{s.sub}</p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.65, color: "#0E0E0E", opacity: 0.65, fontWeight: 300, marginBottom: "1.5rem" }}>{s.d}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1.75rem", display: "grid", gap: "0.55rem", flex: 1 }}>
                {s.benefits.map((b, bi) => (
                  <li key={bi} style={{ display: "flex", gap: "0.7rem", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#A67C00", opacity: 0.6 }}>—</span>
                    <span style={{ fontSize: "0.85rem", color: "#0E0E0E", opacity: 0.78, fontWeight: 300 }}>{b}</span>
                  </li>
                ))}
              </ul>
              <a href={`https://wa.me/525625018281?text=Hola%20Rodrigo,%20me%20interesa%20${encodeURIComponent(s.t)}`} target="_blank" rel="noopener noreferrer" style={{ ...btnGhost, padding: "0.8rem 1.25rem", fontSize: "0.62rem" }}>
                {c.servicios.cta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- NOSOTROS ----------
function Nosotros({ c }: { c: Content }) {
  return (
    <section id="nosotros" style={{ padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div className="nosotros-grid" style={{
        maxWidth: "70rem", margin: "0 auto",
        display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: "4rem", alignItems: "center",
      }}>
        <div style={{ position: "relative" }}>
          <div style={{
            aspectRatio: "4/5", width: "100%", overflow: "visible",
            position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}>
            <img src="/assets/rodrigo.png" alt="Rodrigo" style={{
              width: "100%", height: "100%", objectFit: "contain", objectPosition: "center bottom",
              filter: "grayscale(1) sepia(0.6) hue-rotate(-15deg) saturate(1.6) contrast(1.05)",
              display: "block",
            }} />
          </div>
          <div style={{ position: "absolute", top: "-1.25rem", left: "-1.25rem", width: "4rem", height: "4rem", borderTop: "1px solid #0E0E0E", borderLeft: "1px solid #0E0E0E" }} />
          <div style={{ position: "absolute", bottom: "-1.25rem", right: "-1.25rem", width: "4rem", height: "4rem", borderBottom: "1px solid #0E0E0E", borderRight: "1px solid #0E0E0E" }} />
        </div>
        <div>
          <p style={eyebrowStyle}>{c.nosotros.label}</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,2.8rem)",
            fontWeight: 400, marginBottom: "0.4rem", lineHeight: 1.05, letterSpacing: "-0.015em",
          }}>{c.nosotros.nombre}</h2>
          <p style={{
            fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase",
            color: "#0E0E0E", opacity: 0.45, marginBottom: "2rem",
          }}>{c.nosotros.cargo}</p>
          <p style={{
            fontFamily: "'Playfair Display', serif", fontSize: "1.6rem",
            fontStyle: "italic", fontWeight: 400, lineHeight: 1.35, marginBottom: "1.5rem",
            color: "#0E0E0E", letterSpacing: "-0.01em",
          }}>&ldquo;{c.nosotros.quote}&rdquo;</p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#0E0E0E", opacity: 0.7, marginBottom: "1.25rem", fontWeight: 300 }}>{c.nosotros.p1}</p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.75, color: "#0E0E0E", opacity: 0.7, marginBottom: "2rem", fontWeight: 300 }}>{c.nosotros.p2}</p>
          <div style={{
            padding: "1.5rem", border: "1px solid #A67C0030", background: "#A67C0008", marginBottom: "2rem", borderRadius: "24px",
          }}>
            <p style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem",
              letterSpacing: "0.18em", textTransform: "uppercase", color: "#A67C00", opacity: 0.8,
              marginBottom: "0.6rem", fontWeight: 400,
            }}>{c.nosotros.garantia_t}</p>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.7, color: "#0E0E0E", opacity: 0.7, fontWeight: 300 }}>{c.nosotros.garantia_d}</p>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a href={CALENDLY} target="_blank" rel="noopener noreferrer" style={btnPrimary}>{c.nosotros.cta1}</a>
            <a href={`mailto:${EMAIL}`} style={btnGhost}>{c.nosotros.cta2}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- REVIEWS ----------
function Reviews({ c }: { c: Content }) {
  return (
    <section style={{ padding: "7rem 1.5rem", background: "#EFEFEC", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "70rem", margin: "0 auto" }}>
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={eyebrowStyle}>{c.reviews.label}</p>
          <h2 style={{ ...h2Style, maxWidth: "26rem" }}>{c.reviews.h}</h2>
        </div>
        <div className="rev-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
          {c.reviews.items.map((r, i) => (
            <div key={i} style={{ background: "#F4F4F2", padding: "2.25rem", display: "flex", flexDirection: "column", borderRadius: "28px", border: "1px solid #0E0E0E10" }} data-bubble>
              <div style={{ display: "flex", gap: "0.18rem", marginBottom: "1.25rem" }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} style={{ color: "#A67C00", fontSize: "0.85rem", opacity: s <= r.stars ? 1 : 0.18 }}>★</span>
                ))}
              </div>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontStyle: "italic",
                fontWeight: 400, lineHeight: 1.55, color: "#0E0E0E", marginBottom: "1.5rem", flex: 1,
              }}>&ldquo;{r.text}&rdquo;</p>
              <div>
                <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "#0E0E0E" }}>{r.name}</p>
                <p style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: "#0E0E0E", opacity: 0.5, marginTop: "0.25rem",
                }}>{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- MAPA ----------
function Mapa({ c }: { c: Content }) {
  const dots = [
    { x: 119.2, y: 58.9, label: "B.C.N.", city: "Baja California Norte" },
    { x: 468, y: 422.9, label: "GDL", city: "Guadalajara" },
    { x: 580.7, y: 453.9, label: "EDOMEX", city: "Estado de México" },
    { x: 597.2, y: 460, label: "CDMX", city: "Ciudad de México" },
  ];
  return (
    <section style={{ padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "62rem", margin: "0 auto", textAlign: "center" }}>
        <p style={eyebrowStyle}>{c.mapa.label}</p>
        <h2 style={{ ...h2Style, maxWidth: "30rem", margin: "0 auto 0.6rem" }}>{c.mapa.h}</h2>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: "1.05rem", fontStyle: "italic",
          color: "#0E0E0E", opacity: 0.55, marginBottom: "4rem",
        }}>— {c.mapa.sub}</p>

        <div style={{ position: "relative", maxWidth: "820px", margin: "0 auto", aspectRatio: "1000/630" }}>
          <img src="/assets/mexico.svg" alt="México" style={{
            width: "100%", height: "100%", display: "block",
          }} />
          <svg viewBox="0 0 1000 630" preserveAspectRatio="xMidYMid meet" style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none",
          }}>
            {dots.map((d, i) => (
              <g key={i}>
                <circle cx={d.x} cy={d.y} r="14" fill="none" stroke="#A67C00" strokeWidth="2">
                  <animate attributeName="r" values="8;28;8" dur={`${2.4 + i * 0.6}s`} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.9;0;0.9" dur={`${2.4 + i * 0.6}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={d.x} cy={d.y} r="5" fill="#A67C00" />
                <text x={d.x} y={d.y - 16} textAnchor="middle" style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                  letterSpacing: "0.08em", fill: "#A67C00", fontWeight: 600,
                }}>{d.label}</text>
              </g>
            ))}
          </svg>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "2.5rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
          {dots.map((d) => (
            <div key={d.city} style={{
              display: "flex", alignItems: "center", gap: "0.6rem",
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.66rem",
              letterSpacing: "0.16em", textTransform: "uppercase", color: "#0E0E0E", opacity: 0.6,
            }}>
              <span style={{ width: "6px", height: "6px", background: "#A67C00", borderRadius: "50%" }} />
              {d.city}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- FAQ ----------
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      background: "#F4F4F2", borderRadius: "24px", marginBottom: "0.6rem",
      border: "1px solid #0E0E0E10", overflow: "hidden",
      transition: "box-shadow .25s ease",
      boxShadow: open ? "0 4px 24px -8px #0E0E0E18" : "none",
    }} data-bubble>
      <button onClick={() => setOpen((o) => !o)} style={{
        width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1.4rem 1.75rem", background: "none", border: "none", cursor: "pointer", textAlign: "left",
        gap: "1rem", fontFamily: "inherit",
      }}>
        <span style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.05rem,1.8vw,1.25rem)",
          fontWeight: 400, color: "#0E0E0E", lineHeight: 1.4,
        }}>{q}</span>
        <span style={{
          flexShrink: 0, fontSize: "1rem", color: "#0E0E0E", opacity: 0.5,
          transform: open ? "rotate(45deg)" : "rotate(0)", transition: "transform .3s",
          fontFamily: "'JetBrains Mono', monospace",
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? "20rem" : 0, overflow: "hidden", transition: "max-height .35s ease",
      }}>
        <p style={{
          padding: "0 1.75rem 1.4rem", fontSize: "0.95rem", lineHeight: 1.75,
          color: "#0E0E0E", opacity: 0.65, fontWeight: 300, maxWidth: "44rem",
        }}>{a}</p>
      </div>
    </div>
  );
}

function Faq({ c }: { c: Content }) {
  return (
    <section style={{ padding: "7rem 1.5rem", borderTop: "1px solid #0E0E0E10", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: "54rem", margin: "0 auto" }}>
        <div style={{ marginBottom: "3rem" }}>
          <p style={eyebrowStyle}>{c.faq.label}</p>
          <h2 style={{ ...h2Style, maxWidth: "30rem" }}>{c.faq.h}</h2>
        </div>
        <div>
          {c.faq.items.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
        </div>
      </div>
    </section>
  );
}

// ---------- COTIZAR ----------
function Cotizar({ c, lang }: { c: Content; lang: Lang }) {
  const wa = lang === "es"
    ? WHATSAPP
    : "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
  return (
    <section id="cotizar" style={{
      padding: "9rem 1.5rem", borderTop: "1px solid #0E0E0E10",
      position: "relative", zIndex: 1, background: "#0E0E0E", color: "#F4F4F2",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: "44rem", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Enso size={120} opacity={0.18} color="#F4F4F2" />
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,6vw,4.5rem)",
          fontWeight: 400, marginTop: "2rem", marginBottom: "1.25rem", lineHeight: 1, letterSpacing: "-0.02em",
        }}>{c.cotizar.h}</h2>
        <p style={{
          fontSize: "1rem", lineHeight: 1.7, opacity: 0.65, fontWeight: 300,
          maxWidth: "28rem", margin: "0 auto 2.5rem",
        }}>{c.cotizar.sub}</p>
        <a href={wa} target="_blank" rel="noopener noreferrer" style={{
          ...btnGold, padding: "1.1rem 2.2rem", fontSize: "0.72rem",
        }}>{c.cotizar.cta} →</a>
      </div>
    </section>
  );
}

// ---------- FOOTER ----------
function Footer({ c }: { c: Content }) {
  return (
    <footer style={{
      padding: "2.5rem 1.5rem", background: "#0E0E0E", color: "#F4F4F2",
      display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
    }}>
      <p style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em", fontSize: "1.6rem" }}>Satori Agency</p>
      <p style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem",
        letterSpacing: "0.16em", textTransform: "uppercase", opacity: 0.4,
      }}>{c.footer}</p>
    </footer>
  );
}

// ---------- FLOATING WHATSAPP ----------
function FloatingCTAs({ lang }: { lang: Lang }) {
  const wa = lang === "es"
    ? WHATSAPP
    : "https://wa.me/525625018281?text=Hi%20Rodrigo";
  return (
    <div style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
      <a href={wa} target="_blank" rel="noopener noreferrer" style={{
        display: "flex", alignItems: "center", gap: "0.6rem",
        padding: "0.8rem 1.1rem", color: "#F4F4F2",
        textDecoration: "none", fontSize: "0.62rem", letterSpacing: "0.18em",
        textTransform: "uppercase", fontWeight: 500, fontFamily: "inherit", borderRadius: "999px", background: "rgb(166, 124, 0)",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" /></svg>
        WhatsApp
      </a>
    </div>
  );
}

// ---------- APP ----------
export default function Page() {
  const [lang, setLang] = useState<Lang>("es");
  const [showLangPopup, setShowLangPopup] = useState(true);
  const c = content[lang];

  const onLangSelect = (l: Lang) => {
    setLang(l);
    setShowLangPopup(false);
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "#F4F4F2" }}>
      <MatrixBackground opacity={0.07} color="#A67C00" />
      {showLangPopup && <LangPopup onSelect={onLangSelect} />}
      <Nav c={c} lang={lang} onOpenLang={() => setShowLangPopup(true)} />
      <Hero c={c} />
      <Problema c={c} />
      <Stats c={c} />
      <Servicios c={c} />
      <Nosotros c={c} />
      <Reviews c={c} />
      <Mapa c={c} />
      <Faq c={c} />
      <Cotizar c={c} lang={lang} />
      <Footer c={c} />
      <FloatingCTAs lang={lang} />
    </main>
  );
}
