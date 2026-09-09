"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Car,
  ExternalLink,
  Award,
  Sparkles,
  Zap,
  Gauge,
  Activity,
  MapPin,
  ThumbsUp,
} from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";
import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Review {
  id: number;
  author: string;
  initial: string;
  avatarGradient: string;
  localGuideLevel: number;
  totalReviews: number;
  totalPhotos: number;
  vehicle: string;
  category: "all" | "porsche" | "collision";
  rating: number;
  location: string;
  verifiedDate: string;
  serviceTag: string;
  serviceType: "frame" | "ev" | "sprint";
  insurerTag: string;
  comment: string;
  helpfulCount: number;
  invoiceId: string;
}

const REVIEWS: Review[] = [
  {
    id: 1,
    author: "Marcus Vance",
    initial: "M",
    avatarGradient: "bg-gradient-to-br from-[#1A73E8] via-[#2B6CB0] to-[#1E3A8A]",
    localGuideLevel: 7,
    totalReviews: 48,
    totalPhotos: 22,
    vehicle: "2023 Porsche 911 Carrera GTS",
    category: "porsche",
    rating: 5,
    location: "Everett, WA",
    verifiedDate: "3 days ago",
    serviceTag: "Precision Laser Frame Alignment",
    serviceType: "frame",
    insurerTag: "Chubb Prestige Carrier",
    comment:
      "After a severe front-quarter impact, Auto Body Repair Inc. restored my 911 Carrera using their precision laser frame bench. The Miami Blue factory-spec paint match is indistinguishable from the Stuttgart showroom finish. Delivered in 3 days!",
    helpfulCount: 18,
    invoiceId: "WA-8842",
  },
  {
    id: 2,
    author: "Elena Rostova",
    initial: "E",
    avatarGradient: "bg-gradient-to-br from-[#9334E6] via-[#7C3AED] to-[#581C87]",
    localGuideLevel: 8,
    totalReviews: 76,
    totalPhotos: 39,
    vehicle: "2022 Porsche Taycan Turbo S",
    category: "porsche",
    rating: 5,
    location: "Lynnwood, WA",
    verifiedDate: "1 week ago",
    serviceTag: "High-Voltage EV Structural & ADAS",
    serviceType: "ev",
    insurerTag: "Porsche Approved Network",
    comment:
      "High-voltage aluminum structural repair requires true mastery. They handled the entire insurance claim with Chubb and recalibrated all ADAS radars and LiDAR sensors to factory tolerance. Best collision center on Hwy 99.",
    helpfulCount: 24,
    invoiceId: "WA-8819",
  },
  {
    id: 3,
    author: "David K.",
    initial: "D",
    avatarGradient: "bg-gradient-to-br from-[#0D9488] via-[#059669] to-[#064E3B]",
    localGuideLevel: 6,
    totalReviews: 31,
    totalPhotos: 14,
    vehicle: "2024 BMW M4 Competition",
    category: "collision",
    rating: 5,
    location: "Mukilteo, WA",
    verifiedDate: "2 weeks ago",
    serviceTag: "03-Day Rapid Sprint Collision",
    serviceType: "sprint",
    insurerTag: "Direct Insurance Billing",
    comment:
      "The 03-Day Rapid Sprint is real. Dropped it off on Tuesday with cracked carbon fiber splitter and quarter panel damage, picked it up Friday morning spotless. Unbeatable craftsmanship and customer service.",
    helpfulCount: 31,
    invoiceId: "WA-8794",
  },
];

// ── Official Google Multi-Color 'G' Glyph ──────────────────────────────────────
function GoogleOfficialGlyph() {
  return (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

// ── Official Google Local Guide Star Emblem ───────────────────────────────────
function GoogleLocalGuideEmblem() {
  return (
    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#EA4335] text-white shrink-0 shadow-sm border border-slate-900">
      <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </span>
  );
}

// ── Authentic Google Account Avatar with Initial Monogram ──────────────────────
function GoogleAccountAvatar({
  initial,
  author,
  gradient,
  localGuideLevel,
}: {
  initial: string;
  author: string;
  gradient: string;
  localGuideLevel: number;
}) {
  return (
    <div className="relative shrink-0">
      {/* Real Google Account Colorful Letter Avatar */}
      <div
        className={`w-11 h-11 rounded-full ${gradient} flex items-center justify-center text-white font-black text-base font-sans shadow-md border-2 border-white/20 select-none`}
        title={`Google Account: ${author}`}
      >
        <span className="drop-shadow-sm">{initial}</span>
      </div>

      {/* Google Local Guide Badge Badge Icon */}
      <div
        className="absolute -bottom-1 -right-1"
        title={`Google Local Guide Level ${localGuideLevel}`}
      >
        <GoogleLocalGuideEmblem />
      </div>
    </div>
  );
}

// ── Animated Google 5-Star Rating (Sequential Shimmer & Scale Animation) ───────
function AnimatedGoogleStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: rating }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.25, 1],
              filter: [
                "drop-shadow(0 0 2px rgba(251,188,4,0.4))",
                "drop-shadow(0 0 8px rgba(251,188,4,0.95))",
                "drop-shadow(0 0 2px rgba(251,188,4,0.4))",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.18,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-4 h-4 text-[#FBBC04] fill-[#FBBC04]"
              viewBox="0 0 24 24"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </motion.div>
        ))}
      </div>
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="text-amber-400"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-300 drop-shadow-[0_0_6px_#F59E0B]" />
      </motion.div>
    </div>
  );
}

// ── Static Review Card (Completely Static, Animated Stars & Text Reveal) ───────
function StaticReviewCard({ review, index }: { review: Review; index: number }) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [hasLiked, setHasLiked] = useState(false);

  const handleHelpfulClick = () => {
    audioEngine.playTick(1900);
    if (!hasLiked) {
      setHelpfulCount((c) => c + 1);
      setHasLiked(true);
    } else {
      setHelpfulCount((c) => c - 1);
      setHasLiked(false);
    }
  };

  const renderServiceIcon = () => {
    if (review.serviceType === "ev")
      return <Zap className="w-3 h-3 text-cyan-300" />;
    if (review.serviceType === "sprint")
      return <Activity className="w-3 h-3 text-cyan-300" />;
    return <Gauge className="w-3 h-3 text-cyan-300" />;
  };

  return (
    <div className="relative rounded-2xl p-[1.5px] bg-gradient-to-b from-slate-800/80 via-slate-850/60 to-slate-900/80 hover:from-cyan-500/40 hover:to-slate-800 transition-colors duration-300 h-full flex flex-col select-none">
      {/* Main Glass Review Container (Static, No tilt, No float) */}
      <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#0B132B]/95 via-[#070D1F]/98 to-[#030712] p-6 sm:p-7 border border-slate-800/90 hover:border-cyan-400/40 backdrop-blur-xl flex flex-col justify-between space-y-5 shadow-[0_12px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_18px_45px_rgba(0,210,255,0.15)] transition-all duration-300">
        
        {/* ── 1. AUTHENTIC GOOGLE REVIEWER HEADER ── */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            {/* Left: Google Letter Avatar + Authentic Local Guide Metadata */}
            <div className="flex items-center gap-3">
              <GoogleAccountAvatar
                initial={review.initial}
                author={review.author}
                gradient={review.avatarGradient}
                localGuideLevel={review.localGuideLevel}
              />

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight font-display">
                    {review.author}
                  </h3>
                  <span
                    className="inline-flex items-center text-emerald-400"
                    title="Verified Google Customer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-sans">
                  <span className="text-amber-400 font-medium">
                    Local Guide · Level {review.localGuideLevel}
                  </span>
                  <span>•</span>
                  <span>{review.totalReviews} reviews</span>
                </div>
              </div>
            </div>

            {/* Right: Google Verified Badge Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-sm shrink-0">
              <GoogleOfficialGlyph />
              <span className="text-[10px] font-mono font-bold uppercase text-slate-300 tracking-wider">
                Review
              </span>
            </div>
          </div>

          {/* ── 2. ANIMATED 5-STAR RATING & TIMESTAMP ── */}
          <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <AnimatedGoogleStars rating={review.rating} />
              <span className="text-xs font-mono font-bold text-amber-400">
                5.0
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {review.verifiedDate}
            </span>
          </div>

          {/* ── 3. SERVICE & INSURANCE SPEC CHIPS ── */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] font-mono font-bold uppercase flex items-center gap-1.5 shadow-sm">
              {renderServiceIcon()}
              <span>{review.serviceTag}</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/90 text-slate-300 text-[10px] font-mono font-medium uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{review.insurerTag}</span>
            </span>
          </div>

          {/* ── 4. REVIEW TESTIMONIAL COMMENT WITH KINETIC TEXT ANIMATION ── */}
          <div className="relative pt-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: EASE }}
              className="relative pl-3 border-l-2 border-cyan-500/40"
            >
              <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed font-sans">
                &ldquo;{review.comment}&rdquo;
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── 5. AUTHENTIC VEHICLE & GOOGLE ACTION FOOTER ── */}
        <div className="pt-4 border-t border-slate-800/90 space-y-2.5">
          {/* Full Vehicle Tag */}
          <div className="flex items-center justify-between gap-2 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-cyan-300 font-semibold truncate">
              <Car className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{review.vehicle}</span>
            </div>
            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0 font-bold">
              ✓ {review.invoiceId}
            </span>
          </div>

          {/* Bottom Row: Helpful button + Location */}
          <div className="flex items-center justify-between gap-2 pt-1 text-[11px] text-slate-400">
            {/* Interactive Helpful button */}
            <button
              type="button"
              onClick={handleHelpfulClick}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all text-xs font-sans ${
                hasLiked
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.3)]"
                  : "bg-slate-900/80 border-slate-700/80 text-slate-300 hover:text-white hover:border-slate-600"
              }`}
            >
              <ThumbsUp
                className={`w-3 h-3 ${
                  hasLiked ? "fill-cyan-300 text-cyan-300" : ""
                }`}
              />
              <span>Helpful ({helpfulCount})</span>
            </button>

            {/* Location tag */}
            <div className="flex items-center gap-1 text-slate-400 font-mono text-[10px]">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>{review.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Header Animation Variants ──────────────────────────────────────────────────
const headerStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fromLeftItem: Variants = {
  hidden: { opacity: 0, x: -35, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

const fromRight: Variants = {
  hidden: { opacity: 0, x: 45, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

const fromBottom: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// ── Main Section ──────────────────────────────────────────────────────────────
export default function ReviewsCarousel() {
  const [activeTab, setActiveTab] = useState<"all" | "porsche" | "collision">(
    "all"
  );

  const filteredReviews =
    activeTab === "all"
      ? REVIEWS
      : REVIEWS.filter((r) => r.category === activeTab);

  return (
    <section
      id="reviews"
      className="relative w-full min-h-screen bg-slate-950 py-24 sm:py-32 px-4 sm:px-8 lg:px-12 xl:px-20 overflow-hidden select-none flex flex-col justify-center items-center"
    >
      {/* Luxury Automotive Ambience Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <img
          src="/happy_customer_testimonial_bg.jpg"
          alt="Happy customer receiving restored Porsche keys"
          className="w-full h-full object-cover object-center opacity-60 sm:opacity-45 filter brightness-105 contrast-110 transform-gpu"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,210,255,0.18)_0%,rgba(3,7,18,0.75)_50%,#030712_95%)]" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,210,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,210,255,0.15) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
            transform: "perspective(800px) rotateX(45deg) translateY(-20%)",
            transformOrigin: "center top",
          }}
        />
        <div className="absolute top-1/4 left-10 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/15 rounded-full blur-3xl sm:blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-10 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-blue-600/15 rounded-full blur-3xl sm:blur-[100px]" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      </div>

      <div className="w-full container lg:px-8 mx-auto relative z-10 space-y-12 sm:space-y-14">
        {/* ── Header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          {/* Title & Description */}
          <motion.div
            className="space-y-3"
            variants={headerStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2
              variants={fromLeftItem}
              className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]"
            >
              Driver Testimonials
            </motion.h2>
            <motion.p
              variants={fromLeftItem}
              className="text-sm sm:text-base text-slate-400 font-sans max-w-xl leading-relaxed"
            >
              Real owners of Porsche, BMW, Mercedes, and Tesla sharing their
              authentic collision restoration experiences at our 12902 Hwy 99
              facility.
            </motion.p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl self-start lg:self-end shadow-lg"
            variants={fromRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              { id: "all", label: "ALL REVIEWS" },
              { id: "porsche", label: "PORSCHE CERTIFIED" },
              { id: "collision", label: "03-DAY SPRINT" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    audioEngine.playTick(1800);
                    setActiveTab(tab.id as "all" | "porsche" | "collision");
                  }}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 ${
                    active
                      ? "text-cyan-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                  data-interactive="true"
                >
                  {active && (
                    <motion.div
                      layoutId="activeReviewFilter"
                      className="absolute inset-0 rounded-xl bg-cyan-500/20 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,210,255,0.35)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Static Review Cards Grid (Static, Authentic Google Icons, Animated Stars & Text) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
          {filteredReviews.map((review, idx) => (
            <div key={review.id} className="h-full">
              <StaticReviewCard review={review} index={idx} />
            </div>
          ))}
        </div>

        {/* ── Trust banner ── */}
        <motion.div
          variants={fromBottom}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(245,158,11,0.25)]">
              <Award className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white font-display uppercase tracking-wide">
                100% Verified Five-Star Customer Satisfaction
              </h4>
              <p className="text-xs text-slate-400 font-sans mt-0.5">
                Every review represents authentic post-collision inspections &amp;
                transferable lifetime warranty delivery.
              </p>
            </div>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playTick(1800)}
            className="px-6 py-3 rounded-xl bg-slate-800/90 hover:bg-cyan-500/10 border border-slate-700 hover:border-cyan-400/50 text-white hover:text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md group shrink-0"
            data-interactive="true"
            data-cursor-label="REVIEWS"
          >
            <span>VIEW ALL 340+ GOOGLE REVIEWS</span>
            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
