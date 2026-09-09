"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  SERVICES_DATA, 
  WHATSAPP_PHONE_NUMBER, 
  ServiceItem 
} from "@/data/servicesData";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Car, 
  Wrench, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Zap,
  Check
} from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";
import confetti from "canvas-confetti";

const QUICK_VEHICLES = [
  "Porsche 911 / Cayman",
  "BMW M Series",
  "Mercedes-AMG",
  "Audi RS / e-tron",
  "Tesla / Electric",
  "Other Luxury / SUV"
];

const QUICK_DAMAGE_TAGS = [
  "Front Bumper / Grille",
  "Fender & Door Crease",
  "Chassis / Laser Alignment",
  "Paint Scratches / Dents",
  "Insurance Claim Support"
];

export default function BookNowPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES_DATA[0]);
  const [vehicle, setVehicle] = useState("");
  const [dateType, setDateType] = useState<"earliest" | "tomorrow" | "custom">("earliest");
  const [customDate, setCustomDate] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const toggleTag = (tag: string) => {
    audioEngine.playTick(1500);
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const getEffectiveDate = () => {
    if (dateType === "earliest") return "Earliest Priority Slot (Within 24 Hours)";
    if (dateType === "tomorrow") return "Tomorrow Priority Intake";
    return customDate || "Scheduled Date";
  };

  // Format WhatsApp message with user details
  const generateWhatsAppMessage = () => {
    const allNotes = [
      selectedTags.length > 0 ? `Selected Concerns: ${selectedTags.join(", ")}` : "",
      notes ? `Client Notes: ${notes}` : ""
    ].filter(Boolean).join("\n");

    return `*AUTOMOTIVE RESTORATION CONCIERGE INTAKE*
===================================
*Service Discipline:* ${selectedService.title} (Intake #${selectedService.badgeNumber})
*Vehicle:* ${vehicle || "Vehicle details to be verified upon arrival"}
*Intake Timeline:* ${getEffectiveDate()}

*Client Profile:*
• *Name:* ${fullName || "Client"}
• *Phone:* ${phone || "Provided via WhatsApp"}

${allNotes ? `*Damage & Inspection Focus:*\n${allNotes}\n` : ""}===================================
_Dispatched from Auto Body Repair Concierge Portal_`;
  };

  const handleWhatsAppBooking = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    audioEngine.playEngineRoar();

    try {
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#E63917", "#00D2FF", "#FACC15", "#10B981"],
      });
    } catch {}

    setSubmitted(true);
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmailBooking = () => {
    audioEngine.playTick(1600);
    const subject = `Intake Request: ${selectedService.title} - ${vehicle || "Client Vehicle"}`;
    const body = generateWhatsAppMessage().replace(/\*/g, "");
    window.location.href = `mailto:contact@autobodyrepairinc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-28 font-sans selection:bg-cyan-400 selection:text-slate-950">
      
      {/* Ambient Atmospheric Glows */}
      <div className="fixed top-12 left-1/3 -translate-x-1/2 w-[650px] h-[450px] bg-cyan-500/8 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-1/4 w-[550px] h-[400px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Top Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span className="text-slate-600">/</span>
          <Link href="/services" className="hover:text-cyan-400 transition-colors">
            Services
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-amber-400 font-bold">Concierge Reservation</span>
        </div>

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-widest shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>White-Glove Collision Concierge</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase font-display tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
            Schedule Your Repair
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
            Reserve priority intake at our Highway 99 facility. Every appointment receives dedicated master technician diagnostics, computerized laser inspection, and transferable warranty coverage.
          </p>
        </div>

        {/* ═══ Main 2-Column Grid ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* ════ LEFT COLUMN: Bespoke Concierge Form ════ */}
          <div className="lg:col-span-7 bg-slate-900/50 p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-800 backdrop-blur-xl space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Top decorative line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

            {submitted ? (
              /* Success Confirmation Banner */
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    Reservation Dispatched
                  </h2>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your vehicle intake details have been sent directly to our senior master advisor. We will verify your slot and follow up immediately.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    Modify Details
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider transition-colors"
                  >
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppBooking} className="space-y-8">
                
                {/* 1. SELECT SERVICE DISCIPLINE */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>1. Select Repair Discipline</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-400">
                      {selectedService.category}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SERVICES_DATA.map((service) => {
                      const isSelected = selectedService.id === service.id;
                      return (
                        <button
                          type="button"
                          key={service.id}
                          onClick={() => {
                            audioEngine.playTick(1500);
                            setSelectedService(service);
                          }}
                          className={`p-3.5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-24 relative overflow-hidden group ${
                            isSelected
                              ? "bg-gradient-to-br from-cyan-950/60 to-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.25)] ring-1 ring-cyan-400/40"
                              : "bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-900/60"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                              isSelected ? "bg-[#E63917] text-white shadow" : "bg-slate-800/90 text-slate-400"
                            }`}>
                              #{service.badgeNumber}
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="text-xs font-bold font-display text-white line-clamp-1 group-hover:text-amber-300 transition-colors">
                              {service.title}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {service.turnaround}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. VEHICLE SPECIFICATION WITH QUICK LUXURY CHIPS */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Car className="w-3.5 h-3.5" />
                    <span>2. Vehicle Details</span>
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      placeholder="Vehicle Make & Model (e.g. 2024 Porsche 911 GT3 or BMW M4)"
                      className="w-full px-4 py-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-white text-sm font-sans placeholder:text-slate-500 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Quick selection chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] font-mono text-slate-500 mr-1">Quick Select:</span>
                    {QUICK_VEHICLES.map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => {
                          audioEngine.playTick(1600);
                          setVehicle(v);
                        }}
                        className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-all ${
                          vehicle === v
                            ? "bg-cyan-500/20 border-cyan-400 text-cyan-300"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. TIMELINE & INTAKE WINDOW */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>3. Preferred Intake Window</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.playTick(1500);
                        setDateType("earliest");
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        dateType === "earliest"
                          ? "bg-amber-400/15 border-amber-400/70 text-white shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Priority Slot</span>
                      <span className="text-xs font-bold font-display text-white mt-1">Earliest Available</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.playTick(1500);
                        setDateType("tomorrow");
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        dateType === "tomorrow"
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Fast-Track</span>
                      <span className="text-xs font-bold font-display text-white mt-1">Tomorrow Morning</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        audioEngine.playTick(1500);
                        setDateType("custom");
                      }}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        dateType === "custom"
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,210,255,0.2)]"
                          : "bg-slate-950/70 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Custom</span>
                      <span className="text-xs font-bold font-display text-white mt-1">Specific Date</span>
                    </button>
                  </div>

                  {dateType === "custom" && (
                    <div className="pt-1 animate-fadeIn">
                      <input
                        type="date"
                        value={customDate}
                        onChange={(e) => setCustomDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                  )}
                </div>

                {/* 4. CLIENT CONTACT DETAILS */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>4. Client Contact</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Your Full Name</span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 text-white text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Direct Phone / WhatsApp Number</span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="1 (425) 750-5164"
                        className="w-full mt-1.5 px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 text-white font-mono text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. DAMAGE & INSPECTION FOCUS TAGS */}
                <div className="space-y-2.5">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
                    Focus Areas or Known Damage (Optional)
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_DAMAGE_TAGS.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          type="button"
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`text-xs px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? "bg-amber-400/20 border-amber-400/80 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                              : "bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-amber-400" />}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>

                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific notes or insurance carrier info..."
                    className="w-full mt-2 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-400 text-white text-xs font-sans placeholder:text-slate-600 focus:outline-none transition-colors"
                  />
                </div>

                {/* ════ BOOKING ACTIONS ════ */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(16,185,129,0.35)] hover:shadow-[0_0_50px_rgba(16,185,129,0.65)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-5 h-5 fill-current text-white group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>Request Concierge Booking via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEmailBooking}
                    className="w-full py-2.5 px-6 rounded-xl bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 font-mono text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>Or Inquire via Direct Email</span>
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* ════ RIGHT COLUMN: Real-Time Digital Service Order Manifest ════ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Service Intake Manifest Card */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-5 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Intake Manifest &amp; Warranty
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E63917] text-white font-bold uppercase">
                  Bay Slot #{selectedService.badgeNumber}
                </span>
              </div>

              {/* Service Picture with Corner HUD Brackets */}
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-[10px] font-mono text-white font-bold">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Certified Master Craftsmanship</span>
                </div>
              </div>

              {/* Service Title & Narrative */}
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold font-display text-white">
                  {selectedService.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedService.shortDesc}
                </p>
              </div>

              {/* Live Specs */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Estimated Turnaround
                  </span>
                  <span className="font-bold text-white">{selectedService.turnaround}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="flex items-center gap-2 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Warranty Guarantee
                  </span>
                  <span className="font-bold text-white">{selectedService.warranty}</span>
                </div>
              </div>

              <Link
                href={`/services/${selectedService.slug}`}
                className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <span>View Full Discipline Specs</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </Link>
            </div>

            {/* Facility Dispatch & Direct Line */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Facility Headquarters</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">● OPEN MON-SAT</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">12902 Hwy 99 Ste 7</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Everett / Lynnwood Corridor, WA 98204</p>
                  </div>
                  <a
                    href="https://maps.google.com/?q=12902+Hwy+99+Ste+7+Everett+WA+98204"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 transition-colors shrink-0"
                    title="Open in Google Maps"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Direct Helpline:</span>
                  <a href="tel:14257505164" className="font-bold text-white hover:text-cyan-300">
                    1 (425) 750-5164
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}

