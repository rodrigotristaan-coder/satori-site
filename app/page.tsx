"use client";
 
import { motion } from "framer-motion";
import { ArrowRight, PenTool, Sparkles, Brain, Megaphone } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
 
const servicios = [
  {
    titulo: "Creación de Contenido",
    descripcion: "Estrategia, copy y diseño visual que convierte seguidores en clientes.",
    icono: PenTool,
    estado: "Disponible",
  },
  {
    titulo: "Gestión de Redes Sociales",
    descripcion: "Tu presencia digital activa y coherente todos los días, sin que tengas que preocuparte.",
    icono: Sparkles,
    estado: "Disponible",
  },
  {
    titulo: "Medios Pagados",
    descripcion: "Campañas diseñadas para generar retorno real desde el primer peso invertido.",
    icono: Megaphone,
    estado: "Próximamente",
  },
  {
    titulo: "Sistemas con IA",
    descripcion: "Automatización e inteligencia artificial que trabajan por ti las 24 horas.",
    icono: Brain,
    estado: "Próximamente",
  },
];
 
const paquetes = [
  {
    nombre: "Básico",
    precio: "$3,500",
    etiqueta: "Para empezar",
    items: ["12 posts al mes", "1 red social", "Diseño + copy", "Reporte mensual"],
    destacado: false,
  },
  {
    nombre: "Pro",
    precio: "$6,500",
    etiqueta: "El más elegido",
    items: ["20 posts al mes", "2 redes sociales", "Stories + Reels", "Gestión de comunidad", "Reporte + estrategia"],
    destacado: true,
  },
  {
    nombre: "Premium",
    precio: "$12,000",
    etiqueta: "Crecimiento total",
    items: ["Todo lo del Pro", "3 redes sociales", "Contenido en video", "Ads incluidos", "Reunión semanal"],
    destacado: false,
  },
];
 
const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];
 
function TexturaGrid() {
  const puntos: { x: number; y: number }[] = [];
  for (let r = 0; r < 20; r++)
    for (let c = 0; c < 30; c++)
      puntos.push({ x: c * 28 + 14, y: r * 28 + 14 });
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none" }}>
      {puntos.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="#1E1F23" />)}
    </svg>
  );
}
 
function TexturaLineas() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.05, pointerEvents: "none" }}>
      <defs>
        <pattern id="diag" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diag)" />
    </svg>
  );
}
 
export default function Home() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const WHATSAPP_LINK = "https://wa.me/525625018182";
 
  return (
    <main className="min-h-screen bg-[#F7F7F8] text-[#0D0D0F] overflow-x-hidden">
 
      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-black/8 sticky top-0 z-50 backdrop-blur-md bg-[#F7F7F8]/90"
      >
        <a href="#inicio">
          <Image src="/LOGO_SATORI-removebg-preview.png" alt="SATORI" width={160} height={50} priority />
        </a>
 
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm tracking-[0.12em] uppercase text-[#5B626B] hover:text-[#0D0D0F] transition-colors">
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="text-sm tracking-[0.12em] uppercase border border-black/20 px-6 py-3 hover:bg-black hover:text-white transition-all text-[#1E1F23]">
            Hablar con nosotros
          </a>
        </div>
 
        <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMenuAbierto(!menuAbierto)}>
          <span className={`block w-6 h-px bg-[#0D0D0F] transition-all duration-300 ${menuAbierto ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-[#0D0D0F] transition-all duration-300 ${menuAbierto ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#0D0D0F] transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </motion.nav>
 
      {/* MENU MÓVIL */}
      {menuAbierto && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#F7F7F8] flex flex-col items-center justify-center gap-10">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuAbierto(false)} className="text-3xl font-serif tracking-[0.1em] text-[#0D0D0F]">
              {link.label}
            </a>
          ))}
        </div>
      )}
 
      {/* HERO */}
      <section id="inicio" className="px-6 md:px-12 pt-24 md:pt-32 pb-28 relative overflow-hidden">
        <TexturaGrid />
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_400px] gap-16 items-center relative">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <p className="text-xs tracking-[0.28em] uppercase text-[#5B626B] mb-8">
              Marketing · IA · Resultados reales
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.95] tracking-[-0.03em] text-[#0D0D0F] mb-8">
              Más clientes.<br />
              <span className="italic font-normal text-[#5B626B]">Menos ruido.</span>
            </h1>
            <p className="text-xl text-[#5B626B] max-w-md leading-relaxed mb-10 font-light">
              Ayudamos a empresarios y emprendedores mexicanos a crecer en digital con estrategia, contenido e inteligencia artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contacto" className="inline-flex items-center justify-center gap-2 bg-[#0D0D0F] text-white px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-[#383B42] transition-all">
                Agenda una llamada gratuita <ArrowRight size={15} />
              </a>
              <a href="#servicios" className="inline-flex items-center justify-center border border-black/20 px-8 py-4 text-sm tracking-[0.1em] uppercase text-[#383B42] hover:bg-black hover:text-white transition-all">
                Ver servicios
              </a>
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.6 }}
            className="hidden md:flex items-center justify-center"
          >
            <Image src="/ENSO_NEGRO.png" alt="Enso SATORI" width={420} height={420} style={{ opacity: 0.9 }} />
          </motion.div>
        </div>
      </section>
 
      {/* NÚMEROS */}
      <section className="px-6 md:px-12 py-16 bg-[#0D0D0F] relative overflow-hidden">
        <TexturaLineas />
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-px bg-white/10 relative">
          {[
            { numero: "3x", label: "Más alcance orgánico" },
            { numero: "60%", label: "Menos tiempo operativo" },
            { numero: "2–4", label: "Semanas para resultados" },
          ].map((r, i) => (
            <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-[#0D0D0F] px-8 py-12 text-center">
              <p className="text-5xl md:text-6xl font-serif font-bold text-white mb-3">{r.numero}</p>
              <p className="text-sm text-[#5B626B] font-light">{r.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
 
      {/* SERVICIOS */}
      <section id="servicios" className="px-6 md:px-12 py-28 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.28em] text-[#5B626B] mb-5">Servicios</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.05]">
              Todo lo que necesita<br />tu negocio.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-black/8">
            {servicios.map((s, i) => {
              const Icono = s.icono;
              return (
                <motion.div key={s.titulo} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-white p-10 hover:bg-[#F7F7F8] transition-colors group">
                  <div className="flex items-start justify-between mb-10">
                    <div className="w-12 h-12 border border-black/12 flex items-center justify-center group-hover:bg-[#0D0D0F] group-hover:border-[#0D0D0F] transition-all">
                      <Icono size={20} className="text-[#5B626B] group-hover:text-white transition-colors" />
                    </div>
                    <span className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 ${s.estado === "Disponible" ? "bg-[#0D0D0F] text-white" : "border border-black/15 text-[#5B626B]"}`}>
                      {s.estado}
                    </span>
                  </div>
                  <h3 className="text-2xl font-medium text-[#0D0D0F] mb-3">{s.titulo}</h3>
                  <p className="text-[#5B626B] leading-relaxed font-light">{s.descripcion}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* PAQUETES */}
      <section className="px-6 md:px-12 py-28 bg-[#F7F7F8] relative overflow-hidden">
        <TexturaGrid />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-[#5B626B] mb-5">Inversión</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.05]">
              Elige tu punto de partida.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-black/8">
            {paquetes.map((p, i) => (
              <motion.div key={p.nombre} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`flex flex-col p-10 ${p.destacado ? "bg-[#0D0D0F] text-white" : "bg-white"}`}>
                <p className={`text-[10px] tracking-[0.2em] uppercase mb-3 ${p.destacado ? "text-white/50" : "text-[#5B626B]"}`}>{p.etiqueta}</p>
                <h3 className={`text-2xl font-medium mb-4 ${p.destacado ? "text-white" : "text-[#0D0D0F]"}`}>{p.nombre}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-5xl font-serif font-bold ${p.destacado ? "text-white" : "text-[#0D0D0F]"}`}>{p.precio}</span>
                  <span className={`text-sm ${p.destacado ? "text-white/40" : "text-[#5B626B]"}`}>/mes MXN</span>
                </div>
                <ul className="space-y-3 flex-1 mb-10">
                  {p.items.map((item) => (
                    <li key={item} className={`flex items-center gap-3 font-light ${p.destacado ? "text-white/70" : "text-[#5B626B]"}`}>
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${p.destacado ? "bg-white/40" : "bg-[#5B626B]"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className={`text-center py-4 text-xs tracking-[0.15em] uppercase transition-all font-medium ${p.destacado ? "bg-white text-[#0D0D0F] hover:bg-[#E9EAEC]" : "border border-black/20 text-[#0D0D0F] hover:bg-[#0D0D0F] hover:text-white"}`}>
                  Empezar
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* NOSOTROS */}
      <section id="nosotros" className="px-6 md:px-12 py-28 bg-[#0D0D0F] relative overflow-hidden">
        <TexturaLineas />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative">
 
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
            <div className="relative w-full max-w-sm mx-auto">
              <div className="absolute -top-4 -left-4 w-full h-full border border-white/10" />
              <Image
                src="/rodrigo.png"
                alt="Rodrigo Tristán — Fundador SATORI"
                width={480}
                height={600}
                className="w-full object-cover"
                style={{ filter:"none" }}
              />
              <div className="absolute -bottom-10 -right-10 opacity-15">
                <Image src="/ENSO_NEGRO.png" alt="" width={160} height={160} style={{ filter: "invert(1)" }} />
              </div>
            </div>
          </motion.div>
 
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }} className="text-white">
            <p className="text-xs uppercase tracking-[0.28em] text-[#5B626B] mb-8">Fundador</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em] text-white leading-[1.1] mb-2">
              Rodrigo Tristán
            </h2>
            <p className="text-sm tracking-[0.15em] uppercase text-[#5B626B] mb-10">
              Fundador & CEO · SATORI
            </p>
            <div className="border-l-2 border-white/20 pl-6 mb-10">
              <p className="text-xl font-serif italic text-[#D1D5DA] leading-relaxed">
                "Intuición + Tecnología. En ese orden."
              </p>
            </div>
            <div className="space-y-5 text-[#93A1AD] font-light leading-relaxed">
              <p>Visionario amante de la psicología y la tecnología.</p>
              <p>Con el propósito de ayudar a los emprendedores y empresarios mexicanos a crecer mediante la adopción de tecnología e inteligencia artificial.</p>
              <p>
                Inspirado en el concepto japonés <span className="italic text-white">"Satori"</span> —momento repentino de iluminación y comprensión profunda de la realidad—,{" "}
                <strong className="text-white font-medium">decide dedicar su vida a servir a los empresarios mexicanos a crecer con intuición y tecnología.</strong>
              </p>
              <p>
                <strong className="text-white font-medium">Fundador y CEO de SATORI — agencia especializada en contenido, social ads, automatización e IA.</strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
 
      {/* CONTACTO */}
      <section id="contacto" className="px-6 md:px-12 py-32 bg-[#F7F7F8] relative overflow-hidden">
        <TexturaGrid />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="max-w-3xl mx-auto text-center relative">
          <p className="text-xs uppercase tracking-[0.28em] text-[#5B626B] mb-8">Hablemos</p>
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.0] mb-8">
            Tu negocio puede<br />
            <span className="italic font-normal text-[#5B626B]">llegar más lejos.</span>
          </h2>
          <p className="text-xl text-[#5B626B] font-light mb-14 max-w-lg mx-auto">
            Una llamada de 30 minutos. Sin compromisos. Sin costo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0D0D0F] text-white px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium hover:bg-[#383B42] transition-all">
              WhatsApp <ArrowRight size={15} />
            </a>
            <a href="mailto:hola@satorimkt.com" className="inline-flex items-center justify-center border border-black/20 px-8 py-4 text-sm tracking-[0.1em] uppercase text-[#383B42] hover:bg-black hover:text-white transition-all">
              hola@satorimkt.com
            </a>
            <a href="tel:+525625018182" className="inline-flex items-center justify-center border border-black/20 px-8 py-4 text-sm tracking-[0.1em] uppercase text-[#383B42] hover:bg-black hover:text-white transition-all">
              Llamar
            </a>
          </div>
        </motion.div>
      </section>
 
      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-10 border-t border-black/8 bg-[#F7F7F8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Image src="/LOGO_SATORI-removebg-preview.png" alt="SATORI" width={130} height={40} />
        <p className="text-xs tracking-[0.12em] text-[#5B626B] uppercase">
          © 2026 SATORI · Todos los derechos reservados
        </p>
      </footer>
    </main>
  );
}