"use client";

import { Wrench, Crosshair, Sparkles, Activity, ShieldCheck } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center px-4 select-none overflow-hidden text-white font-mono">
      {/* Background automotive ambient glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Diagnostic Loader Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full text-center space-y-6">
        
        {/* Automotive Rotating Laser Gear Reticle */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          
          {/* Outer Pulsing Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse" />

          {/* Outer Rotating Gear Ring */}
          <svg
            className="w-full h-full animate-[spin_8s_linear_infinite]"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle
              cx="50"
              cy="50"
              r="44"
              stroke="#00D2FF"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.6"
            />
            {Array.from({ length: 12 }).map((_, i) => (
              <rect
                key={i}
                x="48"
                y="1"
                width="4"
                height="6"
                rx="1"
                fill="#00D2FF"
                opacity="0.8"
                transform={`rotate(${i * 30} 50 50)`}
              />
            ))}
          </svg>

          {/* Counter-Rotating Precision Reticle */}
          <svg
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_4s_linear_infinite_reverse]"
            viewBox="0 0 80 80"
            fill="none"
          >
            <circle
              cx="40"
              cy="40"
              r="34"
              stroke="#38BDF8"
              strokeWidth="1"
              strokeDasharray="18 12"
              opacity="0.8"
            />
            <line x1="40" y1="4" x2="40" y2="12" stroke="#00D2FF" strokeWidth="2" />
            <line x1="40" y1="68" x2="40" y2="76" stroke="#00D2FF" strokeWidth="2" />
            <line x1="4" y1="40" x2="12" y2="40" stroke="#00D2FF" strokeWidth="2" />
            <line x1="68" y1="40" x2="76" y2="40" stroke="#00D2FF" strokeWidth="2" />
          </svg>

          {/* Center Diagnostic Tool: Automotive Wrench & Sparkle */}
          <div className="relative z-10 w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-cyan-400/60 shadow-[0_0_20px_rgba(0,210,255,0.5)] flex items-center justify-center">
            <Wrench className="w-5 h-5 text-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* Diagnostic Status Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase shadow-sm">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>FACILITY TELEMETRY DIAGNOSTIC</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            Calibrating Repair Suite
          </h2>

          <p className="text-xs text-slate-400 font-sans max-w-xs mx-auto">
            Syncing Celette laser bench, Glasurit spectrophotometer color data, and OEM tolerances...
          </p>
        </div>

        {/* High-Tech Animated Laser Progress Bar */}
        <div className="w-full space-y-1.5">
          <div className="relative w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
          </div>

          {/* Real-time Telemetry Metrics */}
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE 12902 HWY 99
            </span>
            <span className="text-cyan-400 font-bold">± 0.00 mm OEM</span>
          </div>
        </div>

        {/* Shop Trust Stamp */}
        <div className="pt-2 text-[10px] text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>AUTO BODY REPAIR INC. • EVERETT, WA</span>
        </div>

      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
