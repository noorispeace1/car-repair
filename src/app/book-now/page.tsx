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
  Send, 
  Navigation, 
  ExternalLink 
} from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";
import confetti from "canvas-confetti";

export default function BookNowPage() {
  const [selectedService, setSelectedService] = useState<ServiceItem>(SERVICES_DATA[0]);
  const [vehicleYear, setVehicleYear] = useState("2024");
  const [vehicleMake, setVehicleMake] = useState("Porsche");
  const [vehicleModel, setVehicleModel] = useState("911 Carrera GTS");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("Morning (08:00 AM - 11:00 AM)");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Format WhatsApp message with all user details
  const generateWhatsAppMessage = () => {
    return `*NEW APPOINTMENT RESERVATION - AUTO BODY REPAIR INC.*
-----------------------------------
*Service:* ${selectedService.title} (Service ${selectedService.badgeNumber})
*Vehicle:* ${vehicleYear} ${vehicleMake} ${vehicleModel}
*Preferred Date:* ${preferredDate || "Earliest Available"}
*Time Slot:* ${preferredTime}

*Customer Details:*
• *Name:* ${fullName || "Customer"}
• *Phone:* ${phone || "Provided on call"}
• *Email:* ${email || "N/A"}

*Notes / Damage Details:*
${notes || "Please inspect upon arrival for full diagnostic estimate."}
-----------------------------------
_Sent via Online Appointment Booking_`;
  };

  const handleWhatsAppBooking = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    audioEngine.playEngineRoar();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10B981", "#00D2FF", "#38BDF8", "#F59E0B"],
      });
    } catch {}

    setSubmitted(true);
    const message = generateWhatsAppMessage();
    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleEmailBooking = () => {
    audioEngine.playTick(1600);
    const subject = `Appointment Booking: ${selectedService.title} - ${vehicleYear} ${vehicleMake} ${vehicleModel}`;
    const body = generateWhatsAppMessage().replace(/\*/g, "");
    window.location.href = `mailto:contact@autobodyrepairinc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-24 font-sans select-none">
      
      {/* Background ambient lighting */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 right-10 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link href="/services" className="hover:text-cyan-400 transition-colors">
            Services
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-bold">Book Appointment</span>
        </div>

        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>24/7 ONLINE APPOINTMENT RESERVATION</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase font-display tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
            Schedule Your Repair
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-sans leading-relaxed">
            Reserve your computerized laser frame alignment, Glasurit refinishing, or collision restoration slot with our senior ASE master technicians at Hwy 99.
          </p>
        </div>

        {/* ═══ Main 2-Column Grid: Form on Left + Picture/Service/Location on Right ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ════ LEFT COLUMN: Interactive Booking Form ════ */}
          <div className="lg:col-span-7 bg-slate-900/60 p-6 sm:p-8 md:p-10 rounded-3xl border border-slate-800/80 backdrop-blur-xl space-y-8 shadow-2xl">
            
            {submitted ? (
              /* Success Confirmation Banner */
              <div className="text-center py-12 space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    Reservation Submitted!
                  </h2>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Your appointment details have been dispatched to our senior service advisor on WhatsApp. We will confirm your preferred slot within minutes.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs uppercase tracking-wider"
                  >
                    Edit Reservation
                  </button>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-cyan-400 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleWhatsAppBooking} className="space-y-8">
                
                {/* 1. SELECT SERVICE */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>1. Select Required Service</span>
                  </label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                          className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between h-28 relative overflow-hidden group ${
                            isSelected
                              ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.25)]"
                              : "bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                              isSelected ? "bg-cyan-400 text-slate-950" : "bg-slate-800 text-slate-400"
                            }`}>
                              #{service.badgeNumber}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-300" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold font-display text-white line-clamp-1">
                              {service.title}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">
                              {service.turnaround}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. VEHICLE SPECIFICATIONS */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Car className="w-3.5 h-3.5" />
                    <span>2. Vehicle Specifications</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Year</span>
                      <input
                        type="text"
                        value={vehicleYear}
                        onChange={(e) => setVehicleYear(e.target.value)}
                        placeholder="e.g. 2024"
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Make</span>
                      <input
                        type="text"
                        value={vehicleMake}
                        onChange={(e) => setVehicleMake(e.target.value)}
                        placeholder="e.g. Porsche / BMW"
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Model</span>
                      <input
                        type="text"
                        value={vehicleModel}
                        onChange={(e) => setVehicleModel(e.target.value)}
                        placeholder="e.g. 911 Carrera GTS"
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. APPOINTMENT DATE & TIME */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>3. Preferred Date &amp; Time Window</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Appointment Date</span>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Preferred Time Slot</span>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      >
                        <option>Morning (08:00 AM - 11:00 AM)</option>
                        <option>Mid-Day (11:00 AM - 02:00 PM)</option>
                        <option>Afternoon (02:00 PM - 05:00 PM)</option>
                        <option>Express Sprint Drop-Off</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. CUSTOMER CONTACT DETAILS */}
                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <span>4. Contact Information</span>
                  </label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Full Name</span>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Phone Number</span>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="1 (425) 750-5164"
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-400">Email Address</span>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full mt-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-mono text-xs focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. DAMAGE DETAILS / REPAIR NOTES */}
                <div className="space-y-2">
                  <span className="text-[11px] font-mono text-slate-400">
                    Describe Damage or Notes (Optional)
                  </span>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Front fender impact, passenger door crease, insurance claim number..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-400 text-white font-sans text-xs focus:outline-none transition-colors"
                  />
                </div>

                {/* ════ SUBMIT ACTIONS ════ */}
                <div className="space-y-3 pt-2">
                  
                  {/* DIRECT WHATSAPP CONFIRMATION BUTTON */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_35px_rgba(16,185,129,0.45)] hover:shadow-[0_0_50px_rgba(16,185,129,0.7)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                  >
                    {/* WhatsApp Icon */}
                    <svg className="w-5 h-5 fill-current text-white group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    <span>CONFIRM &amp; BOOK VIA WHATSAPP</span>
                  </button>

                  {/* SECONDARY EMAIL RESERVATION BUTTON */}
                  <button
                    type="button"
                    onClick={handleEmailBooking}
                    className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 hover:bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-cyan-300 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span>OR SEND VIA EMAIL RESERVATION</span>
                  </button>

                  <p className="text-[11px] text-center font-mono text-slate-400 pt-1">
                    ⚡ Instant WhatsApp confirmation &amp; official VIN warranty documentation provided.
                  </p>
                </div>

              </form>
            )}

          </div>

          {/* ════ RIGHT COLUMN: Visual Showcase, Service Preview & Location Details ════ */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Selected Service Picture & Live Preview Card */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-5 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Selected Restoration Service
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E63917] text-white font-bold uppercase">
                  Service #{selectedService.badgeNumber}
                </span>
              </div>

              {/* Service Picture */}
              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 group">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700 text-[10px] font-mono text-white font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ASE Master Craftsmanship</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold font-display text-white">
                  {selectedService.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedService.shortDesc}
                </p>
              </div>

              {/* Turnaround & Warranty Specs */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400" /> Turnaround
                  </span>
                  <span className="font-bold text-white">{selectedService.turnaround}</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Warranty
                  </span>
                  <span className="font-bold text-white">{selectedService.warranty}</span>
                </div>
              </div>

              <Link
                href={`/services/${selectedService.slug}`}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <span>Read Full Service Details</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </Link>
            </div>

            {/* Facility Location & Contact Hub Card */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xl space-y-5 shadow-xl">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Facility Location &amp; Dispatch</span>
                </span>
                <h4 className="text-lg font-bold font-display text-white">
                  Main Restoration Headquarters
                </h4>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">12902 Hwy 99 Ste 7</p>
                    <p className="text-slate-400">Everett / Lynnwood Corridor, WA 98204</p>
                    <a
                      href="https://maps.google.com/?q=12902+Hwy+99+Ste+7+Everett+WA+98204"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-cyan-400 hover:underline mt-1 font-bold"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-slate-400">24/7 Helpline:</span>
                    <a href="tel:14257505164" className="font-bold text-white hover:text-cyan-300">
                      1 (425) 750-5164
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-slate-400">Direct Email:</span>
                    <a href="mailto:contact@autobodyrepairinc.com" className="font-bold text-white hover:text-amber-300">
                      contact@autobodyrepairinc.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-slate-400">Operating Hours:</span>
                    <span className="font-bold text-white">Mon - Sat: 8AM - 6PM</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
