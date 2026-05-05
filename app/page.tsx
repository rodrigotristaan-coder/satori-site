"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, PenTool, Sparkles, Brain, Megaphone, Mail } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK = "https://wa.me/525625018281";
const EMAIL = "r.tristaan@outlook.com";

// ── CONTENIDO BILINGÜE ──────────────────────────────────────────────
const content = {
  es: {
    nav: { cta: "Hablar con nosotros" },
    navLinks: [
      { label: "Inicio", href: "#inicio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Nosotros", href: "#nosotros" },
      { label: "Contacto", href: "#contacto" },
    ],
    hero: {
      tag: "Marketing · IA · Resultados reales",
      h1a: "Más clientes.",
      h1b: "Menos ruido.",
      sub: "Ayudamos a empresarios mexicanos a crecer en digital con estrategia, contenido e inteligencia artificial.",
      cta1: "Agenda una llamada gratuita",
      cta2: "Ver servicios",
    },
    numeros: [
      { numero: "3x", label: "Más alcance orgánico" },
      { numero: "60%", label: "Menos tiempo operativo" },
      { numero: "2–4", label: "Semanas para resultados" },
    ],
    servicios: {
      tag: "Servicios",
      h2a: "Todo lo que necesita",
      h2b: "tu negocio.",
      items: [
        { titulo: "Creación de Contenido", desc: "Estrategia y diseño visual que convierte seguidores en clientes.", estado: "Disponible" },
        { titulo: "Gestión de Redes Sociales", desc: "Presencia digital activa y coherente todos los días.", estado: "Disponible" },
        { titulo: "Medios Pagados", desc: "Campañas diseñadas para generar retorno real desde el primer peso.", estado: "Próximamente" },
        { titulo: "Sistemas con IA", desc: "Automatización inteligente que trabaja por ti las 24 horas.", estado: "Próximamente" },
      ],
    },
    paquetes: {
      tag: "Inversión",
      h2: "Elige tu punto de partida.",
      items: [
        { nombre: "Básico", etiqueta: "Para empezar", items: ["12 posts al mes", "1 red social", "Diseño + copy", "Reporte mensual"] },
        { nombre: "Pro", etiqueta: "El más elegido", items: ["20 posts al mes", "2 redes sociales", "Stories + Reels", "Gestión de comunidad", "Reporte + estrategia"] },
        { nombre: "Premium", etiqueta: "Crecimiento total", items: ["Todo lo del Pro", "3 redes sociales", "Contenido en video", "Ads incluidos", "Reunión semanal"] },
      ],
      cta: "Empezar",
    },
    nosotros: {
      tag: "Fundador",
      cargo: "Fundador & CEO · SATORI",
      cita: "\"Intuición + Tecnología. En ese orden.\"",
      p1: "Visionario amante de la psicología y la tecnología.",
      p2: "Con el propósito de ayudar a empresarios mexicanos a crecer mediante IA y tecnología.",
      p3b: "Decide dedicar su vida a servir a los empresarios mexicanos a crecer con intuición y tecnología.",
      p4b: "Fundador y CEO de SATORI — agencia especializada en contenido, social ads, automatización e IA.",
    },
    contacto: {
      tag: "Hablemos",
      h2a: "Tu negocio puede",
      h2b: "llegar más lejos.",
      sub: "Una llamada de 30 minutos. Sin compromisos. Sin costo.",
      cta1: "WhatsApp",
      cta2: "Enviar mail",
      cta3: "Llamar",
    },
    footer: "© 2026 SATORI · Todos los derechos reservados",
  },
  en: {
    nav: { cta: "Talk to us" },
    navLinks: [
      { label: "Home", href: "#inicio" },
      { label: "Services", href: "#servicios" },
      { label: "About", href: "#nosotros" },
      { label: "Contact", href: "#contacto" },
    ],
    hero: {
      tag: "Marketing · AI · Real Results",
      h1a: "More clients.",
      h1b: "Less noise.",
      sub: "We help Mexican entrepreneurs grow digitally with strategy, content and artificial intelligence.",
      cta1: "Book a free call",
      cta2: "View services",
    },
    numeros: [
      { numero: "3x", label: "More organic reach" },
      { numero: "60%", label: "Less operational time" },
      { numero: "2–4", label: "Weeks to see results" },
    ],
    servicios: {
      tag: "Services",
      h2a: "Everything your",
      h2b: "business needs.",
      items: [
        { titulo: "Content Creation", desc: "Strategy and visual design that turns followers into clients.", estado: "Available" },
        { titulo: "Social Media Management", desc: "Active, coherent digital presence every day.", estado: "Available" },
        { titulo: "Paid Media", desc: "Campaigns engineered to generate real ROI from day one.", estado: "Coming Soon" },
        { titulo: "AI Systems", desc: "Smart automation that works for you 24/7.", estado: "Coming Soon" },
      ],
    },
    paquetes: {
      tag: "Investment",
      h2: "Choose your starting point.",
      items: [
        { nombre: "Basic", etiqueta: "To get started", items: ["12 posts/month", "1 social network", "Design + copy", "Monthly report"] },
        { nombre: "Pro", etiqueta: "Most popular", items: ["20 posts/month", "2 social networks", "Stories + Reels", "Community management", "Report + strategy"] },
        { nombre: "Premium", etiqueta: "Full growth", items: ["Everything in Pro", "3 social networks", "Video content", "Ads included", "Weekly meeting"] },
      ],
      cta: "Get started",
    },
    nosotros: {
      tag: "Founder",
      cargo: "Founder & CEO · SATORI",
      cita: "\"Intuition + Technology. In that order.\"",
      p1: "Visionary passionate about psychology and technology.",
      p2: "With a mission to help Mexican entrepreneurs grow through AI and technology adoption.",
      p3b: "He dedicates his life to serving Mexican entrepreneurs to grow with intuition and technology.",
      p4b: "Founder and CEO of SATORI — agency specialized in content, social ads, automation and AI.",
    },
    contacto: {
      tag: "Let's talk",
      h2a: "Your business can",
      h2b: "go further.",
      sub: "A 30-minute call. No commitments. No cost.",
      cta1: "WhatsApp",
      cta2: "Send email",
      cta3: "Call us",
    },
    footer: "© 2026 SATORI · All rights reserved",
  },
};

// ── PALETA ──────────────────────────────────────────────────────────
// bg: #020B18  surface: #041428  cyan: #00D4FF  blue: #0066CC
// text: #E0F0FF  muted: #4A7FA5  border: rgba(0,212,255,0.15)

// ── FONDO BINARIO ANIMADO ───────────────────────────────────────────
function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cols = Math.floor(canvas.width / 20);
    const drops: number[] = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(2, 11, 24, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 212, 255, 0.18)";
      ctx.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? "1" : "0";
        ctx.fillText(text, i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 60);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, opacity: 0.35, pointerEvents: "none" }} />;
}

const iconos = [PenTool, Sparkles, Megaphone, Brain];
const imgs = [
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=90",
  "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=90",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=90",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=90",
];

export default function Home() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("es");

  useEffect(() => {
    const nav = navigator.language || "es";
    setLang(nav.startsWith("en") ? "en" : "es");
  }, []);

  const t = content[lang];
  const destacados = [false, true, false];

  return (
    <main style={{ backgroundColor: "#020B18", color: "#E0F0FF", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <BinaryBackground />

      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          backgroundColor: "rgba(2,11,24,0.88)",
          borderBottom: "1px solid rgba(0,212,255,0.15)",
          position: "sticky", top: 0, zIndex: 50,
          backdropFilter: "blur(16px)",
        }}
        className="w-full px-6 md:px-12 py-3 flex items-center justify-between"
      >
        <a href="#inicio">
          <Image src="/logo-satori.png" alt="SATORI" width={240} height={72} priority style={{ filter: "brightness(0) invert(1)" }} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {t.navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="text-sm tracking-[0.12em] uppercase font-medium transition-colors"
              style={{ color: "#4A7FA5" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#00D4FF")}
              onMouseLeave={e => (e.currentTarget.style.color = "#4A7FA5")}
            >
              {link.label}
            </a>
          ))}

          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs tracking-[0.15em] uppercase px-3 py-1.5 font-bold transition-all"
            style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>

          <a href="#contacto"
            className="text-sm tracking-[0.12em] uppercase px-6 py-3 font-bold transition-all"
            style={{ backgroundColor: "#00D4FF", color: "#020B18" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#00b8d9")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#00D4FF")}
          >
            {t.nav.cta}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="text-xs tracking-[0.15em] uppercase px-2 py-1 font-bold"
            style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuAbierto(!menuAbierto)}>
            <span className={`block w-6 h-px transition-all duration-300 ${menuAbierto ? "rotate-45 translate-y-2" : ""}`} style={{ backgroundColor: "#00D4FF" }} />
            <span className={`block w-6 h-px transition-all duration-300 ${menuAbierto ? "opacity-0" : ""}`} style={{ backgroundColor: "#00D4FF" }} />
            <span className={`block w-6 h-px transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-2" : ""}`} style={{ backgroundColor: "#00D4FF" }} />
          </button>
        </div>
      </motion.nav>

      {/* MENU MÓVIL */}
      <AnimatePresence>
        {menuAbierto && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ backgroundColor: "rgba(2,11,24,0.97)" }}
          >
            {t.navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMenuAbierto(false)}
                className="text-4xl font-serif tracking-[0.1em]" style={{ color: "#00D4FF" }}>
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="inicio" className="px-6 md:px-12 pt-24 md:pt-36 pb-32 relative" style={{ zIndex: 1 }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_420px] gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-base tracking-[0.3em] uppercase mb-8 font-black" style={{ color: "#00D4FF" }}>
              {t.hero.tag}
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.95] tracking-[-0.03em] mb-8" style={{ color: "#E0F0FF" }}>
              {t.hero.h1a}<br />
              <span className="italic font-normal" style={{ color: "#00D4FF" }}>{t.hero.h1b}</span>
            </h1>
            <p className="text-2xl leading-relaxed mb-10 font-light max-w-lg" style={{ color: "#4A7FA5" }}>
              {t.hero.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base tracking-[0.1em] uppercase font-bold transition-all"
                style={{ backgroundColor: "#00D4FF", color: "#020B18" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#00b8d9")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#00D4FF")}
              >
                {t.hero.cta1} <ArrowRight size={16} />
              </a>
              <a href="#servicios"
                className="inline-flex items-center justify-center px-8 py-4 text-base tracking-[0.1em] uppercase transition-all font-medium"
                style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(0,212,255,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                {t.hero.cta2}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.8 }}
            className="hidden md:flex items-center justify-center"
          >
            <Image src="/enso-negro.png" alt="Enso SATORI" width={440} height={440}
              style={{ filter: "invert(1) brightness(0.6) sepia(1) saturate(10) hue-rotate(170deg)", opacity: 0.9 }} />
          </motion.div>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="px-6 md:px-12 py-20 relative" style={{ zIndex: 1, borderTop: "1px solid rgba(0,212,255,0.1)", borderBottom: "1px solid rgba(0,212,255,0.1)" }}>
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-px" style={{ backgroundColor: "rgba(0,212,255,0.08)" }}>
          {t.numeros.map((r, i) => (
            <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="px-8 py-14 text-center" style={{ backgroundColor: "#020B18" }}>
              <p className="text-6xl md:text-7xl font-serif font-bold mb-3" style={{ color: "#00D4FF" }}>{r.numero}</p>
              <p className="text-lg font-light" style={{ color: "#4A7FA5" }}>{r.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-6 md:px-12 py-28 relative" style={{ zIndex: 1, backgroundColor: "#041428" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-sm uppercase tracking-[0.3em] mb-5 font-black" style={{ color: "#00D4FF" }}>{t.servicios.tag}</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] leading-[1.05]" style={{ color: "#E0F0FF" }}>
              {t.servicios.h2a}<br />{t.servicios.h2b}
            </h2>
          </div>
          <div className="flex flex-col" style={{ border: "1px solid rgba(0,212,255,0.12)" }}>
            {t.servicios.items.map((s, i) => {
              const Icono = iconos[i];
              const imagenDerecha = i % 2 === 0;
              return (
                <motion.div key={s.titulo}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`grid md:grid-cols-2 gap-0 ${!imagenDerecha ? "md:[&>*:first-child]:order-2" : ""}`}
                  style={{ borderBottom: "1px solid rgba(0,212,255,0.12)" }}
                >
                  <div className="p-12 md:p-16 flex flex-col justify-center" style={{ backgroundColor: "#041428" }}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 flex items-center justify-center" style={{ border: "1px solid rgba(0,212,255,0.25)" }}>
                        <Icono size={24} style={{ color: "#00D4FF" }} />
                      </div>
                      <span className="text-xs tracking-[0.2em] uppercase px-3 py-1.5 font-bold"
                        style={s.estado === "Disponible" || s.estado === "Available"
                          ? { backgroundColor: "#00D4FF", color: "#020B18" }
                          : { border: "1px solid rgba(0,212,255,0.2)", color: "#4A7FA5" }}>
                        {s.estado}
                      </span>
                    </div>
                    <h3 className="text-4xl font-medium mb-5" style={{ color: "#E0F0FF" }}>{s.titulo}</h3>
                    <p className="text-xl leading-relaxed font-light" style={{ color: "#4A7FA5" }}>{s.desc}</p>
                  </div>
                  <div className="relative min-h-[300px] md:min-h-[380px] overflow-hidden">
                    <img src={imgs[i]} alt={s.titulo} className="w-full h-full object-cover"
                      style={{ filter: "grayscale(30%) brightness(0.7) hue-rotate(180deg) saturate(1.5)" }} />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.12) 0%, transparent 60%)" }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PAQUETES */}
      <section className="px-6 md:px-12 py-28 relative" style={{ zIndex: 1, backgroundColor: "#020B18" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-sm uppercase tracking-[0.3em] mb-5 font-black" style={{ color: "#00D4FF" }}>{t.paquetes.tag}</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] leading-[1.05]" style={{ color: "#E0F0FF" }}>
              {t.paquetes.h2}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "rgba(0,212,255,0.08)" }}>
            {t.paquetes.items.map((p, i) => (
              <motion.div key={p.nombre} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col p-10"
                style={{ backgroundColor: destacados[i] ? "#041428" : "#020B18", borderTop: destacados[i] ? "2px solid #00D4FF" : "2px solid transparent" }}>
                <p className="text-xs tracking-[0.2em] uppercase mb-3 font-bold" style={{ color: destacados[i] ? "#00D4FF" : "#4A7FA5" }}>{p.etiqueta}</p>
                <h3 className="text-3xl font-medium mb-4" style={{ color: "#E0F0FF" }}>{p.nombre}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-serif font-bold" style={{ color: destacados[i] ? "#00D4FF" : "#E0F0FF" }}>{["$3,500", "$6,500", "$12,000"][i]}</span>
                  <span className="text-base" style={{ color: "#4A7FA5" }}>/mes MXN</span>
                </div>
                <ul className="space-y-3 flex-1 mb-10">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-light text-lg" style={{ color: "#4A7FA5" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: destacados[i] ? "#00D4FF" : "#4A7FA5" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contacto"
                  className="text-center py-4 text-sm tracking-[0.15em] uppercase transition-all font-bold"
                  style={destacados[i] ? { backgroundColor: "#00D4FF", color: "#020B18" } : { border: "1px solid rgba(0,212,255,0.25)", color: "#00D4FF" }}
                  onMouseEnter={e => {
                    if (destacados[i]) e.currentTarget.style.backgroundColor = "#00b8d9";
                    else e.currentTarget.style.backgroundColor = "rgba(0,212,255,0.1)";
                  }}
                  onMouseLeave={e => {
                    if (destacados[i]) e.currentTarget.style.backgroundColor = "#00D4FF";
                    else e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {t.paquetes.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="px-6 md:px-12 py-28 relative" style={{ zIndex: 1, backgroundColor: "#041428" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute inset-0" style={{ border: "1px solid rgba(0,212,255,0.2)", transform: "translate(12px, 12px)" }} />
              <Image src="/rodrigo.png" alt="Rodrigo Tristán" width={560} height={700} className="w-full object-cover" style={{ filter: "brightness(0.9)" }} />
              <div className="absolute -bottom-10 -right-10 opacity-20">
                <Image src="/enso-negro.png" alt="" width={180} height={180} style={{ filter: "invert(1) brightness(0.5) sepia(1) saturate(10) hue-rotate(170deg)" }} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }}>
            <p className="text-sm uppercase tracking-[0.3em] mb-8 font-black" style={{ color: "#00D4FF" }}>{t.nosotros.tag}</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] leading-[1.1] mb-2" style={{ color: "#E0F0FF" }}>
              Rodrigo Tristán
            </h2>
            <p className="text-lg tracking-[0.15em] uppercase mb-10" style={{ color: "#4A7FA5" }}>{t.nosotros.cargo}</p>
            <div className="pl-6 mb-10" style={{ borderLeft: "2px solid #00D4FF" }}>
              <p className="text-2xl font-serif italic leading-relaxed" style={{ color: "#7BB8D4" }}>{t.nosotros.cita}</p>
            </div>
            <div className="space-y-5 font-light leading-relaxed text-lg" style={{ color: "#4A7FA5" }}>
              <p>{t.nosotros.p1}</p>
              <p>{t.nosotros.p2}</p>
              <p><strong style={{ color: "#E0F0FF", fontWeight: 500 }}>{t.nosotros.p3b}</strong></p>
              <p><strong style={{ color: "#E0F0FF", fontWeight: 500 }}>{t.nosotros.p4b}</strong></p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="px-6 md:px-12 py-32 relative" style={{ zIndex: 1, backgroundColor: "#020B18" }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] mb-8 font-black" style={{ color: "#00D4FF" }}>{t.contacto.tag}</p>
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-[-0.02em] leading-[1.0] mb-8" style={{ color: "#E0F0FF" }}>
            {t.contacto.h2a}<br />
            <span className="italic font-normal" style={{ color: "#00D4FF" }}>{t.contacto.h2b}</span>
          </h2>
          <p className="text-2xl font-light mb-14 max-w-lg mx-auto" style={{ color: "#4A7FA5" }}>
            {t.contacto.sub}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base tracking-[0.1em] uppercase font-bold transition-all"
              style={{ backgroundColor: "#00D4FF", color: "#020B18" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#00b8d9")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#00D4FF")}
            >
              {t.contacto.cta1} <ArrowRight size={16} />
            </a>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base tracking-[0.1em] uppercase transition-all font-medium"
              style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(0,212,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <Mail size={16} /> {t.contacto.cta2}
            </a>
            <a href="tel:+525625018281"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base tracking-[0.1em] uppercase transition-all font-medium"
              style={{ border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "rgba(0,212,255,0.08)"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
            >
              {t.contacto.cta3}
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: "1px solid rgba(0,212,255,0.12)", backgroundColor: "#020B18", zIndex: 1, position: "relative" }}>
        <Image src="/logo-satori.png" alt="SATORI" width={180} height={54} style={{ filter: "brightness(0) invert(1)" }} />
        <p className="text-sm tracking-[0.12em] uppercase" style={{ color: "#4A7FA5" }}>{t.footer}</p>
      </footer>
    </main>
  );
}