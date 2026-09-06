"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Home, Phone, Wrench } from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "@/data/servicesData";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Root Layout Diagnostic Error:", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-4 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
        <main className="relative max-w-xl w-full text-center space-y-8 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Ambient warning background glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Diagnostic Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>CRITICAL REPAIR TELEMETRY HALT</span>
          </div>

          {/* Diagnostic Wrench & Alert Emblem */}
          <div className="relative mx-auto w-20 h-20 rounded-2xl bg-slate-950 border border-rose-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <Wrench className="w-9 h-9 text-rose-400" />
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-display">
              Critical Facility Service Interruption
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              A root system fault occurred while loading the facility interface. Resetting telemetry will reinitialize all workshop modules.
            </p>
          </div>

          {error.digest && (
            <div className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 font-mono text-xs text-slate-400">
              FAULT CODE: <span className="text-rose-400 font-bold">{error.digest}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>RESTART WORKSHOP SUITE</span>
            </button>

            <a
              href="/"
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Home className="w-4 h-4 text-cyan-400" />
              <span>HOME</span>
            </a>

            <a
              href={`tel:${WHATSAPP_PHONE_NUMBER}`}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>1 (425) 750-5164</span>
            </a>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 uppercase tracking-wider">
            Auto Body Repair Inc. • Certified Collision &amp; Restoration Facility
          </div>
        </main>
      </body>
    </html>
  );
}
