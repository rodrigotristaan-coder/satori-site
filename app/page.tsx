"use client";
 
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, MessageCircle, CheckCircle2, HandCoins, Palette, Zap, Target, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
 
const WHATSAPP_LINK = "https://wa.me/525625018281?text=Hola%20Rodrigo,%20vi%20tu%20página%20y%20me%20gustaría%20una%20auditoría.";
const CALENDLY_LINK = "https://calendly.com/r-tristaan/30min"; 
const EMAIL = "r.tristaan@outlook.com";

const themes = {
  blue: { bg: "#020B18", accent: "#00D4FF", text: "#E0F0FF", sub: "#4A7FA5", card: "#041428" },
  silver: { bg: "#0A0A0A", accent: "#E5E5E5", text: "#FFFFFF", sub: "#A3A3A3", card: "#171717" },
  rainbow: { bg: "#0F0218", accent: "#FF00CC", text: "#FFFFFF", sub: "#A855F7", card: "#1E0B36" }
};
 
export default function Home() {
  const [theme, setTheme] = useState<keyof typeof themes>("blue");
  const currentTheme = themes[theme];

  const cycleTheme = () => {
    const keys = Object.keys(themes) as (keyof typeof themes)[];
    const currentIndex = keys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % keys.length;
    setTheme(keys[nextIndex]);
  };

  return (
    <main style={{ backgroundColor: currentTheme.bg, color: currentTheme.text, minHeight: "100vh", position: "relative", transition: "all 0.5s ease" }}>
      
      <button onClick={cycleTheme} className="fixed bottom-6 right-6 z-[100] p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center gap-2" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}>
        <Palette size={20} />
        <span className="text-xs font-black uppercase hidden md:block">Cambiar Estilo</span>
      </button>

      <nav className="w-full px-6 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md border-b" style={{ borderColor: `${currentTheme.accent}20` }}>
        <a href="#inicio"><Image src="/logo-satori.png" alt="SATORI" width={120} height={36} className="invert" /></a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#problema" className="text-xs font-bold uppercase" style={{ color: currentTheme.sub }}>El Problema</a>
          <a href="#servicios" className="text-xs font-bold uppercase" style={{ color: currentTheme.sub }}>Soluciones</a>
          <a href="#precios" className="text-xs font-bold uppercase" style={{ color: currentTheme.sub }}>Precios</a>
          <a href={CALENDLY_LINK} target="_blank" className="px-6 py-2 font-black text-xs uppercase" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}>Agendar Zoom</a>
        </div>
      </nav>
 
      {/* HERO */}
      <section id="inicio" className="px-6 py-20 max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-block px-4 py-1 rounded-full border mb-6" style={{ borderColor: `${currentTheme.accent}30`, backgroundColor: `${currentTheme.accent}05` }}>
             <p className="text-[10px] tracking-[0.3em] uppercase font-black" style={{ color: currentTheme.accent }}>Tu negocio local + IA</p>
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold leading-none mb-6 tracking-tighter">
            Vende más.<br />
            <span style={{ color: currentTheme.accent }} className="italic font-normal">Trabaja menos.</span>
          </h1>
          <p className="text-xl mb-10 opacity-80 max-w-md">Recupera tu tiempo y automatiza la captura de clientes usando IA. Menos ruido, más billetes.</p>
          <div className="flex flex-wrap gap-4">
            <a href={CALENDLY_LINK} target="_blank" className="px-10 py-4 font-black uppercase text-sm" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}>Agendar Auditoría</a>
            <a href={WHATSAPP_LINK} target="_blank" className="px-10 py-4 border font-bold uppercase text-sm" style={{ borderColor: currentTheme.accent, color: currentTheme.accent }}>WhatsApp</a>
          </div>
        </motion.div>
        <div className="flex justify-center">
            <Image src="/enso-negro.png" alt="Enso" width={450} height={450} className="invert opacity-100 brightness-150" />
        </div>
      </section>

      {/* SECCIÓN DEL PROBLEMA */}
      <section id="problema" className="px-6 py-24 border-y" style={{ backgroundColor: `${currentTheme.card}50`, borderColor: `${currentTheme.accent}10` }}>
        <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-serif mb-12 leading-tight">¿Tu negocio está perdiendo dinero cada día?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
                <div className="p-8 border-l-2 bg-black/20" style={{ borderColor: `${currentTheme.accent}40` }}>
                    <HandCoins size={24} style={{ color: currentTheme.accent }} className="mb-5" />
                    <p style={{ color: currentTheme.sub }} className="font-light italic">"Inviertes en anuncios y solo llegan curiosos sin intención de compra."</p>
                </div>
                <div className="p-8 border-l-2 bg-black/20" style={{ borderColor: `${currentTheme.accent}40` }}>
                    <Zap size={24} style={{ color: currentTheme.accent }} className="mb-5" />
                    <p style={{ color: currentTheme.sub }} className="font-light italic">"No tienes tiempo para contestar mensajes al instante y el cliente se va."</p>
                </div>
                <div className="p-8 border-l-2 bg-black/20" style={{ borderColor: `${currentTheme.accent}40` }}>
                    <Target size={24} style={{ color: currentTheme.accent }} className="mb-5" />
                    <p style={{ color: currentTheme.sub }} className="font-light italic">"Tus redes parecen un desierto y tu competencia te está ganando."</p>
                </div>
            </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-6 py-24" style={{ backgroundColor: currentTheme.card }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.5em] mb-4 font-black" style={{ color: currentTheme.accent }}>Lo que construimos por ti</p>
            <h2 className="text-5xl font-serif font-bold">Sistemas de Crecimiento.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Bots de Venta 24/7", d: "Agentes de IA que responden dudas y agendan citas por ti en WhatsApp e Instagram.", i: "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?w=800&q=80" },
              { t: "Estrategia de Contenido", d: "Contenido visual estratégico que convierte seguidores en clientes reales para tu negocio.", i: "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=800&q=80" },
              { t: "Máquinas de Leads", d: "Campañas de Ads optimizadas con IA para atraer clientes con dinero en mano.", i: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" }
            ].map((s, i) => (
              <div key={i} className="border overflow-hidden group" style={{ borderColor: `${currentTheme.accent}15`, backgroundColor: currentTheme.bg }}>
                <img src={s.i} alt={s.t} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4">{s.t}</h3>
                  <p className="text-sm opacity-70 leading-relaxed" style={{ color: currentTheme.sub }}>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRECIOS */}
      <section id="precios" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
            <h2 className="text-5xl font-serif font-bold mb-4">Planes Claros.</h2>
            <p className="text-xs uppercase tracking-widest" style={{ color: currentTheme.sub }}>Tu Inversión Mensual</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { n: "Arranque", p: "$4,500", l: ["12 posts mensuales", "Copywriting con IA", "Soporte vía WhatsApp"] },
            { n: "Crecimiento", p: "$8,500", l: ["Todo lo de Arranque", "Producción de Reels", "Setup de Chatbot básico"] },
            { n: "Aceleración", p: "$15,000", l: ["Todo lo de Crecimiento", "Gestión de Ads", "IA Avanzada de ventas"] }
          ].map((p, i) => (
            <div key={i} className="p-10 border-t-4 shadow-xl" style={{ borderColor: currentTheme.accent, backgroundColor: currentTheme.card }}>
              <h3 className="text-3xl font-bold mb-2">{p.n}</h3>
              <p className="text-4xl font-serif font-bold mb-8">{p.p}<span className="text-xs font-sans opacity-50 ml-2">/mes</span></p>
              <ul className="space-y-4 mb-10">
                {p.l.map(item => <li key={item} className="text-sm opacity-80 flex items-center gap-2"><CheckCircle2 size={14} style={{ color: currentTheme.accent }} /> {item}</li>)}
              </ul>
              <a href={WHATSAPP_LINK} className="block text-center py-4 font-black uppercase text-xs" style={{ backgroundColor: currentTheme.accent, color: currentTheme.bg }}>Empezar</a>
            </div>
          ))}
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="px-6 py-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <Image src="/rodrigo.png" alt="Rodrigo" width={500} height={600} className="grayscale hover:grayscale-0 transition-all duration-700" />
        <div>
          <p className="text-xs uppercase tracking-[0.4em] font-black mb-6" style={{ color: currentTheme.accent }}>Tu Socio Digital</p>
          <h2 className="text-6xl font-serif font-bold mb-4">Rodrigo Tristán</h2>
          <p className="text-2xl italic mb-8" style={{ color: currentTheme.accent }}>"La tecnología no es un lujo; es el empleado que no duerme."</p>
          <div className="space-y-6 opacity-70 mb-10">
              <p>Fundé Satori para democratizar la IA y ponerla a trabajar para negocios locales, permitiéndote enfocarte en lo que mejor sabes hacer.</p>
              <div className="p-6 border" style={{ borderColor: `${currentTheme.accent}30`, backgroundColor: `${currentTheme.accent}05` }}>
                <p className="font-bold mb-2" style={{ color: currentTheme.text }}>Garantía Satori:</p>
                <p className="text-sm italic">Si en 30 días no sientes que el valor de nuestro servicio supera lo que pagaste, te devolvemos tu dinero. Sin preguntas.</p>
              </div>
          </div>
          <a href={CALENDLY_LINK} className="inline-block px-8 py-4 font-bold border" style={{ borderColor: currentTheme.accent, color: currentTheme.accent }}>Agendar en Zoom</a>
        </div>
      </section>
      
      <footer className="px-6 py-12 border-t text-center" style={{ borderColor: `${currentTheme.accent}10` }}>
        <p className="text-[10px] tracking-[0.3em] uppercase opacity-50">© 2026 SATORI · San Luis Potosí, MX</p>
      </footer>
    </main>
  );
}