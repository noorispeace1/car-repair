"use client";

import { useState, useRef, useCallback } from "react";
import {
  MoveHorizontal, AlertTriangle, CheckCircle2, Award, Wand2, Handshake,
  Shield, Clock, Star, Zap, Gem, ThumbsUp,
} from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";

const VIDEO_SRC = "/Porsche_panel_dent_repair_transi\u2026_202609042259.mp4";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const WHY_CHOOSE_FEATURES = [
  { title: "35+ Years of Master Craftsmanship", desc: "ASE Master-certified specialists who have restored over 5,000 luxury vehicles with zero compromise on quality.", icon: <Award className="w-5 h-5 text-white" />, highlight: "5,000+ Restorations" },
  { title: "Sub-Millimeter Precision", desc: "Laser-guided chassis alignment with tolerances under 0.5mm. Factory-match paint blending that's indistinguishable from original.", icon: <Wand2 className="w-5 h-5 text-white" />, highlight: "0.5mm Tolerance" },
  { title: "White-Glove Customer Experience", desc: "Dedicated project managers, real-time repair tracking, and a lifetime warranty that follows the vehicle, not the owner.", icon: <Handshake className="w-5 h-5 text-white" />, highlight: "Lifetime Warranty" },
];

const ADDITIONAL_REASONS = [
  { icon: <Shield className="w-4 h-4" />, label: "Insurance Claim Assistance" },
  { icon: <Clock className="w-4 h-4" />, label: "3-Day Rapid Service" },
  { icon: <Star className="w-4 h-4" />, label: "5-Star Rated Service" },
  { icon: <Zap className="w-4 h-4" />, label: "State-of-the-Art Facility" },
  { icon: <Gem className="w-4 h-4" />, label: "OEM Certified Parts" },
  { icon: <ThumbsUp className="w-4 h-4" />, label: "100% Satisfaction Guarantee" },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fromLeftItem: Variants = {
  hidden: { opacity: 0, x: -45, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

const cardGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const pillsGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const pillItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-10% 0px -10% 0px" });
  const cardsInView = useInView(cardsRef, { once: false, margin: "-10% 0px -10% 0px" });
  const pillsInView = useInView(pillsRef, { once: false, margin: "-10% 0px -10% 0px" });

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setSliderPos(Math.min(100, Math.max(0, (x / rect.width) * 100)));
  }, []);

  const onMouseDown = () => setIsDragging(true);
  const onMouseUp = () => setIsDragging(false);
  const onMouseMove = (e: React.MouseEvent) => { if (e.buttons === 1 || isDragging) handleMove(e.clientX); };
  const onTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);

  return (
    <section
      id="why-choose-us"
      className="relative w-full min-h-screen overflow-hidden select-none flex items-center"
      onMouseUp={onMouseUp}
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video src={VIDEO_SRC} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover" />
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, rgba(0,210,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,210,255,0.15) 1px, transparent 1px)`, backgroundSize: "60px 60px", transform: "perspective(800px) rotateX(45deg) translateY(-20%)", transformOrigin: "center top" }} />
        <div className="absolute top-1/4 left-5 sm:left-10 w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] bg-cyan-500/15 rounded-full blur-3xl sm:blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-5 sm:right-10 w-[280px] sm:w-[550px] h-[280px] sm:h-[550px] bg-blue-600/15 rounded-full blur-3xl sm:blur-[100px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-24 sm:h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="w-full container mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Header — staggered from left ── */}
          <motion.div
            ref={headerRef}
            variants={headerStagger}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="max-w-3xl space-y-4 mb-10 sm:mb-14"
          >
            <motion.div variants={fromLeftItem} className="flex items-center gap-3">
              <span className="h-[2px] w-6 sm:w-8 bg-[#e4b021] rounded-full" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 font-mono">Why Choose Us</span>
              <span className="h-[2px] w-6 sm:w-8 bg-[#e4b021] rounded-full" />
            </motion.div>

            <motion.h1 variants={fromLeftItem} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.15]">
              Where Precision Meets{" "}
              <br className="hidden sm:block" />
              <span className="font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">Passion for Perfection</span>
            </motion.h1>

            <motion.p variants={fromLeftItem} className="text-xs sm:text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
              We don&apos;t just repair cars — we restore automotive excellence. Every vehicle that leaves our facility exceeds factory standards with precision that&apos;s measured in microns, not millimeters.
            </motion.p>

            <motion.div variants={fromLeftItem} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-yellow-500 text-yellow-500" />)}
                <span className="text-xs text-white/70 ml-1 font-medium">(2,847 Reviews)</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-white/10" />
              <div className="flex items-center gap-2 text-xs text-white/70">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Satisfaction Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Feature Cards — staggered up ── */}
          <motion.div
            ref={cardsRef}
            variants={cardGrid}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10"
          >
            {WHY_CHOOSE_FEATURES.map((feat, i) => (
              <motion.div
                key={i}
                variants={cardItem}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                className="group relative p-5 sm:p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/25 transition-colors duration-300 shadow-xl"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center flex-shrink-0 transition-all shadow-inner">
                    {feat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5 leading-snug">{feat.title}</h3>
                    <p className="text-xs text-white/60 leading-relaxed mb-3">{feat.desc}</p>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] sm:text-xs font-medium text-white/70 uppercase tracking-wider">{feat.highlight}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── Pill reasons — staggered up ── */}
          <motion.div
            ref={pillsRef}
            variants={pillsGrid}
            initial="hidden"
            animate={pillsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3"
          >
            {ADDITIONAL_REASONS.map((reason, i) => (
              <motion.div
                key={i}
                variants={pillItem}
                className="flex items-center justify-center gap-2 px-3 py-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/15 transition-all text-center"
              >
                <span className="text-white/50 flex-shrink-0">{reason.icon}</span>
                <span className="text-[10px] sm:text-xs font-medium text-white/70 uppercase tracking-wider truncate">{reason.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer trust row */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-xs text-white/40 border-t border-white/10 pt-6">
            <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-cyan-400" /><span>Lifetime Guarantee</span></div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-amber-400" /><span>ASE Master Certified</span></div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div className="flex items-center gap-2"><Handshake className="w-3.5 h-3.5 text-emerald-400" /><span>Insured &amp; Bonded</span></div>
            <div className="hidden md:block w-px h-4 bg-white/10" />
            <div className="hidden md:flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-blue-400" /><span>Same-Day Estimates</span></div>
          </div>

        </div>
      </div>
    </section>
  );
}
