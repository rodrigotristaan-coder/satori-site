"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HandCoins, Palette, Zap, Target, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK    = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const WHATSAPP_LINK_EN = "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
const CALENDLY_LINK    = "https://calendly.com/rodrigo-tristaan";
const EMAIL            = "r.tristaan@outlook.com";

const themeOrder = ["white", "blue", "silver", "rainbow", "gold"] as const;
type ThemeKey = typeof themeOrder[number];

const themes: Record<ThemeKey, {
  bg: string; accent: string; text: string; sub: string; card: string;
  matrixColor: string; navBg: string; logoFilter: string; ensoFilter: string;
}> = {
  white:   { bg: "#FFFFFF", accent: "#111111", text: "#111111", sub: "#666666", card: "#F4F4F4", matrixColor: "#aaaaaa", navBg: "rgba(255,255,255,0.93)", logoFilter: "brightness(0)",         ensoFilter: "brightness(0) opacity(0.06)"           },
  blue:    { bg: "#020B18", accent: "#00D4FF", text: "#E0F0FF", sub: "#4A7FA5", card: "#041428", matrixColor: "#00D4FF", navBg: "rgba(2,11,24,0.93)",     logoFilter: "invert(1)",              ensoFilter: "invert(1) brightness(2) opacity(0.06)" },
  silver:  { bg: "#0A0A0A", accent: "#E5E5E5", text: "#FFFFFF", sub: "#A3A3A3", card: "#171717", matrixColor: "#888888", navBg: "rgba(10,10,10,0.93)",    logoFilter: "invert(1)",              ensoFilter: "invert(1) brightness(2) opacity(0.06)" },
  rainbow: { bg: "#0F0218", accent: "#FF00CC", text: "#FFFFFF", sub: "#A855F7", card: "#1E0B36", matrixColor: "#FF00CC", navBg: "rgba(15,2,24,0.93)",     logoFilter: "invert(1)",              ensoFilter: "invert(1) brightness(2) opacity(0.06)" },
  gold:    { bg: "#FFFFF8", accent: "#B8860B", text: "#1a1000", sub: "#8B6914", card: "#FDF8E1", matrixColor: "#D4AF37", navBg: "rgba(255,255,248,0.93)", logoFilter: "brightness(0) sepia(1)", ensoFilter: "brightness(0) sepia(1) opacity(0.06)"  },
};

// ─────────────────────────────────────────────────────────────────────────────
// COPY
// ─────────────────────────────────────────────────────────────────────────────
const copy = {
  es: {
    nav: { problema: "El Problema", soluciones: "Servicios", precios: "Cotizar", cta: "Agendar Zoom" },
    badge: "Tu negocio local + Inteligencia Artificial",
    h1a: "Más clientes.", h1b: "Menos caos.",
    hero_sub: "Sabemos lo que es atender el negocio, contestar mensajes, publicar en redes y encima intentar crecer. Satori automatiza lo repetitivo para que tú te enfoques en lo que importa: vender.",
    cta1: "Quiero mi Auditoría Gratis", cta2: "Ver Cómo Funciona",
    problema_h: "¿Te suena alguno de estos?",
    problemas: [
      { q: "Pago anuncios y no me llega el cliente correcto.",      desc: "Tu dinero en ads se va sin convertir porque no tienes un sistema que filtre prospectos." },
      { q: "Se me van clientes por no contestar rápido.",           desc: "El 78% de las ventas las gana quien responde primero. Sin automatización, pierdes sin saberlo." },
      { q: "Mis redes están muertas y la competencia me gana.",     desc: "La consistencia es lo que genera confianza — y ventas. Sin tiempo, no hay consistencia." },
    ],
    problema_cta: "Identifiqué mi problema — quiero la solución →",
    stats: [
      { label: "Tu negocio siempre abierto", n: "24/7" },
      { label: "Prospectos perdidos",          n: "0"   },
      { label: "Días para ver resultados",     n: "30"  },
    ],
    camino_label: "Paso a paso, o todo al mismo tiempo.",
    camino_h: "El camino al crecimiento",
    camino_sub: "Cada paquete construye sobre el anterior. Empieza donde estás — llega a donde quieres.",
    ver_mas: "Ver detalle", volver: "← Volver", paquete: "Paquete",
    servicios: [
      { num: 1, tag: "Redes",     t: "Presencia Digital",  sub: "Redes Sociales + Contenido",          d: "Tus redes publicando con estrategia todos los días.",            back: "Posts, reels y stories diseñados para posicionarte como el experto. Incluye estrategia mensual, diseño, copywriting con IA y reporte de métricas.", i: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&fm=jpg" },
      { num: 2, tag: "Página Web",t: "Tu Página Web",      sub: "Sitio Web o Landing Page",             d: "Tu vitrina digital que convierte visitas en clientes.",          back: "Diseño profesional, copywriting estratégico, optimización móvil. Entrega en 7–10 días. La base que todo negocio serio necesita.", i: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&fm=jpg" },
      { num: 3, tag: "Social Ads",t: "Clientes con Ads",   sub: "Campañas Meta + Google",               d: "Anuncios que llevan el cliente correcto a tu puerta.",          back: "Setup, segmentación avanzada, creativos, optimización semanal y reporte mensual. Ideal para escalar cuando ya tienes presencia.", i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=jpg" },
      { num: 4, tag: "AI Bot",    t: "Vendedor 24/7",      sub: "Agente IA · WhatsApp + Instagram",     d: "Un agente que cotiza, agenda y cierra mientras duermes.",        back: "Entrenado con tu negocio. Integrado a WhatsApp e Instagram DM. Responde, califica y agenda automáticamente — sin que tú intervengas.", i: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80&fm=jpg" },
      { num: 5, tag: "¿Satori?",  t: "Sociedad Satori",   sub: "Todo lo anterior + Estrategia y Branding", d: "Para dominar tu mercado. No un proveedor — un socio.",     back: "Todos los servicios + identidad de marca, sesión mensual de estrategia, consultoría prioritaria y acceso anticipado a nuevas herramientas de IA.", i: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fm=jpg" },
    ],
    cotizar_h: "¿Listo para crecer?",
    cotizar_sub: "Cuéntanos dónde está tu negocio hoy y te armamos una propuesta a tu medida.",
    cotizar_cta: "Quiero mi cotización →",
    nosotros_label: "Tu Socio Digital", nosotros_nombre: "Rodrigo Tristán", nosotros_cargo: "Fundador de SATORI",
    nosotros_quote: '"La IA no reemplaza tu negocio. Lo potencia."',
    nosotros_p1: "Mi misión es poner la tecnología al alcance de cada emprendedor y empresario mexicano. Porque el crecimiento digital no debería ser privilegio de unos pocos — es una herramienta que merece estar en manos de quien trabaja todos los días para construir algo.",
    nosotros_p2: "En Satori nos mantenemos a la vanguardia — por ti y para ti. Para que tú te dediques a lo tuyo, y nosotros hagamos que tu negocio trabaje incluso cuando tú no puedes.",
    garantia_title: "Garantía de 30 días:",
    garantia_text: "Si en 30 días no sientes que el valor recibido supera lo que invertiste, seguimos trabajando contigo 20 días más sin costo adicional. Sin preguntas, sin drama.",
    btn_zoom: "Agendar Zoom", btn_email: "Enviar Email",
    footer: "© 2026 SATORI · Soluciones Digitales con IA · México",
  },
  en: {
    nav: { problema: "The Problem", soluciones: "Services", precios: "Quote", cta: "Book a Zoom" },
    badge: "Your Local Business + Artificial Intelligence",
    h1a: "More clients.", h1b: "Less chaos.",
    hero_sub: "We know what it's like to run a business, answer messages, post on social media, and still try to grow. Satori automates the repetitive stuff so you can focus on what matters: selling.",
    cta1: "Get My Free Audit", cta2: "See How It Works",
    problema_h: "Do any of these sound familiar?",
    problemas: [
      { q: "I pay for ads but the wrong people show up.",              desc: "Your ad spend leaks because there's no system to filter and nurture leads before they go cold." },
      { q: "I lose customers because I can't reply fast enough.",      desc: "78% of sales go to whoever responds first. Without automation, you're losing deals you don't even know about." },
      { q: "My social media is dead and my competitors are winning.",  desc: "Consistency is what builds trust — and trust drives sales. Without time, there's no consistency." },
    ],
    problema_cta: "I found my problem — show me the fix →",
    stats: [
      { label: "Your business always open", n: "24/7" },
      { label: "Leads lost",                 n: "0"   },
      { label: "Days to see results",         n: "30"  },
    ],
    camino_label: "Step by step, or all at once.",
    camino_h: "The path to growth",
    camino_sub: "Each package builds on the previous one. Start where you are — grow from there.",
    ver_mas: "See details", volver: "← Back", paquete: "Package",
    servicios: [
      { num: 1, tag: "Social",     t: "Digital Presence",  sub: "Social Media + Content",               d: "Your social media posting strategically every single day.",      back: "Posts, reels, and stories designed to position you as the go-to expert. Monthly strategy, design, AI copywriting, and metrics report.", i: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&fm=jpg" },
      { num: 2, tag: "Website",    t: "Your Website",      sub: "Website or Landing Page",              d: "Your digital storefront that turns visitors into clients.",       back: "Professional design, strategic copywriting, mobile optimization. Delivery in 7–10 days. The foundation every serious business needs.", i: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&fm=jpg" },
      { num: 3, tag: "Social Ads", t: "Clients with Ads",  sub: "Meta + Google Campaigns",              d: "Ads that bring the right client straight to your door.",         back: "Campaign setup, advanced targeting, creatives, weekly optimization and monthly report. Best when you already have a presence.", i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=jpg" },
      { num: 4, tag: "AI Bot",     t: "24/7 Salesperson",  sub: "AI Agent · WhatsApp + Instagram",     d: "An agent that quotes, books, and closes while you sleep.",       back: "Trained with your brand voice. Integrated into WhatsApp and Instagram DM. Responds, qualifies leads, and books appointments automatically.", i: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&q=80&fm=jpg" },
      { num: 5, tag: "Satori?",    t: "Satori Society",    sub: "Everything + Strategy & Branding",    d: "To dominate your local market. Not a vendor — a partner.",      back: "All services + brand identity, monthly strategy session, priority consulting, and early access to new AI tools.", i: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&fm=jpg" },
    ],
    cotizar_h: "Ready to grow?",
    cotizar_sub: "Tell us where your business is today and we'll build a proposal tailored to you.",
    cotizar_cta: "Get my quote →",
    nosotros_label: "Your Digital Partner", nosotros_nombre: "Rodrigo Tristán", nosotros_cargo: "Founder of SATORI",
    nosotros_quote: '"AI doesn\'t replace your business. It supercharges it."',
    nosotros_p1: "My mission is to put cutting-edge technology within reach of every entrepreneur and small business owner. Digital growth shouldn't be a privilege — it belongs in the hands of those who build something every day.",
    nosotros_p2: "At Satori, we stay at the forefront — for you and because of you. So you focus on what you do best, and we make sure your business keeps working even when you can't.",
    garantia_title: "30-Day Guarantee:",
    garantia_text: "If within 30 days you don't feel the value far exceeds what you invested, we keep working with you for 20 more days at no additional cost. No questions, no drama.",
    btn_zoom: "Book a Zoom", btn_email: "Send Email",
    footer: "© 2026 SATORI · AI-Powered Digital Solutions · México",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MATRIX BACKGROUND
// ─────────────────────────────────────────────────────────────────────────────
function MatrixBackground({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let id: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.035)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.93 ? colorRef.current : colorRef.current + "55";
        ctx.fillText(Math.random() < 0.5 ? "1" : "0", i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.28, pointerEvents: "none", zIndex: 0 }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// CURSOR GLOW
// ─────────────────────────────────────────────────────────────────────────────
function CursorGlow({ accent }: { accent: string }) {
  const [pos, setPos] = useState({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true); };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseleave", leave); };
  }, []);
  return (
    <div style={{
      position: "fixed", pointerEvents: "none", zIndex: 9999,
      left: pos.x - 180, top: pos.y - 180, width: 360, height: 360,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${accent}20 0%, ${accent}08 45%, transparent 70%)`,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s",
      mixBlendMode: "screen",
    }} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────────────────────────────────────
function Typewriter({ text, style }: { text: string; style?: React.CSSProperties }) {
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { setDisplayed(""); setIdx(0); setDone(false); }, [text]);

  useEffect(() => {
    if (done || idx >= text.length) { setDone(true); return; }
    const timer = setTimeout(() => {
      setDisplayed(p => p + text[idx]);
      setIdx(i => i + 1);
    }, 42);
    return () => clearTimeout(timer);
  }, [idx, text, done]);

  return (
    <span style={style}>
      {displayed}
      {!done && <span style={{ opacity: 0.5, animation: "blink 0.8s step-end infinite" }}>|</span>}
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SPINNING ENSO
// ─────────────────────────────────────────────────────────────────────────────
function SpinningEnso({ filter, opacity = 0.88 }: { filter: string; opacity?: number }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      style={{ width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Image src="/enso-negro.png" alt="Enso" width={420} height={420} style={{ filter, opacity }} />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LANG POPUP
// ─────────────────────────────────────────────────────────────────────────────
function LangPopup({ onSelect, t }: { onSelect: (l: "es" | "en") => void; t: typeof themes.white }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)" }}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        style={{ padding: "2.5rem", maxWidth: "22rem", width: "90%", backgroundColor: t.card, border: `1px solid ${t.accent}20` }}>
        <Image src="/logo-satori.png" alt="SATORI" width={90} height={28} className="mx-auto mb-8" style={{ filter: t.logoFilter }} />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <button onClick={() => onSelect("es")}
            style={{ width: "100%", padding: "1rem", fontWeight: 900, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: t.accent, color: t.bg, border: "none", cursor: "pointer" }}>
            🇲🇽 Español
          </button>
          <button onClick={() => onSelect("en")}
            style={{ width: "100%", padding: "1rem", fontWeight: 900, fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", backgroundColor: "transparent", color: t.text, border: `1px solid ${t.accent}35`, cursor: "pointer" }}>
            🇺🇸 English
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AI WORKFLOW VISUAL
// ─────────────────────────────────────────────────────────────────────────────
function AIWorkflow({ accent, card }: { accent: string; card: string }) {
  const steps = ["📩 Mensaje entrante", "🤖 IA analiza intención", "💬 Respuesta en segundos", "📅 Cita agendada automáticamente", "✅ Prospecto convertido"];
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "1rem", gap: "0.4rem", backgroundColor: card }}>
      {steps.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.68rem", fontFamily: "monospace", padding: "0.35rem 0.6rem", backgroundColor: `${accent}10`, color: accent, border: `1px solid ${accent}18`, borderRadius: 2 }}>
          <span style={{ opacity: 0.3, fontSize: "0.58rem", width: "1rem", flexShrink: 0 }}>{i + 1}.</span>
          {s}
          {i < 4 && <span style={{ marginLeft: "auto", opacity: 0.2 }}>↓</span>}
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE FLIP CARD
// ─────────────────────────────────────────────────────────────────────────────
function ServiceCard({ s, t, c }: { s: typeof copy.es.servicios[0]; t: typeof themes.white; c: typeof copy.es }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setFlipped(false); }, [s.num]);

  return (
    <div style={{ width: "100%", height: 400, perspective: "1200px", cursor: "pointer" }} onClick={() => setFlipped(f => !f)}>
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.45s cubic-bezier(0.4,0.2,0.2,1)",
      }}>
        {/* FRONT */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", backgroundColor: t.bg, border: `1px solid ${t.accent}18`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ height: 160, flexShrink: 0, overflow: "hidden" }}>
            {s.i
              ? <img src={s.i} alt={s.t} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              : <AIWorkflow accent={t.accent} card={t.card} />
            }
          </div>
          <div style={{ flex: 1, padding: "1.1rem 1.3rem", display: "flex", flexDirection: "column", justifyContent: "space-between", overflow: "hidden" }}>
            <div>
              <p style={{ fontSize: "0.56rem", textTransform: "uppercase", letterSpacing: "0.18em", color: t.accent, fontWeight: 800, marginBottom: "0.4rem", opacity: 0.65, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.sub}</p>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.6rem", color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.t}</h3>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.55, color: t.sub, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.d}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.2rem", fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: t.accent, marginTop: "0.6rem" }}>
              {c.ver_mas} <span>↗</span>
            </div>
          </div>
        </div>
        {/* BACK */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: t.accent, color: t.bg, padding: "2rem 1.75rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: "0.56rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.5, marginBottom: "0.75rem" }}>{c.paquete} {s.num} · {s.sub}</p>
          <h3 style={{ fontSize: "1.45rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "0.9rem" }}>{s.t}</h3>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.75, opacity: 0.92, display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{s.back}</p>
          <div style={{ marginTop: "auto", paddingTop: "1.25rem", fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.4 }}>{c.volver}</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES SWIPER
// ─────────────────────────────────────────────────────────────────────────────
function ServicesSwiper({ t, c }: { t: typeof themes.white; c: typeof copy.es }) {
  const [active, setActive] = useState(0);
  const total = c.servicios.length;
  const startX = useRef<number | null>(null);
  const dragged = useRef(false);

  const goTo = (i: number) => setActive((i + total) % total);

  const onPointerDown = (e: React.PointerEvent) => { startX.current = e.clientX; dragged.current = false; };
  const onPointerMove = (e: React.PointerEvent) => { if (startX.current !== null && Math.abs(e.clientX - startX.current) > 6) dragged.current = true; };
  const onPointerUp   = (e: React.PointerEvent) => {
    if (!startX.current) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 45 && dragged.current) diff > 0 ? goTo(active + 1) : goTo(active - 1);
    startX.current = null; dragged.current = false;
  };

  return (
    <div>
      {/* Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5rem", marginBottom: "2.5rem" }}>
        {c.servicios.map((s, i) => (
          <button key={i} onClick={() => goTo(i)}
            style={{ padding: "0.45rem 1rem", fontSize: "0.68rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.12em", backgroundColor: active === i ? t.accent : "transparent", color: active === i ? t.bg : t.sub, border: "none", cursor: "pointer", transition: "all 0.25s" }}>
            {s.num}. {s.tag}
          </button>
        ))}
      </div>

      {/* Swipe zone */}
      <div
        style={{ position: "relative", userSelect: "none", touchAction: "pan-y", WebkitTapHighlightColor: "transparent", WebkitUserSelect: "none" } as React.CSSProperties}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}>

        {/* Enso bg — rotates on each swipe */}
        <AnimatePresence mode="wait">
          <motion.div key={`enso-${active}`}
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.15, rotate: 20 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }}>
            <img src="/enso-negro.png" alt="" style={{ width: "65%", maxWidth: 360, filter: t.ensoFilter }} />
          </motion.div>
        </AnimatePresence>

        {/* Cards */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "0.5rem 0 1.5rem", position: "relative", zIndex: 1, minHeight: 420 }}>
          {/* Prev ghost */}
          <div onClick={() => goTo(active - 1)}
            style={{ width: "min(130px,22vw)", flexShrink: 0, cursor: "pointer", opacity: 0.18, filter: "blur(2px)", transform: "scale(0.86)", transition: "all 0.35s", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}>
            <ServiceCard s={c.servicios[(active - 1 + total) % total]} t={t} c={c} />
          </div>

          {/* Active card */}
          <AnimatePresence mode="wait">
            <motion.div key={`card-${active}`}
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.94 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              style={{ width: "min(400px,82vw)", flexShrink: 0, zIndex: 2 }}>
              <ServiceCard s={c.servicios[active]} t={t} c={c} />
            </motion.div>
          </AnimatePresence>

          {/* Next ghost */}
          <div onClick={() => goTo(active + 1)}
            style={{ width: "min(130px,22vw)", flexShrink: 0, cursor: "pointer", opacity: 0.18, filter: "blur(2px)", transform: "scale(0.86)", transition: "all 0.35s", WebkitTapHighlightColor: "transparent" } as React.CSSProperties}>
            <ServiceCard s={c.servicios[(active + 1) % total]} t={t} c={c} />
          </div>
        </div>
      </div>

      {/* Arrows + dots */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "0.5rem" }}>
        <button onClick={() => goTo(active - 1)} style={{ padding: "0.6rem 0.8rem", border: "none", color: t.accent, backgroundColor: "transparent", cursor: "pointer", opacity: 0.65, transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.65")}>
          <ChevronLeft size={24} />
        </button>
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          {c.servicios.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: active === i ? 28 : 8, height: 8, borderRadius: active === i ? 4 : "50%", backgroundColor: active === i ? t.accent : `${t.accent}30`, border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
          ))}
        </div>
        <button onClick={() => goTo(active + 1)} style={{ padding: "0.6rem 0.8rem", border: "none", color: t.accent, backgroundColor: "transparent", cursor: "pointer", opacity: 0.65, transition: "opacity 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")} onMouseLeave={e => (e.currentTarget.style.opacity = "0.65")}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [lang, setLang]         = useState<"es" | "en">("es");
  const [showPopup, setShowPopup] = useState(true);

  const themeKey     = themeOrder[themeIdx];
  const nextThemeKey = themeOrder[(themeIdx + 1) % themeOrder.length];
  const t            = themes[themeKey];
  const nextAccent   = themes[nextThemeKey].accent;
  const c            = copy[lang];
  const waLink       = lang === "es" ? WHATSAPP_LINK : WHATSAPP_LINK_EN;
  const Icons        = [HandCoins, Zap, Target];

  return (
    <main style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh", position: "relative", transition: "background-color 0.5s, color 0.5s" }}>
      <MatrixBackground color={t.matrixColor} />
      <CursorGlow accent={t.accent} />

      <AnimatePresence>
        {showPopup && <LangPopup t={t} onSelect={l => { setLang(l); setShowPopup(false); }} />}
      </AnimatePresence>

      {/* ── FLOATING BUTTONS ── */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "6rem", right: "1.5rem", zIndex: 100, display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", borderRadius: 999, backgroundColor: "#25D366", color: "#000", fontWeight: 900, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 8px 30px rgba(0,0,0,0.25)", textDecoration: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="hidden md:inline">WhatsApp</span>
      </a>

      <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100, display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", borderRadius: 999, backgroundColor: t.accent, color: t.bg, fontWeight: 900, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 8px 30px rgba(0,0,0,0.25)", textDecoration: "none" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        <span className="hidden md:inline">{c.btn_zoom}</span>
      </a>

      <button onClick={() => setThemeIdx(i => (i + 1) % themeOrder.length)} style={{ position: "fixed", bottom: "10.5rem", right: "1.5rem", zIndex: 100, padding: "0.75rem", borderRadius: 999, backgroundColor: t.card, color: t.accent, border: `1px solid ${t.accent}30`, cursor: "pointer", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
        <Palette size={18} />
      </button>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(14px)", backgroundColor: t.navBg, borderBottom: `1px solid ${t.accent}12`, padding: "0.9rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#inicio"><Image src="/logo-satori.png" alt="SATORI" width={110} height={34} style={{ filter: t.logoFilter }} /></a>
        <div className="hidden md:flex items-center" style={{ gap: "1.75rem" }}>
          {([["#problema", c.nav.problema], ["#servicios", c.nav.soluciones], ["#cotizar", c.nav.precios]] as [string,string][]).map(([href, label]) => (
            <motion.a key={href} href={href} whileHover={{ y: -1 }} style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.sub, textDecoration: "none" }}>{label}</motion.a>
          ))}
          <a href={CALENDLY_LINK} target="_blank" style={{ padding: "0.45rem 1.3rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, fontSize: "0.68rem", textTransform: "uppercase", textDecoration: "none" }}>{c.nav.cta}</a>
        </div>
        <button onClick={() => setShowPopup(true)} className="md:hidden" style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.3rem 0.8rem", border: `1px solid ${t.accent}30`, borderRadius: 999, fontSize: "0.68rem", fontWeight: 700, color: t.text, backgroundColor: `${t.accent}08`, cursor: "pointer" }}>
          <Globe size={12} /> {lang === "es" ? "EN" : "ES"}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="inicio" style={{ paddingTop: "9rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem", maxWidth: "72rem", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }} className="!grid-cols-1 md:!grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div style={{ display: "inline-block", padding: "0.2rem 1rem", borderRadius: 999, border: `1px solid ${t.accent}22`, backgroundColor: `${t.accent}06`, marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 900, color: t.accent }}>{c.badge}</p>
            </div>
            <h1 style={{ fontSize: "clamp(3.5rem,8vw,6rem)", fontFamily: "serif", fontWeight: 700, lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
              {c.h1a}<br /><span style={{ color: t.accent, fontStyle: "italic", fontWeight: 400 }}>{c.h1b}</span>
            </h1>
            <p style={{ fontSize: "1rem", marginBottom: "2.5rem", opacity: 0.7, maxWidth: "28rem", lineHeight: 1.75 }}>{c.hero_sub}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <motion.a href={CALENDLY_LINK} target="_blank" whileHover={{ scale: 1.04, y: -2 }} style={{ padding: "1rem 2.2rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em", textDecoration: "none" }}>{c.cta1}</motion.a>
              <motion.a href="#servicios" whileHover={{ scale: 1.04, y: -2 }} style={{ padding: "1rem 2.2rem", border: `1px solid ${t.accent}`, color: t.accent, fontWeight: 700, textTransform: "uppercase", fontSize: "0.75rem", textDecoration: "none" }}>{c.cta2}</motion.a>
            </div>
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SpinningEnso filter={t.logoFilter} opacity={0.82} />
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section id="problema" style={{ padding: "5rem 1.5rem", backgroundColor: t.card, borderTop: `1px solid ${t.accent}10`, borderBottom: `1px solid ${t.accent}10`, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontFamily: "serif", textAlign: "center", marginBottom: "3rem", lineHeight: 1.2 }}>{c.problema_h}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {c.problemas.map(({ q, desc }, i) => {
              const Icon = Icons[i];
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.18, duration: 0.55, ease: "easeOut" }}
                  style={{ padding: "1.5rem", borderLeft: `2px solid ${t.accent}35`, backgroundColor: `${t.accent}04`, display: "flex", gap: "1rem", alignItems: "flex-start", cursor: "default" }}>
                  <motion.div animate={{ scale: [1, 1.18, 1] }} transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.5 }} style={{ flexShrink: 0, marginTop: "0.15rem" }}>
                    <Icon size={20} style={{ color: nextAccent }} />
                  </motion.div>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontStyle: "italic", fontWeight: 600, marginBottom: "0.5rem", lineHeight: 1.4 }}>"{q}"</p>
                    <p style={{ fontSize: "0.78rem", opacity: 0.58, lineHeight: 1.65, color: t.sub }}>{desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <a href={waLink} target="_blank" style={{ fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: t.accent, fontSize: "0.72rem", textDecoration: "none" }}>{c.problema_cta}</a>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "4rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", textAlign: "center" }}>
          {c.stats.map(({ label, n }, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} whileHover={{ scale: 1.05, y: -3 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ padding: "2rem 1rem", backgroundColor: `${t.accent}06`, border: `1px solid ${t.accent}10`, cursor: "default" }}>
              <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.2em", color: t.sub, marginBottom: "1rem", lineHeight: 1.6 }}>{label}</p>
              <p style={{ fontSize: "clamp(2.8rem,5vw,4rem)", fontFamily: "serif", fontWeight: 700, color: t.accent, lineHeight: 1 }}>{n}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" style={{ padding: "5rem 1.5rem", backgroundColor: t.card, position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ maxWidth: "62rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Typewriter text={c.camino_label} style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.4em", color: t.accent, fontWeight: 900, marginBottom: "0.75rem", display: "block" }} />
            <h2 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontFamily: "serif", fontWeight: 700, lineHeight: 1.05, marginBottom: "0.75rem" }}>{c.camino_h}</h2>
            <p style={{ fontSize: "0.88rem", opacity: 0.52, maxWidth: "34rem", margin: "0 auto", lineHeight: 1.7, color: t.sub }}>{c.camino_sub}</p>
          </div>
          <ServicesSwiper t={t} c={c} />
        </div>
      </section>

      {/* ── COTIZAR ── */}
      <section id="cotizar" style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "38rem", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.2rem)", fontFamily: "serif", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.2 }}>{c.cotizar_h}</h2>
          <p style={{ fontSize: "0.95rem", opacity: 0.62, lineHeight: 1.8, marginBottom: "2rem", color: t.sub }}>{c.cotizar_sub}</p>
          <motion.a href={waLink} target="_blank" whileHover={{ scale: 1.05, y: -2 }} style={{ display: "inline-block", padding: "1rem 2.5rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.08em", textDecoration: "none" }}>
            {c.cotizar_cta}
          </motion.a>
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section id="nosotros" style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "68rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="!grid-cols-1 md:!grid-cols-2">
          <div style={{ position: "relative" }}>
            <Image src="/rodrigo.png" alt="Rodrigo Tristán" width={500} height={600} className="grayscale hover:grayscale-0 transition-all duration-700 object-cover" />
            <div style={{ position: "absolute", top: "-1.5rem", left: "-1.5rem", width: "5rem", height: "5rem", borderTop: `2px solid ${t.accent}`, borderLeft: `2px solid ${t.accent}` }} />
          </div>
          <div>
            <p style={{ fontSize: "0.62rem", textTransform: "uppercase", letterSpacing: "0.35em", fontWeight: 900, color: t.accent, marginBottom: "1rem" }}>{c.nosotros_label}</p>
            <h2 style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", fontFamily: "serif", fontWeight: 700, marginBottom: "0.4rem" }}>{c.nosotros_nombre}</h2>
            <p style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.2em", color: t.sub, marginBottom: "1.75rem" }}>{c.nosotros_cargo}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.75rem" }}>
              <p style={{ fontSize: "1.2rem", fontStyle: "italic", fontWeight: 600, lineHeight: 1.4 }}>{c.nosotros_quote}</p>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.8 }}>{c.nosotros_p1}</p>
              <p style={{ fontSize: "0.9rem", opacity: 0.7, lineHeight: 1.8 }}>{c.nosotros_p2}</p>
              <div style={{ padding: "1.25rem", border: `1px solid ${t.accent}20`, backgroundColor: `${t.accent}05` }}>
                <p style={{ fontWeight: 700, fontSize: "0.78rem", color: t.accent, marginBottom: "0.4rem" }}>{c.garantia_title}</p>
                <p style={{ fontSize: "0.8rem", opacity: 0.68, lineHeight: 1.7 }}>{c.garantia_text}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <motion.a href={CALENDLY_LINK} target="_blank" whileHover={{ scale: 1.03 }} style={{ padding: "0.85rem 1.75rem", border: `1px solid ${t.accent}`, color: t.accent, fontWeight: 700, fontSize: "0.78rem", textDecoration: "none" }}>{c.btn_zoom}</motion.a>
              <a href={`mailto:${EMAIL}`} style={{ padding: "0.85rem 1.75rem", fontWeight: 700, opacity: 0.5, fontSize: "0.78rem", textDecoration: "none" }}>{c.btn_email}</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "2.5rem 1.5rem", borderTop: `1px solid ${t.accent}10`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 1 }}>
        <Image src="/logo-satori.png" alt="SATORI" width={85} height={26} style={{ filter: t.logoFilter }} />
        <p style={{ fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.3 }}>{c.footer}</p>
      </footer>
    </main>
  );
}