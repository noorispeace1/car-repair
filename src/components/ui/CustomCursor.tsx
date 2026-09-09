"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { audioEngine } from "@/lib/audioSynthesizer";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);
  const [hovered, setHovered] = useState(false);
  const [clickableText, setClickableText] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [mounted, setMounted] = useState(false);

  const TRAIL_COUNT = 5;

  useEffect(() => {
    setMounted(true);
    // Only enable on desktop pointer devices
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    const trailPositions = Array.from({ length: TRAIL_COUNT }, () => ({
      x: mouseX,
      y: mouseY,
    }));
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setVisible((prev) => (prev ? prev : true));

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    let lastInteractive: Element | null = null;

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, input, select, [data-interactive], [role='button']"
      );
      if (interactive) {
        if (interactive !== lastInteractive) {
          lastInteractive = interactive;
          setHovered(true);
          audioEngine.playTick(1400);
          const label = interactive.getAttribute("data-cursor-label");
          setClickableText(label || null);
        }
      } else if (lastInteractive) {
        lastInteractive = null;
        setHovered(false);
        setClickableText(null);
      }
    };

    const animate = () => {
      // Smooth spring follow for outer ring
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      // Smooth trail follow with staggered lerp
      for (let i = 0; i < TRAIL_COUNT; i++) {
        const target = i === 0 ? { x: mouseX, y: mouseY } : trailPositions[i - 1];
        trailPositions[i].x += (target.x - trailPositions[i].x) * (0.25 - i * 0.035);
        trailPositions[i].y += (target.y - trailPositions[i].y) * (0.25 - i * 0.035);

        if (trailsRef.current[i]) {
          trailsRef.current[i].style.transform = `translate3d(${trailPositions[i].x}px, ${trailPositions[i].y}px, 0)`;
        }
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  const setTrailRef = useCallback(
    (idx: number) => (el: HTMLDivElement | null) => {
      if (el) trailsRef.current[idx] = el;
    },
    []
  );

  if (!mounted) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"
        } hidden md:block`}
    >
      {/* ═══════════════════ Spark Trails ═══════════════════ */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={`trail-${i}`}
          ref={setTrailRef(i)}
          className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-1.5 h-1.5 rounded-full transform-gpu will-change-transform"
          style={{
            background: `rgba(0, 210, 255, ${0.4 - i * 0.07})`,
            boxShadow: `0 0 ${6 - i}px rgba(0, 210, 255, ${0.3 - i * 0.05})`,
            transition: "opacity 0.2s",
            opacity: hovered ? 0 : 1,
          }}
        />
      ))}

      {/* ═══════════════════ Precision Center: Laser Crosshair ═══════════════════ */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 transform-gpu will-change-transform transition-all duration-200 ${clicking ? "scale-75" : "scale-100"
          }`}
        style={{ marginLeft: "-12px", marginTop: "-12px" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-[0_0_6px_rgba(0,210,255,0.8)] transition-all duration-200 ${hovered ? "opacity-0 scale-0" : "opacity-100 scale-100"
            }`}
        >
          {/* Outer targeting circle */}
          <circle
            cx="12"
            cy="12"
            r="8"
            stroke="#00D2FF"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          {/* Inner precision dot */}
          <circle cx="12" cy="12" r="2.5" fill="#00D2FF" />
          <circle cx="12" cy="12" r="2.5" fill="#00D2FF" opacity="0.4">
            <animate
              attributeName="r"
              values="2.5;4;2.5"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.4;0;0.4"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          {/* Cross-hair lines */}
          <line x1="12" y1="0" x2="12" y2="6" stroke="#00D2FF" strokeWidth="1" opacity="0.7" />
          <line x1="12" y1="18" x2="12" y2="24" stroke="#00D2FF" strokeWidth="1" opacity="0.7" />
          <line x1="0" y1="12" x2="6" y2="12" stroke="#00D2FF" strokeWidth="1" opacity="0.7" />
          <line x1="18" y1="12" x2="24" y2="12" stroke="#00D2FF" strokeWidth="1" opacity="0.7" />
          {/* Diagonal micro-ticks */}
          <line x1="5" y1="5" x2="7" y2="7" stroke="#38BDF8" strokeWidth="0.5" opacity="0.5" />
          <line x1="17" y1="7" x2="19" y2="5" stroke="#38BDF8" strokeWidth="0.5" opacity="0.5" />
          <line x1="5" y1="19" x2="7" y2="17" stroke="#38BDF8" strokeWidth="0.5" opacity="0.5" />
          <line x1="17" y1="17" x2="19" y2="19" stroke="#38BDF8" strokeWidth="0.5" opacity="0.5" />
        </svg>

        {/* Wrench icon on hover state */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_8px_rgba(0,210,255,0.9)]"
          >
            {/* Wrench/Spanner Shape */}
            <path
              d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
              stroke="#00D2FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="rgba(0, 210, 255, 0.15)"
            />
          </svg>
        </div>
      </div>

      {/* ═══════════════════ Outer Ring: Rotating Gear / Diagnostic Scanner ═══════════════════ */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full transition-all duration-300 ease-out ${hovered
            ? "w-20 h-20 -ml-10 -mt-10"
            : "w-12 h-12 -ml-6 -mt-6"
          } ${clicking ? "scale-90" : "scale-100"}`}
      >
        {/* Rotating Gear Teeth SVG Ring */}
        <svg
          className={`absolute inset-0 w-full h-full transition-all duration-300 ${hovered ? "opacity-100" : "opacity-60"
            }`}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            animation: hovered
              ? "cursorGearSpin 4s linear infinite"
              : "cursorGearSpin 12s linear infinite",
            filter: `drop-shadow(0 0 ${hovered ? "10px" : "4px"} rgba(0, 210, 255, ${hovered ? 0.6 : 0.3}))`,
          }}
        >
          {/* Main gear circle with teeth */}
          <circle
            cx="50"
            cy="50"
            r="38"
            stroke={hovered ? "#00D2FF" : "#38BDF8"}
            strokeWidth={hovered ? "1.5" : "0.8"}
            fill="none"
            strokeDasharray={hovered ? "8 4" : "6 8"}
          />
          {/* Gear teeth - 12 evenly spaced notches using exact SVG rotation */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={i}
              x1="50"
              y1={hovered ? "4" : "7"}
              x2="50"
              y2="12"
              stroke={hovered ? "#00D2FF" : "#38BDF8"}
              strokeWidth={hovered ? "3" : "2"}
              strokeLinecap="round"
              opacity={i % 3 === 0 ? 1 : 0.5}
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
          {/* Inner precision ring */}
          <circle
            cx="50"
            cy="50"
            r="28"
            stroke="#00D2FF"
            strokeWidth="0.4"
            fill="none"
            opacity={hovered ? "0.4" : "0.2"}
          />
        </svg>

        {/* Counter-rotating diagnostic scan arc */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          fill="none"
          style={{
            animation: "cursorScanSpin 3s linear infinite reverse",
            opacity: hovered ? 0.8 : 0.3,
          }}
        >
          <path
            d="M50 12 A38 38 0 0 1 88 50"
            stroke="url(#scanGradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <defs>
            <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D2FF" stopOpacity="0" />
              <stop offset="50%" stopColor="#00D2FF" stopOpacity="1" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        {/* Hover label text */}
        {clickableText && (
          <span
            className="absolute text-[8px] font-mono tracking-[0.2em] text-brand-accent uppercase font-black px-1 z-10 animate-pulse select-none"
            style={{
              textShadow: "0 0 8px rgba(0, 210, 255, 0.8)",
            }}
          >
            {clickableText}
          </span>
        )}

        {/* Pulsing diagnostic ring on hover */}
        {hovered && (
          <div
            className="absolute inset-0 rounded-full border border-brand-accent/40"
            style={{
              animation: "cursorPulseRing 1.5s ease-out infinite",
            }}
          />
        )}
      </div>

      {/* ═══════════════════ Inline Keyframe Styles ═══════════════════ */}
      <style jsx global>{`
        @keyframes cursorGearSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes cursorScanSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes cursorPulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }

        /* Hide default cursor globally on desktop */
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </div>
  );
}
