"use client";

import { Crosshair, Check } from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

const SPECS = [
  { parameter: "Chassis Alignment Tolerance", value: "± 0.00 mm", benchmark: "Celette Computerized Bench", status: "FACTORY OEM" },
  { parameter: "Paint Film Curing Temp", value: "160° F (71° C)", benchmark: "Climate Downdraft Booths", status: "BAKED OEM" },
  { parameter: "Clearcoat Thickness", value: "140 – 160 µm", benchmark: "PosiTector Ultrasonic Gauge", status: "CONCOURS" },
  { parameter: "Structural Aluminum Welding", value: "Pulse MIG / Synergic", benchmark: "Fronius TPS 400i Automated", status: "CERTIFIED" },
  { parameter: "ADAS Radar Target Alignment", value: "0.01° Angular Tolerance", benchmark: "Autel MaxiSys ADAS Calibrator", status: "ACTIVE" },
  { parameter: "Turnaround Priority Option", value: "72 Hours (03 Days)", benchmark: "Rapid Sprint Collision Protocol", status: "EXPEDITED" },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -50, filter: "blur(5px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(5px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const tableReveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const rowStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const rowItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function TechnicalSpecs() {
  const headerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-10% 0px -10% 0px" });
  const tableInView = useInView(tableRef, { once: false, margin: "-5% 0px -5% 0px" });

  return (
    <section id="specs" className="relative w-full bg-slate-950 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-hidden select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyan-500/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* ── Header row: left title + right description ── */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            className="space-y-3"
            variants={headerStagger}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fromLeft}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider"
            >
              <Crosshair className="w-3.5 h-3.5" />
              <span>ENGINEERING TOLERANCE MATRIX</span>
            </motion.div>
            <motion.h2
              variants={fromLeft}
              className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-display"
            >
              Rigorous Laboratory Standards
            </motion.h2>
          </motion.div>

          <motion.p
            className="text-xs sm:text-sm text-slate-400 font-sans max-w-md leading-relaxed"
            variants={fromRight}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
          >
            Every repair follows strict tolerances verified through multi-point computerized telemetry.
          </motion.p>
        </div>

        {/* ── Table — fades up, rows stagger in ── */}
        <motion.div
          ref={tableRef}
          variants={tableReveal}
          initial="hidden"
          animate={tableInView ? "visible" : "hidden"}
          className="rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-mono text-xs uppercase tracking-wider">
                  <th className="py-4 px-6">Specification Parameter</th>
                  <th className="py-4 px-6">Measured Tolerance</th>
                  <th className="py-4 px-6">Equipment / Protocol</th>
                  <th className="py-4 px-6 text-right">Certification</th>
                </tr>
              </thead>
              <motion.tbody
                className="divide-y divide-slate-800/60 font-mono text-xs"
                variants={rowStagger}
                initial="hidden"
                animate={tableInView ? "visible" : "hidden"}
              >
                {SPECS.map((s, idx) => (
                  <motion.tr
                    key={idx}
                    variants={rowItem}
                    className="hover:bg-slate-800/30 transition-colors group"
                    data-interactive="true"
                  >
                    <td className="py-4 px-6 font-bold text-white">
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform shadow-[0_0_8px_rgba(0,210,255,0.6)]" />
                        {s.parameter}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-cyan-300 font-bold">{s.value}</td>
                    <td className="py-4 px-6 text-slate-300">{s.benchmark}</td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-950 border border-cyan-400/30 text-cyan-300 font-bold text-[10px] shadow-[0_0_8px_rgba(0,210,255,0.2)]">
                        <Check className="w-3 h-3 text-emerald-400" />
                        {s.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
