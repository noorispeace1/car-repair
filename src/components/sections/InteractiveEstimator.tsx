"use client";

import { useState } from "react";
import { Calculator, Clock, ShieldCheck, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAppControls } from "@/components/providers/SmoothScrollProvider";
import { audioEngine } from "@/lib/audioSynthesizer";

const VEHICLE_TIERS = [
  { id: "exotic", name: "Exotic / Supercar", models: "Porsche, Ferrari, McLaren, Aston Martin", multiplier: 1.35 },
  { id: "luxury", name: "European Luxury", models: "BMW M, Mercedes-AMG, Audi RS, Range Rover", multiplier: 1.15 },
  { id: "performance", name: "Performance / Sports", models: "Corvette, Supra, Mustang, Tesla Plaid", multiplier: 1.0 },
];

const DAMAGE_TYPES = [
  { id: "collision", name: "Structural Collision & Frame", baseDays: 3, baseCost: 3200, icon: "⚡" },
  { id: "paint", name: "Panel Replacement & Paint", baseDays: 2, baseCost: 1600, icon: "🎨" },
  { id: "pdr", name: "Paintless Dent / Hail Extraction", baseDays: 1, baseCost: 450, icon: "🔨" },
  { id: "concours", name: "Full Concours Bare-Metal Respray", baseDays: 5, baseCost: 6500, icon: "🏆" },
];

export default function InteractiveEstimator() {
  const [tier, setTier] = useState(VEHICLE_TIERS[0]);
  const [damage, setDamage] = useState(DAMAGE_TYPES[0]);
  const [isSprint, setIsSprint] = useState(true);
  const { openBookingModal } = useAppControls();

  const handleTierChange = (t: typeof VEHICLE_TIERS[0]) => {
    audioEngine.playTick(1300);
    setTier(t);
  };

  const handleDamageChange = (d: typeof DAMAGE_TYPES[0]) => {
    audioEngine.playTick(1500);
    setDamage(d);
  };

  const days = isSprint ? Math.max(1, Math.min(3, damage.baseDays)) : damage.baseDays + 2;
  const estimatedMin = Math.round(damage.baseCost * tier.multiplier * (isSprint ? 1.08 : 1.0));
  const estimatedMax = Math.round(estimatedMin * 1.3);

  const handleProceedBooking = () => {
    audioEngine.playEngineRoar();
    openBookingModal();
  };

  return (
    <section id="damage-estimator" className="relative w-full bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-xs font-mono font-semibold uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>03-Day Rapid Sprint Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white font-display">
            Instant Estimate & Turnaround Engine
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Calculate your estimated repair timeline and cost bracket based on certified OEM procedures at 12902 Hwy 99 Ste 7.
          </p>
        </div>

        {/* Interactive Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs (Tiers & Damage Types) */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. Vehicle Tier Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Step 01: Select Vehicle Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {VEHICLE_TIERS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTierChange(t)}
                    className={`p-4 rounded-xl border text-left transition-all ${tier.id === t.id
                        ? "border-brand-accent bg-brand-accent/10 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                        : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                      }`}
                    data-interactive="true"
                    data-cursor-label={t.name}
                  >
                    <div className="text-xs font-bold text-white font-display">{t.name}</div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">{t.models}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Damage Category Selector */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md space-y-3">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Step 02: Select Damage Type
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DAMAGE_TYPES.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => handleDamageChange(d)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center gap-3 ${damage.id === d.id
                        ? "border-brand-accent bg-brand-accent/10 shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                        : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                      }`}
                    data-interactive="true"
                    data-cursor-label={d.name}
                  >
                    <span className="text-2xl">{d.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white font-display">{d.name}</div>
                      <div className="text-[10px] text-brand-sky font-mono mt-0.5">
                        Base: ~{d.baseDays} Days
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Turnaround Tier Toggle */}
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-accent" />
                  <span className="text-sm font-bold text-white font-display">
                    03-Day Rapid Sprint Turnaround
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Priority scheduling for business executives & luxury commuters.
                </p>
              </div>

              <button
                onClick={() => {
                  audioEngine.playTick(1700);
                  setIsSprint(!isSprint);
                }}
                className={`px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all ${isSprint
                    ? "border-emerald-500 bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    : "border-slate-700 bg-slate-950 text-slate-400"
                  }`}
                data-interactive="true"
                data-cursor-label="SPRINT"
              >
                {isSprint ? "⚡ SPRINT ACTIVE (72H)" : "STANDARD (5-7 DAYS)"}
              </button>
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-brand-accent/40 shadow-[0_15px_40px_rgba(0,210,255,0.15)] space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Summary Estimate
              </span>
              <span className="px-2.5 py-1 rounded bg-brand-accent/15 text-brand-accent font-mono text-[10px] font-bold">
                100% INSURANCE APPROVED
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">ESTIMATED TURNAROUND</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-white font-display">
                  {days} Business {days === 1 ? "Day" : "Days"}
                </span>
                {isSprint && (
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    (03-Day Sprint Guaranteed)
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">ESTIMATED RESTORATION RANGE</span>
              <div className="text-3xl font-black text-brand-accent font-display">
                ${estimatedMin.toLocaleString()} – ${estimatedMax.toLocaleString()}
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                *Final cost covered 100% via insurance collision / comprehensive claim when applicable.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              {[
                "Celette Laser Frame Blueprint Verification",
                "Glasurit Spectral Color-Matched Formula",
                "Lifetime Transferable Workmanship Warranty",
                "Free Towing & Loaner Car Concierge",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleProceedBooking}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-brand-accent via-sky-400 to-blue-600 text-slate-950 font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.7)] transition-all flex items-center justify-center gap-2"
              data-interactive="true"
              data-cursor-label="BOOK"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-slate-950" />
              Lock In 03-Day Estimate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
