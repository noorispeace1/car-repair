"use client";

import { ShieldCheck, Award, Wrench, CheckCircle2 } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

// ── Variants ──────────────────────────────────────────────────────────────────

const centerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const cardGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function WorldBestService() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: false, margin: "-10% 0px -10% 0px" });

  return (
    <section className="relative w-full bg-slate-950 py-16 sm:py-20 px-4 sm:px-8 lg:px-16 border-t border-slate-800/80 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        ref={sectionRef}
        className="max-w-5xl mx-auto text-center space-y-6 relative z-10"
        variants={centerStagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-widest"
        >
          <Award className="w-3.5 h-3.5" />
          <span>Uncompromised Quality &amp; Craftsmanship</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase font-display tracking-tight text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]"
        >
          WE PROVIDE THE WORLD&apos;S BEST SERVICE
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base md:text-lg text-slate-300 font-sans leading-relaxed max-w-3xl mx-auto"
        >
          Delivering dealership-grade collision restoration, computerized laser chassis realignment, and Glasurit
          factory waterborne refinishing for Porsche, luxury, and all vehicle makes. Every repair is executed to
          millimeter tolerances with comprehensive multi-point safety validation and guaranteed lifetime warranty.
        </motion.p>

        <motion.div
          variants={cardGrid}
          className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left"
        >
          {[
            { title: "OEM Precision", desc: "100% Factory Specs", icon: <Wrench className="w-4 h-4 text-amber-400" /> },
            { title: "Laser Calibrated", desc: "0.00° Deviation", icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
            { title: "Lifetime Guarantee", desc: "Transferable Warranty", icon: <ShieldCheck className="w-4 h-4 text-cyan-400" /> },
            { title: "Rapid Turnaround", desc: "03-Day Sprint Option", icon: <Award className="w-4 h-4 text-rose-400" /> },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={cardItem}
              whileHover={{ y: -5, scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-1 hover:border-amber-400/40 transition-colors"
            >
              <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-xs font-bold text-white font-mono uppercase">{item.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
