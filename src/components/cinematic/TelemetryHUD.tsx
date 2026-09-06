"use client";

import { Activity, ShieldCheck, Gauge, Cpu, CheckCircle2, Crosshair, Wrench, Zap } from "lucide-react";

interface TelemetryProps {
  progress: number;
  chapterIndex: number;
}

export default function TelemetryHUD({ chapterIndex }: TelemetryProps) {
  // Chapter-specific telemetry readouts
  const getChapterData = () => {
    switch (chapterIndex) {
      case 0:
        return {
          metrics: [
            { label: "COATING THICKNESS", value: "142 µm", status: "NOMINAL", icon: ShieldCheck },
            { label: "GLOSS REFLECTIVITY", value: "99.4 GU", status: "FLAWLESS", icon: Gauge },
            { label: "UV CERAMIC BOND", value: "9H HARDNESS", status: "CURED", icon: Zap },
          ],
        };
      case 1:
        return {
          metrics: [
            { label: "CAMBER / TOE DEVIATION", value: "0.00° / 0.00°", status: "PERFECT", icon: Crosshair },
            { label: "BRAKE ROTOR TOLERANCE", value: "< 0.01 mm", status: "TRUE", icon: Activity },
            { label: "PCCB TORQUE SPEC", value: "600 NM CENTERLOCK", status: "CALIBRATED", icon: Wrench },
          ],
        };
      case 2:
        return {
          metrics: [
            { label: "PANEL GAP FLUSHNESS", value: "0.18 mm", status: "OEM SPEC", icon: Crosshair },
            { label: "DRAG COEFFICIENT", value: "0.29 Cd", status: "OPTIMIZED", icon: Gauge },
            { label: "STRUCTURAL TORSION", value: "39,000 NM/DEG", status: "RESTORED", icon: Cpu },
          ],
        };
      case 3:
        return {
          metrics: [
            { label: "POWERTRAIN OUTPUT", value: "443 HP @ 6,500 RPM", status: "PEAK", icon: Zap },
            { label: "8-SPEED PDK INTEGRATION", value: "0.15s SHIFT TIME", status: "SYNCHRONIZED", icon: Activity },
            { label: "EXHAUST BACKPRESSURE", value: "0.08 BAR", status: "FREE-FLOW", icon: Gauge },
          ],
        };
      case 4:
        return {
          metrics: [
            { label: "HAND-STITCH DENSITY", value: "8.0 SPI DUAL-TONE", status: "EXACT", icon: CheckCircle2 },
            { label: "ADAS RADAR CALIBRATION", value: "100% SENSOR ALIGNED", status: "ACTIVE", icon: Cpu },
            { label: "CABIN AIR PURITY", value: "0.00 PPM VOC", status: "CLINICAL", icon: ShieldCheck },
          ],
        };
      default:
        return {
          metrics: [
            { label: "STRUCTURAL INTEGRITY", value: "100% FACTORY GRADE", status: "CERTIFIED", icon: CheckCircle2 },
            { label: "WARRANTY GUARANTEE", value: "LIFETIME TRANSFERABLE", status: "ACTIVE", icon: ShieldCheck },
            { label: "FACILITY DISPATCH", value: "12902 HWY 99 STE 7", status: "READY", icon: Crosshair },
          ],
        };
    }
  };

  const data = getChapterData();

  return (
    <div className="absolute inset-x-0 bottom-0 pointer-events-none p-3 sm:p-6 md:p-10 z-20">
      {/* Responsive Telemetry Metrics Pods */}
      {/* Mobile: Ultra-sleek single-line glass chip */}
      <div className="flex sm:hidden items-center justify-between gap-2 max-w-full px-3 py-2 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex-shrink-0">
            {(() => {
              const Icon = data.metrics[0].icon;
              return <Icon className="w-3.5 h-3.5" />;
            })()}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-[8px] font-mono text-slate-400 tracking-wider truncate">
              {data.metrics[0].label}
            </span>
            <span className="text-[11px] font-mono font-bold text-white tracking-tight truncate">
              {data.metrics[0].value}
            </span>
          </div>
        </div>
        <span className="text-[8px] font-mono text-emerald-400 tracking-widest font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0">
          ● {data.metrics[0].status}
        </span>
      </div>

      {/* Tablet & Desktop: Full 3-pod diagnostic telemetry matrix */}
      <div className="hidden sm:grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl">
        {data.metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-2.5 sm:gap-3 px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.6)] group transition-all hover:border-brand-accent/40"
            >
              <div className="p-1.5 sm:p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex-shrink-0">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-wider truncate">
                  {m.label}
                </span>
                <span className="text-[11px] sm:text-xs font-mono font-bold text-white tracking-tight truncate">
                  {m.value}
                </span>
                <span className="text-[7px] sm:text-[8px] font-mono text-emerald-400 tracking-widest font-semibold">
                  ● {m.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
