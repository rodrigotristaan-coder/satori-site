"use client";
 
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, CheckCircle2, HandCoins, Palette } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
 
// CONFIGURACIÓN - IMPORTANTE ACTUALIZAR ESTO:
const WHATSAPP_LINK = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const CALENDLY_LINK = "https://calendly.com/rodrigo-tristaan"; // Pon tu usuario de Calendly aquí
const EMAIL = "r.tristaan@outlook.com";

// PALETAS DE COLORES (Variables CSS rápidas)
const themes = {
  blue: { bg: "#020B18", accent: "#00D4FF", text: "#E0F0FF", sub: "#4A7FA5", card: "#041428" },
  silver: { bg: "#0A0A0A", accent: "#E5E5E5", text: "#FFFFFF", sub: "#A3A3A3", card: "#171717" },
  rainbow: { bg: "#0F0218", accent: "#FF00CC", text: "#FFFFFF", sub: "#A855F7", card: "#1E0B36" }
};
 
const content = {
  es: {
    nav: { cta: "Agendar Zoom" },
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
      sub: "Recupera tu tiempo y automatiza la captura de clientes usando IA. Menos ruido, más billetes.",
      cta1: "Agendar Auditoría",
      cta2: "WhatsApp",
    },
    servicios: {
      items: [
        {
          titulo: "Bots de Venta 24/7",
          desc: "Agentes de IA que responden dudas y agendan citas por ti en WhatsApp e Instagram.",
          // Imagen corregida
          img: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=800&q=80",
        },
        {
          titulo: "Estrategia de Contenido",
          desc: "Contenido visual estratégico que convierte seguidores en clientes reales.",
          img: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80",
        },
        {
          titulo: "Máquinas de Leads",
          desc: "Campañas de Ads optimizadas con IA para atraer clientes con intención de compra.",
          img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        },
      ],
    },
    paquetes: {
      items: [
        { nombre: "Arranque", precio: "$4,500", items: ["12 posts mensuales", "Copywriting con IA", "Soporte vía WhatsApp"] },
        { nombre: "Crecimiento", precio: "$8,500", items: ["Todo lo de Arranque", "Producción de Reels", "Setup de Chatbot básico"] },
        { nombre: "Aceleración", precio: "$15,000", items: ["Todo lo de Crecimiento", "Gestión de Ads", "IA Avanzada de ventas"] },
      ],
    },
    nosotros: {
      // Texto corregido sin dobles ""
      cita: "La tecnología no es un lujo; es el empleado que no duerme.",
      p4b: "Garantía Satori: Si en 30 días no ves valor, te devolvemos tu inversión.",
    }
  }
};
 
export default function Home() {
  const [theme, setTheme] = useState<keyof typeof themes>("blue");
  const t = content.es;
  const currentTheme = themes[theme];

  const cycleTheme = () => {
    const keys = Object.keys(themes) as (keyof typeof themes)[];
    const currentIndex = keys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % keys.length;
    setTheme(keys[nextIndex]);
  };

  return (
    <main style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: "100vh", position: "relative", transition: "all 0.5s ease" }}>
      
      {/* BOTÓN FLOTANTE DE DISEÑO */}
      <button 
        onClick={cycleTheme}
        className="fixed bottom-6 right-6 z-[100] p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2"
        style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}
      >
        <Palette size={20} />
        <span className="text-xs font-black uppercase hidden md:block">Cambiar Estilo</span>
      </button>

      {/* NAV */}
      <nav className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: `${currentTheme.accent}20` }}>
        <a href="#inicio">
          <Image src="/logo-satori.png" alt="SATORI" width={120} height={36} className="invert" />
        </a>
        <div className="hidden md:flex items-center gap-8">
          {t.navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-xs font-bold uppercase hover:opacity-70" style={{ color: currentTheme.sub }}>{link.label}</a>
          ))}
          <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="px-6 py-2 font-black text-xs uppercase" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}>{t.nav.cta}</a>
        </div>
      </nav>
 
      {/* HERO */}
      <section id="inicio" className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-none mb-6 tracking-tighter">
            {t.hero.h1a}<br />
            <span style={{ color: currentTheme.accent }} className="italic font-normal">{t.hero.h1b}</span>
          </h1>
          <p className="text-xl mb-10 opacity-80 max-w-md">{t.hero.sub}</p>
          <div className="flex flex-wrap gap-4">
            <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 font-black uppercase text-sm shadow-lg" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}>{t.hero.cta1}</a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="px-10 py-4 border font-bold uppercase text-sm" style={{ borderColor: currentTheme.accent, color: currentTheme.accent }}>{t.hero.cta2}</a>
          </div>
        </motion.div>
        <div className="flex justify-center">
            {/* ENSO PRINCIPAL - CORREGIDO (SIN OPACIDAD) */}
            <Image src="/enso-negro.png" alt="Enso" width={450} height={450} className="invert opacity-100 brightness-150" />
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-6 py-24 bg-black/20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {t.servicios.items.map((s, i) => (
            <div key={i} className="border overflow-hidden" style={{ borderColor: `${currentTheme.accent}15`, backgroundColor: currentTheme.card }}>
              <img src={s.img} alt={s.titulo} className="w-full h-48 object-cover" />
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{s.titulo}</h3>
                <p className="text-sm opacity-70 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {t.paquetes.items.map((p, i) => (
            <div key={i} className="p-10 border-t-4" style={{ borderColor: currentTheme.accent, backgroundColor: currentTheme.card }}>
              <h3 className="text-3xl font-bold mb-2">{p.nombre}</h3>
              <p className="text-4xl font-serif font-bold mb-8">{p.precio}</p>
              <ul className="space-y-4 mb-10">
                {p.items.map(item => <li key={item} className="text-sm opacity-80 flex items-center gap-2"><CheckCircle2 size={14} /> {item}</li>)}
              </ul>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="block text-center py-4 font-black uppercase text-xs" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}>Empezar</a>
            </div>
          ))}
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <Image src="/rodrigo.png" alt="Rodrigo" width={500} height={600} className="grayscale hover:grayscale-0 transition-all duration-700" />
        <div>
          <h2 className="text-5xl font-serif font-bold mb-8">Rodrigo Tristán</h2>
          <p className="text-2xl italic mb-8" style={{ color: currentTheme.accent }}>"{t.nosotros.cita}"</p>
          <p className="opacity-70 mb-8">{t.nosotros.p4b}</p>
          <a href={CALENDLY_LINK} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 font-bold border" style={{ borderColor: currentTheme.accent, color: currentTheme.accent }}>Agendar en Zoom</a>
        </div>
      </section>
    </main>
  );
}