"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Crosshair,
  Palette,
  Cpu,
  FileSignature,
  PhoneCall,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useAppControls } from "@/components/providers/SmoothScrollProvider";
import { audioEngine } from "@/lib/audioSynthesizer";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fromLeft: Variants = {
  hidden: { opacity: 0, x: -55 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const fromLeftStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.13 },
  },
};

const fromLeftItem: Variants = {
  hidden: { opacity: 0, x: -55 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 65 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const cardGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.11 },
  },
};

const cardItem: Variants = {
  hidden: { opacity: 0, y: 45, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE },
  },
};

const fromBottom: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const WARRANTY_PILLARS = [
  {
    icon: Crosshair,
    badge: "LIFETIME UNIBODY GEOMETRY",
    title: "Structural Frame & Chassis Warranty",
    desc: "We guarantee that all unibody frame realignment, structural aluminum pulse-welding, and crash-rail rebuilds are restored to 0.00° factory tolerances for the life of your vehicle.",
    highlights: [
      "Zero chassis drift or uneven tire wear",
      "Factory crashworthiness & crumple zone preservation",
      "OEM Boron & high-strength aluminum bonding",
    ],
    accentGradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
    iconColor:
      "text-cyan-400 border-cyan-400/40 bg-cyan-950/60 shadow-[0_0_15px_rgba(0,210,255,0.3)]",
    tagColor: "text-cyan-300 border-cyan-400/30 bg-cyan-950/40",
  },
  {
    icon: Palette,
    badge: "GLASURIT 90-LINE FINISH",
    title: "Lifetime Paint & Clearcoat Protection",
    desc: "Our computerized spectrophotometer paint matches and multi-stage 9H ceramic clearcoats are backed by a lifetime guarantee against peeling, cracking, fading, hazing, or color deviation.",
    highlights: [
      "100% factory hue, metallic flake & orange-peel match",
      "Downdraft cleanroom heated curing at 160°F",
      "Environmental UV & salt-air corrosion barrier",
    ],
    accentGradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    iconColor:
      "text-emerald-400 border-emerald-400/40 bg-emerald-950/60 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
    tagColor: "text-emerald-300 border-emerald-400/30 bg-emerald-950/40",
  },
  {
    icon: Cpu,
    badge: "100% AUTHENTIC OEM PARTS",
    title: "Genuine Manufacturer Parts Protection",
    desc: "Every panel, bracket, headlight assembly, and electronic sensor installed is an authentic OEM part sourced through certified dealership channels, fully protecting your new car factory warranty.",
    highlights: [
      "Manufacturer direct replacement parts",
      "Preserves original factory warranty terms",
      "Sub-millimeter factory panel gap alignment",
    ],
    accentGradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    iconColor:
      "text-amber-400 border-amber-400/40 bg-amber-950/60 shadow-[0_0_15px_rgba(245,158,11,0.3)]",
    tagColor: "text-amber-300 border-amber-400/30 bg-amber-950/40",
  },
  {
    icon: FileSignature,
    badge: "TRANSFERABLE COVERAGE",
    title: "Transferable Vehicle Resale Protection",
    desc: "Unlike dealership warranties that expire when ownership changes, our repair warranty bonds directly to the VIN number and transfers seamlessly to the next private owner, maximizing vehicle resale value.",
    highlights: [
      "Fully transferable to subsequent owners",
      "Official certified digital VIN documentation",
      "Zero deductible with priority warranty queue",
    ],
    accentGradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    iconColor:
      "text-sky-400 border-sky-400/40 bg-sky-950/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]",
    tagColor: "text-sky-300 border-sky-400/30 bg-sky-950/40",
  },
];

export default function StoryManifesto() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openBookingModal } = useAppControls();

  const headerRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: false, margin: "-10% 0px -10% 0px" });
  const pillarsInView = useInView(pillarsRef, { once: false, margin: "-10% 0px -10% 0px" });
  const bannerInView = useInView(bannerRef, { once: false, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
  }, []);

  const handleBookWarranty = () => {
    audioEngine.playTick(1600);
    openBookingModal();
  };

  return (
    <section
      id="warranty"
      className="relative w-full min-h-screen bg-slate-950 py-24 sm:py-32 px-4 sm:px-6 lg:px-12 xl:px-16 overflow-hidden flex flex-col justify-center select-none"
    >
      {/* ═══ 1. Full-Cover Porsche Panel Dent Repair Transition Video Backdrop ═══ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          src="/Porsche_panel_dent_repair_transi…_202609042259.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.02] opacity-65 sm:opacity-50 transform-gpu"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/20 to-slate-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-slate-950/30 pointer-events-none" />
      </div>

      {/* ═══ Main Content Container ═══ */}
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-20 relative z-10 w-full">

        {/* ═══ Header Section: Business Warranty Guarantee ═══ */}
        <div ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">

          {/* LEFT: badge + headline + paragraph — stagger from left */}
          <motion.div
            variants={fromLeftStagger}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="space-y-4 max-w-3xl"
          >
            {/* Top Ribbon Badge */}
            <motion.div
              variants={fromLeftItem}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>OFFICIAL LIFETIME TRANSFERABLE REPAIR GUARANTEE</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              variants={fromLeftItem}
              className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display leading-[1.08] drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]"
            >
              Guaranteed For As Long <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                As You Own Your Vehicle.
              </span>
            </motion.h2>

            {/* Business Narrative Text */}
            <motion.p
              variants={fromLeftItem}
              className="text-sm sm:text-base md:text-lg text-slate-200 font-sans leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            >
              At <strong className="text-white">Auto Body Repair Inc.</strong>, we don&apos;t compromise on safety or craftsmanship. Every structural rebuild, computerized frame realignment, and Glasurit waterborne refinish performed at our Lynnwood / Everett collision center is backed by a{" "}
              <strong className="text-cyan-300 font-bold">binding Lifetime Transferable Warranty</strong>. If any repair defect arises from our workmanship or materials, we correct it immediately at zero cost to you.
            </motion.p>
          </motion.div>

          {/* RIGHT: Quick Hotline & Verification Card — slides from right */}
          <motion.div
            variants={fromRight}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            className="p-6 sm:p-7 rounded-3xl bg-slate-950/85 border border-slate-700/90 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] space-y-3.5 shrink-0 lg:max-w-sm"
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              <span>ASE Master Certified Facility</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Have questions regarding an active claim or want to verify warranty eligibility by VIN?
            </p>

            <div className="pt-1 flex flex-col gap-2.5">
              <a
                href="tel:14257505164"
                onClick={() => audioEngine.playTick(1600)}
                className="w-full py-3 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md text-center group"
                data-interactive="true"
              >
                <PhoneCall className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>Call: 1 (425) 750-5164</span>
              </a>

              <button
                onClick={handleBookWarranty}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-accent via-sky-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.8)] active:scale-95"
                data-interactive="true"
              >
                Schedule Warranty Inspection
              </button>
            </div>
          </motion.div>
        </div>

        {/* ═══ 2. Four Core Warranty Coverage Pillars Grid ═══ */}
        <motion.div
          ref={pillarsRef}
          variants={cardGrid}
          initial="hidden"
          animate={pillarsInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {WARRANTY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={cardItem}
                whileHover={{ y: -5 }}
                className="p-7 sm:p-8 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-cyan-400/80 transition-colors duration-300 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_50px_rgba(0,210,255,0.2)] flex flex-col justify-between space-y-6 group relative overflow-hidden"
                data-interactive="true"
              >
                {/* Subtle top inner gradient accent */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${pillar.accentGradient}`} />

                <div className="space-y-4">
                  {/* Card Header: Icon & Category Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`p-3.5 rounded-2xl border ${pillar.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full border ${pillar.tagColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight group-hover:text-cyan-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                    {pillar.desc}
                  </p>

                  {/* Key Highlights Bullets */}
                  <div className="pt-2 space-y-2 border-t border-slate-800/80">
                    {pillar.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5 text-xs text-slate-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-slate-800/70 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    100% LIFETIME BACKED
                  </span>
                  <span className="text-slate-400 text-[11px] tracking-wider">ALL 50 STATES</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ═══ 3. Official Digital Certificate Request Banner ═══ */}
        <motion.div
          ref={bannerRef}
          variants={fromBottom}
          initial="hidden"
          animate={bannerInView ? "visible" : "hidden"}
          className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              <FileSignature className="w-4 h-4 text-cyan-400" />
              <span>OFFICIAL DIGITAL DOCUMENTATION</span>
            </div>
            <h4 className="text-2xl sm:text-3xl font-black font-display text-white uppercase">
              Need A Copy Of Your Lifetime Warranty Certificate?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-2xl">
              Every completed repair is logged into our secure national cloud registry. Download your authenticated digital certificate with repair order telemetry, paint batch formulas, and laser alignment specs anytime.
            </p>
          </div>

          <button
            onClick={handleBookWarranty}
            className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 font-mono font-black text-xs sm:text-sm uppercase tracking-wider shrink-0 transition-all shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_40px_rgba(0,210,255,0.8)] active:scale-95 flex items-center gap-2.5"
            data-interactive="true"
          >
            <span>REQUEST CERTIFICATE</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
