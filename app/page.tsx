"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Brain, PenTool, Megaphone } from "lucide-react";

const services = [
  {
    title: "Content Creation",
    description:
      "Creative systems built to turn attention into trust. Strategy, copy, visual direction, and content designed to move people.",
    icon: PenTool,
    status: "Available",
  },
  {
    title: "Social Media Management",
    description:
      "We build consistent digital presence through thoughtful planning, brand rhythm, and audience-first storytelling.",
    icon: Sparkles,
    status: "Available",
  },
  {
    title: "Paid Media",
    description:
      "Performance campaigns engineered for scale, precision, and profitable growth.",
    icon: Megaphone,
    status: "Coming Soon",
  },
  {
    title: "AI Systems",
    description:
      "Automation, intelligence, and creative augmentation designed to multiply output without losing human depth.",
    icon: Brain,
    status: "Coming Soon",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F14] text-[#E8ECEF] overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(36,86,110,0.25),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(201,126,64,0.10),transparent_30%),linear-gradient(to_bottom,#0B0F14,#11161D)]" />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full px-6 md:px-10 py-6 flex items-center justify-between"
      >
        <div className="text-xl tracking-[0.35em] font-medium text-white">
          SATORI
        </div>
        <a
          href="#contact"
          className="text-sm border border-white/10 px-4 py-2 rounded-full hover:border-white/20 hover:bg-white/5 transition"
        >
          Contact
        </a>
      </motion.nav>

      {/* Hero */}
      <section className="px-6 md:px-10 pt-20 md:pt-28 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#6D7A86] border border-white/10 rounded-full px-3 py-2 mb-6">
              Insight-Led Marketing
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold leading-[0.95] tracking-[-0.03em] text-white">
              Human insight.
              <br />
              Engineered for scale.
            </h1>

            <p className="mt-6 text-lg text-[#93A1AD] max-w-xl leading-relaxed">
              SATORI is a modern marketing studio blending strategic clarity,
              creative intelligence, and digital systems to build brands people
              actually feel.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:scale-[1.02] transition"
              >
                Explore Services <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm text-white hover:bg-white/5 transition"
              >
                Start a Project
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 flex items-center justify-center shadow-2xl shadow-black/20">
              <div className="relative w-full h-full rounded-[1.5rem] border border-white/5 bg-gradient-to-br from-[#13202B] via-[#10161E] to-[#1A232D] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
                <div className="text-[18vw] md:text-[10rem] font-semibold tracking-[-0.08em] text-white/90">
                  悟
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="px-6 md:px-10 py-24 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl leading-[1.25] text-[#D8DEE3] font-light"
          >
            We build modern marketing systems rooted in human psychology,
            aesthetic precision, and strategic momentum.
          </motion.p>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-6 md:px-10 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <p className="text-sm uppercase tracking-[0.25em] text-[#6D7A86]">
              Services
            </p>
            <h2 className="text-4xl md:text-5xl mt-3 font-semibold tracking-[-0.03em] text-white">
              Designed for relevance.
              <br />
              Built for growth.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-7 hover:bg-white/[0.05] transition"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#6D7A86]">
                      {service.status}
                    </span>
                  </div>

                  <h3 className="mt-6 text-2xl font-medium text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-[#93A1AD] leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="contact"
        className="px-6 md:px-10 py-24 border-t border-white/5"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm uppercase tracking-[0.25em] text-[#6D7A86]">
            Contact
          </p>
          <h2 className="text-4xl md:text-6xl mt-4 font-semibold tracking-[-0.03em] text-white">
            Build something
            <br />
            worth paying attention to.
          </h2>
          <p className="mt-6 text-lg text-[#93A1AD] max-w-2xl mx-auto">
            For brands ready to move with more clarity, more precision, and more
            depth.
          </p>

          <a
            href="mailto:hello@satorimkt.com"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3 text-sm font-medium hover:scale-[1.02] transition"
          >
            hello@satorimkt.com <ArrowRight size={16} />
          </a>
        </motion.div>
      </section>
    </main>
  );
}