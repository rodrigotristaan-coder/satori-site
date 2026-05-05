"use client";
 
import { motion } from "framer-motion";
import { ArrowRight, PenTool, Sparkles, Brain, Megaphone, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
 
const WHATSAPP_LINK = "https://wa.me/525625018281";
const EMAIL = "r.tristaan@outlook.com";
 
const servicios = [
  {
    titulo: "Creación de Contenido",
    descripcion: "Estrategia, copy y diseño visual que convierte seguidores en clientes. Cada pieza tiene un propósito claro: generar confianza y acción.",
    icono: PenTool,
    estado: "Disponible",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80",
  },
  {
    titulo: "Gestión de Redes Sociales",
    descripcion: "Tu presencia digital activa, coherente y profesional todos los días — sin que tengas que preocuparte por qué publicar ni cuándo.",
    icono: Sparkles,
    estado: "Disponible",
    img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&q=80",
  },
  {
    titulo: "Medios Pagados",
    descripcion: "Campañas diseñadas para generar retorno real desde el primer peso invertido. Precisión, datos y optimización constante.",
    icono: Megaphone,
    estado: "Próximamente",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
  },
  {
    titulo: "Sistemas con IA",
    descripcion: "Automatización e inteligencia artificial que trabajan por ti las 24 horas. Más output, menos operación manual.",
    icono: Brain,
    estado: "Próximamente",
    img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
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
 
// Paleta: plateado frío + negro + dorado
// --gold: #C9A84C
// --silver: #E8E9EB
// --bg: #F0F1F3
 
function TexturaGrid() {
  const puntos: { x: number; y: number }[] = [];
  for (let r = 0; r < 20; r++)
    for (let c = 0; c < 30; c++)
      puntos.push({ x: c * 28 + 14, y: r * 28 + 14 });
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.07, pointerEvents: "none" }}>
      {puntos.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r="1.2" fill="#8A9099" />)}
    </svg>
  );
}
 
function TexturaLineas() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.06, pointerEvents: "none" }}>
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
 
  return (
    <main className="min-h-screen text-[#0D0D0F] overflow-x-hidden" style={{ backgroundColor: "#F0F1F3" }}>
 
      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ backgroundColor: "rgba(240,241,243,0.92)", borderBottom: "1px solid #D8DADD" }}
        className="w-full px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md"
      >
        <a href="#inicio">
          <Image src="/logo-satori.png" alt="SATORI" width={220} height={66} priority />
        </a>
 
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm tracking-[0.12em] uppercase transition-colors" style={{ color: "#5B626B" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0D0D0F")}
              onMouseLeave={e => (e.currentTarget.style.color = "#5B626B")}
            >
              {link.label}
            </a>
          ))}
          <a href="#contacto" className="text-sm tracking-[0.12em] uppercase px-6 py-3 transition-all font-medium"
            style={{ backgroundColor: "#C9A84C", color: "#fff" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8953e")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C9A84C")}
          >
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
        <div className="md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-10" style={{ backgroundColor: "#F0F1F3" }}>
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
            <p className="text-xs tracking-[0.28em] uppercase mb-8" style={{ color: "#C9A84C" }}>
              Marketing · IA · Resultados reales
            </p>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-bold leading-[0.95] tracking-[-0.03em] text-[#0D0D0F] mb-8">
              Más clientes.<br />
              <span className="italic font-normal" style={{ color: "#5B626B" }}>Menos ruido.</span>
            </h1>
            <p className="text-xl max-w-md leading-relaxed mb-10 font-light" style={{ color: "#5B626B" }}>
              Ayudamos a empresarios y emprendedores mexicanos a crecer en digital con estrategia, contenido e inteligencia artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-all"
                style={{ backgroundColor: "#C9A84C", color: "#fff" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8953e")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C9A84C")}
              >
                Agenda una llamada gratuita <ArrowRight size={15} />
              </a>
              <a href="#servicios"
                className="inline-flex items-center justify-center px-8 py-4 text-sm tracking-[0.1em] uppercase transition-all"
                style={{ border: "1px solid #C0C3C8", color: "#383B42" }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0D0D0F"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#383B42"; }}
              >
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
            <Image src="/enso-negro.png" alt="enso-negro.png" width={420} height={420} style={{ opacity: 0.05 }} />
          </motion.div>
        </div>
      </section>
 
      {/* NÚMEROS */}
      <section className="px-6 md:px-12 py-16 relative overflow-hidden" style={{ backgroundColor: "#0D0D0F" }}>
        <TexturaLineas />
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-px relative" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
          {[
            { numero: "3x", label: "Más alcance orgánico" },
            { numero: "60%", label: "Menos tiempo operativo" },
            { numero: "2–4", label: "Semanas para resultados" },
          ].map((r, i) => (
            <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="px-8 py-12 text-center" style={{ backgroundColor: "#0D0D0F" }}>
              <p className="text-5xl md:text-6xl font-serif font-bold mb-3" style={{ color: "#C9A84C" }}>{r.numero}</p>
              <p className="text-sm font-light" style={{ color: "#5B626B" }}>{r.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
 
      {/* SERVICIOS */}
      <section id="servicios" className="px-6 md:px-12 py-28" style={{ backgroundColor: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-xs uppercase tracking-[0.28em] mb-5" style={{ color: "#C9A84C" }}>Servicios</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.05]">
              Todo lo que necesita<br />tu negocio.
            </h2>
          </div>
 
          {/* 4 filas, cada una con imagen a la derecha */}
          <div className="flex flex-col gap-px" style={{ outline: "1px solid #E0E2E5" }}>
            {servicios.map((s, i) => {
              const Icono = s.icono;
              const imagenDerecha = i % 2 === 0;
              return (
                <motion.div
                  key={s.titulo}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  className={`grid md:grid-cols-2 gap-0 ${imagenDerecha ? "" : "md:[&>*:first-child]:order-2"}`}
                  style={{ borderBottom: "1px solid #E0E2E5" }}
                >
                  {/* Texto */}
                  <div className="p-10 md:p-14 flex flex-col justify-center" style={{ backgroundColor: "#fff" }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 flex items-center justify-center" style={{ border: "1px solid #E0E2E5" }}>
                        <Icono size={20} style={{ color: "#C9A84C" }} />
                      </div>
                      <span className="text-[10px] tracking-[0.2em] uppercase px-3 py-1.5"
                        style={s.estado === "Disponible"
                          ? { backgroundColor: "#0D0D0F", color: "#fff" }
                          : { border: "1px solid #D0D3D8", color: "#5B626B" }}>
                        {s.estado}
                      </span>
                    </div>
                    <h3 className="text-3xl font-medium text-[#0D0D0F] mb-4">{s.titulo}</h3>
                    <p className="text-lg leading-relaxed font-light" style={{ color: "#5B626B" }}>{s.descripcion}</p>
                  </div>
 
                  {/* Imagen */}
                  <div className="relative min-h-[280px] md:min-h-[320px] overflow-hidden">
                    <img
                      src={s.img}
                      alt={s.titulo}
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(20%)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
 
      {/* PAQUETES */}
      <section className="px-6 md:px-12 py-28 relative overflow-hidden" style={{ backgroundColor: "#F0F1F3" }}>
        <TexturaGrid />
        <div className="max-w-6xl mx-auto relative">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.28em] mb-5" style={{ color: "#C9A84C" }}>Inversión</p>
            <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.05]">
              Elige tu punto de partida.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px" style={{ backgroundColor: "#D8DADD" }}>
            {paquetes.map((p, i) => (
              <motion.div key={p.nombre} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col p-10"
                style={{ backgroundColor: p.destacado ? "#0D0D0F" : "#fff" }}>
                {p.destacado && <div className="h-0.5 w-full mb-8" style={{ backgroundColor: "#C9A84C" }} />}
                <p className="text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color: p.destacado ? "rgba(201,168,76,0.7)" : "#5B626B" }}>{p.etiqueta}</p>
                <h3 className="text-2xl font-medium mb-4" style={{ color: p.destacado ? "#fff" : "#0D0D0F" }}>{p.nombre}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-serif font-bold" style={{ color: p.destacado ? "#C9A84C" : "#0D0D0F" }}>{p.precio}</span>
                  <span className="text-sm" style={{ color: p.destacado ? "rgba(255,255,255,0.4)" : "#5B626B" }}>/mes MXN</span>
                </div>
                <ul className="space-y-3 flex-1 mb-10">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-light" style={{ color: p.destacado ? "rgba(255,255,255,0.7)" : "#5B626B" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.destacado ? "#C9A84C" : "#C0C3C8" }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contacto"
                  className="text-center py-4 text-xs tracking-[0.15em] uppercase transition-all font-medium"
                  style={p.destacado
                    ? { backgroundColor: "#C9A84C", color: "#fff" }
                    : { border: "1px solid #C0C3C8", color: "#0D0D0F" }}
                  onMouseEnter={e => {
                    if (p.destacado) e.currentTarget.style.backgroundColor = "#b8953e";
                    else { e.currentTarget.style.backgroundColor = "#0D0D0F"; e.currentTarget.style.color = "#fff"; }
                  }}
                  onMouseLeave={e => {
                    if (p.destacado) e.currentTarget.style.backgroundColor = "#C9A84C";
                    else { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#0D0D0F"; }
                  }}
                >
                  Empezar
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
 
      {/* NOSOTROS */}
      <section id="nosotros" className="px-6 md:px-12 py-28 relative overflow-hidden" style={{ backgroundColor: "#0D0D0F" }}>
        <TexturaLineas />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative">
 
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative">
            <div className="relative w-full max-w-sm mx-auto">
              <Image
                src="/rodrigo.png"
                alt="Rodrigo Tristán — Fundador SATORI"
                width={480}
                height={600}
                className="w-full object-cover"
              />
              <div className="absolute -bottom-10 -right-10 opacity-80">
                <Image src="/enso-negro.png" alt="" width={160} height={160} style={{ filter: "invert(1)" }} />
              </div>
            </div>
          </motion.div>
 
          <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }} className="text-white">
            <p className="text-xs uppercase tracking-[0.28em] mb-8" style={{ color: "#C9A84C" }}>Fundador</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em] text-white leading-[1.1] mb-2">
              Rodrigo Tristán
            </h2>
            <p className="text-sm tracking-[0.15em] uppercase mb-10" style={{ color: "#5B626B" }}>
              Fundador & CEO · SATORI
            </p>
            <div className="pl-6 mb-10" style={{ borderLeft: "2px solid #C9A84C" }}>
              <p className="text-xl font-serif italic leading-relaxed" style={{ color: "#D1D5DA" }}>
                "Intuición + Tecnología. En ese orden."
              </p>
            </div>
            <div className="space-y-5 font-light leading-relaxed" style={{ color: "#93A1AD" }}>
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
      <section id="contacto" className="px-6 md:px-12 py-32 relative overflow-hidden" style={{ backgroundColor: "#F0F1F3" }}>
        <TexturaGrid />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="max-w-3xl mx-auto text-center relative">
          <p className="text-xs uppercase tracking-[0.28em] mb-8" style={{ color: "#C9A84C" }}>Hablemos</p>
          <h2 className="text-5xl md:text-7xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.0] mb-8">
            Tu negocio puede<br />
            <span className="italic font-normal" style={{ color: "#5B626B" }}>llegar más lejos.</span>
          </h2>
          <p className="text-xl font-light mb-14 max-w-lg mx-auto" style={{ color: "#5B626B" }}>
            Una llamada de 30 minutos. Sin compromisos. Sin costo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-[0.1em] uppercase font-medium transition-all"
              style={{ backgroundColor: "#C9A84C", color: "#fff" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#b8953e")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#C9A84C")}
            >
              WhatsApp <ArrowRight size={15} />
            </a>
            <a href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-[0.1em] uppercase transition-all"
              style={{ border: "1px solid #C0C3C8", color: "#383B42" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0D0D0F"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#383B42"; }}
            >
              <Mail size={15} /> Enviar mail
            </a>
            <a href="tel:+525625018281"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm tracking-[0.1em] uppercase transition-all"
              style={{ border: "1px solid #C0C3C8", color: "#383B42" }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = "#0D0D0F"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#383B42"; }}
            >
              Llamar
            </a>
          </div>
        </motion.div>
      </section>
 
      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid #D8DADD", backgroundColor: "#F0F1F3" }}>
        <Image src="/logo-satori.png" alt="SATORI" width={150} height={45} />
        <p className="text-xs tracking-[0.12em] uppercase" style={{ color: "#5B626B" }}>
          © 2026 SATORI · Todos los derechos reservados
        </p>
      </footer>
    </main>
  );
}