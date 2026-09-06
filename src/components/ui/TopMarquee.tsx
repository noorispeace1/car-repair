"use client";

export default function TopMarquee() {
  const items = [
    { text: "AUTO BODY REPAIR INC", icon: "🏢", highlight: true },
    { text: "COLLISION REPAIR", icon: "⚡" },
    { text: "CHASSIS & FRAME REALIGNMENT", icon: "🔧" },
    { text: "12902 HWY 99 STE 7, EVERETT, WA", icon: "📍", highlight: true },
    { text: "(425) 750-5164", icon: "📞", highlight: true },
    { text: "FACTORY PAINT REFINISHING", icon: "🎨" },
    { text: "GENUINE OEM REPLACEMENT PARTS", icon: "🛡️" },
    { text: "PAINTLESS DENT REPAIR", icon: "✨" },
    { text: "SCHEDULED AUTO MAINTENANCE", icon: "⚙️" },
    { text: "(425) 750-5164", icon: "📞", highlight: true },
  ];

  // Duplicate items 4x for seamless infinite loop
  const marqueeContent = [...items, ...items, ...items, ...items];

  return (
    <div className="fixed top-0 left-0 right-0 w-full overflow-hidden bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 select-none z-[60] shadow-sm">
      {/* Ambient glow line below */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      {/* Scrolling track */}
      <div className="flex whitespace-nowrap animate-marquee-scroll">
        {marqueeContent.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-2 px-5 py-[5.5px] text-[10px] sm:text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-slate-950"
          >
            <span className="text-xs">{item.icon}</span>
            <span className={item.highlight ? "font-black bg-slate-950/15 px-2 py-0.5 rounded border border-slate-950/20" : ""}>
              {item.text}
            </span>
            <span className="text-slate-950/35 mx-1 font-normal">•</span>
          </span>
        ))}
      </div>

      {/* Left/Right edge fades for seamless feel */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-cyan-400 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-blue-500 to-transparent pointer-events-none z-10" />

      {/* Inline animation keyframes */}
      <style jsx global>{`
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-25%);
          }
        }
        .animate-marquee-scroll {
          animation: marqueeScroll 18s linear infinite;
          will-change: transform;
        }
        .animate-marquee-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
