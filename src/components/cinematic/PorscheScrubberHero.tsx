"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, ArrowRight, Award, Wrench, CheckCircle2, ShieldCheck } from "lucide-react";
import { useAppControls } from "@/components/providers/SmoothScrollProvider";
import { audioEngine } from "@/lib/audioSynthesizer";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/Porsche_911_rotating_in_studio_202609041644.mp4";

// ── Page-load stagger variants ────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.25 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Metric cards get a slightly different entry (scale up from slightly smaller)
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.95, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const cardContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function PorscheScrubberHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openBookingModal } = useAppControls();

  // Scroll progress relative to this section (start→end of section leaving viewport)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Spring-smooth for buttery physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 22,
    restDelta: 0.001,
  });

  // Parallax: text drifts upward as section scrolls away
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-28%"]);
  // Fade out text as section exits
  const textOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  // Lens-blur on scroll out
  const textBlur = useTransform(smoothProgress, [0, 0.6], [0, 10]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, []);

  const handleBookingCTA = () => {
    audioEngine.playEngineRoar();
    openBookingModal();
  };

  return (
    <section
      id="restoration-film"
      ref={sectionRef}
      className="relative w-full min-h-[100dvh] py-28 sm:py-32 bg-slate-950 text-white overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        <video
          ref={videoRef}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transform-gpu select-none pointer-events-none opacity-85 sm:opacity-100"
        />
      </div>

      {/* Instant Cybernetic Tech Grid & Glow Background (Always visible immediately) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d2ff0d_1px,transparent_1px),linear-gradient(to_bottom,#00d2ff0d_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(0,210,255,0.22)_0%,rgba(8,14,26,0.80)_65%,#030712_100%)] pointer-events-none" />

      {/* Top / Bottom fades */}
      <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-slate-950 via-slate-950/70 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 sm:h-52 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent pointer-events-none z-10" />

      {/* ── Scroll-parallax wrapper — drives Y + opacity + blur on scroll ── */}
      <motion.div
        className="relative z-20 flex flex-col justify-center items-center px-4 sm:px-8 md:px-12 lg:px-16 w-full text-center"
        style={{
          y: textY,
          opacity: textOpacity,
          filter: useTransform(textBlur, (v) => `blur(${v}px)`),
        }}
      >
        {/* ── Stagger container (rendered immediately with initial={false}) ── */}
        <motion.div
          className="max-w-5xl space-y-5 sm:space-y-6 flex flex-col items-center"
          variants={containerVariants}
          initial={false}
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-widest shadow-md"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Uncompromised Quality &amp; Craftsmanship</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight font-display text-white drop-shadow-[0_4px_30px_rgba(255,255,255,0.25)]"
          >
            WE PROVIDE THE WORLD&apos;S BEST SERVICE
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-xs sm:text-base md:text-lg text-slate-200 font-sans leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]"
          >
            Delivering dealership-grade collision restoration, computerized laser chassis realignment, and Glasurit
            factory waterborne refinishing for Porsche, luxury, and all vehicle makes. Every repair is executed to
            millimeter tolerances with comprehensive multi-point safety validation and guaranteed lifetime warranty.
          </motion.p>

          {/* Metric Cards — rendered immediately */}
          <motion.div
            variants={cardContainerVariants}
            initial={false}
            animate="visible"
            className="w-full pt-1 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 text-left"
          >
            {[
              { title: "OEM Precision", desc: "100% Factory Specs", icon: <Wrench className="w-4 h-4 text-amber-400" /> },
              { title: "Laser Calibrated", desc: "0.00° Deviation", icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
              { title: "Lifetime Guarantee", desc: "Transferable Warranty", icon: <ShieldCheck className="w-4 h-4 text-cyan-400" /> },
              { title: "Rapid Turnaround", desc: "03-Day Sprint Option", icon: <Award className="w-4 h-4 text-rose-400" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2, ease: "easeOut" } }}
                className="p-3.5 sm:p-4 rounded-xl bg-slate-950/75 border border-slate-800/90 backdrop-blur-md space-y-1 hover:border-amber-400/50 transition-colors shadow-lg"
              >
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span className="text-[11px] sm:text-xs font-bold text-white font-mono uppercase">{item.title}</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <Link
              href="/book-now"
              onClick={() => audioEngine.playEngineRoar()}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-mono text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.45)] hover:shadow-[0_0_35px_rgba(245,158,11,0.75)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              data-interactive="true"
              data-cursor-label="BOOK"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>BOOK A SERVICE</span>
            </Link>

            <a
              href="#tailored-services"
              onClick={() => audioEngine.playTick(1600)}
              className="px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-slate-950/85 border border-slate-700 hover:border-amber-400 text-white hover:text-amber-300 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-slate-900 transition-all flex items-center gap-2 group shadow-md"
              data-interactive="true"
              data-cursor-label="EXPLORE"
            >
              <span>KNOW MORE</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
