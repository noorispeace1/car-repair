"use client";

import PorscheScrubberHero from "@/components/cinematic/PorscheScrubberHero";
import TailoredServices from "@/components/sections/TailoredServices";

import ServicesMatrix from "@/components/sections/ServicesMatrix";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import FAQSection from "@/components/sections/FAQSection";
import ReviewsCarousel from "@/components/sections/ReviewsCarousel";


export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      {/* 1. Cinematic 300-Frame Scrubber Hero Section with Integrated World Best Service & Badges */}
      <PorscheScrubberHero />

      {/* 2. Our Tailored Services Section with Interactive Filter & WhatsApp Booking */}
      <div id="tailored-services">
        <TailoredServices />
      </div>

     

      {/* 5. About Us & Community Section with Holographic Inspection Backdrop */}
      <div className="content-auto">
        <ServicesMatrix />
      </div>

      {/* 6. Interactive Before/After Restoration Comparison Slider */}
      <div className="content-auto">
        <BeforeAfterSlider />
      </div>

      {/* 9. Frequently Asked Questions */}
      <div className="content-auto">
        <FAQSection />
      </div>

      {/* 10. Verified Driver Testimonials Carousel */}
      <div className="content-auto">
        <ReviewsCarousel />
      </div>

    </div>
  );
}
