import PorscheScrubberHero from "@/components/cinematic/PorscheScrubberHero";
import TailoredServices from "@/components/sections/TailoredServices";
import ServicesMatrix from "@/components/sections/ServicesMatrix";
import BeforeAfterSlider from "@/components/sections/BeforeAfterSlider";
import FAQSection from "@/components/sections/FAQSection";
import ReviewsCarousel from "@/components/sections/ReviewsCarousel";

export const dynamic = "force-static";
export const revalidate = false;

export default function Home() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950">
      {/* 1. Cinematic Hero Section with Instant Cybernetic Grid & Video Background */}
      <PorscheScrubberHero />

      {/* 2. Our Tailored Services Section */}
      <div id="tailored-services">
        <TailoredServices />
      </div>

      {/* 3. About Us & Community Section */}
      <div>
        <ServicesMatrix />
      </div>

      {/* 4. Interactive Before/After Restoration Comparison Slider */}
      <div>
        <BeforeAfterSlider />
      </div>

      {/* 5. Frequently Asked Questions */}
      <div>
        <FAQSection />
      </div>

      {/* 6. Verified Driver Testimonials Carousel */}
      <div>
        <ReviewsCarousel />
      </div>
    </div>
  );
}

