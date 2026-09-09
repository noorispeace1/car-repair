"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  Calendar,
  ChevronDown,
  Home,
  Wrench,
  MapPin,
  ShieldCheck,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Clock,
} from "lucide-react";
import { useAppControls } from "@/components/providers/SmoothScrollProvider";
import { audioEngine } from "@/lib/audioSynthesizer";
import { getWhatsAppBookingUrl, WHATSAPP_PHONE_NUMBER } from "@/data/servicesData";

export default function HeaderNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [callDropdownOpen, setCallDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const { openBookingModal, lenis } = useAppControls();

  const NAV_ITEMS = [
    { label: "HOME", id: "top", href: "/", icon: Home },
    { label: "SERVICES", id: "tailored-services", href: "/#tailored-services", icon: Wrench },
    { label: "LOCATIONS", id: "location", href: "/#location", icon: MapPin },
    { label: "WARRANTY", id: "warranty", href: "/#warranty", icon: ShieldCheck },
    { label: "CONTACT", id: "contact", href: "/#contact", icon: PhoneCall },
  ];

  useEffect(() => {
    const sections = ["tailored-services", "warranty", "location", "contact"];

    const handleScrollSpy = () => {
      setScrolled(window.scrollY > 20);

      if (window.scrollY < 300) {
        setActiveSection("top");
        return;
      }

      const scrollPosition = window.scrollY + 250;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string, href: string) => {
    audioEngine.playTick(1600);
    setActiveSection(id);
    setMobileMenuOpen(false);

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();

      if (id === "top") {
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
        return;
      }

      const target = document.getElementById(id);
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -70, duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          const top = target.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  const handleBookClick = () => {
    audioEngine.playEngineRoar();
    setMobileMenuOpen(false);
    openBookingModal();
  };

  const toggleMobileMenu = () => {
    audioEngine.playTick(mobileMenuOpen ? 1200 : 1600);
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-[27px] left-0 right-0 z-50 transition-all duration-300">
      
      {/* ═══ Main Navbar (Dark Luxury Glassmorphism with Animated Laser Accents) ═══ */}
      <div
        className={`w-full transition-all duration-300 border-b border-slate-800/80 backdrop-blur-2xl ${
          scrolled
            ? "bg-slate-950/95 shadow-[0_12px_40px_rgba(0,0,0,0.85)] py-2.5"
            : "bg-slate-950/85 shadow-[0_8px_30px_rgba(0,0,0,0.6)] py-3 sm:py-3.5"
        }`}
      >
        {/* Subtle top laser separator line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

        <div className="w-full container mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          
          {/* ── Brand Logo & Typography: AUTO BODY REPAIR ── */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "top", "/")}
            className="flex items-center gap-3 group select-none py-1"
            data-interactive="true"
            data-cursor-label="HOME"
          >
            {/* Automotive Gear Spinner */}
            <div className="relative flex-shrink-0">
              {/* Outer pulsing cyan ambient glow */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 opacity-40 group-hover:opacity-95 blur-md transition-all duration-500 group-hover:scale-105" />

              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-[1.5px] border border-cyan-400/50 shadow-[0_0_25px_rgba(0,210,255,0.4)] group-hover:border-cyan-300 transition-all">
                <div className="w-full h-full rounded-[14px] bg-slate-950/90 overflow-hidden relative flex items-center justify-center">
                  
                  {/* SVG Automotive Gear Spinner with Rotating Animation */}
                  <svg
                    className="w-8 h-8 sm:w-9 sm:h-9 relative z-10"
                    viewBox="0 0 48 48"
                    fill="none"
                  >
                    {/* Rotating 12-Tooth Gear Spinner Ring */}
                    <g className="origin-center animate-logo-gear group-hover:animate-logo-gear-fast transition-all">
                      <circle cx="24" cy="24" r="20" stroke="url(#spinnerCyanGrad)" strokeWidth="1.5" strokeOpacity="0.7" />
                      <circle cx="24" cy="24" r="16" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.5" />
                      
                      {Array.from({ length: 12 }).map((_, i) => (
                        <rect
                          key={i}
                          x="22.5"
                          y="1.5"
                          width="3"
                          height="4"
                          rx="1"
                          fill="#00D2FF"
                          opacity="0.85"
                          transform={`rotate(${i * 30} 24 24)`}
                        />
                      ))}
                    </g>

                    {/* Laser Crosshair Targeting Reticle Lines */}
                    <line x1="24" y1="8" x2="24" y2="13" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="24" y1="35" x2="24" y2="40" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="8" y1="24" x2="13" y2="24" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="35" y1="24" x2="40" y2="24" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />

                    {/* Crossed Automotive Repair Wrench */}
                    <g transform="rotate(-30 24 24)" opacity="0.8">
                      <path
                        d="M22.5 12L25.5 12L25 21L23 21L22.5 12Z"
                        fill="#00D2FF"
                      />
                      <path
                        d="M21 11C21 9.5 22.5 8 24 8C25.5 8 27 9.5 27 11L25.5 12L22.5 12L21 11Z"
                        fill="#E2E8F0"
                      />
                    </g>

                    {/* High-Performance Repair Sports Car Silhouette */}
                    <path
                      d="M10 27.5C12 26.8 14.5 23.5 18 20.5C21 18 25.5 17.5 30 18C34.5 18.5 37.5 22.5 38.5 27C38.5 27 35.5 27.5 33 27.5C31 27.5 29.5 25.5 28 25.5C26.5 25.5 25 27.5 23 27.5C21 27.5 19.5 25.5 18 25.5C16.5 25.5 15 27.5 13 27.5C11.5 27.5 10 27.5 10 27.5Z"
                      fill="url(#repairCarMetallic)"
                      filter="drop-shadow(0 0 4px rgba(0,210,255,0.6))"
                    />

                    <circle cx="24" cy="24" r="3" fill="#FFFFFF" />
                    <circle cx="24" cy="24" r="5" stroke="#00D2FF" strokeWidth="1.5" className="animate-pulse" />

                    <defs>
                      <linearGradient id="spinnerCyanGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00D2FF" />
                        <stop offset="0.5" stopColor="#38BDF8" />
                        <stop offset="1" stopColor="#1D4ED8" />
                      </linearGradient>
                      <linearGradient id="repairCarMetallic" x1="10" y1="17" x2="39" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFFFFF" />
                        <stop offset="0.4" stopColor="#00D2FF" />
                        <stop offset="1" stopColor="#0369A1" />
                      </linearGradient>
                    </defs>
                  </svg>

                </div>
              </div>
            </div>

            {/* Typography: AUTO BODY REPAIR INC */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-2xl font-black uppercase font-display tracking-tight text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.25)] group-hover:text-cyan-100 transition-colors">
                AUTO BODY
              </span>
              <span className="text-lg sm:text-2xl font-black uppercase font-display tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,210,255,0.7)]">
                REPAIR
              </span>
              <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-mono text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase shadow-[0_0_12px_rgba(0,210,255,0.3)]">
                INC
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation Links (Advanced Hover & Glow Animations with Icons) ── */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id, item.href)}
                  onMouseEnter={() => audioEngine.playTick(1800)}
                  className={`relative px-3.5 py-2 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 group flex items-center gap-2 select-none ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,210,255,0.35)]"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent hover:border-slate-700/80 hover:shadow-[0_0_15px_rgba(0,210,255,0.15)]"
                  }`}
                  data-interactive="true"
                >
                  {/* Subtle hover background glow sweep */}
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Active / Hover bottom laser line */}
                  <span 
                    className={`absolute bottom-0 left-2.5 right-2.5 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 transition-all duration-300 ${
                      isActive 
                        ? "opacity-100 shadow-[0_0_8px_rgba(0,210,255,0.8)]" 
                        : "opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100"
                    }`} 
                  />

                  <span className="relative z-10 flex items-center gap-2 group-hover:drop-shadow-[0_0_10px_rgba(0,210,255,0.6)] transition-all">
                    <Icon
                      className={`w-3.5 h-3.5 transition-all duration-300 ${
                        isActive
                          ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(0,210,255,0.9)] scale-110"
                          : "text-slate-400 group-hover:text-cyan-300 group-hover:scale-110"
                      }`}
                    />
                    <span>{item.label}</span>
                  </span>
                </a>
              );
            })}
          </nav>

          {/* ── Right Action Buttons ── */}
          <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
            
            {/* CALL NOW Button -> Direct WhatsApp Link */}
            <div className="relative">
              <a
                href={getWhatsAppBookingUrl("Call Now / Repair Inquiry")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playTick(1600)}
                onMouseEnter={() => setCallDropdownOpen(true)}
                onMouseLeave={() => setCallDropdownOpen(false)}
                className="px-4 lg:px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-emerald-950/60 border border-slate-700/80 hover:border-emerald-400 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md hover:shadow-[0_0_25px_rgba(16,185,129,0.35)] group"
                data-interactive="true"
                data-cursor-label="WHATSAPP"
              >
                {/* WhatsApp SVG Icon */}
                <svg className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>CALL NOW</span>
                <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-emerald-300 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Call Dropdown Card */}
              {callDropdownOpen && (
                <div
                  onMouseEnter={() => setCallDropdownOpen(true)}
                  onMouseLeave={() => setCallDropdownOpen(false)}
                  className="absolute top-full right-0 mt-2 w-64 bg-slate-950/95 border border-emerald-500/40 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 text-white font-sans backdrop-blur-3xl animate-fadeIn"
                >
                  <p className="text-[10px] text-emerald-400 font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Direct WhatsApp Helpline
                  </p>
                  <a
                    href={getWhatsAppBookingUrl("Direct Inquiry / Call Now")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-bold text-white hover:text-emerald-300 transition-colors block mt-1.5 font-mono tracking-tight"
                  >
                    1 (425) 750-5164
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1 font-sans">
                    Click to chat instantly on WhatsApp with a senior advisor.
                  </p>
                </div>
              )}
            </div>

            {/* BOOK NOW Electric Neon Button -> Direct Navigation to /book-now Page */}
            <Link
              href="/book-now"
              onClick={() => {
                audioEngine.playEngineRoar();
                setMobileMenuOpen(false);
              }}
              className="relative px-5 lg:px-6 py-2.5 rounded-xl bg-gradient-to-r from-brand-accent via-sky-400 to-blue-600 hover:from-cyan-300 hover:via-sky-400 hover:to-blue-500 text-slate-950 font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_40px_rgba(0,210,255,0.85)] hover:scale-[1.03] active:scale-[0.98] transition-all overflow-hidden group/btn"
              data-interactive="true"
              data-cursor-label="BOOK"
            >
              {/* Electric Sheen Animation on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
              
              <Calendar className="w-3.5 h-3.5 text-slate-950 relative z-10" />
              <span className="relative z-10">BOOK NOW</span>
            </Link>

          </div>

          {/* ── Mobile Right Actions & Custom Animated Hamburger ── */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <Link
              href="/book-now"
              onClick={() => {
                audioEngine.playEngineRoar();
                setMobileMenuOpen(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-accent to-blue-600 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider sm:hidden shadow-[0_0_15px_rgba(0,210,255,0.3)] active:scale-95 transition-transform"
            >
              Book
            </Link>

            {/* Custom High-Tech Animated Hamburger Button */}
            <button
              onClick={toggleMobileMenu}
              className={`relative w-11 h-11 rounded-xl bg-slate-900/90 border transition-all duration-300 flex flex-col items-center justify-center gap-1.5 shadow-md active:scale-90 ${
                mobileMenuOpen 
                  ? "border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_20px_rgba(0,210,255,0.4)]" 
                  : "border-slate-700/90 text-slate-200 hover:border-cyan-400/70 hover:text-cyan-300"
              }`}
              aria-label="Toggle Mobile Navigation"
              data-interactive="true"
            >
              {/* Top Bar morphs into X */}
              <span 
                className={`h-[2px] rounded-full bg-current transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen 
                    ? "w-5 translate-y-[8px] rotate-45 bg-cyan-400" 
                    : "w-5"
                }`} 
              />
              
              {/* Middle Bar shrinks/fades */}
              <span 
                className={`h-[2px] rounded-full bg-current transition-all duration-200 ease-out ${
                  mobileMenuOpen 
                    ? "w-0 opacity-0" 
                    : "w-4"
                }`} 
              />

              {/* Bottom Bar morphs into X */}
              <span 
                className={`h-[2px] rounded-full bg-current transition-all duration-300 ease-out origin-center ${
                  mobileMenuOpen 
                    ? "w-5 -translate-y-[8px] -rotate-45 bg-cyan-400" 
                    : "w-5"
                }`} 
              />
            </button>
          </div>

        </div>
      </div>

      {/* ═══ Mobile Navigation Sheet / Drawer (Luxury Glassmorphism) ═══ */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-cyan-500/30 px-5 pt-5 pb-7 space-y-5 shadow-[0_25px_60px_rgba(0,0,0,0.98)] text-white backdrop-blur-3xl animate-fadeIn">
          
          {/* Header Tag inside drawer */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NAVIGATION MENU
            </span>
            <span className="text-[10px] font-mono text-slate-500 uppercase">
              12902 HWY 99 • EVERETT
            </span>
          </div>

          {/* Links List with Icons */}
          <div className="flex flex-col gap-1.5 font-mono text-xs font-bold uppercase tracking-wider">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id, item.href)}
                  className={`py-3 px-4 rounded-xl transition-all flex items-center justify-between group ${
                    isActive
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,210,255,0.3)]"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/90 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-cyan-400/20 text-cyan-300" : "bg-slate-900 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800"} transition-colors`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>

                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-all ${
                      isActive
                        ? "text-cyan-300 translate-x-1 drop-shadow-[0_0_6px_rgba(0,210,255,0.8)]"
                        : "text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Quick Contact & Booking Buttons */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-3">
            <a
              href={getWhatsAppBookingUrl("Call Helpline / WhatsApp Inquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900/90 hover:bg-emerald-950/60 border border-slate-700/80 hover:border-emerald-400 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all shadow-md"
            >
              <svg className="w-4 h-4 fill-current text-emerald-400" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>WhatsApp Helpline: 1 (425) 750-5164</span>
            </a>

            <Link
              href="/book-now"
              onClick={() => {
                audioEngine.playEngineRoar();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-accent via-sky-400 to-blue-600 text-slate-950 font-mono font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,210,255,0.5)] active:scale-95 transition-all text-center"
            >
              <Calendar className="w-4 h-4" /> 
              <span>BOOK AN APPOINTMENT</span>
            </Link>
          </div>

        </div>
      )}

      {/* ═══ Keyframe Animations ═══ */}
      <style jsx global>{`
        @keyframes logoGearSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-logo-gear {
          animation: logoGearSpin 20s linear infinite;
          transform-origin: 24px 24px;
        }
        .group:hover .animate-logo-gear {
          animation: logoGearSpin 4s linear infinite;
        }
      `}</style>
    </header>
  );
}

