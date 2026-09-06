import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import HeaderNav from "@/components/ui/HeaderNav";
import TopMarquee from "@/components/ui/TopMarquee";
import Footer from "@/components/ui/Footer";
import FooterMap from "@/components/ui/FooterMap";
import BookingModal from "@/components/sections/BookingModal";
import { localBusinessSchema } from "@/lib/seoSchema";
import WhatsAppWidget from "@/components/WhatsAppWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Auto Body Repair Inc. | Premier Collision & Restoration on Hwy 99",
  description:
    "High-end auto body repair, computerized Celette laser frame alignment, Glasurit 90-line waterborne refinishing, and 03-Day Rapid Sprint collision restoration at 12902 Hwy 99 Ste 7. Call 1 (425) 750-5164.",
  keywords: [
    "Auto Body Repair Inc",
    "12902 Hwy 99 Ste 7",
    "Auto body repair Everett WA",
    "Collision repair Lynnwood WA",
    "Porsche collision repair",
    "Celette laser frame alignment",
    "Glasurit ceramic refinishing",
    "03-Day rapid sprint collision",
    "Hwy 99 body shop",
  ],
  authors: [{ name: "Auto Body Repair Inc." }],
  openGraph: {
    title: "Auto Body Repair Inc. | Premier Collision & Restoration on Hwy 99",
    description:
      "High-end collision restoration, computerized frame alignment, and Glasurit refinishing at 12902 Hwy 99 Ste 7.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} ${jetbrains.variable} dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-brand-accent selection:text-slate-950">
        <SmoothScrollProvider>
          <CustomCursor />
          <TopMarquee />
          <HeaderNav />
          <main className="relative min-h-screen">
            {children}
          </main>
          <FooterMap />
          <Footer />
          <BookingModal />
          <WhatsAppWidget />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
