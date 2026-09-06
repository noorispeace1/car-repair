"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";

export default function AudioToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(audioEngine.getMuted());
  }, []);

  const handleToggle = () => {
    const newState = audioEngine.toggleMuted();
    setMuted(newState);
    if (!newState) {
      audioEngine.playTick(1600);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-700/70 bg-slate-900/60 hover:border-brand-accent/60 hover:bg-slate-800/80 transition-all text-xs font-mono text-slate-300 backdrop-blur-md group shadow-[0_0_15px_rgba(0,0,0,0.5)]"
      title={muted ? "Unmute Sound FX" : "Mute Sound FX"}
      data-interactive="true"
      data-cursor-label="SFX"
      aria-label="Toggle Sound"
    >
      {muted ? (
        <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400 transition-colors" />
      ) : (
        <div className="flex items-center gap-[2px] h-3.5">
          <Volume2 className="w-3.5 h-3.5 text-brand-accent mr-1" />
          <span className="w-[2px] h-2 bg-brand-accent animate-[pulse_0.6s_ease-in-out_infinite]" />
          <span className="w-[2px] h-3.5 bg-brand-sky animate-[pulse_0.8s_ease-in-out_infinite]" />
          <span className="w-[2px] h-1.5 bg-brand-accent animate-[pulse_0.5s_ease-in-out_infinite]" />
        </div>
      )}
      <span className="hidden sm:inline text-[11px] font-semibold tracking-wider">
        {muted ? "SFX OFF" : "SFX ON"}
      </span>
    </button>
  );
}
