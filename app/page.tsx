"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HandCoins, Palette, Zap, Target, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK    = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const WHATSAPP_LINK_EN = "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
const CALENDLY_LINK    = "https://calendly.com/rodrigo-tristaan";
const EMAIL            = "r.tristaan@outlook.com";

const themeOrder = ["white", "blue", "silver", "rainbow", "gold", "nopal"] as const;
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
  nopal:   { bg: "#0A1A0D", accent: "#4CAF50", text: "#E8F5E9", sub: "#66BB6A", card: "#0F2412", matrixColor: "#4CAF50", navBg: "rgba(10,26,13,0.93)",   logoFilter: "invert(1)",              ensoFilter: "invert(1) brightness(2) opacity(0.06)" },
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
      { num: 1, tag: "Redes",     t: "Presencia Digital",  sub: "Redes Sociales + Contenido",          d: "Tus redes publicando con estrategia todos los días.",            back: "Posts, reels y stories diseñados para posicionarte como el experto. Incluye estrategia mensual, diseño, copywriting con IA y reporte de métricas.", i: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80&fm=jpg" },
      { num: 2, tag: "Página Web",t: "Tu Página Web",      sub: "Sitio Web o Landing Page",             d: "Tu vitrina digital que convierte visitas en clientes.",          back: "Diseño profesional, copywriting estratégico, optimización móvil. Entrega en 7–10 días. La base que todo negocio serio necesita.", i: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&fm=jpg" },
      { num: 3, tag: "Social Ads",t: "Clientes con Ads",   sub: "Campañas Meta + Google",               d: "Anuncios que llevan el cliente correcto a tu puerta.",          back: "Setup, segmentación avanzada, creativos, optimización semanal y reporte mensual. Ideal para escalar cuando ya tienes presencia.", i: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fm=jpg" },
      { num: 4, tag: "AI Bot",    t: "Vendedor 24/7",      sub: "Agente IA · WhatsApp + Instagram",     d: "Un agente que cotiza, agenda y cierra mientras duermes.",        back: "Entrenado con tu negocio. Integrado a WhatsApp e Instagram DM. Responde, califica y agenda automáticamente — sin que tú intervengas.", i: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&fm=jpg" },
      { num: 5, tag: "¿Satori?",  t: "Sociedad Satori",   sub: "Todo lo anterior + Estrategia y Branding", d: "Para dominar tu mercado. No un proveedor — un socio.",     back: "Todos los servicios + identidad de marca, sesión mensual de estrategia, consultoría prioritaria y acceso anticipado a nuevas herramientas de IA.", i: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fm=jpg" },
    ],
    cotizar_h: "¿Listo para crecer?",
    cotizar_sub: "Cuéntanos dónde está tu negocio hoy y te armamos una propuesta a tu medida.",
    cotizar_cta: "Quiero mi cotización →",
    nosotros_label: "Tu Socio Digital", nosotros_nombre: "Rodrigo Tristán", nosotros_cargo: "Fundador de SATORI",
    nosotros_quote: '"La IA no reemplaza tu negocio. Lo potencia."',
    nosotros_p1: "Sé lo que cuesta construir un negocio desde adentro: las horas, las decisiones, la incertidumbre. Por eso fundé Satori — para que cada emprendedor y empresario mexicano tenga acceso a las mismas herramientas que usan las empresas más avanzadas del mundo, sin necesitar un equipo de 50 personas ni un presupuesto millonario.",
    nosotros_p2: "La mayoría de las agencias te venden actividad. Yo te vendo claridad. Antes de tocar una sola herramienta, entendemos tu mercado, a tu cliente y qué es verdad en tu industria — no qué está de moda. Porque una estrategia construida sobre la realidad siempre gana a una construida sobre suposiciones.",
    garantia_title: "Garantía de 30 días:",
    garantia_text: "Si en 30 días no sientes que el valor recibido supera lo que invertiste, seguimos trabajando contigo 20 días más sin costo adicional. Sin preguntas, sin drama.",
    btn_zoom: "Agendar Zoom", btn_email: "Enviar Email",

    faq_label: "Preguntas frecuentes",
    faq_h: "Todo lo que necesitas saber.",
    faqs: [
      { q: "¿Cuánto tiempo tarda ver resultados?", a: "Depende del servicio. Contenido y redes: primeras semanas. Ads: desde el primer mes. Agente IA: desde el día de activación." },
      { q: "¿Necesito saber de tecnología?", a: "Para nada. Nos encargamos de toda la parte técnica. Tú solo nos dices cómo funciona tu negocio y nosotros hacemos el resto." },
      { q: "¿Firmo un contrato largo?", a: "No. Trabajamos mes a mes. Si no estás satisfecho, puedes cancelar cuando quieras — y si es dentro de los primeros 30 días, seguimos 20 días más sin costo." },
      { q: "¿Qué necesito para empezar?", a: "Solo una llamada de 30 minutos. Ahí entendemos tu negocio, te proponemos la mejor ruta y te damos un precio claro. Sin sorpresas." },
      { q: "¿Trabajan con cualquier tipo de negocio?", a: "Trabajamos con negocios locales y pymes en México — restaurantes, clínicas, despachos, tiendas, servicios profesionales, constructoras y más." },
      { q: "¿Cómo funciona el agente de IA?", a: "Lo entrenamos con la información de tu negocio: precios, servicios, horarios, FAQs. Luego lo conectamos a tu WhatsApp Business e Instagram DM. Empieza a responder solo en minutos." },
    ],
    reviews_label: "Lo que dicen nuestros clientes",
    reviews_h: "Resultados reales.",
    reviews: [
      { name: "Carlos M.", role: "Dueño de restaurante", text: "Antes perdía clientes porque no contestaba rápido. Ahora el bot de Satori responde solo y ya agendé 3 mesas más esta semana.", stars: 5 },
      { name: "Fernanda R.", role: "Directora de clínica dental", text: "Mi página web nueva me ha traído pacientes de Google que antes ni sabían que existíamos. El ROI fue visible en el primer mes.", stars: 5 },
      { name: "Diego L.", role: "Consultor independiente", text: "Contraté el servicio de redes y en 6 semanas duplicamos los mensajes de posibles clientes. El contenido es de muy buena calidad.", stars: 5 },
      { name: "Ana P.", role: "Dueña de boutique", text: "El agente de IA es muy bueno. Hubo una demora en los primeros chats que me preocupó, pero Rodrigo lo resolvió rápido y desde entonces funciona de maravilla. Mis clientes no saben si hablan con una persona.", stars: 4.5 },
    ],
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
      { num: 1, tag: "Social",     t: "Digital Presence",  sub: "Social Media + Content",               d: "Your social media posting strategically every single day.",      back: "Posts, reels, and stories designed to position you as the go-to expert. Monthly strategy, design, AI copywriting, and metrics report.", i: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80&fm=jpg" },
      { num: 2, tag: "Website",    t: "Your Website",      sub: "Website or Landing Page",              d: "Your digital storefront that turns visitors into clients.",       back: "Professional design, strategic copywriting, mobile optimization. Delivery in 7–10 days. The foundation every serious business needs.", i: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80&fm=jpg" },
      { num: 3, tag: "Social Ads", t: "Clients with Ads",  sub: "Meta + Google Campaigns",              d: "Ads that bring the right client straight to your door.",         back: "Campaign setup, advanced targeting, creatives, weekly optimization and monthly report. Best when you already have a presence.", i: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fm=jpg" },
      { num: 4, tag: "AI Bot",     t: "24/7 Salesperson",  sub: "AI Agent · WhatsApp + Instagram",     d: "An agent that quotes, books, and closes while you sleep.",       back: "Trained with your brand voice. Integrated into WhatsApp and Instagram DM. Responds, qualifies leads, and books appointments automatically.", i: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80&fm=jpg" },
      { num: 5, tag: "Satori?",    t: "Satori Society",    sub: "Everything + Strategy & Branding",    d: "To dominate your local market. Not a vendor — a partner.",      back: "All services + brand identity, monthly strategy session, priority consulting, and early access to new AI tools.", i: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fm=jpg" },
    ],
    cotizar_h: "Ready to grow?",
    cotizar_sub: "Tell us where your business is today and we'll build a proposal tailored to you.",
    cotizar_cta: "Get my quote →",
    nosotros_label: "Your Digital Partner", nosotros_nombre: "Rodrigo Tristán", nosotros_cargo: "Founder of SATORI",
    nosotros_quote: '"AI doesn\'t replace your business. It supercharges it."',
    nosotros_p1: "I know what it costs to build a business from the inside: the hours, the decisions, the uncertainty. That's why I founded Satori — so every Mexican entrepreneur has access to the same tools used by the world's most advanced companies, without needing a team of 50 or a million-dollar budget.",
    nosotros_p2: "Most agencies sell you activity. I sell you clarity. Before touching a single tool, we understand your market, your customer, and what's actually true in your industry — not what's trending. Because a strategy built on reality always beats one built on assumptions.",
    garantia_title: "30-Day Guarantee:",
    garantia_text: "If within 30 days you don't feel the value far exceeds what you invested, we keep working with you for 20 more days at no additional cost. No questions, no drama.",
    btn_zoom: "Book a Zoom", btn_email: "Send Email",

    faq_label: "Frequently asked questions",
    faq_h: "Everything you need to know.",
    faqs: [
      { q: "How long until I see results?", a: "Depends on the service. Content & social: first few weeks. Ads: from month one. AI Agent: from day one of activation." },
      { q: "Do I need to be tech-savvy?", a: "Not at all. We handle every technical detail. Just tell us how your business works and we take care of the rest." },
      { q: "Do I sign a long-term contract?", a: "No. We work month to month. Cancel anytime — and within the first 30 days, we keep working with you 20 more days at no cost." },
      { q: "What do I need to get started?", a: "Just a 30-minute call. We learn your business, propose the best path, and give you a clear price. No surprises." },
      { q: "What types of businesses do you work with?", a: "Local businesses and SMEs in Mexico — restaurants, clinics, law firms, shops, professional services, construction and more." },
      { q: "How does the AI agent work?", a: "We train it on your business info: prices, services, hours, FAQs. Then connect it to WhatsApp Business and Instagram DM. Starts responding in minutes." },
    ],
    reviews_label: "What our clients say",
    reviews_h: "Real results.",
    reviews: [
      { name: "Carlos M.", role: "Restaurant owner", text: "I used to lose customers because I couldn't reply fast. Now Satori's bot handles it and I've booked 3 more tables this week alone.", stars: 5 },
      { name: "Fernanda R.", role: "Dental clinic director", text: "My new website brought in patients from Google who didn't even know we existed. ROI was visible in the first month.", stars: 5 },
      { name: "Diego L.", role: "Independent consultant", text: "I hired the social media service and in 6 weeks we doubled our inbound messages. The content quality is excellent.", stars: 5 },
      { name: "Ana P.", role: "Boutique owner", text: "The AI agent is great. There was a delay in the first few chats that worried me, but Rodrigo fixed it quickly and since then it works flawlessly. Clients can't tell if it's a person.", stars: 4.5 },
    ],
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
  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.28, pointerEvents: "none", zIndex: 0, willChange: "transform" }} />;
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
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Reset when text changes
  useEffect(() => { setDisplayed(""); setIdx(0); setDone(false); setStarted(false); }, [text]);

  // Start only when visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started || done || idx >= text.length) { if (idx >= text.length) setDone(true); return; }
    const timer = setTimeout(() => {
      setDisplayed(p => p + text[idx]);
      setIdx(i => i + 1);
    }, 80);
    return () => clearTimeout(timer);
  }, [idx, text, done, started]);

  return (
    <span ref={ref} style={{ textAlign: "center", display: "block", ...style }}>
      {displayed}
      {started && !done && <span style={{ opacity: 0.5, animation: "blink 0.8s step-end infinite" }}>|</span>}
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
      animate={{ rotate: [0, -360] }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear", repeatType: "loop" }}
      style={{ width: 420, height: 420, display: "flex", alignItems: "center", justifyContent: "center", transformOrigin: "center center" }}>
      <Image src="/enso-negro.png" alt="Enso" width={420} height={420} style={{ filter, opacity, display: "block" }} />
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
// SERVICES — BENTO GRID
// ─────────────────────────────────────────────────────────────────────────────
function ServicesBento({ t, c }: { t: typeof themes.white; c: typeof copy.es }) {
  const [active, setActive] = useState<number | null>(null);
  const accents = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#A29BFE", "#FD79A8"];

  const cells = c.servicios.map((s, i) => ({ s, i, color: accents[i], isActive: active === i }));

  return (
    <div style={{ padding: "0 clamp(1rem,4vw,3rem) 3rem" }}>
      {/* Service names row — all 5 equal, same level */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", padding: "0 0.2rem" }}>
        {cells.map(({ s, i, color, isActive }) => (
          <div key={i} style={{ flex: 1, textAlign: "center", transition: "all 0.3s" }}>
            <span style={{ fontSize: "0.65rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color: isActive ? color : t.sub, transition: "color 0.3s" }}>
              {s.num}. {s.tag}
            </span>
          </div>
        ))}
      </div>

      {/* Bento grid */}
      <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(6,1fr)" }}>
        {cells.map(({ s, i, color, isActive }) => (
          <motion.div key={i}
            onHoverStart={() => setActive(i)}
            onHoverEnd={() => setActive(null)}
            onTap={() => setActive(active === i ? null : i)}
            animate={{ scale: isActive ? 1.02 : 1, y: isActive ? -4 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              gridColumn: i < 2 ? "span 3" : "span 2",
              position: "relative", overflow: "hidden", cursor: "pointer",
              minHeight: i < 2 ? "clamp(260px,35vh,380px)" : "clamp(200px,28vh,300px)",
              borderRadius: "1.25rem",
              boxShadow: isActive ? `0 20px 60px ${color}35, 0 8px 20px rgba(0,0,0,0.15)` : "0 4px 20px rgba(0,0,0,0.08)",
              transition: "box-shadow 0.4s",
            }}>

            {/* Image — no blur, full crispness */}
            {s.i ? (
              <img src={s.i} alt={s.t} loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "transform 0.55s ease", transform: isActive ? "scale(1.07)" : "scale(1)", display: "block" }} />
            ) : (
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${color}30, ${t.card})` }} />
            )}

            {/* Overlay — lighter than before, no blur */}
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 55%, rgba(0,0,0,0.05) 100%)` }} />

            {/* Color accent border on hover */}
            <motion.div animate={{ opacity: isActive ? 1 : 0 }} transition={{ duration: 0.3 }}
              style={{ position: "absolute", inset: 0, borderRadius: "1.25rem", border: `2px solid ${color}`, pointerEvents: "none" }} />

            {/* Number watermark */}
            <div style={{ position: "absolute", top: "0.6rem", right: "0.9rem", fontSize: "clamp(2.5rem,5vw,4rem)", fontFamily: "serif", fontWeight: 900, color: "#fff", opacity: isActive ? 0.15 : 0.07, lineHeight: 1, pointerEvents: "none", userSelect: "none", transition: "opacity 0.3s" }}>
              {String(i + 1).padStart(2, "0")}
            </div>

            {/* Content */}
            <div style={{ position: "absolute", inset: 0, padding: "1.2rem 1.35rem", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              {/* Title always visible */}
              <h3 style={{ fontSize: "clamp(1rem,2.2vw,1.45rem)", fontFamily: "serif", fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: "0.45rem", textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                {s.t}
              </h3>
              {/* Sub */}
              <p style={{ fontSize: "0.58rem", textTransform: "uppercase", letterSpacing: "0.15em", color: color, fontWeight: 700, marginBottom: "0.35rem", opacity: 0.9 }}>
                {s.sub}
              </p>
              {/* Detail on hover */}
              <motion.div animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.35, ease: "easeOut" }} style={{ overflow: "hidden" }}>
                <p style={{ fontSize: "clamp(0.75rem,1.3vw,0.83rem)", color: "rgba(255,255,255,0.82)", lineHeight: 1.6, marginBottom: "0.6rem" }}>{s.d}</p>
                <span style={{ fontSize: "0.58rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", color }}>
                  {c.ver_mas} →
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .bento-names > *, .bento-grid > * { grid-column: span 6 !important; min-height: 200px !important; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MEXICO MAP
// ─────────────────────────────────────────────────────────────────────────────
function MexicoMap({ accent, bg, card }: { accent: string; bg: string; card: string }) {
  // Simplified Mexico state paths (key states highlighted)
  // CDMX = Mexico City, JAL = Jalisco (Guadalajara)
  const states = [
    // Baja California Norte
    { id:"BC",  d:"M 68 58 L 82 45 L 88 55 L 78 72 Z", client: false },
    // Baja California Sur
    { id:"BCS", d:"M 72 72 L 80 70 L 85 90 L 75 105 Z", client: false },
    // Sonora
    { id:"SON", d:"M 88 40 L 120 35 L 125 55 L 105 70 L 88 60 Z", client: false },
    // Chihuahua
    { id:"CHIH",d:"M 120 35 L 160 30 L 168 60 L 148 72 L 125 55 Z", client: false },
    // Coahuila
    { id:"COAH",d:"M 160 30 L 200 28 L 208 55 L 185 65 L 168 60 Z", client: false },
    // Nuevo Leon
    { id:"NL",  d:"M 200 28 L 220 32 L 218 58 L 208 55 Z", client: false },
    // Tamaulipas
    { id:"TAM", d:"M 220 32 L 240 38 L 235 80 L 218 58 Z", client: false },
    // Sinaloa
    { id:"SIN", d:"M 105 70 L 125 55 L 138 75 L 128 95 L 110 90 Z", client: false },
    // Durango
    { id:"DGO", d:"M 125 55 L 148 72 L 152 90 L 138 95 L 128 95 L 138 75 Z", client: false },
    // Zacatecas
    { id:"ZAC", d:"M 148 72 L 168 65 L 175 85 L 165 98 L 152 90 Z", client: false },
    // SLP
    { id:"SLP", d:"M 168 65 L 185 65 L 195 80 L 188 98 L 175 85 Z", client: false },
    // Nayarit
    { id:"NAY", d:"M 128 95 L 140 92 L 145 108 L 132 112 Z", client: false },
    // Jalisco — CLIENT (Guadalajara)
    { id:"JAL", d:"M 140 92 L 165 98 L 170 118 L 155 130 L 140 125 L 135 112 Z", client: true },
    // Aguascalientes
    { id:"AGS", d:"M 165 98 L 172 96 L 174 105 L 167 108 Z", client: false },
    // Guanajuato
    { id:"GTO", d:"M 172 96 L 188 98 L 192 112 L 178 118 L 170 108 Z", client: false },
    // Queretaro
    { id:"QRO", d:"M 188 98 L 198 100 L 200 112 L 192 112 Z", client: false },
    // Hidalgo
    { id:"HGO", d:"M 198 100 L 210 100 L 212 112 L 200 112 Z", client: false },
    // Michoacan
    { id:"MICH",d:"M 155 130 L 170 118 L 180 128 L 172 145 L 158 148 Z", client: false },
    // Mexico State
    { id:"MEX", d:"M 192 112 L 210 112 L 212 125 L 198 128 L 190 120 Z", client: false },
    // CDMX — CLIENT
    { id:"CDMX",d:"M 202 120 L 210 118 L 212 125 L 204 127 Z", client: true },
    // Morelos
    { id:"MOR", d:"M 198 128 L 210 128 L 208 138 L 196 136 Z", client: false },
    // Guerrero
    { id:"GRO", d:"M 172 145 L 196 136 L 200 158 L 185 165 L 168 158 Z", client: false },
    // Tlaxcala
    { id:"TLAX",d:"M 210 112 L 218 112 L 218 120 L 210 120 Z", client: false },
    // Puebla
    { id:"PUE", d:"M 210 120 L 228 115 L 232 135 L 218 140 L 208 138 Z", client: false },
    // Veracruz
    { id:"VER", d:"M 210 100 L 240 88 L 248 115 L 232 135 L 228 115 L 218 112 L 212 112 Z", client: false },
    // Oaxaca
    { id:"OAX", d:"M 208 138 L 232 135 L 238 158 L 222 168 L 200 158 L 208 138 Z", client: false },
    // Chiapas
    { id:"CHIS",d:"M 222 168 L 248 158 L 252 178 L 232 185 Z", client: false },
    // Tabasco
    { id:"TAB", d:"M 240 140 L 258 138 L 260 155 L 248 158 Z", client: false },
    // Campeche
    { id:"CAM", d:"M 258 138 L 278 130 L 282 158 L 265 165 L 260 155 Z", client: false },
    // Yucatan
    { id:"YUC", d:"M 278 118 L 308 115 L 310 135 L 285 138 L 278 130 Z", client: false },
    // Quintana Roo
    { id:"QR",  d:"M 308 115 L 320 118 L 318 158 L 305 162 L 285 138 L 310 135 Z", client: false },
  ];

  return (
    <div style={{ position: "relative", maxWidth: "700px", margin: "0 auto" }}>
      <svg viewBox="40 25 295 170" style={{ width: "100%", height: "auto" }}>
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        {states.map((s) => (
          <motion.path key={s.id} d={s.d}
            fill={s.client ? accent : `${accent}12`}
            stroke={s.client ? accent : `${accent}30`}
            strokeWidth={s.client ? 0.8 : 0.5}
            filter={s.client ? "url(#glow)" : undefined}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: s.client ? 0.2 : Math.random() * 0.6 }}
          />
        ))}
        {/* CDMX label */}
        <text x="215" y="116" fill={accent} fontSize="3.5" fontWeight="900" textAnchor="middle" style={{ filter: "url(#glow)" }}>CDMX</text>
        {/* GDL label */}
        <text x="152" y="108" fill={accent} fontSize="3.5" fontWeight="900" textAnchor="middle" style={{ filter: "url(#glow)" }}>GDL</text>
        {/* Pulse rings on client cities */}
        <motion.circle cx="206" cy="122" r="3" fill="none" stroke={accent} strokeWidth="0.8"
          animate={{ r: [3, 8, 3], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.circle cx="153" cy="112" r="3" fill="none" stroke={accent} strokeWidth="0.8"
          animate={{ r: [3, 8, 3], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      </svg>
      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: accent, fontWeight: 700 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: accent }} />
          CDMX
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em", color: accent, fontWeight: 700 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: accent }} />
          Guadalajara
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FAQ ACCORDION ITEM
// ─────────────────────────────────────────────────────────────────────────────
function FaqItem({ q, a, t, last }: { q: string; a: string; t: typeof themes.white; last: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: `1px solid ${t.accent}12`, borderBottom: last ? `1px solid ${t.accent}12` : "none" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.4rem 0", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
        <span style={{ fontSize: "clamp(0.95rem,1.8vw,1.05rem)", fontWeight: 600, color: t.text, lineHeight: 1.4 }}>{q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }}
          style={{ flexShrink: 0, fontSize: "1.4rem", color: t.accent, lineHeight: 1, display: "block" }}>+</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}>
            <p style={{ paddingBottom: "1.4rem", fontSize: "0.9rem", lineHeight: 1.8, color: t.sub, opacity: 0.85 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COUNT UP / DOWN ANIMATION
// ─────────────────────────────────────────────────────────────────────────────
function CountUp({ from, to, duration = 2, suffix = "" }: { from: number; to: number; duration?: number; suffix?: string }) {
  const [val, setVal] = useState(from);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  // Reset if from/to change (language switch)
  useEffect(() => { setVal(from); started.current = false; }, [from, to]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const stepTime = (duration * 1000) / steps;
          let step = 0;
          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(from + (to - from) * eased);
            setVal(current);
            if (step >= steps) { clearInterval(timer); setVal(to); }
          }, stepTime);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [lang, setLang]         = useState<"es" | "en">("es");
  const [showPopup, setShowPopup] = useState(true);
  const [shake, setShake]         = useState(false);
  const [paletteActive, setPaletteActive] = useState(false);
  const [logoThemeIdx, setLogoThemeIdx] = useState(0);
  const introRan = useRef(false);

  // Theme intro runs after lang is chosen
  const runThemeIntro = () => {
    if (introRan.current) return;
    introRan.current = true;

    // One pass through all 5 themes: white→blue→silver→rainbow→gold
    const sequence = [
      [0,   0],   // white
      [1, 600],   // blue
      [2,1200],   // silver
      [3,1800],   // rainbow
      [4,2400],   // gold — final
    ] as const;
    sequence.forEach(([idx, delay]) => {
      setTimeout(() => setThemeIdx(idx), delay);
    });

    // After landing on gold (2.6s), blink the palette button 3 times then stay on
    const blinkStart = 2700;
    const blinkTimes = [blinkStart, blinkStart+300, blinkStart+600];
    blinkTimes.forEach((t, i) => {
      setTimeout(() => setPaletteActive(true), t);
      setTimeout(() => setPaletteActive(false), t + 200);
    });
    // After blinks, keep palette showing next-theme accent color permanently (handled by button style)
  };

  // Button shake every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true);
      setTimeout(() => setShake(false), 2100);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const themeKey     = themeOrder[themeIdx];
  const nextThemeKey = themeOrder[(themeIdx + 1) % themeOrder.length];
  const t            = themes[themeKey];
  const nextAccent   = themes[nextThemeKey].accent;
  const c            = copy[lang];
  const waLink       = lang === "es" ? WHATSAPP_LINK : WHATSAPP_LINK_EN;
  const Icons        = [HandCoins, Zap, Target];

  const shakeStyle: React.CSSProperties = shake ? {
    animation: "btnShake 2s ease",
  } : {};

  return (
    <main style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh", position: "relative", transition: "background-color 0.5s, color 0.5s" }}>
      <style>{`
        @keyframes btnShake {
          0%   { transform: translateX(0) rotate(0deg); }
          8%   { transform: translateX(-6px) rotate(-5deg); }
          16%  { transform: translateX(6px) rotate(5deg); }
          24%  { transform: translateX(-5px) rotate(-4deg); }
          32%  { transform: translateX(5px) rotate(4deg); }
          40%  { transform: translateX(-4px) rotate(-3deg); }
          48%  { transform: translateX(4px) rotate(3deg); }
          56%  { transform: translateX(-3px) rotate(-2deg); }
          64%  { transform: translateX(3px) rotate(2deg); }
          80%  { transform: translateX(-1px) rotate(-1deg); }
          100% { transform: translateX(0) rotate(0deg); }
        }
        html, body {
          overscroll-behavior: none;
          -webkit-overflow-scrolling: touch;
        }
        canvas {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          will-change: transform;
        }
        @media (max-width: 768px) {
          section p:not(.no-scale),
          section span:not(.no-scale),
          section li { font-size: max(1rem, 0.95em) !important; line-height: 1.7 !important; }
          section > div { text-align: center !important; }
          .mobile-left, .mobile-left * { text-align: left !important; }
        }
        /* Apple bubble effect — rounded corners everywhere */
        .bubble { border-radius: 1.5rem !important; }
        .bubble-sm { border-radius: 1rem !important; }
        .bubble-pill { border-radius: 999px !important; }
        nav { border-radius: 0 !important; }
        section { border-radius: 0 !important; }
      `}</style>
      <MatrixBackground color={t.matrixColor} />
      <CursorGlow accent={t.accent} />

      <AnimatePresence>
        {showPopup && <LangPopup t={t} onSelect={l => { setLang(l); setShowPopup(false); runThemeIntro(); }} />}
      </AnimatePresence>

      {/* ── FLOATING BUTTONS ── */}
      <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "6rem", right: "1.5rem", zIndex: 100, display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", borderRadius: 999, backgroundColor: "#25D366", color: "#000", fontWeight: 900, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 8px 30px rgba(37,211,102,0.4)", textDecoration: "none", ...shakeStyle }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="hidden md:inline">WhatsApp</span>
      </a>

      <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" style={{ position: "fixed", bottom: "1.5rem", right: "1.5rem", zIndex: 100, display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem 1rem", borderRadius: 999, backgroundColor: t.accent, color: t.bg, fontWeight: 900, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 8px 30px rgba(0,0,0,0.25)", textDecoration: "none", ...shakeStyle }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
        <span className="hidden md:inline">{c.btn_zoom}</span>
      </a>

      <button onClick={() => setThemeIdx(i => (i + 1) % themeOrder.length)}
        style={{ position: "fixed", bottom: "10.5rem", right: "1.5rem", zIndex: 100, padding: "0.75rem", borderRadius: 999,
          backgroundColor: themes[nextThemeKey].accent,
          color: themes[nextThemeKey].bg,
          border: "none", cursor: "pointer",
          boxShadow: `0 4px 20px ${themes[nextThemeKey].accent}60`,
          transition: "background-color 0.5s, color 0.5s, box-shadow 0.5s" }}>
        <Palette size={18} />
      </button>

      {/* ── NAV ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(14px)", backgroundColor: t.navBg, borderBottom: `1px solid ${t.accent}12`, padding: "0.9rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#inicio"><Image src="/logo-satori.png" alt="SATORI" width={110} height={34} style={{ filter: t.logoFilter }} /></a>
        <div className="hidden md:flex items-center" style={{ gap: "1.75rem" }}>
          {([["#problema", c.nav.problema], ["#servicios", c.nav.soluciones], ["#precios", lang === "es" ? "Precios" : "Pricing"], ["#cotizar", c.nav.precios]] as [string,string][]).map(([href, label]) => (
            <motion.a key={href} href={href} whileHover={{ y: -1 }} style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.sub, textDecoration: "none" }}>{label}</motion.a>
          ))}
          <a href={CALENDLY_LINK} target="_blank" style={{ padding: "0.45rem 1.3rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, fontSize: "0.68rem", textTransform: "uppercase", textDecoration: "none", borderRadius: "999px" }}>{c.nav.cta}</a>
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
              <motion.a href={CALENDLY_LINK} target="_blank" whileHover={{ scale: 1.04, y: -2 }} style={{ padding: "1rem 2.2rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.05em", textDecoration: "none", borderRadius: "999px" }}>{c.cta1}</motion.a>
              <motion.a href="#servicios" whileHover={{ scale: 1.04, y: -2 }} style={{ padding: "1rem 2.2rem", border: `1px solid ${t.accent}`, color: t.accent, fontWeight: 700, textTransform: "uppercase", fontSize: "0.75rem", textDecoration: "none", borderRadius: "999px" }}>{c.cta2}</motion.a>
            </div>
          </motion.div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <SpinningEnso filter={t.logoFilter} opacity={0.82} />
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section id="problema" style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1, overflow: "hidden", backgroundColor: `${t.card}CC`, backdropFilter: "blur(2px)" }}>
        {/* Large faded number in background */}
        <div style={{ position: "absolute", right: "-2rem", top: "50%", transform: "translateY(-50%)", fontSize: "clamp(12rem,25vw,22rem)", fontFamily: "serif", fontWeight: 900, color: t.accent, opacity: 0.03, lineHeight: 1, pointerEvents: "none", userSelect: "none" }}>?</div>

        <div style={{ maxWidth: "60rem", margin: "0 auto", position: "relative" }}>
          {/* Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.35em", color: t.accent, fontWeight: 900, marginBottom: "1rem" }}>El problema</p>
            <h2 style={{ fontSize: "clamp(1.8rem,5.5vw,5rem)", fontFamily: "serif", lineHeight: 1.0, marginBottom: "3.5rem" }}>{c.problema_h}</h2>
          </motion.div>

          {/* Problems as numbered list — full width, stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {c.problemas.map(({ q, desc }, i) => {
              const Icon = Icons[i];
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                  className="mobile-left"
                  style={{ display: "grid", gridTemplateColumns: "3rem 1fr auto", gap: "1.5rem", alignItems: "start", padding: "1.5rem", borderRadius: "1.25rem", marginBottom: "0.75rem", backgroundColor: `${t.accent}05` }}>
                  {/* Number */}
                  <div style={{ fontSize: "clamp(2rem,4vw,3rem)", fontFamily: "serif", fontWeight: 700, color: t.accent, opacity: 0.25, lineHeight: 1, paddingTop: "0.1rem" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* Text */}
                  <div>
                    <p style={{ fontSize: "clamp(1.1rem,2.5vw,1.4rem)", fontWeight: 700, lineHeight: 1.3, marginBottom: "0.7rem" }}>{q}</p>
                    <p style={{ fontSize: "1rem", opacity: 0.75, lineHeight: 1.75, color: t.text, maxWidth: "36rem" }}>{desc}</p>
                  </div>
                  {/* Icon — animated */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                    style={{ paddingTop: "0.2rem" }}>
                    <Icon size={22} style={{ color: nextAccent, opacity: 0.7 }} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
            style={{ marginTop: "3rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
            <a href={waLink} target="_blank"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: t.bg, fontSize: "0.72rem", textDecoration: "none", backgroundColor: t.accent, padding: "0.85rem 2rem", borderRadius: "999px" }}>
              {c.problema_cta}
            </a>
            <span style={{ fontSize: "0.88rem", fontWeight: 800, color: t.accent, opacity: 0.85 }}>— es gratis, sin compromiso</span>
          </motion.div>
        </div>
      </section>

      {/* ── STATS with CountUp ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1, backgroundColor: t.card, borderTop: `1px solid ${t.accent}08` }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(1rem,4vw,3rem)" }}>
            {[
              { label: c.stats[0].label, from: 1,   to: 24,  suffix: "/7",  desc: lang === "es" ? "Siempre disponible" : "Always available" },
              { label: c.stats[1].label, from: 100, to: 0,   suffix: "",    desc: "" },
              { label: c.stats[2].label, from: 90,  to: 30,  suffix: "",    desc: lang === "es" ? "días" : "days" },
            ].map(({ label, from, to, suffix, desc }, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                style={{ textAlign: "center", padding: "2.5rem 1rem", cursor: "default" }}>
                <p style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.25em", color: t.sub, marginBottom: "1rem", lineHeight: 1.6 }}>{label}</p>
                <p style={{ fontSize: "clamp(3rem,6vw,5rem)", fontFamily: "serif", fontWeight: 700, color: t.accent, lineHeight: 1, marginBottom: "0.5rem" }}>
                  <CountUp from={from} to={to} duration={2.2} suffix={suffix} />
                </p>
                <p style={{ fontSize: "0.65rem", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.15em", color: t.sub }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" style={{ backgroundColor: t.card, position: "relative", zIndex: 1 }}>
        {/* Header — all elements on same horizontal level */}
        <div style={{ padding: "4rem clamp(1.5rem,5vw,4rem) 1.5rem", maxWidth: "72rem", margin: "0 auto" }}>
          {/* Typewriter label */}
          <Typewriter
            text={c.camino_label}
            style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.35em", color: t.accent, fontWeight: 900, display: "block", whiteSpace: "nowrap", marginBottom: "0.75rem" }}
          />

          {/* Big title — centered */}
          <h2 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontFamily: "serif", fontWeight: 700, lineHeight: 1.0, marginBottom: "1rem", textAlign: "center" }}>{c.camino_h}</h2>

          {/* Sub — below title, centered, single line */}
          <p style={{ fontSize: "0.88rem", opacity: 0.5, lineHeight: 1.4, color: t.sub, marginBottom: "2.5rem", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.camino_sub}</p>
        </div>
        <ServicesBento t={t} c={c} />
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
              <div style={{ padding: "1.25rem", border: `1px solid ${t.accent}20`, backgroundColor: `${t.accent}05`, borderRadius: "1.25rem" }}>
                <p style={{ fontWeight: 700, fontSize: "0.78rem", color: t.accent, marginBottom: "0.4rem" }}>{c.garantia_title}</p>
                <p style={{ fontSize: "0.8rem", opacity: 0.68, lineHeight: 1.7 }}>{c.garantia_text}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <motion.a href={CALENDLY_LINK} target="_blank" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} whileHover={{ scale: 1.1 }} style={{ padding: "0.85rem 1.75rem", backgroundColor: t.accent, color: t.bg, fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", borderRadius: "999px", display: "inline-block" }}>{c.btn_zoom}</motion.a>
              <motion.a href={`mailto:${EMAIL}`} animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }} whileHover={{ scale: 1.08 }} style={{ padding: "0.85rem 1.75rem", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", borderRadius: "999px", border: `1px solid ${t.accent}40`, color: t.text, display: "inline-block", opacity: 0.75 }}>{c.btn_email}</motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section style={{ padding: "5rem 1.5rem", backgroundColor: t.card, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.4em", color: t.accent, fontWeight: 900, marginBottom: "0.5rem" }}>{c.reviews_label}</p>
            <h2 style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)", fontFamily: "serif", fontWeight: 700 }}>{c.reviews_h}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {c.reviews.slice(0,3).map((r, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: "1.75rem", backgroundColor: t.bg, border: `1px solid ${t.accent}10`, borderRadius: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                {/* Stars — supports half stars */}
                <div style={{ display: "flex", gap: "0.15rem", alignItems: "center" }}>
                  {[1,2,3,4,5].map((s) => (
                    <span key={s} style={{ color: s <= Math.floor(r.stars) ? "#F59E0B" : s - 0.5 === r.stars ? "#F59E0B" : "#D1D5DB", fontSize: "0.85rem" }}>
                      {s - 0.5 === r.stars ? "⯨" : "★"}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.75, color: t.text, opacity: 0.8, fontStyle: "italic" }}>"{r.text}"</p>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.82rem", color: t.text }}>{r.name}</p>
                  <p style={{ fontSize: "0.72rem", color: t.sub, opacity: 0.7 }}>{r.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAPA ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "62rem", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.4em", color: t.accent, fontWeight: 900, marginBottom: "0.5rem" }}>{lang === "es" ? "Presencia nacional" : "National presence"}</p>
          <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontFamily: "serif", fontWeight: 700, marginBottom: "0.75rem" }}>{lang === "es" ? "Clientes en todo México." : "Clients across Mexico."}</h2>
          <p style={{ fontSize: "0.88rem", opacity: 0.5, marginBottom: "3rem", color: t.sub }}>{lang === "es" ? "Y creciendo." : "And growing."}</p>
          <MexicoMap accent={t.accent} bg={t.bg} card={t.card} />
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1, backgroundColor: `${t.card}E8` }}>
        <div style={{ maxWidth: "52rem", margin: "0 auto" }}>
          <div style={{ marginBottom: "3rem", textAlign: "center" }}>
            <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.4em", color: t.accent, fontWeight: 900, marginBottom: "0.5rem" }}>{c.faq_label}</p>
            <h2 style={{ fontSize: "clamp(2.4rem,4.5vw,3.8rem)", fontFamily: "serif", fontWeight: 700 }}>{c.faq_h}</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {c.faqs.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} t={t} last={i === c.faqs.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" style={{ padding: "5rem 1.5rem", backgroundColor: t.card, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "62rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.4em", color: t.accent, fontWeight: 900, marginBottom: "0.5rem" }}>{lang === "es" ? "Paquetes de inicio" : "Starter packages"}</p>
            <h2 style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontFamily: "serif", fontWeight: 700 }}>{lang === "es" ? "Precios claros." : "Clear pricing."}<br/><span style={{ fontStyle: "italic", fontWeight: 400 }}>{lang === "es" ? "Sin sorpresas." : "No surprises."}</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                name: lang === "es" ? "Landing Page" : "Landing Page",
                price: "$8,000",
                badge: lang === "es" ? "Ideal para empezar" : "Great starting point",
                features: lang === "es"
                  ? ["1 página de ventas optimizada", "Copywriting estratégico incluido", "Formulario + integración WhatsApp", "Entrega en 7 días hábiles", "Dominio y hosting no incluidos"]
                  : ["1 optimized sales page", "Strategic copywriting included", "Form + WhatsApp integration", "Delivery in 7 business days", "Domain & hosting not included"],
                popular: false,
              },
              {
                name: lang === "es" ? "Página Web Profesional" : "Professional Website",
                price: "$15,000",
                badge: lang === "es" ? "El más elegido" : "Most popular",
                features: lang === "es"
                  ? ["Hasta 5 secciones personalizadas", "Diseño a medida de tu marca", "SEO básico + velocidad optimizada", "Integración WhatsApp + redes", "Entrega en 10–14 días hábiles"]
                  : ["Up to 5 custom sections", "Brand-tailored design", "Basic SEO + speed optimization", "WhatsApp + social integration", "Delivery in 10–14 business days"],
                popular: true,
              },
              {
                name: lang === "es" ? "Web + Agente IA" : "Web + AI Agent",
                price: "$22,000",
                badge: lang === "es" ? "Máximo impacto" : "Maximum impact",
                features: lang === "es"
                  ? ["Todo lo de Página Web Pro", "Agente IA entrenado con tu negocio", "Integración WhatsApp Business", "Responde 24/7 sin intervención", "Setup + primer mes de soporte"]
                  : ["Everything in Pro Website", "AI agent trained on your business", "WhatsApp Business integration", "Responds 24/7 automatically", "Setup + first month support"],
                popular: false,
              },
            ].map((plan, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: `0 20px 60px ${t.accent}25` }}
                style={{ padding: "2rem", backgroundColor: plan.popular ? t.accent : t.bg, color: plan.popular ? t.bg : t.text, borderRadius: "1.5rem", border: `1px solid ${plan.popular ? "transparent" : t.accent + "15"}`, position: "relative", boxShadow: plan.popular ? `0 12px 40px ${t.accent}40` : "0 4px 20px rgba(0,0,0,0.06)", transition: "box-shadow 0.3s" }}>
                {plan.popular && (
                  <div style={{ position: "absolute", top: "-0.75rem", left: "50%", transform: "translateX(-50%)", backgroundColor: t.bg, color: t.accent, fontSize: "0.55rem", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.15em", padding: "0.3rem 1rem", borderRadius: "999px", whiteSpace: "nowrap" }}>
                    ★ {plan.badge}
                  </div>
                )}
                {!plan.popular && (
                  <p style={{ fontSize: "0.55rem", textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.6, marginBottom: "0.5rem", fontWeight: 700 }}>{plan.badge}</p>
                )}
                <h3 style={{ fontSize: "1.3rem", fontFamily: "serif", fontWeight: 700, marginBottom: "0.5rem", lineHeight: 1.2 }}>{plan.name}</h3>
                <p style={{ fontSize: "2.5rem", fontFamily: "serif", fontWeight: 700, marginBottom: "0.25rem", lineHeight: 1 }}>{plan.price}</p>
                <p style={{ fontSize: "0.62rem", opacity: 0.5, marginBottom: "1.5rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>MXN · pago único</p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.75rem" }}>
                  {plan.features.map((f, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem", fontSize: "0.82rem", lineHeight: 1.5, opacity: 0.85 }}>
                      <span style={{ color: plan.popular ? t.bg : t.accent, flexShrink: 0, marginTop: "0.1rem" }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <motion.a href={waLink} target="_blank"
                  animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                  style={{ display: "block", textAlign: "center", padding: "0.85rem", borderRadius: "999px", backgroundColor: plan.popular ? t.bg : t.accent, color: plan.popular ? t.accent : t.bg, fontWeight: 900, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.1em", textDecoration: "none" }}>
                  {lang === "es" ? "Quiero este →" : "I want this →"}
                </motion.a>
              </motion.div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem", fontSize: "0.72rem", opacity: 0.4, color: t.sub }}>{lang === "es" ? "* Los precios no incluyen hosting ni dominio. Consulta opciones de pago." : "* Prices do not include hosting or domain. Payment plans available."}</p>
        </div>
      </section>

      {/* ── COTIZAR ── */}
      <section id="cotizar" style={{ padding: "5rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "38rem", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2.6rem,5vw,4rem)", fontFamily: "serif", fontWeight: 700, marginBottom: "1rem", lineHeight: 1.05 }}>{c.cotizar_h}</h2>
          <p style={{ fontSize: "0.95rem", opacity: 0.62, lineHeight: 1.8, marginBottom: "2rem", color: t.sub }}>{c.cotizar_sub}</p>
          <motion.a href={waLink} target="_blank"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            style={{ display: "inline-block", padding: "1rem 2.5rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.08em", textDecoration: "none", borderRadius: "999px", boxShadow: `0 8px 32px ${t.accent}50` }}>
            {c.cotizar_cta}
          </motion.a>
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