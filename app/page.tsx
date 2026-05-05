"use client";
 
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, CheckCircle2, Zap, Target, TrendingUp, HandCoins } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
 
const WHATSAPP_LINK = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría%20sin%20costo%20para%20mi%20negocio.";
const EMAIL = "r.tristaan@outlook.com";
 
const content = {
  es: {
    nav: { cta: "Auditoría Gratuita" },
    navLinks: [
      { label: "Inicio", href: "#inicio" },
      { label: "El Problema", href: "#problema" },
      { label: "Soluciones", href: "#servicios" },
      { label: "Precios", href: "#precios" },
      { label: "Nosotros", href: "#nosotros" },
    ],
    hero: {
      tag: "Tu negocio local + Inteligencia Artificial",
      h1a: "Vende más.",
      h1b: "Trabaja menos.",
      sub: "Te ayudamos a recuperar tu tiempo y a automatizar la captura de clientes usando Inteligencia Artificial. Menos ruido, más billetes.",
      cta1: "Auditoría Gratuita",
      cta2: "Ver Soluciones",
    },
    problema: {
      h2: "¿Tu negocio está perdiendo dinero cada día?",
      p1: "Inviertes en anuncios y solo llegan curiosos sin intención de compra.",
      p2: "No tienes tiempo para contestar mensajes al instante y el cliente se va.",
      p3: "Tus redes sociales parecen un desierto y tu competencia te está ganando.",
      cta: "Déjanos arreglarlo",
    },
    numeros: [
      { numero: "24/7", label: "Atención al cliente con IA" },
      { numero: "0", label: "Prospectos desperdiciados" },
      { numero: "100%", label: "Garantía de Valor Satori" },
    ],
    servicios: {
      tag: "Lo que construimos por ti",
      h2a: "Sistemas de",
      h2b: "Crecimiento Digital.",
      items: [
        {
          titulo: "Bots de Venta 24/7",
          desc: "Creamos agentes de IA entrenados para responder dudas, cotizar y agendar citas por ti en WhatsApp e Instagram. No dejes ir ni una venta más.",
          img: "https://images.unsplash.com/photo-1596526123944-fe64e32152a5?w=900&q=80",
        },
        {
          titulo: "Estrategia de Contenido",
          desc: "No publicamos por publicar. Desarrollamos contenido visual que convierte seguidores en clientes potenciales para tu negocio local.",
          img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80",
        },
        {
          titulo: "Máquinas de Leads (Ads)",
          desc: "Campañas de Meta y Google Ads optimizadas para bajar tus costos y subir tus ventas. Te llevamos a gente con dinero en mano.",
          img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80",
        },
      ],
    },
    paquetes: {
      tag: "Tu Inversión",
      h2: "Planes Claros. Sin Contratos.",
      items: [
        { nombre: "Arranque", precio: "$4,500", etiqueta: "Presencia básica", items: ["Estrategia de Contenidos", "12 posts mensuales", "Copywriting con IA", "Soporte vía WhatsApp"] },
        { nombre: "Crecimiento", precio: "$8,500", etiqueta: "El recomendado", items: ["Todo lo de Arranque", "Gestión de 2 redes sociales", "Producción de Reels/TikToks", "Setup de Chatbot básico", "Reporte de métricas"] },
        { nombre: "Aceleración", precio: "$15,000", etiqueta: "Dominio Total", items: ["Todo lo de Crecimiento", "Gestión agresiva de Ads", "IA Avanzada de ventas", "Producción de video pro", "Consultoría semanal"] },
      ],
      cta: "Empezar a Escalar",
    },
    nosotros: {
      tag: "Tu Socio Digital",
      cargo: "Fundador de SATORI",
      cita: "\"La tecnología no es un lujo; es el empleado que no duerme.\"",
      p1: "Soy Rodrigo Tristán y fundé Satori porque me di cuenta de que la IA y la automatización eran privilegios de grandes empresas.",
      p2: "Mi objetivo es democratizar esta tecnología y ponerla a trabajar para negocios locales como el tuyo, para que puedas enfocarte en lo que mejor sabes hacer.",
      p3b: "No somos una agencia más; somos tu departamento de crecimiento externo.",
      p4b: "Garantía de Valor: Si en 30 días no sientes que el valor de nuestro servicio supera lo que pagaste, te devolvemos tu dinero. Sin preguntas.",
    },
    contacto: {
      tag: "¿Listo para facturar más?",
      h2a: "Hablemos de cómo",
      h2b: "hacerlo realidad.",
      sub: "Agenda una auditoría gratuita de 15 minutos por WhatsApp. Analizaremos tu presencia digital y te daremos 3 consejos accionables de inmediato.",
      cta1: "Hablar en WhatsApp",
      cta2: "Enviar un Email",
      cta3: "Llamar directo",
    },
    footer: "© 2026 SATORI · Soluciones Digitales con IA · San Luis Potosí, MX",
  },
  en: {
    nav: { cta: "Free Audit" },
    navLinks: [
      { label: "Home", href: "#inicio" },
      { label: "Problem", href: "#problema" },
      { label: "Solutions", href: "#servicios" },
      { label: "Pricing", href: "#precios" },
      { label: "About", href: "#nosotros" },
    ],
    hero: {
        tag: "Local Business + AI",
        h1a: "Sell more.",
        h1b: "Work less.",
        sub: "We help local businesses reclaim their time and automate client acquisition using AI. Less noise, more cashflow.",
        cta1: "Free Audit",
        cta2: "See Solutions",
    },
    problema: { h2: "Is your business losing money every day?", p1: "", p2: "", p3: "", cta: "" },
    numeros: [],
    servicios: { tag: "", h2a: "", h2b: "", items: [] },
    paquetes: { tag: "Investment", h2: "Clear Plans. No Contracts.", items: [], cta: "" },
    nosotros: { tag: "", cargo: "", cita: "", p1: "", p2: "", p3b: "", p4b: "" },
    contacto: { tag: "", h2a: "", h2b: "", sub: "", cta1: "", cta2: "", cta3: "" },
    footer: ""
  },
};
 
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
      ctx.fillStyle = "rgba(0, 212, 255, 0.12)";
      ctx.font = "14px monospace";
      for (let i = 0; i < drops.length; i++) {
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", i * 20, drops[i] * 20);
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 60);
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { clearInterval(interval); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", top: 0, left: 0, zIndex: 0, opacity: 0.3, pointerEvents: "none" }} />;
}
 
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
        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        style={{ backgroundColor: "rgba(2,11,24,0.9)", borderBottom: "1px solid rgba(0,212,255,0.1)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(12px)" }}
        className="w-full px-6 md:px-12 py-4 flex items-center justify-between"
      >
        <a href="#inicio" className="flex items-center gap-2">
           <Image src="/logo-satori.png" alt="SATORI" width={140} height={42} priority style={{ filter: "brightness(0) invert(1)" }} />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {t.navLinks.map((link) => (
            <a key={link.label} href={link.href}
              className="text-xs tracking-[0.15em] uppercase font-bold transition-colors text-[#4A7FA5] hover:text-[#00D4FF]"
            >{link.label}</a>
          ))}
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
            className="text-xs tracking-[0.12em] uppercase px-6 py-3 font-black transition-all bg-[#00D4FF] text-[#020B18] hover:bg-[#00b8d9] shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >{t.nav.cta}</a>
        </div>
        <button className="md:hidden text-[#00D4FF] font-bold text-sm tracking-widest" onClick={() => setMenuAbierto(!menuAbierto)}>
           {menuAbierto ? "CERRAR" : "MENU"}
        </button>
      </motion.nav>
 
      {/* Mobile Menu */}
      <AnimatePresence>
        {menuAbierto && (
            <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}
              className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[#020B18]/95 p-12"
            >
                {t.navLinks.map((link) => (
                    <a key={link.label} href={link.href} onClick={() => setMenuAbierto(false)}
                      className="text-3xl font-serif font-bold text-[#00D4FF] tracking-tight"
                    >{link.label}</a>
                ))}
                 <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                   onClick={() => setMenuAbierto(false)}
                   className="text-sm tracking-[0.12em] uppercase px-8 py-4 font-black transition-all bg-[#00D4FF] text-[#020B18]"
                 >{t.nav.cta}</a>
            </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section id="inicio" className="px-6 md:px-12 pt-20 pb-32 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-1 rounded-full border border-[#00D4FF]/30 mb-6 bg-[#00D4FF]/5">
               <p className="text-[10px] tracking-[0.3em] uppercase font-black text-[#00D4FF]">{t.hero.tag}</p>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.95] tracking-tighter mb-8 text-[#E0F0FF]">
              {t.hero.h1a}<br />
              <span className="italic font-normal text-[#00D4FF]">{t.hero.h1b}</span>
            </h1>
            <p className="text-xl leading-relaxed mb-10 font-light text-[#4A7FA5] max-w-md">
              {t.hero.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-10 py-5 text-sm tracking-[0.1em] uppercase font-black bg-[#00D4FF] text-[#020B18] transition-all hover:scale-105 hover:bg-[#00b8d9] shadow-xl">
                {t.hero.cta1} <MessageCircle size={18} />
              </a>
              <a href="#servicios" className="flex items-center justify-center px-10 py-5 text-sm tracking-[0.1em] uppercase font-bold border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all">
                {t.hero.cta2}
              </a>
            </div>
          </motion.div>
          <div className="hidden md:flex justify-end opacity-40">
             <Image src="/enso-negro.png" alt="Satori Concept" width={400} height={400} className="invert brightness-150" />
          </div>
        </div>
      </section>

      {/* SECCIÓN DEL PROBLEMA */}
      <section id="problema" className="px-6 md:px-12 py-24 bg-[#041428]/50 border-y border-[#00D4FF]/10 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-12 text-[#E0F0FF] leading-tight max-w-xl mx-auto">{t.problema.h2}</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                {[t.problema.p1, t.problema.p2, t.problema.p3].map((p, i) => (
                    <div key={i} className="p-8 border-l-2 border-[#00D4FF]/20 bg-[#020B18]/40">
                        <HandCoins size={24} className="text-[#00D4FF] mb-5" />
                        <p className="text-[#4A7FA5] font-light leading-relaxed italic text-base">"{p}"</p>
                    </div>
                ))}
            </div>
             <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="mt-12 inline-block text-[#00D4FF] font-bold tracking-widest uppercase hover:scale-105 transition-all">
               {t.problema.cta} →
            </a>
        </div>
      </section>
 
      {/* NÚMEROS */}
      <section className="px-6 md:px-12 py-16 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.numeros.map((r, i) => (
            <div key={i} className="text-center">
              <p className="text-5xl font-serif font-bold text-[#00D4FF] mb-2">{r.numero}</p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#4A7FA5]">{r.label}</p>
            </div>
          ))}
        </div>
      </section>
 
      {/* SERVICIOS */}
      <section id="servicios" className="px-6 md:px-12 py-28 relative z-10 bg-[#041428]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center md:text-left max-w-xl">
            <p className="text-xs uppercase tracking-[0.5em] mb-4 font-black text-[#00D4FF]">{t.servicios.tag}</p>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-[#E0F0FF]">
              {t.servicios.h2a}<br />{t.servicios.h2b}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.servicios.items.map((s, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="bg-[#020B18] overflow-hidden border border-[#00D4FF]/10 group">
                <div className="h-56 overflow-hidden">
                    <img src={s.img} alt={s.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-[#E0F0FF]">{s.titulo}</h3>
                    <p className="text-[#4A7FA5] font-light leading-relaxed text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* PRECIOS / PAQUETES */}
      <section id="precios" className="px-6 md:px-12 py-28 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-5xl font-serif font-bold text-[#E0F0FF] mb-4">{t.paquetes.h2}</h2>
            <p className="text-[#4A7FA5] tracking-widest uppercase text-xs">{t.paquetes.tag}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {t.paquetes.items.map((p, i) => (
              <div key={i} className={`p-10 border flex flex-col ${destacados[i] ? "border-[#00D4FF] bg-[#00D4FF]/5 scale-105 z-20 shadow-xl" : "border-[#00D4FF]/10 bg-[#041428]"}`}>
                <p className={`text-[10px] tracking-[0.3em] uppercase font-black mb-4 ${destacados[i] ? "text-[#00D4FF]" : "text-[#4A7FA5]"}`}>{p.etiqueta}</p>
                <h3 className="text-3xl font-bold text-[#E0F0FF] mb-2">{p.nombre}</h3>
                <p className="text-4xl font-serif font-bold text-[#E0F0FF] mb-12">{p.precio}<span className="text-xs font-sans text-[#4A7FA5]">/mes MXN</span></p>
                <ul className="space-y-4 mb-14 flex-1">
                  {p.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#4A7FA5] font-light">
                      <CheckCircle2 size={16} className="text-[#00D4FF] mt-0.5 flex-shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className={`text-center py-4 text-xs tracking-widest uppercase font-black transition-all ${destacados[i] ? "bg-[#00D4FF] text-[#020B18] hover:bg-[#00b8d9]" : "border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/10"}`}>
                   {t.paquetes.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
 
      {/* NOSOTROS */}
      <section id="nosotros" className="px-6 md:px-12 py-32 bg-[#041428] relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] bg-[#020B18] relative z-10 overflow-hidden">
                <Image src="/rodrigo.png" alt="Rodrigo Tristan" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
            </div>
            <div className="absolute -top-10 -left-10 w-40 h-40 border-t border-l border-[#00D4FF]/30" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border-b border-r border-[#00D4FF]/30" />
          </div>
          <div>
            <p className="text-[#00D4FF] tracking-[0.4em] uppercase text-xs font-black mb-6">{t.nosotros.tag}</p>
            <h2 className="text-6xl font-serif font-bold text-[#E0F0FF] mb-4 tracking-tight">Rodrigo Tristán</h2>
            <p className="text-[#4A7FA5] uppercase tracking-widest text-sm mb-10">{t.nosotros.cargo}</p>
            <div className="space-y-6 text-[#4A7FA5] font-light text-lg leading-relaxed">
                <p className="text-xl text-[#E0F0FF] italic font-medium leading-relaxed">"{t.nosotros.cita}"</p>
                <p>{t.nosotros.p1}</p>
                <p>{t.nosotros.p2}</p>
                <div className="p-6 border border-[#00D4FF]/20 bg-[#00D4FF]/5">
                    <p className="text-[#E0F0FF] font-bold text-base mb-2">Mi Garantía Personal:</p>
                    <p className="text-sm italic">{t.nosotros.p4b}</p>
                </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* CONTACTO */}
      <section id="contacto" className="px-6 md:px-12 py-32 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#E0F0FF] mb-6 leading-none">
            {t.contacto.h2a}<br />
            <span className="text-[#00D4FF] italic font-normal">{t.contacto.h2b}</span>
          </h2>
          <p className="text-xl text-[#4A7FA5] font-light mb-12 max-w-lg mx-auto">{t.contacto.sub}</p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-12 py-6 bg-[#00D4FF] text-[#020B18] font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,212,255,0.2)] hover:bg-[#00b8d9]">
                {t.contacto.cta1}
            </a>
            <a href={`mailto:${EMAIL}`} className="px-12 py-6 border border-[#00D4FF]/30 text-[#00D4FF] font-black uppercase tracking-widest text-sm hover:bg-[#00D4FF]/10 transition-all">
                {t.contacto.cta2}
            </a>
          </div>
        </div>
      </section>
 
      <footer className="px-6 md:px-12 py-12 border-t border-[#00D4FF]/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center bg-[#020B18] relative z-10 gap-8">
        <Image src="/logo-satori.png" alt="SATORI" width={120} height={36} style={{ filter: "brightness(0) invert(1)" }} />
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#4A7FA5]">{t.footer}</p>
      </footer>
    </main>
  );
}