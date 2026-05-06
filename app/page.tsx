"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HandCoins, Palette, Zap, Target, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK    = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const WHATSAPP_LINK_EN = "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
const CALENDLY_LINK    = "https://calendly.com/rodrigo-tristaan";
const EMAIL            = "r.tristaan@outlook.com";

const themes = {
  white:   { bg: "#FFFFFF", accent: "#111111", text: "#111111", sub: "#666666", card: "#F4F4F4", matrixColor: "#aaaaaa", navBg: "rgba(255,255,255,0.93)", logoFilter: "brightness(0)",         ensoFilter: "brightness(0) opacity(0.08)"       },
  blue:    { bg: "#020B18", accent: "#00D4FF", text: "#E0F0FF", sub: "#4A7FA5", card: "#041428", matrixColor: "#00D4FF", navBg: "rgba(2,11,24,0.93)",     logoFilter: "invert(1)",              ensoFilter: "invert(1) brightness(2) opacity(0.07)"  },
  silver:  { bg: "#0A0A0A", accent: "#E5E5E5", text: "#FFFFFF", sub: "#A3A3A3", card: "#171717", matrixColor: "#888888", navBg: "rgba(10,10,10,0.93)",    logoFilter: "invert(1)",              ensoFilter: "invert(1) brightness(2) opacity(0.07)"  },
  rainbow: { bg: "#0F0218", accent: "#FF00CC", text: "#FFFFFF", sub: "#A855F7", card: "#1E0B36", matrixColor: "#FF00CC", navBg: "rgba(15,2,24,0.93)",     logoFilter: "invert(1)",              ensoFilter: "invert(1) brightness(2) opacity(0.07)"  },
  gold:    { bg: "#FFFFF8", accent: "#B8860B", text: "#1a1000", sub: "#8B6914", card: "#FDF8E1", matrixColor: "#D4AF37", navBg: "rgba(255,255,248,0.93)", logoFilter: "brightness(0) sepia(1)", ensoFilter: "brightness(0) sepia(1) opacity(0.08)"   },
};

const copy = {
  es: {
    nav: { problema: "El Problema", soluciones: "Servicios", precios: "Cotizar", cta: "Agendar Zoom" },
    badge: "Tu negocio local + Inteligencia Artificial",
    h1a: "Más clientes.",
    h1b: "Menos caos.",
    hero_sub: "Sabemos lo que es atender el negocio, contestar mensajes, publicar en redes y encima intentar crecer. Satori automatiza lo repetitivo para que tú te enfoques en lo que importa: vender.",
    cta1: "Quiero mi Auditoría Gratis",
    cta2: "Ver Cómo Funciona",
    problema_h: "¿Te suena alguno de estos?",
    problemas: [
      { q: '"Pago anuncios y no me llega el cliente correcto."', desc: "Tu dinero en ads se va sin convertir porque no tienes un sistema que filtre y nutra prospectos." },
      { q: '"Se me van clientes por no contestar rápido."', desc: "El 78% de las ventas se las lleva quien responde primero. Sin automatización, pierdes sin saberlo." },
      { q: '"Mis redes están muertas y la competencia me gana."', desc: "No tienes tiempo para crear contenido consistente. Y la consistencia es lo que genera confianza — y ventas." },
    ],
    problema_cta: "Identifiqué mi problema — quiero la solución →",
    stats: [
      { label: "Tu negocio siempre abierto", n: "24/7" },
      { label: "Prospectos perdidos",          n: "0"    },
      { label: "Días para ver resultados",     n: "30"   },
    ],
    camino_label: "El camino al crecimiento",
    camino_h: "El camino al crecimiento",
    camino_sub: "Cada paquete construye sobre el anterior. Empieza donde estás — llega a donde quieres.",
    ver_mas: "Ver detalle",
    volver: "← Volver",
    paquete: "Paquete",
    servicios: [
      {
        num: 1, tag: "Redes",
        t: "Presencia Digital",
        sub: "Redes Sociales + Contenido",
        d: "Tus redes publicando con estrategia real todos los días.",
        back: "Posts, reels y stories diseñados para posicionarte como el experto de tu industria. Incluye estrategia mensual, diseño, copywriting con IA y reporte de métricas.",
        i: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&fm=jpg",
      },
      {
        num: 2, tag: "Página Web",
        t: "Tu Página Web",
        sub: "Sitio Web o Landing Page",
        d: "Tu vitrina digital que convierte visitas en clientes.",
        back: "Diseño profesional, copywriting estratégico, optimización móvil y entrega en 7–10 días. La base que todo negocio serio necesita en internet.",
        i: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&fm=jpg",
      },
      {
        num: 3, tag: "Social Ads",
        t: "Clientes con Ads",
        sub: "Campañas Meta + Google",
        d: "Anuncios que llevan el cliente correcto directo a tu puerta.",
        back: "Setup de campaña, segmentación avanzada, creativos publicitarios, optimización semanal y reporte mensual. Ideal para escalar cuando ya tienes presencia.",
        i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=jpg",
      },
      {
        num: 4, tag: "AI Bot",
        t: "Vendedor 24/7",
        sub: "Agente IA · WhatsApp + Instagram",
        d: "Un agente de IA que cotiza, agenda y cierra mientras duermes.",
        back: "Entrenado con la voz de tu negocio. Integrado a WhatsApp Business e Instagram DM. Responde, califica prospectos y agenda citas — sin que tú levantes el teléfono.",
        i: null,
      },
      {
        num: 5, tag: "¿Satori?",
        t: "Sociedad Satori",
        sub: "Todo lo anterior + Estrategia y Branding",
        d: "Para dominar tu mercado. No un proveedor — un socio.",
        back: "Todos los servicios anteriores + identidad de marca, sesión mensual de estrategia, consultoría prioritaria y acceso anticipado a nuevas herramientas de IA. Tu equipo digital completo.",
        i: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&fm=jpg",
      },
    ],
    cotizar_h: "¿Listo para crecer?",
    cotizar_sub: "Cuéntanos dónde está tu negocio hoy y te armamos una propuesta a tu medida.",
    cotizar_cta: "Quiero mi cotización",
    nosotros_label: "Tu Socio Digital",
    nosotros_nombre: "Rodrigo Tristán",
    nosotros_cargo: "Fundador de SATORI",
    nosotros_quote: '"La IA no reemplaza tu negocio. Lo potencia."',
    nosotros_p1: "Mi misión es poner la tecnología al alcance de cada emprendedor y empresario mexicano. Porque el crecimiento digital no debería ser privilegio de unos pocos — es una herramienta que merece estar en manos de quien trabaja todos los días para construir algo.",
    nosotros_p2: "En Satori nos mantenemos a la vanguardia — por ti y para ti. Para que tú te dediques a lo tuyo, y nosotros hagamos que tu negocio trabaje incluso cuando tú no puedes.",
    garantia_title: "Garantía de 30 días:",
    garantia_text: "Si en 30 días no sientes que el valor recibido supera con creces lo que invertiste, seguimos trabajando contigo 20 días más sin costo adicional. Sin preguntas, sin drama.",
    btn_zoom: "Agendar Zoom",
    btn_email: "Enviar Email",
    footer: "© 2026 SATORI · Soluciones Digitales con IA · San Luis Potosí, MX",
  },
  en: {
    nav: { problema: "The Problem", soluciones: "Services", precios: "Pricing", cta: "Book a Zoom" },
    badge: "Your Local Business + Artificial Intelligence",
    h1a: "More clients.",
    h1b: "Less chaos.",
    hero_sub: "We know what it's like to run a business, answer messages, post on social media, and still try to grow. Satori automates the repetitive stuff so you can focus on what matters: selling.",
    cta1: "Get My Free Audit",
    cta2: "See How It Works",
    problema_h: "Do any of these sound familiar?",
    problemas: [
      { q: '"I pay for ads but the wrong people show up."', desc: "Your ad spend leaks because there's no system to filter and nurture leads." },
      { q: '"I lose customers because I can\'t reply fast enough."', desc: "78% of sales go to whoever responds first. Without automation, you're losing deals you don't even know about." },
      { q: '"My social media is dead and my competitors are winning."', desc: "You don't have time for consistent content. But consistency builds trust — and trust drives sales." },
    ],
    problema_cta: "I found my problem — show me the fix →",
    stats: [
      { label: "Your business always open", n: "24/7" },
      { label: "Leads lost",                 n: "0"    },
      { label: "Days to see results",         n: "30"   },
    ],
    camino_label: "The path to growth",
    camino_h: "The path to growth",
    camino_sub: "Each package builds on the previous one. Start where you are — grow from there.",
    ver_mas: "See details",
    volver: "← Back",
    paquete: "Package",
    servicios: [
      { num: 1, tag: "Social", t: "Digital Presence", sub: "Social Media + Content", d: "Your social media posting strategically every single day.", back: "Posts, reels, and stories designed to position you as the go-to expert. Includes monthly strategy, design, AI copywriting, and metrics report.", i: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80&fm=jpg" },
      { num: 2, tag: "Website", t: "Your Website", sub: "Website or Landing Page", d: "Your digital storefront that turns visitors into clients.", back: "Professional design, strategic copywriting, mobile optimization, delivery in 7–10 days. The foundation every serious business needs online.", i: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&fm=jpg" },
      { num: 3, tag: "Social Ads", t: "Clients with Ads", sub: "Meta + Google Campaigns", d: "Ads that bring the right client straight to your door.", back: "Campaign setup, advanced targeting, ad creatives, weekly optimization, monthly results report. Best when you already have a presence.", i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=jpg" },
      { num: 4, tag: "AI Bot", t: "24/7 Salesperson", sub: "AI Agent · WhatsApp + Instagram", d: "An AI agent that quotes, books, and closes while you sleep.", back: "Trained with your brand voice. Integrated into WhatsApp Business and Instagram DM. Responds, qualifies leads, and books appointments automatically.", i: null },
      { num: 5, tag: "Satori?", t: "Satori Society", sub: "Everything + Strategy & Branding", d: "To dominate your local market. Not a vendor — a partner.", back: "All previous services + brand identity, monthly strategy session, priority consulting, and early access to new AI tools.", i: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80&fm=jpg" },
    ],
    cotizar_h: "Ready to grow?",
    cotizar_sub: "Tell us where your business is today and we'll build a proposal tailored to you.",
    cotizar_cta: "Get my quote",
    nosotros_label: "Your Digital Partner",
    nosotros_nombre: "Rodrigo Tristán",
    nosotros_cargo: "Founder of SATORI",
    nosotros_quote: '"AI doesn\'t replace your business. It supercharges it."',
    nosotros_p1: "My mission is to put cutting-edge technology within reach of every entrepreneur and small business owner. Digital growth shouldn't be a privilege — it's a tool that belongs in the hands of those who build something every day.",
    nosotros_p2: "At Satori, we stay at the forefront — for you and because of you. So you focus on what you do best, and we make sure your business keeps working even when you can't.",
    garantia_title: "30-Day Guarantee:",
    garantia_text: "If within 30 days you don't feel the value far exceeds what you invested, we keep working with you for 20 more days at no additional cost. No questions, no drama.",
    btn_zoom: "Book a Zoom",
    btn_email: "Send Email",
    footer: "© 2026 SATORI · AI-Powered Digital Solutions · San Luis Potosí, MX",
  },
};

// ── Matrix ────────────────────────────────────────────────────────────────────
function MatrixBackground({ color }: { color: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef(color);
  useEffect(() => { colorRef.current = color; }, [color]);
  useEffect(() => {
    const canvas = ref.current!; const ctx = canvas.getContext("2d")!; let id: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 20); const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.04)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        ctx.fillStyle = Math.random() > 0.93 ? colorRef.current : colorRef.current + "44";
        ctx.fillText(Math.random() < 0.5 ? "1" : "0", i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0; drops[i]++;
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.12, pointerEvents: "none", zIndex: 0 }} />;
}

// ── Lang Popup ────────────────────────────────────────────────────────────────
function LangPopup({ onSelect, t }: { onSelect: (l: "es" | "en") => void; t: typeof themes.white }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}>
      <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
        className="p-10 max-w-sm w-full mx-6 text-center"
        style={{ backgroundColor: t.card, color: t.text, border: `1px solid ${t.accent}20` }}>
        <Image src="/logo-satori.png" alt="SATORI" width={100} height={30} className="mx-auto mb-6" style={{ filter: t.logoFilter }} />
        <h2 className="text-2xl font-serif font-bold mb-2">¿Cómo prefieres continuar?</h2>
        <p className="text-xs opacity-40 mb-8">You can change this anytime</p>
        <div className="flex flex-col gap-3">
          <button onClick={() => onSelect("es")} className="w-full py-4 font-black text-sm uppercase transition-all hover:opacity-80" style={{ backgroundColor: t.accent, color: t.bg }}>🇲🇽 Español</button>
          <button onClick={() => onSelect("en")} className="w-full py-4 font-black text-sm uppercase border transition-all hover:opacity-80" style={{ borderColor: `${t.accent}30`, color: t.text }}>🇺🇸 English</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── AI Workflow ───────────────────────────────────────────────────────────────
function AIWorkflow({ accent, card }: { accent: string; card: string }) {
  const steps = ["📩 Mensaje entrante", "🤖 IA analiza intención", "💬 Respuesta en segundos", "📅 Cita agendada automáticamente", "✅ Prospecto convertido"];
  return (
    <div className="w-full flex flex-col justify-center px-4 py-4 gap-1.5" style={{ height: 180, backgroundColor: card }}>
      {steps.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}
          className="flex items-center gap-2 text-[11px] font-mono px-3 py-1.5 rounded-sm"
          style={{ backgroundColor: `${accent}12`, color: accent, border: `1px solid ${accent}22` }}>
          <span className="opacity-30 text-[9px] w-4 shrink-0">{i + 1}.</span>
          {s}
          {i < 4 && <span className="ml-auto opacity-25 text-[10px]">↓</span>}
        </motion.div>
      ))}
    </div>
  );
}

// ── Service Flip Card ─────────────────────────────────────────────────────────
function ServiceCard({ s, t, c }: { s: typeof copy.es.servicios[0]; t: typeof themes.white; c: typeof copy.es }) {
  const [flipped, setFlipped] = useState(false);
  useEffect(() => { setFlipped(false); }, [s.num]);

  return (
    <div style={{ width: "100%", height: 460, perspective: "1200px", cursor: "pointer" }} onClick={() => setFlipped(f => !f)}>
      <div style={{
        width: "100%", height: "100%", position: "relative",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 0.5s cubic-bezier(0.4,0.2,0.2,1)",
      }}>
        {/* FRONT */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", backgroundColor: t.bg, border: `1px solid ${t.accent}15`, overflow: "hidden" }}>
          <div style={{ height: 180, overflow: "hidden", flexShrink: 0 }}>
            {s.i
              ? <img src={s.i} alt={s.t} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
              : <AIWorkflow accent={t.accent} card={t.card} />
            }
          </div>
          <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", height: "calc(100% - 180px)", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.15em", color: t.accent, fontWeight: 800, marginBottom: "0.4rem", opacity: 0.7 }}>{s.sub}</p>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, lineHeight: 1.25, marginBottom: "0.6rem", color: t.text }}>{s.t}</h3>
              <p style={{ fontSize: "0.78rem", lineHeight: 1.6, color: t.sub }}>{s.d}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: t.accent, marginTop: "0.75rem" }}>
              {c.ver_mas} <span style={{ fontSize: "0.8rem" }}>↗</span>
            </div>
          </div>
        </div>
        {/* BACK */}
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)", backgroundColor: t.accent, color: t.bg, padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontSize: "0.6rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1rem", opacity: 0.6 }}>{c.paquete} {s.num} · {s.sub}</p>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 700, lineHeight: 1.2, marginBottom: "1rem" }}>{s.t}</h3>
          <p style={{ fontSize: "0.85rem", lineHeight: 1.75, opacity: 0.9 }}>{s.back}</p>
          <div style={{ marginTop: "auto", paddingTop: "1.5rem", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", opacity: 0.5 }}>{c.volver}</div>
        </div>
      </div>
    </div>
  );
}

// ── Swiper ────────────────────────────────────────────────────────────────────
function ServicesSwiper({ t, c }: { t: typeof themes.white; c: typeof copy.es }) {
  const [active, setActive] = useState(0);
  const total = c.servicios.length;
  const startX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goTo = (i: number) => setActive((i + total) % total);
  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    isDragging.current = false;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (startX.current !== null && Math.abs(e.clientX - startX.current) > 5) isDragging.current = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 50 && isDragging.current) diff > 0 ? next() : prev();
    startX.current = null; isDragging.current = false;
  };

  return (
    <div>
      {/* Package pills */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {c.servicios.map((s, i) => (
          <button key={i} onClick={() => goTo(i)}
            className="px-4 py-2 text-xs font-black uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: active === i ? t.accent : "transparent",
              color: active === i ? t.bg : t.sub,
              border: `1.5px solid ${active === i ? t.accent : t.accent + "35"}`,
              transform: active === i ? "scale(1.05)" : "scale(1)",
            }}>
            {s.num}. {s.tag}
          </button>
        ))}
      </div>

      {/* Cards container */}
      <div
        style={{ position: "relative", userSelect: "none", touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}>

        {/* Enso background */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, scale: 0.85, rotate: -15 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.1, rotate: 15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
            <img src="/enso-negro.png" alt="" style={{ width: "70%", maxWidth: 380, filter: t.ensoFilter, transform: "scale(1.1)" }} />
          </motion.div>
        </AnimatePresence>

        {/* 3-card layout */}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", padding: "1rem 0", minHeight: 480, position: "relative", zIndex: 1 }}>
          {/* Prev */}
          <motion.div
            key={`prev-${active}`}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 0.3, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35 }}
            onClick={prev}
            style={{ width: "clamp(100px, 18vw, 160px)", flexShrink: 0, cursor: "pointer", filter: "blur(1px)", transform: "scale(0.88)" }}>
            <ServiceCard s={c.servicios[(active - 1 + total) % total]} t={t} c={c} />
          </motion.div>

          {/* Active */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`active-${active}`}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{ width: "clamp(280px, 42vw, 420px)", flexShrink: 0, zIndex: 2 }}>
              <ServiceCard s={c.servicios[active]} t={t} c={c} />
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <motion.div
            key={`next-${active}`}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 0.3, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.35 }}
            onClick={next}
            style={{ width: "clamp(100px, 18vw, 160px)", flexShrink: 0, cursor: "pointer", filter: "blur(1px)", transform: "scale(0.88)" }}>
            <ServiceCard s={c.servicios[(active + 1) % total]} t={t} c={c} />
          </motion.div>
        </div>
      </div>

      {/* Arrow nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "1.5rem" }}>
        <button onClick={prev} style={{ padding: "0.75rem", border: `1px solid ${t.accent}35`, color: t.accent, background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${t.accent}15`)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
          <ChevronLeft size={22} />
        </button>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {c.servicios.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: active === i ? 24 : 8, height: 8, borderRadius: active === i ? 4 : "50%", backgroundColor: active === i ? t.accent : `${t.accent}35`, border: "none", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
        <button onClick={next} style={{ padding: "0.75rem", border: `1px solid ${t.accent}35`, color: t.accent, background: "transparent", cursor: "pointer", transition: "all 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = `${t.accent}15`)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}>
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme]       = useState<keyof typeof themes>("white");
  const [lang, setLang]         = useState<"es" | "en">("es");
  const [showPopup, setShowPopup] = useState(true);
  const t = themes[theme];
  const c = copy[lang];
  const waLink = lang === "es" ? WHATSAPP_LINK : WHATSAPP_LINK_EN;

  const cycleTheme = () => {
    const keys = Object.keys(themes) as (keyof typeof themes)[];
    setTheme(keys[(keys.indexOf(theme) + 1) % keys.length]);
  };

  return (
    <main style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh", position: "relative", transition: "background-color 0.5s ease, color 0.5s ease" }}>
      <MatrixBackground color={t.matrixColor} />

      <AnimatePresence>
        {showPopup && <LangPopup t={t} onSelect={l => { setLang(l); setShowPopup(false); }} />}
      </AnimatePresence>

      {/* Floating: WhatsApp */}
      <a href={waLink} target="_blank" rel="noopener noreferrer"
        className="fixed z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-black text-xs uppercase"
        style={{ bottom: "6rem", right: "1.5rem", backgroundColor: "#25D366", color: "#000", transition: "transform 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden md:inline">WhatsApp</span>
      </a>

      {/* Floating: Zoom */}
      <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer"
        className="fixed z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl font-black text-xs uppercase"
        style={{ bottom: "1.5rem", right: "1.5rem", backgroundColor: t.accent, color: t.bg, transition: "transform 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
        <span className="hidden md:inline">{c.btn_zoom}</span>
      </a>

      {/* Floating: Theme */}
      <button onClick={cycleTheme}
        className="fixed z-[100] p-3 rounded-full shadow-xl"
        style={{ bottom: "10.5rem", right: "1.5rem", backgroundColor: t.card, color: t.accent, border: `1px solid ${t.accent}35`, transition: "transform 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <Palette size={18} />
      </button>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(14px)", backgroundColor: t.navBg, borderBottom: `1px solid ${t.accent}12`, padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="#inicio">
          <Image src="/logo-satori.png" alt="SATORI" width={120} height={36} style={{ filter: t.logoFilter }} />
        </a>
        <div className="hidden md:flex items-center gap-6">
          {[["#problema", c.nav.problema], ["#servicios", c.nav.soluciones], ["#cotizar", c.nav.precios]].map(([href, label]) => (
            <a key={href} href={href} style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: t.sub }}>{label}</a>
          ))}
          <button onClick={() => setShowPopup(true)}
            style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.75rem", border: `1px solid ${t.accent}35`, borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: t.text, backgroundColor: `${t.accent}08`, cursor: "pointer" }}>
            <Globe size={12} /> {lang === "es" ? "EN" : "ES"}
          </button>
          <a href={CALENDLY_LINK} target="_blank"
            style={{ padding: "0.5rem 1.5rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {c.nav.cta}
          </a>
        </div>
        <button onClick={() => setShowPopup(true)} className="md:hidden"
          style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.25rem 0.75rem", border: `1px solid ${t.accent}35`, borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, color: t.text, backgroundColor: `${t.accent}08`, cursor: "pointer" }}>
          <Globe size={12} /> {lang === "es" ? "EN" : "ES"}
        </button>
      </nav>

      {/* HERO */}
      <section id="inicio" style={{ padding: "9rem 1.5rem 5rem", maxWidth: "72rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center", position: "relative", zIndex: 1 }} className="!grid-cols-1 md:!grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: "inline-block", padding: "0.2rem 1rem", borderRadius: 999, border: `1px solid ${t.accent}25`, backgroundColor: `${t.accent}06`, marginBottom: "1.5rem" }}>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 900, color: t.accent }}>{c.badge}</p>
          </div>
          <h1 style={{ fontSize: "clamp(3.5rem,8vw,6rem)", fontFamily: "serif", fontWeight: 700, lineHeight: 1, marginBottom: "1rem", letterSpacing: "-0.02em" }}>
            {c.h1a}<br /><span style={{ color: t.accent, fontStyle: "italic", fontWeight: 400 }}>{c.h1b}</span>
          </h1>
          <p style={{ fontSize: "1.05rem", marginBottom: "2.5rem", opacity: 0.72, maxWidth: "28rem", lineHeight: 1.7 }}>{c.hero_sub}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            <a href={CALENDLY_LINK} target="_blank" style={{ padding: "1rem 2.5rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, textTransform: "uppercase", fontSize: "0.78rem", letterSpacing: "0.05em" }}>{c.cta1}</a>
            <a href="#servicios" style={{ padding: "1rem 2.5rem", border: `1px solid ${t.accent}`, color: t.accent, fontWeight: 700, textTransform: "uppercase", fontSize: "0.78rem" }}>{c.cta2}</a>
          </div>
        </motion.div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image src="/enso-negro.png" alt="Enso" width={450} height={450} style={{ filter: t.ensoFilter.replace("opacity(0.08)", "opacity(1)"), opacity: 0.88 }} />
        </div>
      </section>

      {/* PROBLEMA */}
      <section id="problema" style={{ padding: "6rem 1.5rem", backgroundColor: t.card, borderTop: `1px solid ${t.accent}10`, borderBottom: `1px solid ${t.accent}10`, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontFamily: "serif", textAlign: "center", marginBottom: "3.5rem", lineHeight: 1.2 }}>{c.problema_h}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {c.problemas.map(({ q, desc }, i) => (
              <div key={i} style={{ padding: "2rem", borderLeft: `2px solid ${t.accent}45`, backgroundColor: `${t.accent}04` }}>
                <div style={{ marginBottom: "1rem" }}>
                  {i === 0 && <HandCoins size={22} style={{ color: t.accent }} />}
                  {i === 1 && <Zap       size={22} style={{ color: t.accent }} />}
                  {i === 2 && <Target    size={22} style={{ color: t.accent }} />}
                </div>
                <p style={{ fontSize: "0.9rem", fontStyle: "italic", fontWeight: 600, marginBottom: "0.75rem" }}>{q}</p>
                <p style={{ fontSize: "0.8rem", opacity: 0.6, lineHeight: 1.65, color: t.sub }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href={waLink} target="_blank" style={{ fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: t.accent, fontSize: "0.75rem" }}>{c.problema_cta}</a>
          </div>
        </div>
      </section>

      {/* STATS — label arriba, número abajo */}
      <section style={{ padding: "4rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "56rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", textAlign: "center" }}>
          {c.stats.map(({ label, n }, i) => (
            <div key={i}>
              <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: t.sub, marginBottom: "0.75rem", lineHeight: 1.5 }}>{label}</p>
              <p style={{ fontSize: "3.5rem", fontFamily: "serif", fontWeight: 700, color: t.accent, lineHeight: 1 }}>{n}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" style={{ padding: "6rem 1.5rem", backgroundColor: t.card, position: "relative", zIndex: 1, overflow: "hidden" }}>
        <div style={{ maxWidth: "64rem", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.4em", color: t.accent, fontWeight: 900, marginBottom: "1rem" }}>{c.camino_label}</p>
            <h2 style={{ fontSize: "clamp(2.8rem,6vw,5rem)", fontFamily: "serif", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" }}>{c.camino_h}</h2>
            <p style={{ fontSize: "0.9rem", opacity: 0.55, maxWidth: "36rem", margin: "0 auto", lineHeight: 1.7, color: t.sub }}>{c.camino_sub}</p>
          </div>
          <ServicesSwiper t={t} c={c} />
        </div>
      </section>

      {/* COTIZAR */}
      <section id="cotizar" style={{ padding: "6rem 1.5rem", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "40rem", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontFamily: "serif", fontWeight: 700, marginBottom: "1.25rem", lineHeight: 1.2 }}>{c.cotizar_h}</h2>
          <p style={{ fontSize: "1rem", opacity: 0.65, lineHeight: 1.75, marginBottom: "2.5rem", color: t.sub }}>{c.cotizar_sub}</p>
          <a href={waLink} target="_blank"
            style={{ display: "inline-block", padding: "1.1rem 3rem", backgroundColor: t.accent, color: t.bg, fontWeight: 900, textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.08em" }}>
            {c.cotizar_cta}
          </a>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" style={{ padding: "6rem 1.5rem", maxWidth: "72rem", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", position: "relative", zIndex: 1 }} className="!grid-cols-1 md:!grid-cols-2">
        <div style={{ position: "relative" }}>
          <Image src="/rodrigo.png" alt="Rodrigo Tristán" width={500} height={600} className="grayscale hover:grayscale-0 transition-all duration-700 object-cover" />
          <div style={{ position: "absolute", top: "-1.5rem", left: "-1.5rem", width: "5rem", height: "5rem", borderTop: `2px solid ${t.accent}`, borderLeft: `2px solid ${t.accent}` }} />
        </div>
        <div>
          <p style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.35em", fontWeight: 900, color: t.accent, marginBottom: "1.25rem" }}>{c.nosotros_label}</p>
          <h2 style={{ fontSize: "clamp(2.5rem,5vw,3.5rem)", fontFamily: "serif", fontWeight: 700, marginBottom: "0.5rem" }}>{c.nosotros_nombre}</h2>
          <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", color: t.sub, marginBottom: "2rem" }}>{c.nosotros_cargo}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
            <p style={{ fontSize: "1.25rem", fontStyle: "italic", fontWeight: 600, lineHeight: 1.4 }}>{c.nosotros_quote}</p>
            <p style={{ fontSize: "0.92rem", opacity: 0.72, lineHeight: 1.75 }}>{c.nosotros_p1}</p>
            <p style={{ fontSize: "0.92rem", opacity: 0.72, lineHeight: 1.75 }}>{c.nosotros_p2}</p>
            <div style={{ padding: "1.5rem", border: `1px solid ${t.accent}22`, backgroundColor: `${t.accent}05` }}>
              <p style={{ fontWeight: 700, fontSize: "0.8rem", color: t.accent, marginBottom: "0.5rem" }}>{c.garantia_title}</p>
              <p style={{ fontSize: "0.82rem", opacity: 0.7, lineHeight: 1.7 }}>{c.garantia_text}</p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href={CALENDLY_LINK} target="_blank" style={{ padding: "1rem 2rem", border: `1px solid ${t.accent}`, color: t.accent, fontWeight: 700, fontSize: "0.8rem" }}>{c.btn_zoom}</a>
            <a href={`mailto:${EMAIL}`} style={{ padding: "1rem 2rem", fontWeight: 700, opacity: 0.55, fontSize: "0.8rem" }}>{c.btn_email}</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "3rem 1.5rem", borderTop: `1px solid ${t.accent}10`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", position: "relative", zIndex: 1 }}>
        <Image src="/logo-satori.png" alt="SATORI" width={90} height={28} style={{ filter: t.logoFilter }} />
        <p style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.35 }}>{c.footer}</p>
      </footer>
    </main>
  );
}