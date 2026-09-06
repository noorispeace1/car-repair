"use client";

import { MapPin, Phone, Clock, Mail, Navigation, ShieldCheck } from "lucide-react";
import { useAppControls } from "@/components/providers/SmoothScrollProvider";
import { audioEngine } from "@/lib/audioSynthesizer";

export default function FooterMap() {
  const { openBookingModal } = useAppControls();

  return (
    <section id="contact" className="relative w-full bg-slate-950">
      <div id="location" className="absolute -top-20" />

      <div className="w-full container mx-auto  px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 sm:py-20">
     
         {/* Header Title & Subtitle */}
          <div className="space-y-3 pb-8 md:text-left ">
            {/* Subtitle with accent horizontal lines */}
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-6 sm:w-8 bg-[#e4b021] rounded-full" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-amber-400 font-mono">
                Location
              </span>
              <span className="h-[2px] w-6 sm:w-8 bg-[#e4b021] rounded-full" />
            </div>

            {/* Main Title: Our Tailored Services */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
            Visit Our Premier Hwy 99 Facility
            </h2>
            
          
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* ═══ Left: Business Details Card ═══ */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Heading */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-[10px] font-mono font-bold uppercase tracking-widest">
                  <MapPin className="w-3 h-3" />
                  <span>Our Facility</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white tracking-tight">
                  Main Headquarters
                </h3>
              </div>

              {/* Address */}
              <div className="space-y-1">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/20 text-brand-accent flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white font-mono">
                      12902 Hwy 99 Ste 7
                    </p>
                    <p className="text-xs text-slate-400 font-sans">
                      Everett / Lynnwood, WA 98204
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <a
                    href="tel:14257505164"
                    className="text-sm font-mono font-bold text-white hover:text-brand-accent transition-colors"
                    data-interactive="true"
                    data-cursor-label="CALL"
                    onClick={() => audioEngine.playTick(1600)}
                  >
                    Call/Text: 1 (425) 750-5164
                  </a>
                  <p className="text-[11px] text-slate-400 font-mono">
                    24/7 Accident & Towing Dispatch
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-brand-sky flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs font-mono space-y-0.5 text-slate-300">
                  <p>Hours: <span className="text-white font-bold">Mon–Fri 7:30 AM – 6:00 PM</span></p>
                  <p>Sat: <span className="text-white font-bold">8:30 AM – 3:00 PM</span></p>
                  <p>Sun: <span className="text-rose-400">Closed (Emergency Towing)</span></p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <a
                  href="mailto:service@autobodyrepairinc.com"
                  className="text-xs font-mono text-brand-sky hover:text-brand-accent transition-colors"
                  data-interactive="true"
                  data-cursor-label="EMAIL"
                >
                  service@autobodyrepairinc.com
                </a>
              </div>

              {/* Warranty badge */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 flex-shrink-0" />
                <span>LIFETIME TRANSFERABLE WARRANTY</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  audioEngine.playEngineRoar();
                  openBookingModal();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-accent via-sky-400 to-blue-600 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.6)] transition-all flex items-center justify-center gap-2"
                data-interactive="true"
                data-cursor-label="BOOK"
              >
                Contact Us / Book Session
              </button>
              <a
                href="https://maps.google.com/?q=12902+Hwy+99+Ste+7+Everett+WA+98204"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-slate-950 border border-slate-700 hover:border-brand-accent/50 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-slate-900 transition-all group"
                data-interactive="true"
                data-cursor-label="DIRECTIONS"
              >
                <Navigation className="w-3.5 h-3.5 text-brand-accent group-hover:rotate-45 transition-transform" />
                Get Driving Directions
              </a>
            </div>
          </div>

          {/* ═══ Center: Map View (Street) ═══ */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-h-[380px] sm:min-h-[420px] relative group">
            {/* Map Label */}
            <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-slate-700 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 shadow-lg">
              <MapPin className="w-3 h-3 text-brand-accent" />
              Map View
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2682.5!2d-122.2107!3d47.8945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549004d3e14ec4a9%3A0x2e82ebcb8d6b47e3!2s12902%20Hwy%2099%20Ste%207%2C%20Everett%2C%20WA%2098204!5e0!3m2!1sen!2sus!4v1693850000000!5m2!1sen!2sus"
              className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0 grayscale-[30%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-500"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Auto Body Repair Inc. - Map View - 12902 Hwy 99 Ste 7, Everett WA"
            />
          </div>

          {/* ═══ Right: Satellite View ═══ */}
          <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-slate-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)] min-h-[380px] sm:min-h-[420px] relative group">
            {/* Satellite Label */}
            <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-slate-950/85 border border-slate-700 backdrop-blur-md text-[10px] font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2 shadow-lg">
              <svg className="w-3 h-3 text-brand-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Satellite View
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d800!2d-122.2107!3d47.8945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549004d3e14ec4a9%3A0x2e82ebcb8d6b47e3!2s12902%20Hwy%2099%20Ste%207%2C%20Everett%2C%20WA%2098204!5e1!3m2!1sen!2sus!4v1693850000000!5m2!1sen!2sus"
              className="w-full h-full min-h-[380px] sm:min-h-[420px] border-0 group-hover:scale-105 transition-transform duration-700"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Auto Body Repair Inc. - Satellite View - 12902 Hwy 99 Ste 7, Everett WA"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
