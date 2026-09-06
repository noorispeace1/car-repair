"use client";

import { WHATSAPP_PHONE_NUMBER } from "@/data/servicesData";
import { audioEngine } from "@/lib/audioSynthesizer";

const DEFAULT_MESSAGE =
  "Hello Auto Body Repair Inc.! I would like to inquire about collision restoration, insurance claims, and get a repair estimate for my vehicle.";

export default function WhatsAppLiveWidget() {
  const directWhatsAppUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
    DEFAULT_MESSAGE
  )}`;

  return (
    <div
      className="fixed bottom-6 right-6 select-none"
      style={{ zIndex: 9999 }}
    >
      <a
        href={directWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => audioEngine.playTick(1800)}
        className="relative flex items-center justify-center h-14 w-14 bg-[#25D366] text-white rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:shadow-[0_10px_40px_rgba(37,211,102,0.7)] transition-all duration-300 hover:scale-110 active:scale-95 group"
        title="Chat on WhatsApp: 1 (425) 750-5164"
        data-cursor-label="WHATSAPP"
        data-interactive="true"
      >
        {/* Ambient Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none group-hover:opacity-0 transition-opacity" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          className="w-8 h-8 fill-white drop-shadow-sm group-hover:rotate-6 transition-transform duration-300"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.071.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 2a8 8 0 0 1 0 16 8 8 0 0 1-4.1-1.1l-.7-.4-2.8.7.8-2.7-.4-.7A8 8 0 0 1 12 4z" />
        </svg>
      </a>
    </div>
  );
}
