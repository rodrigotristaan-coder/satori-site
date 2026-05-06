"use client";

import { motion } from "framer-motion";
import { CheckCircle2, HandCoins, Palette, Zap, Target, Globe } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const WHATSAPP_LINK = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const WHATSAPP_LINK_EN = "https://wa.me/525625018281?text=Hi%20Rodrigo,%20I%20saw%20your%20page%20and%20I'd%20like%20a%20free%20audit.";
const CALENDLY_LINK = "https://calendly.com/rodrigo-tristaan";
const EMAIL = "r.tristaan@outlook.com";

// ── Copy (ES / EN) ──────────────────────────────────────────────────────────
const copy = {
  es: {
    nav: { problema: "El Problema", soluciones: "Soluciones", precios: "Precios", cta: "Agendar Zoom" },
    badge: "Tu negocio local + Inteligencia Artificial",
    h1a: "Más clientes.",
    h1b: "Menos caos.",
    hero_sub: "Sabemos lo que es atender el negocio, contestar mensajes, publicar en redes y encima intentar crecer. Satori automatiza lo repetitivo para que tú te enfoques en lo que importa: vender.",
    cta1: "Quiero mi Auditoría Gratis",
    cta2: "Ver Cómo Funciona",
    problema_h: "¿Te suena alguno de estos?",
    problemas: [
      { q: '"Pago anuncios y no me llega el cliente correcto."', desc: "Tu dinero en ads se va sin convertir porque no tienes un sistema que filtre y nutra prospectos." },
      { q: '"Se me van los clientes porque no contesto rápido."', desc: "El 78% de las ventas se las lleva quien responde primero. Sin automatización, pierdes sin saberlo." },
      { q: '"Mis redes están muertas y mi competencia me gana."', desc: "No tienes tiempo para crear contenido consistente. Y la consistencia es lo que genera confianza — y ventas." },
    ],
    problema_cta: "Identifiqué mi problema — quiero la solución →",
    stats: [
      { n: "24/7", d: "Tu negocio abierto, siempre" },
      { n: "0",    d: "Prospectos perdidos" },
      { n: "30",   d: "Días para ver resultados o te devolvemos tu dinero" },
    ],
    servicios_label: "Lo que construimos para ti",
    servicios_h: "Tu equipo digital.\nTrabajando mientras duermes.",
    servicios: [
      {
        t: "Agente de Ventas con IA",
        d: "Un bot entrenado con la voz de tu negocio que responde en WhatsApp e Instagram las 24 hrs. Cotiza, agenda y cierra — sin que tú levantes el teléfono.",
        i: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fm=jpg",
      },
      {
        t: "Contenido que Convierte",
        d: "Posts, reels y stories diseñados estratégicamente para posicionarte como el experto de tu industria y convertir seguidores en compradores.",
        i: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80&fm=jpg",
      },
      {
        t: "Anuncios que Traen Dinero",
        d: "Campañas en Meta y Google dirigidas a las personas que ya buscan lo que tú vendes. Bajamos tu costo por lead y subimos tu retorno.",
        i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=jpg",
      },
    ],
    precios_h: "Invierte con claridad.\nCrece con certeza.",
    precios_sub: "Sin contratos. Sin letra chica. Solo resultados.",
    planes: [
      {
        n: "Arranque",
        p: "$4,500",
        et: "Para el que empieza a escalar",
        l: ["Estrategia de contenido mensual", "12 posts con diseño y copy", "Redacción con IA para tu voz", "Soporte directo por WhatsApp"],
      },
      {
        n: "Crecimiento",
        p: "$8,500",
        et: "El más elegido por nuestros clientes",
        l: ["Todo lo de Arranque", "2 redes sociales gestionadas", "Reels y TikToks de tu negocio", "Chatbot de ventas básico", "Reporte mensual de métricas"],
      },
      {
        n: "Aceleración",
        p: "$15,000",
        et: "Para dominar tu mercado local",
        l: ["Todo lo de Crecimiento", "Ads agresivos en Meta + Google", "IA de ventas avanzada (WhatsApp + IG)", "Producción de video profesional", "Sesión semanal de estrategia"],
      },
    ],
    plan_cta: "Quiero empezar →",
    nosotros_label: "Tu Socio Digital",
    nosotros_nombre: "Rodrigo Tristán",
    nosotros_cargo: "Fundador de SATORI",
    nosotros_quote: '"La IA no reemplaza tu negocio. Lo potencia."',
    nosotros_p1: "Fundé Satori porque vi de cerca cómo negocios con enorme potencial perdían clientes y dinero por falta de sistemas — no por falta de talento.",
    nosotros_p2: "Hoy usamos la misma tecnología que tienen las grandes corporaciones y la ponemos a trabajar para ti. Para que tú te dediques a lo tuyo y el sistema trabaje solo.",
    garantia_title: "Garantía de 30 días:",
    garantia_text: "Si en 30 días no sientes que el valor recibido supera con creces lo que pagaste, te regresamos tu dinero. Sin preguntas, sin drama.",
    btn_zoom: "Agendar Zoom",
    btn_email: "Enviar Email",
    footer: "© 2026 SATORI · Soluciones Digitales con IA · San Luis Potosí, MX",
  },
  en: {
    nav: { problema: "The Problem", soluciones: "Solutions", precios: "Pricing", cta: "Book a Zoom" },
    badge: "Your Local Business + Artificial Intelligence",
    h1a: "More clients.",
    h1b: "Less chaos.",
    hero_sub: "We know what it's like to run a business, answer messages, post on social media, and still try to grow. Satori automates the repetitive stuff so you can focus on what matters: selling.",
    cta1: "Get My Free Audit",
    cta2: "See How It Works",
    problema_h: "Do any of these sound familiar?",
    problemas: [
      { q: '"I pay for ads but the wrong people show up."', desc: "Your ad spend leaks because there's no system to filter and nurture leads before they go cold." },
      { q: '"I lose customers because I can\'t reply fast enough."', desc: "78% of sales go to whoever responds first. Without automation, you're losing deals you don't even know about." },
      { q: '"My social media is dead and my competitors are winning."', desc: "You don't have time for consistent content. But consistency is what builds trust — and trust is what drives sales." },
    ],
    problema_cta: "I know my problem — show me the fix →",
    stats: [
      { n: "24/7", d: "Your business always open" },
      { n: "0",    d: "Leads slipping through the cracks" },
      { n: "30",   d: "Days to see results or your money back" },
    ],
    servicios_label: "What we build for you",
    servicios_h: "Your digital team.\nWorking while you sleep.",
    servicios: [
      {
        t: "AI Sales Agent",
        d: "A bot trained in your brand voice that handles WhatsApp and Instagram inquiries 24/7. It quotes, books, and closes — while you focus on running the business.",
        i: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fm=jpg",
      },
      {
        t: "Content That Converts",
        d: "Posts, reels, and stories engineered to position you as the go-to expert in your niche and turn followers into paying customers.",
        i: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80&fm=jpg",
      },
      {
        t: "Ads That Print Money",
        d: "Meta and Google campaigns targeting people who are already looking for what you sell. Lower cost per lead, higher return on spend.",
        i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=jpg",
      },
    ],
    precios_h: "Invest with clarity.\nGrow with certainty.",
    precios_sub: "No contracts. No fine print. Just results.",
    planes: [
      {
        n: "Starter",
        p: "$4,500",
        et: "For the business ready to scale",
        l: ["Monthly content strategy", "12 posts with design & copy", "AI copywriting in your voice", "Direct WhatsApp support"],
      },
      {
        n: "Growth",
        p: "$8,500",
        et: "Most popular with our clients",
        l: ["Everything in Starter", "2 managed social platforms", "Reels & TikToks for your biz", "Basic AI sales chatbot", "Monthly metrics report"],
      },
      {
        n: "Acceleration",
        p: "$15,000",
        et: "For total local market dominance",
        l: ["Everything in Growth", "Aggressive Meta + Google Ads", "Advanced AI sales agent (WA + IG)", "Professional video production", "Weekly strategy session"],
      },
    ],
    plan_cta: "Let's get started →",
    nosotros_label: "Your Digital Partner",
    nosotros_nombre: "Rodrigo Tristán",
    nosotros_cargo: "Founder of SATORI",
    nosotros_quote: '"AI doesn\'t replace your business. It supercharges it."',
    nosotros_p1: "I founded Satori because I watched great businesses lose clients and revenue not from lack of talent — but from lack of systems.",
    nosotros_p2: "Today we take the same technology used by major corporations and put it to work for you. So you focus on your craft, and the system handles the rest.",
    garantia_title: "30-Day Guarantee:",
    garantia_text: "If within 30 days you don't feel the value far exceeds what you paid, we refund you in full. No questions, no drama.",
    btn_zoom: "Book a Zoom",
    btn_email: "Send Email",
    footer: "© 2026 SATORI · AI-Powered Digital Solutions · San Luis Potosí, MX",
  },
};

// ── Themes ──────────────────────────────────────────────────────────────────
const themes = {
  blue:    { bg: "#020B18", accent: "#00D4FF", text: "#E0F0FF", sub: "#4A7FA5", card: "#041428" },
  silver:  { bg: "#0A0A0A", accent: "#E5E5E5", text: "#FFFFFF",  sub: "#A3A3A3", card: "#171717" },
  rainbow: { bg: "#0F0218", accent: "#FF00CC", text: "#FFFFFF",  sub: "#A855F7", card: "#1E0B36" },
};

// ── Matrix Canvas ────────────────────────────────────────────────────────────
function MatrixBackground({ accentColor }: { accentColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef(accentColor);
  useEffect(() => { accentRef.current = accentColor; }, [accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 20);
    const drops = Array(cols).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "14px monospace";
      drops.forEach((y, i) => {
        const char = Math.random() < 0.5 ? "1" : "0";
        ctx.fillStyle = Math.random() > 0.92 ? "#ffffff" : accentRef.current + "55";
        ctx.fillText(char, i * 20, y * 20);
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      opacity: 0.18, pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme] = useState<keyof typeof themes>("blue");
  const [lang, setLang] = useState<"es" | "en">("es");
  const t = themes[theme];
  const c = copy[lang];

  const cycleTheme = () => {
    const keys = Object.keys(themes) as (keyof typeof themes)[];
    setTheme(keys[(keys.indexOf(theme) + 1) % keys.length]);
  };

  const waLink = lang === "es" ? WHATSAPP_LINK : WHATSAPP_LINK_EN;

  return (
    <main style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh", position: "relative", transition: "all 0.5s ease" }}>
      <MatrixBackground accentColor={t.accent} />

      {/* ── FLOATING BUTTONS ── */}
      {/* WhatsApp */}
      <a href={waLink} target="_blank" rel="noopener noreferrer"
        className="fixed z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 font-black text-xs uppercase"
        style={{ bottom: "6rem", right: "1.5rem", backgroundColor: "#25D366", color: "#000" }}
        aria-label="WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden md:inline">WhatsApp</span>
      </a>

      {/* Zoom / Calendly */}
      <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer"
        className="fixed z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 font-black text-xs uppercase"
        style={{ bottom: "1.5rem", right: "1.5rem", backgroundColor: t.accent, color: t.bg }}
        aria-label="Agendar Zoom">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
        <span className="hidden md:inline">{c.btn_zoom}</span>
      </a>

      {/* Theme toggle */}
      <button onClick={cycleTheme}
        className="fixed z-[100] p-3 rounded-full shadow-2xl transition-all hover:scale-110"
        style={{ bottom: "10.5rem", right: "1.5rem", backgroundColor: t.card, color: t.accent, border: `1px solid ${t.accent}40` }}
        aria-label="Cambiar estilo">
        <Palette size={18} />
      </button>

      {/* ── NAV ── */}
      <nav className="w-full px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
        style={{ borderColor: `${t.accent}20`, backgroundColor: `${t.bg}E8` }}>
        <a href="#inicio">
          <Image src="/logo-satori.png" alt="SATORI" width={120} height={36} className="invert" />
        </a>
        <div className="hidden md:flex items-center gap-6">
          <a href="#problema" className="text-xs font-bold uppercase" style={{ color: t.sub }}>{c.nav.problema}</a>
          <a href="#servicios" className="text-xs font-bold uppercase" style={{ color: t.sub }}>{c.nav.soluciones}</a>
          <a href="#precios"   className="text-xs font-bold uppercase" style={{ color: t.sub }}>{c.nav.precios}</a>
          {/* Language Toggle */}
          <button onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="flex items-center gap-1 px-3 py-1 border rounded-full text-xs font-bold uppercase transition-all hover:scale-105"
            style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", backgroundColor: "rgba(255,255,255,0.08)" }}>
            <Globe size={13} />
            {lang === "es" ? "EN" : "ES"}
          </button>
          <a href={CALENDLY_LINK} target="_blank"
            className="px-6 py-2 font-black text-xs uppercase"
            style={{ backgroundColor: t.accent, color: t.bg }}>
            {c.nav.cta}
          </a>
        </div>
        {/* Mobile lang toggle */}
        <button onClick={() => setLang(lang === "es" ? "en" : "es")}
          className="md:hidden flex items-center gap-1 px-3 py-1 border rounded-full text-xs font-bold uppercase"
          style={{ borderColor: "rgba(255,255,255,0.4)", color: "#ffffff", backgroundColor: "rgba(255,255,255,0.08)" }}>
          <Globe size={13} />
          {lang === "es" ? "EN" : "ES"}
        </button>
      </nav>

      {/* ── HERO ── */}
      <section id="inicio" className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12 pt-32 md:pt-24"
        style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-block px-4 py-1 rounded-full border mb-6"
            style={{ borderColor: `${t.accent}30`, backgroundColor: `${t.accent}05` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase font-black" style={{ color: t.accent }}>{c.badge}</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-none mb-4 tracking-tighter">
            {c.h1a}<br />
            <span style={{ color: t.accent }} className="italic font-normal">{c.h1b}</span>
          </h1>
          <p className="text-lg mb-10 opacity-80 max-w-md leading-relaxed">{c.hero_sub}</p>
          <div className="flex flex-wrap gap-4">
            <a href={CALENDLY_LINK} target="_blank"
              className="px-10 py-4 font-black uppercase text-sm shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: t.accent, color: t.bg }}>
              {c.cta1}
            </a>
            <a href="#servicios"
              className="px-10 py-4 border font-bold uppercase text-sm"
              style={{ borderColor: t.accent, color: t.accent }}>
              {c.cta2}
            </a>
          </div>
        </motion.div>
        <div className="flex justify-center">
          <Image src="/enso-negro.png" alt="Enso" width={450} height={450} className="invert opacity-100 brightness-150" />
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section id="problema" className="px-6 py-24 border-y"
        style={{ backgroundColor: `${t.card}50`, borderColor: `${t.accent}10`, position: "relative", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif mb-14 leading-tight text-center">{c.problema_h}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {c.problemas.map(({ q, desc }, i) => (
              <div key={i} className="p-8 border-l-2 bg-black/20" style={{ borderColor: `${t.accent}40` }}>
                <div className="mb-4">
                  {i === 0 && <HandCoins size={24} style={{ color: t.accent }} />}
                  {i === 1 && <Zap       size={24} style={{ color: t.accent }} />}
                  {i === 2 && <Target    size={24} style={{ color: t.accent }} />}
                </div>
                <p className="text-base italic mb-3" style={{ color: t.text }}>{q}</p>
                <p className="text-sm opacity-60 leading-relaxed" style={{ color: t.sub }}>{desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href={waLink} target="_blank"
              className="inline-block font-bold tracking-widest uppercase hover:scale-105 transition-all"
              style={{ color: t.accent }}>
              {c.problema_cta}
            </a>
          </div>
        </div>
      </section>

      {/* ── NÚMEROS ── */}
      <section className="px-6 py-16" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {c.stats.map(({ n, d }, i) => (
            <div key={i}>
              <p className="text-5xl font-serif font-bold mb-2" style={{ color: t.accent }}>{n}</p>
              <p className="text-xs tracking-[0.2em] uppercase leading-relaxed max-w-[180px] mx-auto" style={{ color: t.sub }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="px-6 py-24" style={{ backgroundColor: t.card, position: "relative", zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.5em] mb-4 font-black" style={{ color: t.accent }}>{c.servicios_label}</p>
            <h2 className="text-5xl font-serif font-bold leading-tight whitespace-pre-line">{c.servicios_h}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {c.servicios.map((s, i) => (
              <div key={i} className="border overflow-hidden group" style={{ borderColor: `${t.accent}15`, backgroundColor: t.bg }}>
                <img src={s.i} alt={s.t} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{s.t}</h3>
                  <p className="text-sm opacity-70 leading-relaxed" style={{ color: t.sub }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" className="px-6 py-24 max-w-6xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4 leading-tight whitespace-pre-line">{c.precios_h}</h2>
          <p className="text-sm uppercase tracking-widest opacity-60" style={{ color: t.sub }}>{c.precios_sub}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {c.planes.map((plan, i) => (
            <div key={i} className="p-10 border-t-4 shadow-xl transition-transform hover:scale-[1.02]"
              style={{ borderColor: t.accent, backgroundColor: t.card }}>
              <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-4" style={{ color: t.accent }}>{plan.et}</p>
              <h3 className="text-3xl font-bold mb-2">{plan.n}</h3>
              <p className="text-4xl font-serif font-bold mb-8">{plan.p}<span className="text-xs font-sans opacity-50 ml-2">/mes MXN</span></p>
              <ul className="space-y-4 mb-10">
                {plan.l.map(item => (
                  <li key={item} className="text-sm opacity-80 flex items-start gap-2">
                    <CheckCircle2 size={14} style={{ color: t.accent }} className="mt-0.5 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <a href={waLink} target="_blank"
                className="block text-center py-4 font-black uppercase text-xs"
                style={{ backgroundColor: t.accent, color: t.bg }}>
                {c.plan_cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section id="nosotros" className="px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
        style={{ position: "relative", zIndex: 1 }}>
        <div className="relative">
          <Image src="/rodrigo.png" alt="Rodrigo Tristán" width={500} height={600}
            className="grayscale hover:grayscale-0 transition-all duration-700 object-cover" />
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2" style={{ borderColor: t.accent }}></div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-black mb-6" style={{ color: t.accent }}>{c.nosotros_label}</p>
          <h2 className="text-6xl font-serif font-bold mb-4">{c.nosotros_nombre}</h2>
          <p className="text-sm uppercase tracking-widest mb-10" style={{ color: t.sub }}>{c.nosotros_cargo}</p>
          <div className="space-y-6 mb-10">
            <p className="text-2xl italic font-medium leading-snug" style={{ color: t.text }}>{c.nosotros_quote}</p>
            <p className="text-base opacity-70 leading-relaxed">{c.nosotros_p1}</p>
            <p className="text-base opacity-70 leading-relaxed">{c.nosotros_p2}</p>
            <div className="p-6 border" style={{ borderColor: `${t.accent}30`, backgroundColor: `${t.accent}05` }}>
              <p className="font-bold mb-2 text-sm" style={{ color: t.accent }}>{c.garantia_title}</p>
              <p className="text-sm opacity-70 leading-relaxed">{c.garantia_text}</p>
            </div>
          </div>
          <div className="flex gap-4 flex-wrap">
            <a href={CALENDLY_LINK} target="_blank"
              className="px-8 py-4 font-bold border transition-all hover:scale-105"
              style={{ borderColor: t.accent, color: t.accent }}>
              {c.btn_zoom}
            </a>
            <a href={`mailto:${EMAIL}`}
              className="px-8 py-4 font-bold opacity-60 hover:opacity-100 transition-all">
              {c.btn_email}
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-6 py-12 border-t flex flex-col md:flex-row justify-between items-center gap-6"
        style={{ borderColor: `${t.accent}10`, position: "relative", zIndex: 1 }}>
        <Image src="/logo-satori.png" alt="SATORI" width={100} height={30} className="invert" />
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-50">{c.footer}</p>
      </footer>
    </main>
  );
}