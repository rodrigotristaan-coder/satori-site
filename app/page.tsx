"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

/* ─── CONSTANTS ─────────────────────────────────────────────────────────── */
const WHATSAPP_LINK    = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const WHATSAPP_LINK_EN = "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
const CALENDLY_LINK    = "https://calendly.com/rodrigo-tristaan";
const EMAIL            = "r.tristaan@outlook.com";

/* ─── BRAND TOKENS ───────────────────────────────────────────────────────── */
const INK   = "#0E0E0E";
const PAPER = "#F4F4F2";
const MID   = "#6B6B69";
const FAINT = "#D0D0CE";

/* ─── COPY ───────────────────────────────────────────────────────────────── */
const copy = {
  es: {
    nav: { problema: "El Problema", servicios: "Servicios", contacto: "Contacto", cta: "Agendar llamada" },
    badge: "Estrategia · Marca · Crecimiento",
    h1: ["No estamos aquí", "para hacer ruido."],
    hero_sub: "Sabemos lo que cuesta construir un negocio desde adentro. Por eso en Satori hacemos estrategia de fondo — antes de tocar una sola herramienta.",
    cta1: "Quiero mi Auditoría Gratis",
    cta2: "Ver servicios",
    problema_h: "¿Te suena alguno de estos?",
    problemas: [
      { n: "01", q: "Pago anuncios y no me llega el cliente correcto.", desc: "Tu dinero en ads se va sin convertir porque no hay un sistema que filtre prospectos." },
      { n: "02", q: "Se me van clientes por no contestar rápido.", desc: "El 78% de las ventas las gana quien responde primero. Sin automatización, pierdes sin saberlo." },
      { n: "03", q: "Mis redes están muertas y la competencia me gana.", desc: "La consistencia es lo que genera confianza — y ventas. Sin tiempo, no hay consistencia." },
    ],
    problema_cta: "Identifiqué mi problema — quiero la solución →",
    stats: [
      { label: "Tu negocio siempre abierto", n: "24/7" },
      { label: "Prospectos perdidos",         n: "0"   },
      { label: "Días para ver resultados",    n: "30"  },
    ],
    servicios_label: "Tres soluciones. Un solo socio.",
    servicios_h: "Lo que hacemos",
    servicios_sub: "Cada servicio está diseñado para empresarios que quieren crecer con estrategia.",
    servicios: [
      { n: "01", tag: "Marca", t: "Marca Propia", sub: "Identidad · Presencia · Autoridad", d: "La identidad de marca que un empresario serio merece.", back: "Estrategia de marca, identidad visual, posicionamiento de CEO y presencia digital de alto impacto.", benefits: ["Imagen que genera confianza instantánea", "Diferenciación frente a la competencia", "Posicionamiento de CEO en LinkedIn y medios", "Kit de marca completo listo para usar"] },
      { n: "02", tag: "Imagen", t: "Posicionamiento Online", sub: "Reputación · Visibilidad · Confianza", d: "Tu empresa en el lugar correcto, frente a las personas correctas.", back: "Gestión de reputación digital, posicionamiento en Google, presencia en medios y estrategia de contenido.", benefits: ["Aparecer primero en Google en tu industria", "Reputación digital sólida y verificable", "Presencia activa en los medios correctos", "Contenido que atrae prospectos calificados"] },
      { n: "03", tag: "IA", t: "Marketing con IA", sub: "Conversión · Automatización · Escala", d: "Sistemas de marketing impulsados por inteligencia artificial.", back: "Embudos automáticos, agentes de IA para calificación y cierre, campañas optimizadas en tiempo real.", benefits: ["Prospectos calificados en piloto automático", "Seguimiento sin perder ninguna oportunidad", "Campañas que se optimizan solas 24/7", "ROI visible desde el primer mes"] },
    ],
    cotizar_h: "¿Listo para crecer?",
    cotizar_sub: "Cuéntanos dónde está tu negocio hoy y te armamos una propuesta a tu medida.",
    cotizar_cta: "Hablemos →",
    nosotros_label: "Tu Socio Digital",
    nosotros_nombre: "Rodrigo Tristán",
    nosotros_cargo: "Fundador de SATORI",
    nosotros_quote: '"La IA no reemplaza tu negocio. Lo potencia."',
    nosotros_p1: "Sé lo que cuesta construir un negocio desde adentro: las horas, las decisiones, la incertidumbre. Por eso fundé Satori — para que cada empresario mexicano tenga acceso a las mismas herramientas que usan las empresas más avanzadas del mundo.",
    nosotros_p2: "La mayoría de las agencias te venden actividad. Yo te vendo claridad. Antes de tocar una sola herramienta, entendemos tu mercado, a tu cliente y qué es verdad en tu industria.",
    garantia_title: "Garantía de 30 días:",
    garantia_text: "Si en 30 días no sientes que el valor recibido supera lo que invertiste, seguimos trabajando contigo 20 días más sin costo adicional. Sin preguntas, sin drama.",
    btn_zoom: "Agendar Zoom",
    btn_email: "Enviar Email",
    faq_label: "Preguntas frecuentes",
    faq_h: "Todo lo que necesitas saber.",
    faqs: [
      { q: "¿Cuánto tiempo tarda ver resultados?", a: "Depende del servicio. Marca Propia: primeras semanas. Posicionamiento: 1–3 meses. Marketing con IA: desde el día de activación." },
      { q: "¿Necesito saber de tecnología?", a: "Para nada. Nos encargamos de toda la parte técnica. Tú solo nos dices cómo funciona tu negocio y nosotros hacemos el resto." },
      { q: "¿Firmo un contrato largo?", a: "No. Trabajamos mes a mes. Si no estás satisfecho, puedes cancelar cuando quieras." },
      { q: "¿Qué necesito para empezar?", a: "Solo una llamada de 30 minutos. Ahí entendemos tu negocio, te proponemos la mejor ruta y te damos un precio claro. Sin sorpresas." },
      { q: "¿Trabajan con cualquier tipo de negocio?", a: "Trabajamos con empresarios y pymes en México — despachos, constructoras, clínicas, consultoras, servicios profesionales y más." },
    ],
    footer: "© 2026 SATORI · Estrategia Digital para Empresarios · México",
  },
  en: {
    nav: { problema: "The Problem", servicios: "Services", contacto: "Contact", cta: "Book a call" },
    badge: "Strategy · Brand · Growth",
    h1: ["We're not here", "to make noise."],
    hero_sub: "We know what it costs to build a business from the inside. That's why at Satori we do deep strategy — before touching a single tool.",
    cta1: "Get My Free Audit",
    cta2: "See services",
    problema_h: "Do any of these sound familiar?",
    problemas: [
      { n: "01", q: "I pay for ads but the wrong people show up.", desc: "Your ad spend leaks because there's no system to filter and nurture leads before they go cold." },
      { n: "02", q: "I lose customers because I can't reply fast enough.", desc: "78% of sales go to whoever responds first. Without automation, you're losing deals you don't even know about." },
      { n: "03", q: "My social media is dead and competitors are winning.", desc: "Consistency is what builds trust — and trust drives sales. Without time, there's no consistency." },
    ],
    problema_cta: "I found my problem — show me the fix →",
    stats: [
      { label: "Your business always open", n: "24/7" },
      { label: "Leads lost",                n: "0"   },
      { label: "Days to see results",       n: "30"  },
    ],
    servicios_label: "Three solutions. One partner.",
    servicios_h: "What we do",
    servicios_sub: "Each service is designed for executives who want to grow with strategy.",
    servicios: [
      { n: "01", tag: "Brand", t: "Brand Identity", sub: "Identity · Presence · Authority", d: "The brand identity a serious executive deserves.", back: "Brand strategy, visual identity, CEO positioning and high-impact digital presence.", benefits: ["Instant trust through a powerful image", "Stand out clearly from competitors", "CEO positioning on LinkedIn and media", "Complete brand kit ready to deploy"] },
      { n: "02", tag: "Image", t: "Online Positioning", sub: "Reputation · Visibility · Trust", d: "Your company in the right place, in front of the right people.", back: "Digital reputation management, Google positioning, media presence and content strategy.", benefits: ["Rank first on Google in your industry", "Solid and verifiable digital reputation", "Active presence in the right media", "Content that attracts qualified prospects"] },
      { n: "03", tag: "AI", t: "AI-Powered Marketing", sub: "Conversion · Automation · Scale", d: "Marketing systems powered by artificial intelligence.", back: "Automated funnels, AI agents for lead qualification and closing, real-time optimized campaigns.", benefits: ["Qualified leads on autopilot", "No opportunity slips through the cracks", "Self-optimizing campaigns 24/7", "Visible ROI from month one"] },
    ],
    cotizar_h: "Ready to grow?",
    cotizar_sub: "Tell us where your business is today and we'll build a proposal tailored to you.",
    cotizar_cta: "Let's talk →",
    nosotros_label: "Your Digital Partner",
    nosotros_nombre: "Rodrigo Tristán",
    nosotros_cargo: "Founder of SATORI",
    nosotros_quote: '"AI doesn\'t replace your business. It supercharges it."',
    nosotros_p1: "I know what it costs to build a business from the inside: the hours, the decisions, the uncertainty. That's why I founded Satori — so every Mexican entrepreneur has access to the same tools used by the world's most advanced companies.",
    nosotros_p2: "Most agencies sell you activity. I sell you clarity. Before touching a single tool, we understand your market, your customer, and what's actually true in your industry.",
    garantia_title: "30-Day Guarantee:",
    garantia_text: "If within 30 days you don't feel the value far exceeds what you invested, we keep working with you for 20 more days at no additional cost. No questions, no drama.",
    btn_zoom: "Book a Zoom",
    btn_email: "Send Email",
    faq_label: "Frequently asked questions",
    faq_h: "Everything you need to know.",
    faqs: [
      { q: "How long until I see results?", a: "Depends on the service. Brand Identity: first weeks. Positioning: 1–3 months. AI Marketing: from day one of activation." },
      { q: "Do I need to be tech-savvy?", a: "Not at all. We handle every technical detail. Just tell us how your business works and we take care of the rest." },
      { q: "Do I sign a long-term contract?", a: "No. We work month to month. Cancel anytime." },
      { q: "What do I need to get started?", a: "Just a 30-minute call. We learn your business, propose the best path, and give you a clear price. No surprises." },
      { q: "What types of businesses do you work with?", a: "Entrepreneurs and SMEs in Mexico — law firms, construction, clinics, consultancies, professional services and more." },
    ],
    footer: "© 2026 SATORI · Digital Strategy for Executives · México",
  },
};

/* ─── LANG POPUP ─────────────────────────────────────────────────────────── */
function LangPopup({ onSelect }: { onSelect: (l: "es" | "en") => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(14,14,14,0.7)", backdropFilter: "blur(12px)" }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        style={{ padding: "3rem 2.5rem", maxWidth: "22rem", width: "90%", backgroundColor: PAPER, display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}
      >
        <Image src="/logo-satori.png" alt="SATORI" width={100} height={30} style={{ filter: "brightness(0)" }}/>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
          {(["es", "en"] as const).map((l) => (
            <button key={l} onClick={() => onSelect(l)}
              style={{ width: "100%", padding: "1rem", fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.25em", background: l === "es" ? INK : "transparent", color: l === "es" ? PAPER : INK, border: `0.5px solid ${l === "es" ? INK : FAINT}`, cursor: "pointer" }}>
              {l === "es" ? "🇲🇽  Español" : "🇺🇸  English"}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── FAQ ITEM ───────────────────────────────────────────────────────────── */
function FaqItem({ q, a, last }: { q: string; a: string; last: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `0.5px solid ${FAINT}`, borderBottom: last ? `0.5px solid ${FAINT}` : "none" }}>
      <button onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.5rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1.5rem" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2vw,1.1rem)", fontWeight: 400, color: INK, lineHeight: 1.4 }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.22 }}
          style={{ flexShrink: 0, fontSize: "1.25rem", color: MID, lineHeight: 1, display: "block" }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <p style={{ paddingBottom: "1.5rem", fontSize: "0.9rem", lineHeight: 1.8, color: MID, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── COUNT UP ───────────────────────────────────────────────────────────── */
function CountUp({ from, to, suffix = "" }: { from: number; to: number; suffix?: string }) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => { setVal(from); started.current = false; }, [from, to]);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60; let step = 0;
        const t = setInterval(() => {
          step++;
          const eased = 1 - Math.pow(1 - step / steps, 3);
          setVal(Math.round(from + (to - from) * eased));
          if (step >= steps) { clearInterval(t); setVal(to); }
        }, 30);
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [from, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── SPINNING ENSO ──────────────────────────────────────────────────────── */
function SpinningEnso() {
  return (
    <motion.div
      animate={{ rotate: [0, -360] }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      style={{ width: "min(380px, 80vw)", height: "min(380px, 80vw)", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Image src="/enso-negro.png" alt="" width={380} height={380} style={{ width: "100%", height: "auto", filter: "brightness(0)", opacity: 0.06 }}/>
    </motion.div>
  );
}

/* ─── SERVICE CARD ───────────────────────────────────────────────────────── */
function ServiceCard({ s, waLink }: { s: typeof copy.es.servicios[0]; waLink: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      style={{ perspective: "900px", cursor: "pointer", minHeight: "clamp(340px, 44vh, 480px)" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          backgroundColor: INK,
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "2rem",
        }}>
          <div style={{ position: "absolute", top: "1.5rem", left: "2rem" }}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(244,244,242,0.4)" }}>{s.tag}</span>
          </div>
          <div style={{ position: "absolute", top: "1rem", right: "1.5rem", fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem,6vw,5rem)", fontWeight: 400, color: "rgba(244,244,242,0.04)", lineHeight: 1 }}>{s.n}</div>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(244,244,242,0.35)", fontWeight: 300, marginBottom: "0.5rem" }}>{s.sub}</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(1.4rem,2.5vw,1.9rem)", color: PAPER, lineHeight: 1.15, marginBottom: "0.75rem" }}>{s.t}</h3>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: "rgba(244,244,242,0.55)", lineHeight: 1.6, fontWeight: 300 }}>{s.d}</p>
        </div>
        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0,
          backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          backgroundColor: PAPER,
          borderTop: `0.5px solid ${FAINT}`,
          display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2rem",
        }}>
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.2em", color: MID, fontWeight: 300, marginBottom: "0.4rem" }}>{s.sub}</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(1.2rem,2vw,1.5rem)", color: INK, lineHeight: 1.2, marginBottom: "1.5rem" }}>{s.t}</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {s.benefits.map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: MID, fontWeight: 300, marginTop: "2px", flexShrink: 0 }}>—</span>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.82rem", color: INK, lineHeight: 1.55, fontWeight: 300 }}>{b}</p>
                </div>
              ))}
            </div>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "space-between", marginTop: "1.5rem", fontSize: "0.6rem", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.2em", color: PAPER, textDecoration: "none", backgroundColor: INK, padding: "0.75rem 1.25rem" }}>
            <span>Conocer más</span>
            <span>→</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── MAIN ───────────────────────────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState<"es" | "en">("es");
  const [showPopup, setShowPopup] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const c = copy[lang];
  const waLink = lang === "es" ? WHATSAPP_LINK : WHATSAPP_LINK_EN;

  return (
    <main style={{ backgroundColor: PAPER, color: INK, minHeight: "100vh", overflowX: "hidden" }}>
      {/* FONTS */}
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@200;300;400&display=swap" rel="stylesheet"/>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; font-weight: 300; }
        h1, h2, h3 { font-family: 'Playfair Display', serif; font-weight: 400; }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>

      {/* LANG POPUP */}
      <AnimatePresence>{showPopup && <LangPopup onSelect={l => { setLang(l); setShowPopup(false); }}/>}</AnimatePresence>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: "rgba(244,244,242,0.94)", backdropFilter: "blur(12px)",
        borderBottom: `0.5px solid ${FAINT}`,
        padding: "1.1rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <a href="#inicio" style={{ textDecoration: "none", flexShrink: 0 }}>
          <Image src="/logo-satori.png" alt="SATORI" width={100} height={30} style={{ filter: "brightness(0)", display: "block" }}/>
        </a>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {([["#problema", c.nav.problema], ["#servicios", c.nav.servicios], ["#contacto", c.nav.contacto]] as [string,string][]).map(([href, label]) => (
            <a key={href} href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: MID, textDecoration: "none" }}>{label}</a>
          ))}
          <a href={CALENDLY_LINK} target="_blank" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", padding: "0.6rem 1.5rem", backgroundColor: INK, color: PAPER, textDecoration: "none" }}>{c.nav.cta}</a>
          <button onClick={() => setShowPopup(true)} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", background: "none", border: `0.5px solid ${FAINT}`, color: MID, padding: "0.5rem 0.9rem", cursor: "pointer" }}>
            {lang === "es" ? "EN" : "ES"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <div className="show-mobile" style={{ alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setShowPopup(true)} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", background: "none", border: `0.5px solid ${FAINT}`, color: MID, padding: "0.45rem 0.8rem", cursor: "pointer" }}>
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", color: INK, fontSize: "1.3rem", lineHeight: 1, padding: "0.25rem" }}>
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ position: "fixed", top: "3.8rem", left: 0, right: 0, zIndex: 49, backgroundColor: PAPER, borderBottom: `0.5px solid ${FAINT}`, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {([["#problema", c.nav.problema], ["#servicios", c.nav.servicios], ["#contacto", c.nav.contacto]] as [string,string][]).map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", color: MID, textDecoration: "none" }}>{label}</a>
            ))}
            <a href={CALENDLY_LINK} target="_blank" onClick={() => setMenuOpen(false)} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em", padding: "0.85rem 1.5rem", backgroundColor: INK, color: PAPER, textDecoration: "none", textAlign: "center" }}>{c.nav.cta}</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section id="inicio" style={{ paddingTop: "8rem", paddingBottom: "6rem", paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 4rem)", maxWidth: "72rem", margin: "0 auto", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "3rem", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div style={{ display: "inline-block", padding: "0.25rem 1rem", border: `0.5px solid ${FAINT}`, marginBottom: "2rem" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 300, color: MID }}>{c.badge}</p>
            </div>
            <h1 style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.01em", marginBottom: "1.5rem" }}>
              {c.h1[0]}<br/><em style={{ fontStyle: "italic", fontWeight: 400 }}>{c.h1[1]}</em>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "1rem", marginBottom: "2.5rem", color: MID, maxWidth: "28rem", lineHeight: 1.8 }}>{c.hero_sub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <a href={waLink} target="_blank" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, padding: "0.9rem 2rem", backgroundColor: INK, color: PAPER, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>{c.cta1}</a>
              <a href="#servicios" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, padding: "0.9rem 2rem", border: `0.5px solid ${FAINT}`, color: MID, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>{c.cta2}</a>
            </div>
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <SpinningEnso/>
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section id="problema" style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)", backgroundColor: INK, position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: "60rem", margin: "0 auto", position: "relative" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(244,244,242,0.35)", fontWeight: 300, marginBottom: "1.5rem" }}>El problema</p>
            <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: PAPER, lineHeight: 1.05, marginBottom: "4rem" }}>{c.problema_h}</h2>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {c.problemas.map(({ n, q, desc }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.1 }}
                style={{ display: "grid", gridTemplateColumns: "3rem 1fr", gap: "2rem", alignItems: "start", padding: "2rem 0", borderTop: i === 0 ? `0.5px solid rgba(244,244,242,0.1)` : `0.5px solid rgba(244,244,242,0.1)`, borderBottom: i === c.problemas.length - 1 ? `0.5px solid rgba(244,244,242,0.1)` : "none" }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.7rem", color: "rgba(244,244,242,0.2)", letterSpacing: "0.05em", paddingTop: "0.3rem" }}>{n}</span>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontSize: "clamp(1rem, 2.5vw, 1.3rem)", color: PAPER, lineHeight: 1.3, marginBottom: "0.6rem" }}>{q}</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.88rem", color: "rgba(244,244,242,0.45)", lineHeight: 1.75 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div style={{ marginTop: "3.5rem" }}>
            <a href={waLink} target="_blank" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, display: "inline-block", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: PAPER, textDecoration: "none", borderBottom: `0.5px solid rgba(244,244,242,0.3)`, paddingBottom: "0.25rem" }}>{c.problema_cta}</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "5rem clamp(1.5rem, 5vw, 4rem)", borderBottom: `0.5px solid ${FAINT}` }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "2rem" }}>
            {[
              { label: c.stats[0].label, from: 1,   to: 24, suffix: "/7" },
              { label: c.stats[1].label, from: 100, to: 0,  suffix: ""   },
              { label: c.stats[2].label, from: 90,  to: 30, suffix: ""   },
            ].map(({ label, from, to, suffix }, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center", padding: "2rem 1rem" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.25em", color: MID, marginBottom: "0.75rem" }}>{label}</p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 400, color: INK, lineHeight: 1 }}>
                  <CountUp from={from} to={to} suffix={suffix}/>
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)", backgroundColor: PAPER }}>
        <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "4rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.3em", color: MID, marginBottom: "1rem" }}>{c.servicios_label}</p>
            <h2 style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05, marginBottom: "0.75rem" }}>{c.servicios_h}</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: MID, maxWidth: "30rem" }}>{c.servicios_sub}</p>
          </motion.div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", backgroundColor: FAINT }}>
            {c.servicios.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ backgroundColor: PAPER }}>
                <ServiceCard s={s} waLink={waLink}/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section id="nosotros" style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)", backgroundColor: INK }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Image src="/rodrigo.png" alt="Rodrigo Tristán" width={480} height={580} style={{ width: "100%", height: "auto", display: "block", filter: "grayscale(20%)" }}/>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(244,244,242,0.35)", marginBottom: "1rem" }}>{c.nosotros_label}</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", color: PAPER, marginBottom: "0.25rem" }}>{c.nosotros_nombre}</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(244,244,242,0.3)", marginBottom: "2rem" }}>{c.nosotros_cargo}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,2vw,1.15rem)", fontStyle: "italic", color: PAPER, lineHeight: 1.5 }}>{c.nosotros_quote}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.88rem", color: "rgba(244,244,242,0.55)", lineHeight: 1.85 }}>{c.nosotros_p1}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.88rem", color: "rgba(244,244,242,0.55)", lineHeight: 1.85 }}>{c.nosotros_p2}</p>
              <div style={{ padding: "1.25rem", border: `0.5px solid rgba(244,244,242,0.12)` }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(244,244,242,0.4)", marginBottom: "0.5rem" }}>{c.garantia_title}</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(244,244,242,0.45)", lineHeight: 1.75 }}>{c.garantia_text}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <a href={CALENDLY_LINK} target="_blank" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, padding: "0.85rem 1.75rem", backgroundColor: PAPER, color: INK, fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>{c.btn_zoom}</a>
              <a href={`mailto:${EMAIL}`} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, padding: "0.85rem 1.75rem", border: `0.5px solid rgba(244,244,242,0.2)`, color: "rgba(244,244,242,0.6)", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none", display: "inline-block" }}>{c.btn_email}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)" }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: "3.5rem" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.3em", color: MID, marginBottom: "1rem" }}>{c.faq_label}</p>
            <h2 style={{ fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.1 }}>{c.faq_h}</h2>
          </motion.div>
          <div>
            {c.faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} last={i === c.faqs.length - 1}/>)}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="contacto" style={{ padding: "8rem clamp(1.5rem, 5vw, 4rem)", backgroundColor: INK }}>
        <div style={{ maxWidth: "40rem", margin: "0 auto", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: "clamp(2.2rem,5vw,4rem)", color: PAPER, lineHeight: 1.05, marginBottom: "1.25rem" }}>{c.cotizar_h}</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.9rem", color: "rgba(244,244,242,0.45)", lineHeight: 1.8, marginBottom: "2.5rem" }}>{c.cotizar_sub}</p>
            <a href={waLink} target="_blank" style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, display: "inline-block", padding: "1rem 2.5rem", backgroundColor: PAPER, color: INK, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", textDecoration: "none" }}>{c.cotizar_cta}</a>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "2rem clamp(1.5rem, 5vw, 4rem)", borderTop: `0.5px solid ${FAINT}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <Image src="/logo-satori.png" alt="SATORI" width={80} height={24} style={{ filter: "brightness(0)", display: "block" }}/>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: MID }}>{c.footer}</p>
      </footer>

      {/* ── FLOATING BUTTONS ── */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "5.5rem", right: "1.5rem", zIndex: 100, width: "3rem", height: "3rem", backgroundColor: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.3)", textDecoration: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100, width: "3rem", height: "3rem", backgroundColor: INK, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(14,14,14,0.2)", textDecoration: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PAPER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
      </a>
    </main>
  );
}