"use client";

import { useState } from "react";
import {
  Wrench,
  MapPin,
  Phone,
  ShieldCheck,
  Mail,
  ArrowUp,
  Clock,
  Award,
  ChevronRight,
  CheckCircle2,
  Send,
} from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    audioEngine.playWhoosh();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    audioEngine.playSuccessChime();
    setSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail("");
    }, 3500);
  };

  // Compact, sleek social media links
  const compactSocials = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      hover: "hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      hover: "hover:text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      hover: "hover:text-rose-500 hover:border-rose-500/50 hover:bg-rose-500/10 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://tiktok.com",
      hover: "hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.87-4.49V8.65a8.28 8.28 0 0 0 5.2 1.83V7.03a4.82 4.82 0 0 1-1.3-.34z"/>
        </svg>
      ),
    },
    {
      name: "X (Twitter)",
      href: "https://x.com",
      hover: "hover:text-slate-100 hover:border-slate-500/50 hover:bg-slate-700/20 hover:shadow-[0_0_15px_rgba(148,163,184,0.3)]",
      icon: (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      hover: "hover:text-sky-400 hover:border-sky-500/50 hover:bg-sky-500/10 hover:shadow-[0_0_15px_rgba(14,165,233,0.3)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.761-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
    },
    {
      name: "Google 5.0★",
      href: "https://google.com/maps",
      hover: "hover:text-amber-400 hover:border-amber-400/50 hover:bg-amber-400/10 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
        </svg>
      ),
    },
    {
      name: "Yelp 5.0★",
      href: "https://yelp.com",
      hover: "hover:text-rose-500 hover:border-rose-500/50 hover:bg-rose-500/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)]",
      icon: (
        <svg className="w-4 h-4 text-rose-500 fill-current" viewBox="0 0 24 24">
          <path d="M12.24 13.91l2.42 6.55c.24.64.95.96 1.58.71.64-.24.96-.95.71-1.58l-2.42-6.55 4.39 5.48c.45.56 1.25.66 1.81.21.56-.45.66-1.25.21-1.81l-4.39-5.48 6.77 1.65c.67.16 1.34-.25 1.5-1 .16-.67-.25-1.34-1-1.5l-6.77-1.65 6.11-3.41c.6-.34.81-1.11.47-1.71-.34-.6-1.11-.81-1.71-.47l-6.11 3.41 3.23-6.22c.32-.61.08-1.36-.53-1.68-.61-.32-1.36-.08-1.68.53l-3.23 6.22V1.5C13.06.67 12.39 0 11.56 0c-.83 0-1.5.67-1.5 1.5v6.94l-3.23-6.22c-.32-.61-1.07-.85-1.68-.53-.61.32-.85 1.07-.53 1.68l3.23 6.22-6.11-3.41c-.6-.34-1.37-.13-1.71.47-.34.6-.13 1.37.47 1.71l6.11 3.41L.84 13.32c-.75.16-1.16.83-1 1.5.16.75.83 1.16 1.5 1l6.77-1.65-4.39 5.48c-.45.56-.35 1.36.21 1.81.56.45 1.36.35 1.81-.21l4.39-5.48-2.42 6.55c-.25.63.07 1.34.71 1.58.63.25 1.34-.07 1.58-.71l2.42-6.55 1.62 7.08c.15.67.8.1.1 0z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="relative w-full bg-slate-950 text-slate-400 font-sans overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />



      {/* ══════════════════════════════════════════════════════════════════
          2. MAIN FOOTER CONTENT (Full Width & Spacious Height)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 xl:gap-14">

          {/* ── Col 1: Brand & Excellence (4 Cols) ── */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-accent/30 to-blue-600/30 border border-brand-accent/50 flex items-center justify-center text-brand-accent shadow-[0_0_20px_rgba(0,210,255,0.4)]">
                <Wrench className="w-5 h-5 animate-pulse-slow" />
              </div>
              <div>
                <span className="text-xl font-black text-white uppercase font-display tracking-tight block">
                  Auto Body Repair Inc.
                </span>
                <span className="text-[11px] font-mono text-brand-accent font-bold tracking-widest uppercase">
                  Precision Computerized Collision Studio
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              Pacific Northwest&apos;s leading high-tolerance collision restoration facility. Specializing in factory Celette laser chassis alignment, Glasurit 90-line waterborne refinishing, and 03-Day Rapid Sprint repairs on Highway 99.
            </p>

            {/* Compact Sleek Social Icons Row */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Connect With Our Team:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {compactSocials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={social.name}
                    onClick={() => audioEngine.playTick(1600)}
                    className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-center transition-all duration-300 ${social.hover}`}
                    data-interactive="true"
                    data-cursor-label="VISIT"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-white font-bold">Lifetime Transferable Craftsmanship Warranty</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                <Award className="w-4 h-4 text-brand-accent flex-shrink-0" />
                <span className="text-slate-200">I-CAR Gold Class Certified & ASE Master Technicians</span>
              </div>
            </div>

            {/* Newsletter form */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                Receive Repair Progress & Insurance Tips
              </span>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-accent focus:outline-none text-xs text-white placeholder-slate-500 font-mono transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="px-4 py-2.5 rounded-xl bg-brand-accent text-slate-950 hover:bg-sky-400 font-bold transition-colors flex items-center justify-center flex-shrink-0"
                  data-interactive="true"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Successfully subscribed for collision care updates!
                </p>
              )}
            </div>
          </div>

          {/* ── Col 2: Precision Collision Services (3 Cols) ── */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <h4 className="text-white font-display font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shadow-[0_0_8px_rgba(0,210,255,0.8)]" />
              Specialized Services
            </h4>
            <ul className="space-y-3 text-slate-300 text-[13px]">
              {[
                "03-Day Rapid Sprint Collision",
                "Celette Laser Chassis Alignment",
                "Glasurit 90-Line Waterborne Refinish",
                "OEM Aluminum Structural Pulse MIG",
                "ADAS Radar & Camera Recalibration",
                "Paintless Dent Removal (PDR)",
                "Luxury, Exotic & EV Structural Restoration",
                "Unibody Pulling & Factory Tolerances",
                "Computerized Precision Paint Matching",
              ].map((service) => (
                <li key={service} className="flex items-center gap-2.5 group cursor-pointer hover:text-brand-accent transition-colors">
                  <ChevronRight className="w-3.5 h-3.5 text-brand-accent/60 group-hover:text-brand-accent group-hover:translate-x-1 transition-all" />
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: OEM Certifications & Insurances (2 Cols) ── */}
          <div className="lg:col-span-2 space-y-4 font-mono text-xs">
            <h4 className="text-white font-display font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-sky shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              OEM & Coverage
            </h4>
            <ul className="space-y-3 text-slate-300 text-[13px]">
              {[
                "Porsche OEM Approved",
                "BMW Structural Specs",
                "Mercedes-Benz Collision",
                "Tesla EV High-Voltage",
                "Audi Ultra Lightweight",
                "Direct Repair Program (DRP)",
                "All Insurances Accepted",
                "Deductible Assistance",
                "Free Rental Coordination",
              ].map((cert) => (
                <li key={cert} className="flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Facility Contact & Hours (3 Cols) ── */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <h4 className="text-white font-display font-bold uppercase tracking-wider text-sm flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Facility Contact
            </h4>
            
            <div className="space-y-4 text-slate-300 text-[13px]">
              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-accent flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-white text-sm">12902 Hwy 99 Ste 7</p>
                  <p className="text-slate-400">Everett / Lynnwood, WA 98204</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Directly on Highway 99 Commercial Strip</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                <div>
                  <a
                    href="tel:14257505164"
                    className="hover:text-brand-accent transition-colors font-bold text-white text-base block"
                    data-interactive="true"
                    data-cursor-label="CALL"
                    onClick={() => audioEngine.playTick(1600)}
                  >
                    1 (425) 750-5164
                  </a>
                  <p className="text-[11px] text-slate-400">Direct Line & 24/7 Towing Dispatch</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-brand-sky flex-shrink-0" />
                <a
                  href="mailto:service@autobodyrepairinc.com"
                  className="hover:text-brand-accent transition-colors text-slate-300 text-xs truncate"
                  data-interactive="true"
                  data-cursor-label="EMAIL"
                >
                  service@autobodyrepairinc.com
                </a>
              </div>

              {/* Working Hours Pill Box */}
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-xs">
                  <Clock className="w-3.5 h-3.5 text-brand-accent" />
                  <span>Shop Operating Hours</span>
                </div>
                <div className="text-xs text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>Mon – Fri:</span>
                    <span className="text-white font-semibold">7:30 AM – 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-white font-semibold">8:30 AM – 3:00 PM</span>
                  </div>
                  <div className="flex justify-between text-rose-400">
                    <span>Sunday:</span>
                    <span>Emergency Towing Only</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>


      {/* ══════════════════════════════════════════════════════════════════
          4. BOTTOM COPYRIGHT & BACK TO TOP BAR (Full Width)
      ══════════════════════════════════════════════════════════════════ */}
      <div className="w-full container mx-auto  bg-slate-950 py-7 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          
          <div className="space-y-1 text-center sm:text-left">
            <p className="text-slate-400 text-xs">
              © {new Date().getFullYear()} Auto Body Repair Inc. All Rights Reserved.
            </p>
            <p className="text-[11px] text-slate-600">
              12902 Hwy 99 Ste 7, Everett / Lynnwood, WA 98204 • Premier Collision Restoration Facility
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-brand-accent hover:border-brand-accent/80 hover:bg-slate-800 hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all text-xs font-bold"
              data-interactive="true"
              data-cursor-label="TOP"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
