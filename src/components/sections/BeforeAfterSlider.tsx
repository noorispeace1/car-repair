"use client";

import { useState, useRef } from "react";
import {
  CheckCircle2, Award, Wand2, Handshake,
  Shield, Clock, Star, Zap, Gem, ThumbsUp,
  Sparkles, Crosshair, ChevronRight, Activity
} from "lucide-react";
import { motion, useInView, type Variants } from "framer-motion";
import { audioEngine } from "@/lib/audioSynthesizer";

const VIDEO_SRC = "/Porsche_panel_dent_repair_transi\u2026_202609042259.mp4";
const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface FeatureType {
  title: string;
  desc: string;
  icon: React.ReactNode;
  highlight: string;
  metric: string;
  metricLabel: string;
  accentColor: string;
  badgeId: string;
}

const WHY_CHOOSE_FEATURES: FeatureType[] = [
  {
    badgeId: "SPEC-01",
    title: "35+ Years of Master Craftsmanship",
    desc: "ASE Master-certified specialists who have restored over 8,000 luxury vehicles with zero compromise on structural integrity or aesthetic perfection.",
    icon: <Award className="w-6 h-6 text-amber-400" />,
    highlight: "8,000+ Restorations",
    metric: "35+",
    metricLabel: "Years Experience",
    accentColor: "from-amber-500/20 via-amber-500/5 to-transparent",
  },
  {
    badgeId: "SPEC-02",
    title: "Sub-Millimeter Laser Precision",
    desc: "Computerized unibody chassis realignment with tolerances under 0.5mm. Factory-calibrated multi-stage paint blending that is indistinguishable from the original showroom finish.",
    icon: <Wand2 className="w-6 h-6 text-cyan-400" />,
    highlight: "0.5mm Tolerance",
    metric: "0.5mm",
    metricLabel: "Factory Tolerance",
    accentColor: "from-cyan-500/20 via-cyan-500/5 to-transparent",
  },
  {
    badgeId: "SPEC-03",
    title: "White-Glove Concierge Experience",
    desc: "Dedicated project managers, live repair milestone photo updates, and a comprehensive transferable lifetime warranty that stays with the vehicle for complete peace of mind.",
    icon: <Handshake className="w-6 h-6 text-emerald-400" />,
    highlight: "Lifetime Warranty",
    metric: "100%",
    metricLabel: "Transferable Coverage",
    accentColor: "from-emerald-500/20 via-emerald-500/5 to-transparent",
  },
];

const ADDITIONAL_REASONS = [
  { icon: <Shield className="w-4 h-4 text-amber-400" />, label: "Insurance Claim Assistance", glow: "hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]" },
  { icon: <Clock className="w-4 h-4 text-cyan-400" />, label: "3-Day Rapid Service", glow: "hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,210,255,0.2)]" },
  { icon: <Star className="w-4 h-4 text-yellow-400" />, label: "5-Star Rated Service", glow: "hover:border-yellow-400/40 hover:shadow-[0_0_20px_rgba(234,179,8,0.2)]" },
  { icon: <Zap className="w-4 h-4 text-purple-400" />, label: "State-of-the-Art Facility", glow: "hover:border-purple-400/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]" },
  { icon: <Gem className="w-4 h-4 text-rose-400" />, label: "OEM Certified Parts", glow: "hover:border-rose-400/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]" },
  { icon: <ThumbsUp className="w-4 h-4 text-emerald-400" />, label: "100% Satisfaction Guarantee", glow: "hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]" },
];

// ── Motion Variants ──────────────────────────────────────────────────────────

const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fromLeftItem: Variants = {
  hidden: { opacity: 0, x: -35, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

const cardGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

const pillsGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const pillItem: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

// ── Interactive Spotlight Feature Card ───────────────────────────────────────

function InteractiveFeatureCard({ feat, index }: { feat: FeatureType; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardItem}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onMouseEnter={() => {
        setIsHovered(true);
        audioEngine.playTick(1600 + index * 100);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group relative p-6 sm:p-7 md:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(0,210,255,0.18)] flex flex-col justify-between"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 210, 255, 0.14), transparent 60%)`,
        }}
      />

      {/* Top Laser Accent Sweep Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Futuristic HUD Tech Corner Brackets */}
      <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-slate-700/60 group-hover:border-cyan-400 transition-colors duration-300 pointer-events-none" />
      <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-slate-700/60 group-hover:border-cyan-400 transition-colors duration-300 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-slate-700/60 group-hover:border-cyan-400 transition-colors duration-300 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-slate-700/60 group-hover:border-cyan-400 transition-colors duration-300 pointer-events-none" />

      {/* Card Header & Content */}
      <div className="space-y-4 relative z-10">
        {/* Top Badges */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 group-hover:border-cyan-500/40 group-hover:text-cyan-300 transition-colors">
            {feat.badgeId}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span>CERTIFIED</span>
          </div>
        </div>

        {/* Icon with Glowing Rotating Cyber Ring */}
        <div className="flex items-center gap-4 pt-1">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-700/70 group-hover:border-cyan-400 flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-inner group-hover:shadow-[0_0_20px_rgba(0,210,255,0.3)]">
            {/* Spinning decorative ring on hover */}
            <div className="absolute inset-0 rounded-2xl border border-dashed border-cyan-400/30 group-hover:animate-spin pointer-events-none" style={{ animationDuration: "12s" }} />
            {feat.icon}
          </div>

          <div>
            <span className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {feat.metric}
            </span>
            <p className="text-[11px] font-mono text-slate-400 tracking-wide">
              {feat.metricLabel}
            </p>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2 pt-1">
          <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-white leading-snug">
            {feat.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300/80 font-sans leading-relaxed">
            {feat.desc}
          </p>
        </div>
      </div>

      {/* Telemetry Progress Bar & Highlight Pill */}
      <div className="pt-6 relative z-10 space-y-3">
        <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={isHovered ? { width: "100%" } : { width: "75%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${index === 0 ? "from-amber-500 to-yellow-400" : index === 1 ? "from-cyan-500 to-blue-400" : "from-emerald-500 to-green-400"}`}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-950/90 rounded-xl border border-slate-800 group-hover:border-cyan-400/40 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wider">
              {feat.highlight}
            </span>
          </div>

          <span className="text-[10px] font-mono text-slate-500 group-hover:text-cyan-400 transition-colors flex items-center gap-0.5">
            VERIFIED <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Section ─────────────────────────────────────────────────────────────

export default function BeforeAfterSlider() {
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px -10% 0px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-10% 0px -10% 0px" });
  const pillsInView = useInView(pillsRef, { once: true, margin: "-10% 0px -10% 0px" });

  return (
    <section
      id="why-choose-us"
      className="relative w-full min-h-screen overflow-hidden select-none flex items-center py-20 sm:py-28"
    >
      {/* ── Background: Cinematic Video with Ambient Depth & Tech Grid ── */}
      <div className="absolute inset-0 w-full h-full -z-10">
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-110"
        />

        {/* Futuristic Perspective Grid */}
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,210,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,210,255,0.18) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
            transform: "perspective(900px) rotateX(45deg) translateY(-15%)",
            transformOrigin: "center top",
          }}
        />

        {/* Ambient Atmospheric Glows */}
        <div className="absolute top-1/4 left-5 sm:left-10 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-5 sm:right-10 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Smooth Seamless Section Blending Gradients */}
        <div className="absolute top-0 inset-x-0 h-28 sm:h-40 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

        {/* Slow Vertical Laser Scanline */}
        <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent animate-pulse pointer-events-none top-1/3" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-16">

          {/* ── Section Header ── */}
          <motion.div
            ref={headerRef}
            variants={headerStagger}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="max-w-3xl space-y-5"
          >
            {/* Glowing Category Badge */}
            <motion.div variants={fromLeftItem} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(251,191,36,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span>Why Choose Us // Precision Standards</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              variants={fromLeftItem}
              className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white leading-[1.1] drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]"
            >
              Where Precision Meets{" "}
              <span className="bg-gradient-to-r from-white via-slate-100 to-amber-300 bg-clip-text text-transparent">
                Passion for Perfection
              </span>
            </motion.h2>

            {/* Description Subtitle */}
            <motion.p
              variants={fromLeftItem}
              className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-2xl"
            >
              We don&apos;t just repair cars — we restore automotive excellence. Every vehicle that leaves our facility exceeds factory tolerances with precision measured in microns, backed by our lifetime warranty.
            </motion.p>

            {/* Verified Reviewers & Quality Metric */}
            <motion.div variants={fromLeftItem} className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-900/70 border border-slate-800 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs font-mono font-bold text-white/90 ml-1">
                  4.98 / 5.0 (2,847 Reviews)
                </span>
              </div>

              <div className="hidden sm:block w-px h-5 bg-slate-800" />

              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-bold">100% Satisfaction Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── 3 High-Tech Feature Cards (Interactive 3D Spotlight) ── */}
          <motion.div
            ref={cardsRef}
            variants={cardGrid}
            initial="hidden"
            animate={cardsInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
          >
            {WHY_CHOOSE_FEATURES.map((feat, i) => (
              <InteractiveFeatureCard key={feat.badgeId} feat={feat} index={i} />
            ))}
          </motion.div>

          {/* ── 6 Interactive Reason Pills (Neon Hover Glow) ── */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
              ● Facility Certifications &amp; Operational Standards:
            </span>

            <motion.div
              ref={pillsRef}
              variants={pillsGrid}
              initial="hidden"
              animate={pillsInView ? "visible" : "hidden"}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            >
              {ADDITIONAL_REASONS.map((reason, i) => (
                <motion.div
                  key={i}
                  variants={pillItem}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onMouseEnter={() => audioEngine.playTick(1800)}
                  className={`flex items-center justify-center gap-2.5 px-3 py-3.5 bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-2xl cursor-pointer transition-all duration-300 text-center ${reason.glow}`}
                >
                  <span className="flex-shrink-0">{reason.icon}</span>
                  <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-300 uppercase tracking-wider truncate">
                    {reason.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── Footer Trust Row ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 hover:text-cyan-300 transition-colors">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="font-bold">Transferable Lifetime Guarantee</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-800" />
            <div className="flex items-center gap-2 hover:text-amber-300 transition-colors">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold">ASE &amp; I-CAR Platinum Certified</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-slate-800" />
            <div className="flex items-center gap-2 hover:text-emerald-300 transition-colors">
              <Handshake className="w-4 h-4 text-emerald-400" />
              <span className="font-bold">Fully Insured &amp; State Bonded</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-slate-800" />
            <div className="flex items-center gap-2 hover:text-blue-300 transition-colors">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="font-bold">Instant Digital Repair Tracking</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
