"use client";

import { ReactNode, useEffect, createContext, useContext, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollContextType {
  lenis: Lenis | null;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
  openBookingModal: () => void;
  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (val: boolean) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  reducedMotion: false,
  setReducedMotion: () => {},
  openBookingModal: () => {},
  isBookingModalOpen: false,
  setIsBookingModalOpen: () => {},
});

export const useAppControls = () => useContext(SmoothScrollContext);

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    // Check user preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }

    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
      autoResize: true,
    });

    setLenisInstance(lenis);

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    // 500ms lag threshold with 33ms target frame to prevent stutter or frame freezing
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [reducedMotion]);

  const openBookingModal = () => setIsBookingModalOpen(true);

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        reducedMotion,
        setReducedMotion,
        openBookingModal,
        isBookingModalOpen,
        setIsBookingModalOpen,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
