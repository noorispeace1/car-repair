import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  SERVICES_DATA, 
  getWhatsAppBookingUrl,
  WHATSAPP_PHONE_NUMBER 
} from "@/data/servicesData";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Phone, 
  ArrowRight,
  Wrench,
  Sparkles
} from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const whatsappUrl = getWhatsAppBookingUrl(service.title);
  const otherServices = SERVICES_DATA.filter((s) => s.slug !== slug);

  return (
    <main className="min-h-screen bg-slate-950 text-white pt-24 pb-20">
      
      {/* ═══ Top Breadcrumbs & Back Navigation ═══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-6">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-slate-400">
          <Link 
            href="/"
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <span>/</span>
          <Link 
            href="/#tailored-services"
            className="hover:text-amber-400 transition-colors"
          >
            Services
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">{service.title}</span>
        </div>
      </div>

      {/* ═══ Main Detail Section ═══ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header Title & Ribbon Badge */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="bg-[#E63917] text-white font-mono font-black text-sm px-3.5 py-1 rounded-md shadow-md">
              SERVICE {service.badgeNumber}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              {service.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.15)]">
            {service.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 font-sans max-w-3xl leading-relaxed">
            {service.shortDesc}
          </p>
        </div>

        {/* Hero Grid: Image on Left + WhatsApp Booking Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: High-Res Service Image & Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 group">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge overlay on image */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-white font-bold">
                  Certified ASE Master Craftsmanship
                </span>
              </div>
            </div>

            {/* In-depth Narrative */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-4">
              <h2 className="text-xl font-bold font-display text-white">
                Detailed Service Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Feature Checklist */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm space-y-5">
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#E63917]" />
                <span>What Is Included In This Service</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {service.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-200 font-sans">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sticky Booking Card with DIRECT WHATSAPP ACTION */}
          <div className="lg:col-span-5 sticky top-32 space-y-6">
            
            {/* WhatsApp Booking Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border-2 border-emerald-500/40 shadow-[0_10px_40px_rgba(16,185,129,0.15)] space-y-6 relative overflow-hidden">
              
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Instant WhatsApp Confirmation</span>
                </div>
                
                <h3 className="text-2xl font-bold font-display text-white">
                  Schedule Your Appointment
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans">
                  Click below to book directly via WhatsApp with our senior service advisor. Get an instant quote and pick your preferred time slot.
                </p>
              </div>

              {/* Service specs pills */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Estimated Turnaround</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-white">
                    {service.turnaround}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-mono">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>Warranty Coverage</span>
                  </div>
                  <span className="text-xs font-bold font-mono text-white">
                    {service.warranty}
                  </span>
                </div>
              </div>

              {/* ════ DIRECT WHATSAPP BOOK NOW BUTTON ════ */}
              <div className="pt-2 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-mono font-bold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.45)] hover:shadow-[0_0_45px_rgba(16,185,129,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 text-center group"
                >
                  {/* WhatsApp SVG Icon */}
                  <svg className="w-5 h-5 fill-current text-white group-hover:rotate-12 transition-transform" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  <span>BOOK NOW VIA WHATSAPP</span>
                </a>

                {/* Secondary Call Button */}
                <a
                  href={`tel:${WHATSAPP_PHONE_NUMBER}`}
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 border border-slate-700 hover:border-amber-400 text-slate-300 hover:text-amber-300 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>OR CALL 1 (425) 750-5164</span>
                </a>
              </div>

              {/* Direct WhatsApp Response Guarantee */}
              <div className="pt-2 text-center">
                <span className="text-[11px] font-mono text-slate-400">
                  ⚡ Average response time: &lt; 5 minutes on WhatsApp
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* ═══ Other Tailored Services ═══ */}
        <div className="pt-16 border-t border-slate-800 space-y-6">
          <h2 className="text-2xl font-bold font-display text-white">
            Explore Other Tailored Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((item) => (
              <Link
                key={item.id}
                href={`/services/${item.slug}`}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-[#E63917]/60 transition-all flex items-center gap-4 group"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-mono text-[#E63917] uppercase font-bold">
                    Service {item.badgeNumber}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#E63917] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">{item.shortDesc}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#E63917] group-hover:translate-x-1 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
