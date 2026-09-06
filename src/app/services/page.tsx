import Link from "next/link";
import { SERVICES_DATA, getWhatsAppBookingUrl, WHATSAPP_PHONE_NUMBER } from "@/data/servicesData";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Clock, ShieldCheck, Phone } from "lucide-react";

export const metadata = {
  title: "Tailored Collision Services | Auto Body Repair Inc.",
  description: "Browse all certified auto body, collision repair, computerized chassis alignment, and paint services at 12902 Hwy 99 Ste 7.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6 space-y-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400">
          <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <span className="text-cyan-400 font-bold">Services</span>
        </div>

        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ASE & OEM CERTIFIED CAPABILITIES</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display uppercase tracking-tight text-white">
            Tailored Repair Services
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            From computerized Celette laser frame bench reconstruction to Glasurit 90-line waterborne baked refinishing, choose your restoration discipline.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)] transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#E63917] text-white font-mono font-black text-[11px] px-2.5 py-0.5 rounded shadow">
                    SERVICE {service.badgeNumber}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    {service.category}
                  </span>
                  <h2 className="text-xl font-bold font-display text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-xs font-mono text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> Turnaround</span>
                    <span className="text-white font-bold">{service.turnaround}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Warranty</span>
                    <span className="text-white font-bold">{service.warranty}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold text-xs uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={getWhatsAppBookingUrl(service.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Book
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Need Help Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold font-display text-white">Need an immediate diagnostic estimate?</h3>
            <p className="text-sm text-slate-400">Our senior collision appraisers are on standby 24/7 along Hwy 99.</p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${WHATSAPP_PHONE_NUMBER}`}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-slate-700"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call Helpline</span>
            </a>
            <Link
              href="/"
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs font-black uppercase tracking-wider transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
