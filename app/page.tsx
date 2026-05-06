"use client";
 
import { motion } from "framer-motion";
import { CheckCircle2, HandCoins, Palette, Zap, Target } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
 
const WHATSAPP_LINK = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const CALENDLY_LINK = "https://calendly.com/rodrigo-tristaan";
const EMAIL = "r.tristaan@outlook.com";
 
const themes = {
  blue:    { bg: "#020B18", accent: "#00D4FF", text: "#E0F0FF", sub: "#4A7FA5", card: "#041428" },
  silver:  { bg: "#0A0A0A", accent: "#E5E5E5", text: "#FFFFFF",  sub: "#A3A3A3", card: "#171717" },
  rainbow: { bg: "#0F0218", accent: "#FF00CC", text: "#FFFFFF",  sub: "#A855F7", card: "#1E0B36" }
};
 
// ── Matrix Canvas ──────────────────────────────────────────────────────────────
function MatrixBackground({ accentColor }: { accentColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef  = useRef(accentColor);
 
  useEffect(() => { accentRef.current = accentColor; }, [accentColor]);
 
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    let animId: number;
 
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
 
    const cols   = Math.floor(canvas.width / 20);
    const drops  = Array(cols).fill(1);
 
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
 
      ctx.font = "14px monospace";
 
      drops.forEach((y, i) => {
        const char = Math.random() < 0.5 ? "1" : "0";
        // Brighter lead char, dimmer trail
        const isLead = Math.random() > 0.92;
        ctx.fillStyle = isLead ? "#ffffff" : accentRef.current + "55";
        ctx.fillText(char, i * 20, y * 20);
 
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
 
      animId = requestAnimationFrame(draw);
    };
 
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);
 
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100%", height: "100%",
        opacity: 0.18, pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}
 
// ── Main Component ─────────────────────────────────────────────────────────────
export default function Home() {
  const [theme, setTheme] = useState<keyof typeof themes>("blue");
  const t = themes[theme];
 
  const cycleTheme = () => {
    const keys = Object.keys(themes) as (keyof typeof themes)[];
    setTheme(keys[(keys.indexOf(theme) + 1) % keys.length]);
  };
 
  return (
    <main style={{ backgroundColor: t.bg, color: t.text, minHeight: "100vh", position: "relative", transition: "all 0.5s ease" }}>
 
      {/* Matrix background */}
      <MatrixBackground accentColor={t.accent} />
 
      {/* ── FLOATING BUTTONS ─────────────────────────────────────── */}
      {/* WhatsApp */}
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 font-black text-xs uppercase"
        style={{ bottom: "6rem", right: "1.5rem", backgroundColor: "#25D366", color: "#000" }}
        aria-label="WhatsApp"
      >
        {/* WhatsApp icon inline SVG */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden md:inline">WhatsApp</span>
      </a>
 
      {/* Zoom / Calendly */}
      <a
        href={CALENDLY_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-[100] flex items-center gap-2 px-4 py-3 rounded-full shadow-2xl transition-all hover:scale-105 font-black text-xs uppercase"
        style={{ bottom: "1.5rem", right: "1.5rem", backgroundColor: t.accent, color: t.bg }}
        aria-label="Agendar Zoom"
      >
        {/* Video icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/>
          <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
        <span className="hidden md:inline">Agendar Zoom</span>
      </a>
 
      {/* Theme toggle */}
      <button
        onClick={cycleTheme}
        className="fixed bottom-[10.5rem] right-6 z-[100] p-3 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2"
        style={{ backgroundColor: t.card, color: t.accent, border: `1px solid ${t.accent}40` }}
        aria-label="Cambiar estilo"
      >
        <Palette size={18} />
      </button>
 
      {/* ── NAV ────────────────────────────────────────────────────── */}
      <nav className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: `${t.accent}20`, position: "relative" }}>
        <a href="#inicio">
          <Image src="/logo-satori.png" alt="SATORI" width={120} height={36} className="invert" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problema" className="text-xs font-bold uppercase" style={{ color: t.sub }}>El Problema</a>
          <a href="#servicios" className="text-xs font-bold uppercase" style={{ color: t.sub }}>Soluciones</a>
          <a href="#precios"   className="text-xs font-bold uppercase" style={{ color: t.sub }}>Precios</a>
          <a href={CALENDLY_LINK} target="_blank" className="px-6 py-2 font-black text-xs uppercase" style={{ backgroundColor: t.accent, color: t.bg }}>
            Agendar Zoom
          </a>
        </div>
      </nav>
 
      {/* ── HERO ───────────────────────────────────────────────────── */}
      <section id="inicio" className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-block px-4 py-1 rounded-full border mb-6" style={{ borderColor: `${t.accent}30`, backgroundColor: `${t.accent}05` }}>
            <p className="text-[10px] tracking-[0.3em] uppercase font-black" style={{ color: t.accent }}>Tu negocio local + Inteligencia Artificial</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-none mb-6 tracking-tighter">
            Vende más.<br />
            <span style={{ color: t.accent }} className="italic font-normal">Trabaja menos.</span>
          </h1>
          <p className="text-xl mb-10 opacity-80 max-w-md">
            Te ayudamos a recuperar tu tiempo y a automatizar la captura de clientes usando Inteligencia Artificial. Menos ruido, más billetes.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={CALENDLY_LINK} target="_blank" className="px-10 py-4 font-black uppercase text-sm shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: t.accent, color: t.bg }}>
              Auditoría Gratuita
            </a>
            <a href="#servicios" className="px-10 py-4 border font-bold uppercase text-sm" style={{ borderColor: t.accent, color: t.accent }}>
              Ver Soluciones
            </a>
          </div>
        </motion.div>
        <div className="flex justify-center">
          <Image src="/enso-negro.png" alt="Enso" width={450} height={450} className="invert opacity-100 brightness-150" />
        </div>
      </section>
 
      {/* ── PROBLEMA ───────────────────────────────────────────────── */}
      <section id="problema" className="px-6 py-24 border-y" style={{ backgroundColor: `${t.card}50`, borderColor: `${t.accent}10`, position: "relative", zIndex: 1 }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-tight">¿Tu negocio está perdiendo dinero cada día?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              { Icon: HandCoins, txt: '"Inviertes en anuncios y solo llegan curiosos sin intención de compra."' },
              { Icon: Zap,       txt: '"No tienes tiempo para contestar mensajes al instante y el cliente se va."' },
              { Icon: Target,    txt: '"Tus redes sociales parecen un desierto y tu competencia te está ganando."' },
            ].map(({ Icon, txt }, i) => (
              <div key={i} className="p-8 border-l-2 bg-black/20" style={{ borderColor: `${t.accent}40` }}>
                <Icon size={24} style={{ color: t.accent }} className="mb-5" />
                <p style={{ color: t.sub }} className="font-light italic">{txt}</p>
              </div>
            ))}
          </div>
          <a href={WHATSAPP_LINK} target="_blank" className="mt-12 inline-block font-bold tracking-widest uppercase hover:scale-105 transition-all" style={{ color: t.accent }}>
            Déjanos arreglarlo →
          </a>
        </div>
      </section>
 
      {/* ── NÚMEROS ────────────────────────────────────────────────── */}
      <section className="px-6 py-16" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { n: "24/7", d: "Atención al cliente con IA" },
            { n: "0",    d: "Prospectos desperdiciados" },
            { n: "100%", d: "Garantía de Valor Satori" },
          ].map(({ n, d }, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl font-serif font-bold mb-2" style={{ color: t.accent }}>{n}</p>
              <p className="text-xs tracking-[0.2em] uppercase" style={{ color: t.sub }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── SERVICIOS ──────────────────────────────────────────────── */}
      <section id="servicios" className="px-6 py-24" style={{ backgroundColor: t.card, position: "relative", zIndex: 1 }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.5em] mb-4 font-black" style={{ color: t.accent }}>Lo que construimos por ti</p>
            <h2 className="text-5xl font-serif font-bold leading-tight">Sistemas de<br />Crecimiento Digital.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                t: "Bots de Venta 24/7",
                d: "Creamos agentes de IA entrenados para responder dudas, cotizar y agendar citas por ti en WhatsApp e Instagram. No dejes ir ni una venta más.",
                // Reliable Unsplash URLs with explicit format
                i: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&fm=jpg",
              },
              {
                t: "Estrategia de Contenido",
                d: "No publicamos por publicar. Desarrollamos contenido visual que convierte seguidores en clientes potenciales para tu negocio local.",
                i: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80&fm=jpg",
              },
              {
                t: "Máquinas de Leads (Ads)",
                d: "Campañas de Meta y Google Ads optimizadas para bajar tus costos y subir tus ventas. Te llevamos a gente con dinero en mano.",
                i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fm=jpg",
              },
            ].map((s, i) => (
              <div key={i} className="border overflow-hidden group" style={{ borderColor: `${t.accent}15`, backgroundColor: t.bg }}>
                {/* Use regular <img> to avoid Next.js domain restrictions on Unsplash */}
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
 
      {/* ── PRECIOS ────────────────────────────────────────────────── */}
      <section id="precios" className="px-6 py-24 max-w-6xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif font-bold mb-4">Planes Claros. Sin Contratos.</h2>
          <p className="text-xs uppercase tracking-widest" style={{ color: t.sub }}>Tu Inversión Mensual</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "Arranque",    p: "$4,500",  et: "Presencia básica",  l: ["Estrategia de Contenidos", "12 posts mensuales", "Copywriting con IA", "Soporte vía WhatsApp"] },
            { n: "Crecimiento", p: "$8,500",  et: "El recomendado",    l: ["Todo lo de Arranque", "Gestión de 2 redes sociales", "Producción de Reels/TikToks", "Setup de Chatbot básico", "Reporte de métricas"] },
            { n: "Aceleración", p: "$15,000", et: "Dominio Total",     l: ["Todo lo de Crecimiento", "Gestión agresiva de Ads", "IA Avanzada de ventas", "Producción de video pro", "Consultoría semanal"] },
          ].map((plan, i) => (
            <div key={i} className="p-10 border-t-4 shadow-xl transition-transform hover:scale-[1.02]" style={{ borderColor: t.accent, backgroundColor: t.card }}>
              <p className="text-[10px] tracking-[0.3em] uppercase font-black mb-4" style={{ color: t.accent }}>{plan.et}</p>
              <h3 className="text-3xl font-bold mb-2">{plan.n}</h3>
              <p className="text-4xl font-serif font-bold mb-8">{plan.p}<span className="text-xs font-sans opacity-50 ml-2">/mes MXN</span></p>
              <ul className="space-y-4 mb-10">
                {plan.l.map(item => (
                  <li key={item} className="text-sm opacity-80 flex items-center gap-2">
                    <CheckCircle2 size={14} style={{ color: t.accent }} /> {item}
                  </li>
                ))}
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" className="block text-center py-4 font-black uppercase text-xs" style={{ backgroundColor: t.accent, color: t.bg }}>
                Empezar a Escalar
              </a>
            </div>
          ))}
        </div>
      </section>
 
      {/* ── NOSOTROS ───────────────────────────────────────────────── */}
      <section id="nosotros" className="px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center" style={{ position: "relative", zIndex: 1 }}>
        <div className="relative">
          <Image src="/rodrigo.png" alt="Rodrigo Tristán" width={500} height={600} className="grayscale hover:grayscale-0 transition-all duration-700 object-cover" />
          <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2" style={{ borderColor: t.accent }}></div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-black mb-6" style={{ color: t.accent }}>Tu Socio Digital</p>
          <h2 className="text-6xl font-serif font-bold mb-4">Rodrigo Tristán</h2>
          <p className="text-sm uppercase tracking-widest mb-10" style={{ color: t.sub }}>Fundador de SATORI</p>
          <div className="space-y-6 opacity-70 mb-10 text-lg leading-relaxed">
            <p className="text-2xl italic font-medium" style={{ color: t.text }}>"La tecnología no es un lujo; es el empleado que no duerme."</p>
            <p>Soy Rodrigo Tristán y fundé Satori porque me di cuenta de que la IA y la automatización eran privilegios de grandes empresas.</p>
            <p>Mi objetivo es democratizar esta tecnología y ponerla a trabajar para negocios locales como el tuyo, para que puedas enfocarte en lo que mejor sabes hacer.</p>
            <div className="p-6 border" style={{ borderColor: `${t.accent}30`, backgroundColor: `${t.accent}05` }}>
              <p className="font-bold mb-2" style={{ color: t.text }}>Garantía de Valor:</p>
              <p className="text-sm italic">Si en 30 días no sientes que el valor de nuestro servicio supera lo que pagaste, te devolvemos tu dinero. Sin preguntas.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <a href={CALENDLY_LINK} target="_blank" className="px-8 py-4 font-bold border" style={{ borderColor: t.accent, color: t.accent }}>
              Agendar en Zoom
            </a>
            <a href={`mailto:${EMAIL}`} className="px-8 py-4 font-bold opacity-60 hover:opacity-100">
              Enviar Email
            </a>
          </div>
        </div>
      </section>
 
      {/* ── FOOTER ─────────────────────────────────────────────────── */}
      <footer className="px-6 py-12 border-t text-center flex flex-col md:flex-row justify-between items-center gap-6" style={{ borderColor: `${t.accent}10`, position: "relative", zIndex: 1 }}>
        <Image src="/logo-satori.png" alt="SATORI" width={100} height={30} className="invert" />
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-50">© 2026 SATORI · Soluciones Digitales con IA · San Luis Potosí, MX</p>
      </footer>
 
    </main>
  );
}