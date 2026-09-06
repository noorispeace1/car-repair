"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home, Phone, Wrench, ShieldAlert } from "lucide-react";
import { WHATSAPP_PHONE_NUMBER } from "@/data/servicesData";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log telemetry diagnostic error
    console.error("Automotive System Diagnostic Error:", error);
  }, [error]);

  return (
    <main className="relative min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24 select-none overflow-hidden font-sans">
      {/* Ambient automotive warning red/amber glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center space-y-8">
        
        {/* Diagnostic Fault Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-xs uppercase tracking-widest shadow-[0_0_15px_rgba(244,63,94,0.2)]">
          <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
          <span>DIAGNOSTIC FAULT DETECTED // ECU ALERT</span>
        </div>

        {/* Warning Icon Graphic with Pulsing Hexagonal Border */}
        <div className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-rose-500/20 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-rose-500/60 shadow-[0_0_30px_rgba(244,63,94,0.4)] flex items-center justify-center">
            <AlertOctagon className="w-12 h-12 text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
          </div>
        </div>

        {/* Headline & Explanation */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase font-display tracking-tight text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
            System Telemetry Stalled
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-sans max-w-md mx-auto leading-relaxed">
            An unexpected electronic diagnostic fault interrupted this session. Our computerized restoration telemetry safely halted the process.
          </p>
        </div>

        {/* Error Code Telemetry Pill */}
        {error.digest && (
          <div className="inline-block px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-xs text-slate-400">
            DIAGNOSTIC FAULT CODE: <span className="text-rose-400 font-bold">{error.digest}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          {/* Retry Diagnostic Reset */}
          <button
            onClick={() => reset()}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET &amp; RETRY</span>
          </button>

          {/* Return to Home Base */}
          <Link
            href="/"
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-cyan-400/60 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>RETURN TO SHOP</span>
          </Link>

          {/* Call 24/7 Helpline */}
          <a
            href={`tel:${WHATSAPP_PHONE_NUMBER}`}
            className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 hover:border-emerald-400/60 text-white font-mono font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>CALL HELPLINE</span>
          </a>
        </div>

        {/* Facility Address Footer */}
        <div className="pt-6 border-t border-slate-800/80 text-xs font-mono text-slate-500 uppercase tracking-wider">
          Auto Body Repair Inc. • 12902 Hwy 99 Ste 7, Everett WA • 1 (425) 750-5164
        </div>

      </div>
    </main>
  );
}
