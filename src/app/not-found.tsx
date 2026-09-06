"use client";

import Link from "next/link";
import { ArrowLeft, Home, Phone, Wrench, AlertTriangle, Crosshair } from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "@/data/servicesData";

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 select-none overflow-hidden">
      {/* Background ambient automotive radial glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        
        {/* Status indicator badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs uppercase tracking-widest">
          <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "12s" }} />
          <span>DIAGNOSTIC STATUS: 404 UNMAPPED ROUTE</span>
        </div>

        {/* Big Neon 404 */}
        <div className="relative">
          <h1 className="text-8xl sm:text-9xl font-black font-display tracking-tighter bg-gradient-to-b from-white via-slate-200 to-slate-700 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,210,255,0.35)]">
            404
          </h1>
          <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-xl pointer-events-none" />
        </div>

        {/* Narrative & Explanation */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase tracking-tight text-white">
            This Page Does Not Exist
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans max-w-md mx-auto leading-relaxed">
            The diagnostic URL or section you requested is not mapped on our telemetry servers. Return to the home page or browse our certified services.
          </p>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
          <Link
            href="/"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.45)] hover:scale-105 transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>RETURN TO HOME</span>
          </Link>

          <Link
            href="/#tailored-services"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-cyan-400/60 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-cyan-400" />
            <span>OUR SERVICES</span>
          </Link>

          <a
            href={`tel:${WHATSAPP_PHONE_NUMBER}`}
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-cyan-400/60 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>CALL HELPLINE</span>
          </a>
        </div>

        {/* Footer address reminder */}
        <div className="pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-500 uppercase tracking-wider">
          Auto Body Repair Inc. • 12902 Hwy 99 Ste 7, Everett WA • 1 (425) 750-5164
        </div>
      </div>
    </main>
  );
}
