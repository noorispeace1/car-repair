"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import {
  HeartHandshake,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Car,
  Users,
  Clock,
  Star,
  ThumbsUp,
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

const fromRightStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const fromRightItem: Variants = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

export default function ServicesMatrix() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openBookingModal } = useAppControls();

  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: false, margin: "-10% 0px -10% 0px" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => { });
  }, []);

  const handleContactClick = () => {
    audioEngine.playTick(1600);
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      openBookingModal();
    }
  };

  return (
    <section
      id="about"
      className="relative w-full min-h-screen overflow-hidden select-none"
    >
      <div id="holographic-inspection" className="absolute -top-20" />

      {/* ═══ Full-Cover Video Background ═══ */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          src="/robotic_equipment_service.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center transform-gpu"
        />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 pointer-events-none" />

        {/* Top and Bottom Fades for seamless section blending */}
        <div className="absolute top-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* ═══ Main Content Container ═══ */}
      <div className="relative z-10 w-full min-h-screen flex items-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-7xl mx-auto">

          {/* ═══ Top Section: Mascot & Community Pillars Grid ═══ */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
          >

            {/* ── Left Column: "START YOUR ENGINES" & Circular Mascot Avatar — slides from left ── */}
            <motion.div
              variants={fromLeft}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              className="lg:col-span-5 flex flex-col items-center text-center space-y-5"
            >
              {/* Tagline: START YOUR ENGINES */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="h-[2px] w-4 sm:w-6 bg-yellow-400 rounded-full" />
                  <span className="text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-yellow-400 font-mono">
                    START YOUR ENGINES
                  </span>
                  <span className="h-[2px] w-4 sm:w-6 bg-yellow-400 rounded-full" />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black font-display text-white tracking-tight uppercase">
                  YOUR TRUSTED CREW
                </h2>
              </div>

              {/* Circular Mascot Avatar Frame */}
              <div className="relative group">
                {/* Outer pulsing neon glow halo */}
                <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-emerald-500 via-cyan-400 to-teal-400 opacity-40 group-hover:opacity-75 blur-xl transition-all duration-700 animate-pulse" />

                {/* Multi-layered futuristic border container */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full p-2 bg-gradient-to-br from-emerald-500 via-cyan-400 to-teal-400 shadow-[0_0_50px_rgba(234,179,8,0.35)]">
                  <div className="w-full h-full rounded-full overflow-hidden border-4 border-slate-950 bg-slate-950 relative">
                    <img
                      src="/mechanic_mascot.jpg"
                      alt="Auto Body Repair Specialist Mascot"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Subtle inner radial vignette */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-950/40 pointer-events-none" />
                  </div>
                </div>

                {/* Floating Verified Badge */}
                <div className="absolute bottom-1 right-2 sm:bottom-2 sm:right-3 lg:bottom-4 lg:right-6 bg-slate-950/90 backdrop-blur-md border border-yellow-400/60 text-yellow-300 px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 rounded-full text-[8px] sm:text-[10px] lg:text-xs font-mono font-bold shadow-[0_0_20px_rgba(234,179,8,0.4)] flex items-center gap-1 sm:gap-1.5">
                  <CheckCircle2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-yellow-400" />
                  <span>SINCE 1988</span>
                </div>
              </div>

              {/* Sub-badge under avatar */}
              <p className="text-[8px] sm:text-[10px] lg:text-xs font-mono text-slate-400 tracking-wider uppercase">
                • MASTER CERTIFIED TECHNICIANS •
              </p>
            </motion.div>

            {/* ── Right Column: Community Focus — stagger from right ── */}
            <motion.div
              variants={fromRightStagger}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
              className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 lg:space-y-7 text-left"
            >
              {/* Header: WE CARE ABOUT OUR NEIGHBORS */}
              <motion.div variants={fromRightItem} className="space-y-2 sm:space-y-3">
                <span className="text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-widest text-yellow-400 font-mono flex items-center gap-1.5 sm:gap-2">
                  <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
                  WE CARE ABOUT OUR NEIGHBORS
                </span>

                {/* Big Bold Triple Community Stack */}
                <div className="space-y-0.5 sm:space-y-1">
                  <motion.h3
                    variants={fromRightItem}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display text-white tracking-tight uppercase leading-none drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)]"
                  >
                    WE LIVE IN THE COMMUNITY
                  </motion.h3>
                  <motion.h3
                    variants={fromRightItem}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent tracking-tight uppercase leading-none"
                  >
                    WORK IN THE COMMUNITY
                  </motion.h3>
                  <motion.h3
                    variants={fromRightItem}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-display text-white tracking-tight uppercase leading-none"
                  >
                    SERVE THE COMMUNITY
                  </motion.h3>
                </div>
              </motion.div>

              {/* Paragraph Text */}
              <motion.div
                variants={fromRightItem}
                className="space-y-3 sm:space-y-4 text-slate-300 font-sans text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl bg-black/50 backdrop-blur-xl p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              >
                <p>
                  Whether we&apos;re getting your car back on the road — and you back to your day, dealing with the simplest or toughest of repairs on cars and trucks, is what we do.
                </p>

                <p>
                  We support local teachers and classrooms with supplies that exceed district funding. We&apos;re invested and here to stay. It&apos;s just one of the reasons you know we&apos;ll stand by our work. Since 1990,{" "}
                  <strong className="text-white font-semibold">Auto-Body-Repair</strong> is your trusted neighborhood repair shop.
                </p>
              </motion.div>

              {/* Action Button */}
              <motion.div
                variants={fromRightItem}
                className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
              >
                <button
                  onClick={handleContactClick}
                  className="px-6 sm:px-7 lg:px-8 py-3 sm:py-3.5 lg:py-4 rounded-xl border-2 border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-slate-950 font-mono font-bold text-[10px] sm:text-xs lg:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(234,179,8,0.3)] hover:shadow-[0_0_40px_rgba(234,179,8,0.7)] active:scale-95 flex items-center gap-2 sm:gap-3 group"
                  data-interactive="true"
                  data-cursor-label="CONTACT"
                >
                  <span>CONTACT AUTO-BODY-REPAIR</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <div className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] lg:text-xs font-mono text-slate-400">
                  <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-yellow-400" />
                  <span>LIFETIME CRAFTSMANSHIP GUARANTEE</span>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
