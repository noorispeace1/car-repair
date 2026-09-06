"use client";

import { useAppControls } from "@/components/providers/SmoothScrollProvider";
import { Gauge, EyeOff } from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";

export default function ReducedMotionToggle() {
  const { reducedMotion, setReducedMotion } = useAppControls();

  const toggle = () => {
    audioEngine.playTick(1000);
    setReducedMotion(!reducedMotion);
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-mono backdrop-blur-md ${
        reducedMotion
          ? "border-amber-500/80 bg-amber-500/10 text-amber-300"
          : "border-slate-700/70 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:border-slate-500"
      }`}
      title="Toggle Reduced Motion for Accessibility"
      data-interactive="true"
      data-cursor-label="MOTION"
    >
      {reducedMotion ? (
        <EyeOff className="w-3.5 h-3.5 text-amber-400" />
      ) : (
        <Gauge className="w-3.5 h-3.5 text-brand-sky" />
      )}
      <span className="hidden md:inline text-[11px] font-semibold">
        {reducedMotion ? "REDUCED MOTION" : "60FPS MOTION"}
      </span>
    </button>
  );
}
