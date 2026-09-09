"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { SERVICES_DATA } from "@/data/servicesData";
import { audioEngine } from "@/lib/audioSynthesizer";

export default function TailoredServices() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  return (
    <section
      id="tailored-services"
      className="relative w-full min-h-screen bg-slate-950 pt-16 pb-24 sm:pt-20 sm:pb-28 overflow-hidden flex flex-col justify-center select-none"
    >
      <div id="services" className="absolute -top-20" />

      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
        <video
          ref={videoRef}
          src="/holographic_scanner_inspection.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-[1.02] opacity-75 sm:opacity-60 transform-gpu"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,210,255,0.22)_0%,rgba(3,7,18,0.72)_65%,#030712_100%)] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-32 sm:h-44 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* ── Section Header ── */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 mb-8 sm:mb-12">
        <div className="space-y-3 container mx-auto md:text-left lg:px-12">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-6 sm:w-8 bg-[#e4b021] rounded-full" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 font-mono">
              SERVICES WE PROVIDE
            </span>
            <span className="h-[2px] w-6 sm:w-8 bg-[#e4b021] rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
            Our Tailored Services
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-400 font-sans max-w-xl">
            Precision engineered collision restoration, laser geometry, and bespoke automotive craftsmanship.
          </p>
        </div>
      </div>

      {/* ── Static Cards Grid (All 6 cards visible statically) ── */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        <div className="container mx-auto lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES_DATA.map((service) => (
              <article
                key={service.id}
                className="bg-slate-900/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_40px_rgba(0,210,255,0.2)] border border-white/10 hover:border-cyan-400/50 transition-all duration-300 flex flex-col h-full group select-none"
              >
                {/* Image & Category Badge */}
                <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-950/40">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-85 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] font-mono font-medium uppercase tracking-wider text-cyan-300 border border-white/10">
                      {service.category}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-2.5 py-1 rounded-lg bg-[#E63917] text-white text-[10px] font-mono font-bold uppercase tracking-wider shadow">
                      #{service.badgeNumber}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5 bg-transparent">
                  <div className="space-y-3">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-amber-300 transition-colors">
                      {service.title}
                    </h3>
                    <div className="pt-2 space-y-2 border-t border-white/5">
                      {service.features.slice(0, 2).map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400 font-sans">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/70 shrink-0" />
                          <span className="truncate">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5">
                    <span className="text-slate-500">Turnaround:</span>
                    <span className="text-amber-400/90 font-medium">{service.turnaround}</span>
                  </div>
                </div>

                {/* CTA Link */}
                <Link
                  href={`/services/${service.slug}`}
                  onClick={() => audioEngine.playTick(1600)}
                  className="w-full bg-white/[0.03] hover:bg-[#e4b021] text-slate-300 hover:text-slate-950 py-3.5 px-6 font-semibold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all duration-300 border-t border-white/10 group/btn"
                  data-interactive="true"
                  data-cursor-label="VIEW"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
