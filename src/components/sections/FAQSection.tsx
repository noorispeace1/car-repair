"use client";

import { useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { audioEngine } from "@/lib/audioSynthesizer";
import { getWhatsAppBookingUrl } from "@/data/servicesData";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface FAQItem { question: string; answer: string; }

const FAQ_ITEMS: FAQItem[] = [
  { question: "How Often Should I Have My Car Professionally Detailed ?", answer: "The frequency of professional car detailing depends on various factors such as your driving habits, weather conditions, and personal preference. As a general guideline, it is recommended to have your car detailed at least once or twice a year to maintain its appearance and protect its value." },
  { question: "Can Car Detailing Remove Scratches From My Vehicle's Paint ?", answer: "Yes! Our multi-stage paint correction and precision compounding can safely eliminate up to 90-95% of clear coat swirl marks, light surface scratches, oxidation, and water spots, restoring a deep, mirror-like factory gloss." },
  { question: "How Long Does It Take To Detail A Car ?", answer: "A standard precision exterior and interior detail typically takes 3 to 5 hours. For comprehensive multi-stage paint restoration, computerized laser frame calibration, or ceramic curing, we recommend 1 to 2 business days for perfection." },
  { question: "What Types Of Car Repair Services Do You Offer ?", answer: "We provide comprehensive dealership-grade collision restoration, computerized laser chassis realignment, Glasurit factory waterborne paint refinishing, ADAS sensor calibration, suspension geometry tuning, and routine maintenance." },
  { question: "Do You Work Directly With Auto Insurance Providers ?", answer: "Yes! We work directly with all major auto insurance carriers. We handle the entire claims process, supplemental inspections, and direct billing from start to finish so you experience zero administrative hassle." },
  { question: "What Does Your Lifetime Transferable Warranty Cover ?", answer: "Our lifetime warranty covers all structural repairs, unibody welds, frame laser alignments, and Glasurit clear coat finish against peeling, fading, or craftsmanship defects for as long as you own the vehicle—and transfers to the next owner." },
];

// ── Variants ──────────────────────────────────────────────────────────────────

const leftStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

const fromLeftItem: Variants = {
  hidden: { opacity: 0, x: -45, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

const accordionList: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const accordionItem: Variants = {
  hidden: { opacity: 0, x: 50, filter: "blur(4px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: EASE } },
};

const answerReveal: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: "auto", opacity: 1, transition: { duration: 0.38, ease: EASE } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const leftInView = useInView(leftRef, { once: false, margin: "-10% 0px -10% 0px" });
  const rightInView = useInView(rightRef, { once: false, margin: "-10% 0px -10% 0px" });

  const toggleFAQ = (index: number) => {
    audioEngine.playTick(1600);
    setOpenIndex(openIndex === index ? null : index);
  };

  const whatsappUrl = getWhatsAppBookingUrl("General Question / Inquiry");

  return (
    <section
      id="faq"
      className="relative w-full min-h-screen bg-slate-950 py-20 sm:py-28 px-4 sm:px-8 lg:px-12 xl:px-20 overflow-hidden select-none flex items-center justify-center"
    >
      {/* Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none z-0">
        <img src="/faq_repair_tools_banner.jpg" alt="Professional car repair tools" className="w-full h-full object-cover object-center opacity-85 sm:opacity-75 filter brightness-105 contrast-105 transform-gpu" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-slate-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(0,210,255,0.18)_0%,rgba(3,7,18,0.5)_60%,rgba(3,7,18,0.9)_100%)]" />
        <div className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/15 rounded-full blur-3xl sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] sm:w-[600px] h-[200px] sm:h-[300px] bg-cyan-500/15 rounded-full blur-3xl sm:blur-[100px] pointer-events-none" />

      <div className="w-full container lg:px-8 mx-auto relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* LEFT — staggered slide from left */}
          <motion.div
            ref={leftRef}
            variants={leftStagger}
            initial="hidden"
            animate={leftInView ? "visible" : "hidden"}
            className="lg:col-span-5 space-y-6 bg-slate-950/60 p-6 sm:p-8 lg:p-10 rounded-2xl border border-slate-700/60 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
          >
            <motion.p variants={fromLeftItem} className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#F59E0B] font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
              FREQUENTLY ASKED QUESTIONS
            </motion.p>

            <motion.h2 variants={fromLeftItem} className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-tight drop-shadow-[0_2px_15px_rgba(255,255,255,0.2)]">
              Here Our Most Question
            </motion.h2>

            <motion.p variants={fromLeftItem} className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              Have questions about our collision restoration process, laser alignment tolerances, or insurance coordination? Here are the clear answers to help you make informed decisions with absolute confidence.
            </motion.p>

            <motion.div variants={fromLeftItem} className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playTick(1800)}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-slate-950 font-mono font-black text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-[0_4px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_35px_rgba(245,158,11,0.65)] hover:scale-105 active:scale-95 transition-all"
                data-interactive="true" data-cursor-label="ASK"
              >
                ASK US ANYTHING
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — accordion items stagger from right */}
          <motion.div
            ref={rightRef}
            variants={accordionList}
            initial="hidden"
            animate={rightInView ? "visible" : "hidden"}
            className="lg:col-span-7 space-y-3.5"
          >
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={accordionItem}
                  className={`rounded-xl border backdrop-blur-md overflow-hidden transition-colors duration-300 ${isOpen ? "bg-slate-950/85 border-cyan-400/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)]" : "bg-slate-950/60 border-slate-800/80 hover:bg-slate-950/80 hover:border-slate-700/80"}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    className="w-full py-5 px-6 sm:px-7 flex items-center justify-between gap-4 text-left group"
                    data-interactive="true"
                  >
                    <span className={`text-sm sm:text-base font-bold font-sans transition-colors ${isOpen ? "text-white" : "text-slate-200 group-hover:text-white"}`}>
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isOpen ? "text-slate-200" : "text-slate-400 group-hover:text-slate-200"}`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        variants={answerReveal}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-7 pb-6 pt-1 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed border-t border-slate-800/60">
                          <p>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
