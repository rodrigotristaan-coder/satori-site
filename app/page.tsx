"use client";

import { motion } from "framer-motion";
import { ArrowRight, PenTool, Sparkles, Megaphone, Brain, TrendingUp, Users, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const servicios = [
  {
    titulo: "Creación de Contenido",
    descripcion: "Tu negocio merece contenido que vende, no solo que se ve bien. Diseñamos estrategia, copy y piezas visuales que generan confianza y convierten seguidores en clientes.",
    icono: PenTool,
    estado: "Disponible",
  },
  {
    titulo: "Gestión de Redes Sociales",
    descripcion: "Tus redes son tu vitrina digital. Nosotros la mantenemos activa, coherente y trabajando para ti todos los días — sin que tengas que preocuparte por el qué publicar.",
    icono: Sparkles,
    estado: "Disponible",
  },
  {
    titulo: "Medios Pagados",
    descripcion: "Llega exactamente a quien necesitas, cuando lo necesitas. Campañas de publicidad digital diseñadas para generar retorno real desde el primer peso invertido.",
    icono: Megaphone,
    estado: "Próximamente",
  },
  {
    titulo: "Sistemas con IA",
    descripcion: "Automatiza lo repetitivo y enfócate en lo que importa. Implementamos herramientas de inteligencia artificial que trabajan por ti las 24 horas.",
    icono: Brain,
    estado: "Próximamente",
  },
];

const paquetes = [
  {
    nombre: "Básico",
    precio: "$3,500",
    periodo: "/mes MXN",
    etiqueta: "Para empezar",
    items: ["12 posts al mes", "1 red social", "Diseño + copy", "Reporte mensual"],
    destacado: false,
    cta: "Empezar",
  },
  {
    nombre: "Pro",
    precio: "$6,500",
    periodo: "/mes MXN",
    etiqueta: "El más elegido",
    items: ["20 posts al mes", "2 redes sociales", "Stories + Reels", "Gestión de comunidad", "Reporte + estrategia"],
    destacado: true,
    cta: "Quiero este",
  },
  {
    nombre: "Premium",
    precio: "$12,000",
    periodo: "/mes MXN",
    etiqueta: "Crecimiento total",
    items: ["Todo lo del Pro", "3 redes sociales", "Contenido en video", "Ads básicos incluidos", "Reunión semanal"],
    destacado: false,
    cta: "Empezar",
  },
];

const resultados = [
  { numero: "3x", label: "Más alcance orgánico en promedio" },
  { numero: "60%", label: "Reducción en tiempo de gestión" },
  { numero: "2–4", label: "Semanas para ver primeros resultados" },
];

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

function TexturaGrid() {
  const puntos = [];
  for (let r = 0; r < 20; r++) {
    for (let c = 0; c < 30; c++) {
      puntos.push({ x: c * 28 + 14, y: r * 28 + 14 });
    }
  }
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", inset: 0, opacity: 0.1, pointerEvents: "none" }}>
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

  return (
    <main className="min-h-screen bg-[#F7F7F8] text-[#0D0D0F] overflow-x-hidden">

      {/* NAV */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full px-6 md:px-12 py-4 flex items-center justify-between border-b border-black/8 sticky top-0 z-50 backdrop-blur-md bg-[#F7F7F8]/90"
      >
        {/* Logo */}
        <a href="#inicio">
          <Image src="/LOGO_SATORI.png" alt="SATORI" width={130} height={40} priority />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.15em] uppercase text-[#5B626B] hover:text-[#0D0D0F] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="text-xs tracking-[0.18em] uppercase border border-black/20 px-5 py-2.5 hover:bg-black hover:text-white transition-all duration-300 text-[#1E1F23]"
          >
            Hablar con nosotros
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className={`block w-6 h-px bg-[#0D0D0F] transition-all duration-300 ${menuAbierto ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-px bg-[#0D0D0F] transition-all duration-300 ${menuAbierto ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-px bg-[#0D0D0F] transition-all duration-300 ${menuAbierto ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      {menuAbierto && (
        <div className="md:hidden fixed inset-0 z-40 bg-[#F7F7F8] flex flex-col items-center justify-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuAbierto(false)}
              className="text-2xl font-serif tracking-[0.1em] text-[#0D0D0F]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="inicio" className="px-6 md:px-12 pt-20 md:pt-28 pb-24 relative overflow-hidden">
        <TexturaGrid />
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_380px] gap-16 items-center relative">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
            <div className="inline-flex items-center text-[10px] tracking-[0.28em] uppercase text-[#5B626B] border border-black/12 px-4 py-2 mb-8 bg-white">
              Marketing · IA · Resultados reales
            </div>
            <h1 className="text-5xl md:text-[4.5rem] lg:text-[5rem] font-serif font-bold leading-[0.97] tracking-[-0.02em] text-[#0D0D0F] mb-6">
              Más clientes.<br />
              <span className="italic font-normal text-[#383B42]">Menos complicaciones.</span>
            </h1>
            <p className="text-lg text-[#5B626B] max-w-lg leading-relaxed mb-4 font-light">
              Ayudamos a pequeñas empresas y emprendedores a crecer en digital con estrategia, contenido y automatización — sin que tengas que volverte experto en marketing.
            </p>
            <p className="text-sm text-[#5B626B] mb-10 font-medium">
              📍 Primera consultoría sin costo · Sin contratos largos · Resultados en semanas
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contacto" className="inline-flex items-center justify-center gap-2 bg-[#0D0D0F] text-white px-7 py-4 text-sm tracking-[0.08em] uppercase font-medium hover:bg-[#383B42] transition-all duration-200">
                Agenda tu llamada gratuita <ArrowRight size={15} />
              </a>
              <a href="#servicios" className="inline-flex items-center justify-center border border-black/20 px-7 py-4 text-sm tracking-[0.08em] uppercase text-[#383B42] hover:bg-black hover:text-white transition-all duration-200">
                Ver servicios
              </a>
            </div>
          </motion.div>

          {/* Enso real */}
          <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.9 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            className="hidden md:flex items-center justify-center"
          >
            <Image src="/ENSO_NEGRO.png" alt="Enso SATORI" width={300} height={300} style={{ opacity: 0.75 }} />
          </motion.div>
        </div>
      </section>

      {/* RESULTADOS */}
      <section className="px-6 md:px-12 py-16 bg-[#0D0D0F] relative overflow-hidden">
        <TexturaLineas />
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 relative">
          {resultados.map((r, i) => (
            <motion.div key={r.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-[#0D0D0F] px-8 py-10 text-center">
              <p className="text-5xl font-serif font-bold text-white mb-2">{r.numero}</p>
              <p className="text-sm text-[#5B626B] font-light leading-snug">{r.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FILOSOFÍA */}
      <section className="px-6 md:px-12 py-20 border-b border-black/8 relative overflow-hidden bg-[#F7F7F8]">
        <TexturaGrid />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="text-2xl md:text-4xl font-serif font-light leading-[1.3] text-[#1E1F23]">
            No vendemos marketing.<br />
            Vendemos <span className="italic">claridad, dirección y resultados.</span>
          </motion.p>
          <p className="mt-6 text-[#5B626B] text-base font-light max-w-xl mx-auto">
            La mayoría de los dueños de negocio pierden tiempo y dinero en marketing que no genera nada. Nosotros cambiamos eso.
          </p>
        </div>
      </section>

      {/* SERVICIOS */}
      <section id="servicios" className="px-6 md:px-12 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#5B626B] mb-4">Servicios</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.1]">
              Todo lo que necesita<br />tu negocio para crecer.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-black/8">
            {servicios.map((servicio, i) => {
              const Icono = servicio.icono;
              return (
                <motion.div key={servicio.titulo} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="bg-white p-8 hover:bg-[#F7F7F8] transition-colors duration-300 group">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-11 h-11 border border-black/12 flex items-center justify-center group-hover:bg-[#0D0D0F] group-hover:border-[#0D0D0F] transition-all">
                      <Icono size={18} className="text-[#5B626B] group-hover:text-white transition-colors" />
                    </div>
                    <span className={`text-[10px] tracking-[0.2em] uppercase px-3 py-1 ${servicio.estado === "Disponible" ? "bg-[#0D0D0F] text-white" : "border border-black/15 text-[#5B626B]"}`}>
                      {servicio.estado}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-[#0D0D0F] mb-3">{servicio.titulo}</h3>
                  <p className="text-[#5B626B] leading-relaxed text-sm font-light">{servicio.descripcion}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POR QUÉ SATORI */}
      <section className="px-6 md:px-12 py-24 bg-[#F7F7F8] relative overflow-hidden">
        <TexturaGrid />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="flex flex-col items-start gap-10">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#5B626B] mb-4">Por qué SATORI</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.1] mb-6">
                Trabajamos como<br />si fuera nuestro negocio.
              </h2>
              <p className="text-[#5B626B] leading-relaxed font-light text-base max-w-md">
                No somos una agencia que desaparece después del onboarding. Somos tu equipo de marketing externo — estratégico, accesible y enfocado en resultados reales.
              </p>
            </div>
            <div style={{ opacity: 0.15 }}>
              <Image src="/ENSO_NEGRO.png" alt="Enso" width={120} height={120} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.15 }} className="flex flex-col gap-px bg-black/8">
            {[
              { icono: TrendingUp, titulo: "Resultados medibles", desc: "Cada acción tiene un objetivo claro. Nada de posts por postear — todo con propósito y métricas reales." },
              { icono: Users, titulo: "Trato directo", desc: "Hablas con quien hace el trabajo. Sin intermediarios, sin malentendidos, sin tiempos perdidos." },
              { icono: Zap, titulo: "Sin contratos eternos", desc: "Empezamos pequeño. Si los resultados llegan — y llegarán — crecemos juntos a tu ritmo." },
            ].map((item) => {
              const Icono = item.icono;
              return (
                <div key={item.titulo} className="bg-white p-7 flex gap-5 hover:bg-[#F7F7F8] transition-colors">
                  <div className="w-10 h-10 border border-black/10 flex items-center justify-center flex-shrink-0">
                    <Icono size={16} className="text-[#383B42]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#0D0D0F] mb-1 text-sm">{item.titulo}</p>
                    <p className="text-[#5B626B] text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* PAQUETES */}
      <section id="paquetes" className="px-6 md:px-12 py-24 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#5B626B] mb-4">Inversión</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.1] mb-4">
              Elige tu punto de partida.
            </h2>
            <p className="text-[#5B626B] font-light max-w-md mx-auto">
              Todos los paquetes incluyen consultoría inicial gratuita. Sin letra chica.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-black/8">
            {paquetes.map((paquete, i) => (
              <motion.div key={paquete.nombre} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className={`flex flex-col p-8 ${paquete.destacado ? "bg-[#0D0D0F] text-white" : "bg-white"}`}>
                <div className="mb-8">
                  <p className={`text-[10px] tracking-[0.2em] uppercase mb-2 ${paquete.destacado ? "text-white/50" : "text-[#5B626B]"}`}>{paquete.etiqueta}</p>
                  <h3 className={`text-2xl font-medium mb-3 ${paquete.destacado ? "text-white" : "text-[#0D0D0F]"}`}>{paquete.nombre}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-serif font-bold ${paquete.destacado ? "text-white" : "text-[#0D0D0F]"}`}>{paquete.precio}</span>
                    <span className={`text-sm ${paquete.destacado ? "text-white/40" : "text-[#5B626B]"}`}>{paquete.periodo}</span>
                  </div>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {paquete.items.map((item) => (
                    <li key={item} className={`flex items-center gap-3 text-sm font-light ${paquete.destacado ? "text-white/70" : "text-[#5B626B]"}`}>
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${paquete.destacado ? "bg-white/40" : "bg-[#5B626B]"}`} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contacto" className={`text-center py-3.5 text-xs tracking-[0.15em] uppercase transition-all duration-200 font-medium ${paquete.destacado ? "bg-white text-[#0D0D0F] hover:bg-[#E9EAEC]" : "border border-black/20 text-[#0D0D0F] hover:bg-[#0D0D0F] hover:text-white"}`}>
                  {paquete.cta}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS — FUNDADOR */}
      <section id="nosotros" className="px-6 md:px-12 py-24 bg-[#0D0D0F] relative overflow-hidden">
        <TexturaLineas />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative">

          {/* Foto */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative w-full max-w-sm mx-auto">
              {/* Marco decorativo */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-white/10" />
              <Image
                src="/IMG_2379.jpeg"
                alt="Rodrigo Tristán — Fundador SATORI"
                width={480}
                height={600}
                className="w-full object-cover grayscale"
                style={{ filter: "grayscale(20%)" }}
              />
              {/* Enso blanco decorativo */}
              <div className="absolute -bottom-8 -right-8 opacity-20">
                <Image src="/ENSO_BLANCO.png" alt="" width={120} height={120} />
              </div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="text-white"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#5B626B] mb-6">Fundador</p>

            <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-[-0.02em] text-white leading-[1.1] mb-2">
              Rodrigo Tristán
            </h2>
            <p className="text-sm tracking-[0.15em] uppercase text-[#5B626B] mb-8">
              Fundador & CEO · SATORI
            </p>

            {/* Cita */}
            <div className="border-l-2 border-white/20 pl-5 mb-8">
              <p className="text-lg font-serif italic text-[#D1D5DA] leading-relaxed">
                "Intuición + Tecnología. En ese orden."
              </p>
            </div>

            <div className="space-y-4 text-[#93A1AD] font-light leading-relaxed text-sm">
              <p>
                Visionario amante de la psicología y la tecnología.
              </p>
              <p>
                Rodrigo tiene el propósito de ayudar a los emprendedores y empresarios mexicanos a crecer mediante la adopción de tecnología e utilización de Inteligencia Artificial en sus negocios.
              </p>
              <p>
                Inspirado en el concepto japonés <span className="italic text-white">"Satori"</span> — momento repentino de iluminación, presencia y comprensión profunda de la realidad —,{" "}
                <strong className="text-white font-medium">
                  Rodrigo vive ese momento Satori en el que decide dedicar su vida a servir a los emprendedores y empresarios a crecer con intuición y tecnología.
                </strong>
              </p>
              <p>
                <strong className="text-white font-medium">
                  Se convierte en Fundador y CEO de SATORI, agencia de marketing digital especializada en gestión de contenido, social ads, automatización e implementación de IA.
                </strong>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="px-6 md:px-12 py-32 bg-[#F7F7F8] relative overflow-hidden">
        <TexturaGrid />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="max-w-3xl mx-auto text-center relative">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#5B626B] mb-6">Hablemos</p>
          <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-[-0.02em] text-[#0D0D0F] leading-[1.05] mb-6">
            Tu negocio puede<br />
            <span className="italic font-normal text-[#383B42]">llegar más lejos.</span>
          </h2>
          <p className="text-[#5B626B] text-lg font-light mb-4 max-w-xl mx-auto">
            Una llamada de 30 minutos para entender tu negocio, sin compromisos y sin costo.
          </p>
          <p className="text-[#5B626B] text-sm font-light mb-12">Respondemos en menos de 24 horas.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/52" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#0D0D0F] text-white px-7 py-4 text-sm tracking-[0.08em] uppercase font-medium hover:bg-[#383B42] transition-all">
              WhatsApp <ArrowRight size={15} />
            </a>
            <a href="mailto:hola@satorimkt.com" className="inline-flex items-center justify-center gap-2 border border-black/20 px-7 py-4 text-sm tracking-[0.08em] uppercase text-[#383B42] hover:bg-black hover:text-white transition-all">
              hola@satorimkt.com
            </a>
            <a href="tel:+52" className="inline-flex items-center justify-center gap-2 border border-black/20 px-7 py-4 text-sm tracking-[0.08em] uppercase text-[#383B42] hover:bg-black hover:text-white transition-all">
              Llamar
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-12 py-8 border-t border-black/8 bg-[#F7F7F8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <Image src="/LOGO_SATORI.png" alt="SATORI" width={100} height={30} />
        <p className="text-[11px] tracking-[0.12em] text-[#5B626B] uppercase">
          © 2025 SATORI · Todos los derechos reservados
        </p>
      </footer>
    </main>
  );
}