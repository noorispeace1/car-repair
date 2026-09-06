"use client";

import { useState } from "react";
import { X, Calendar, Car, Wrench, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Phone, MapPin, Sparkles } from "lucide-react";
import { useAppControls } from "@/components/providers/SmoothScrollProvider";
import { audioEngine } from "@/lib/audioSynthesizer";
import confetti from "canvas-confetti";

export default function BookingModal() {
  const { isBookingModalOpen, setIsBookingModalOpen } = useAppControls();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    vehicleYear: "2023",
    vehicleMake: "Porsche",
    vehicleModel: "911 Carrera",
    insurance: "State Farm",
    serviceType: "Structural Collision Repair",
    turnaround: "03-Day Rapid Sprint",
    preferredDate: "2026-09-08",
    preferredTime: "08:30 AM",
    fullName: "",
    phone: "",
    email: "",
    notes: "",
  });

  if (!isBookingModalOpen) return null;

  const handleClose = () => {
    audioEngine.playTick(1000);
    setIsBookingModalOpen(false);
    setSubmitted(false);
    setStep(1);
  };

  const handleNext = () => {
    audioEngine.playTick(1400);
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handlePrev = () => {
    audioEngine.playTick(1200);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSuccessChime();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00D2FF", "#38BDF8", "#FACC15", "#FFFFFF"],
      });
    } catch {
      // Safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-2xl animate-fade-in">
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden text-white">
        {/* Ambient Top Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-brand-accent/20 blur-[100px] pointer-events-none rounded-full" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          aria-label="Close modal"
          data-interactive="true"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Submission Confirmation View */
          <div className="py-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black uppercase font-display text-white">
                Inspection Session Confirmed!
              </h3>
              <p className="text-sm text-slate-300 font-sans max-w-md mx-auto">
                Thank you, <strong>{formData.fullName || "Driver"}</strong>. Our lead master estimator has locked in your <strong>{formData.turnaround}</strong> slot.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 font-mono text-xs max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-400">Location:</span>
                <span className="text-brand-accent font-bold">12902 Hwy 99 Ste 7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date & Time:</span>
                <span className="text-white font-bold">{formData.preferredDate} @ {formData.preferredTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="text-brand-sky font-bold">{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Facility Line:</span>
                <span className="text-white font-bold">1 (425) 750-5164</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-blue-600 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(0,210,255,0.4)]"
            >
              Return to Vehicle Experience
            </button>
          </div>
        ) : (
          /* Multi-Step Booking Form */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-brand-accent uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Step 0{step} of 03 • Priority Concierge</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white mt-1">
                Book Precision Inspection
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Auto Body Repair Inc. • 12902 Hwy 99 Ste 7 • 1 (425) 750-5164
              </p>
            </div>

            {/* Step 1: Vehicle & Insurance */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Year</label>
                    <input
                      type="text"
                      value={formData.vehicleYear}
                      onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Make</label>
                    <input
                      type="text"
                      value={formData.vehicleMake}
                      onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Model</label>
                    <input
                      type="text"
                      value={formData.vehicleModel}
                      onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Insurance Provider</label>
                  <select
                    value={formData.insurance}
                    onChange={(e) => setFormData({ ...formData, insurance: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                  >
                    <option value="State Farm">State Farm</option>
                    <option value="Geico">Geico</option>
                    <option value="Progressive">Progressive</option>
                    <option value="Chubb / High Value">Chubb / Hagerty (Luxury)</option>
                    <option value="Self Pay / Private">Self-Pay / Customer Direct</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Service & Turnaround */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Primary Repair Required</label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                  >
                    <option value="Structural Collision Repair">Structural Collision Repair (Celette Laser Bench)</option>
                    <option value="Glasurit Waterborne Paint & Ceramic">Glasurit Refinishing & 9H Ceramic Clearcoat</option>
                    <option value="Laser Frame Alignment">Laser Frame Straightening & Suspension Geometry</option>
                    <option value="ADAS Radar Sensor Calibration">ADAS Radar / LiDAR Camera Recalibration</option>
                    <option value="Paintless Dent Repair (PDR)">Paintless Dent Repair (Hail / Door Dings)</option>
                    <option value="Concours Classic Restoration">Full Bare-Metal Concours Restoration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Turnaround Priority</label>
                  <div className="grid grid-cols-2 gap-3">
                    {["03-Day Rapid Sprint", "Standard 5-7 Days"].map((t) => (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setFormData({ ...formData, turnaround: t })}
                        className={`p-3 rounded-xl border font-mono text-xs font-bold transition-all text-left ${
                          formData.turnaround === t
                            ? "border-brand-accent bg-brand-accent/15 text-brand-accent"
                            : "border-slate-800 bg-slate-950 text-slate-400"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact & Schedule */}
            {step === 3 && (
              <div className="space-y-3 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Preferred Time</label>
                    <input
                      type="text"
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      placeholder="e.g. 09:00 AM"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(425) 555-0192"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="driver@domain.com"
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Modal Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-700"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              ) : (
                <span className="text-[10px] font-mono text-slate-500">
                  Direct Line: 1 (425) 750-5164
                </span>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-brand-accent text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:bg-sky-300 shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                >
                  Next Step <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-7 py-3 rounded-xl bg-gradient-to-r from-brand-accent via-sky-400 to-blue-600 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,255,0.5)]"
                >
                  Confirm & Dispatch Session
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
