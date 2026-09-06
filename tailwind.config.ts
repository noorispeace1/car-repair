import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: "#030712",
          dark: "#080E1A",
          card: "#0D1527",
          border: "#1E293B",
          accent: "#00D2FF",
          accentGlow: "rgba(0, 210, 255, 0.35)",
          sky: "#38BDF8",
          porsche: "#0088CC",
          gold: "#F59E0B",
          caliper: "#FACC15",
          danger: "#EF4444",
          success: "#10B981",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-line": "glowLine 3s ease-in-out infinite alternate",
        "scan-line": "scanline 6s linear infinite",
        "float": "float 5s ease-in-out infinite",
      },
      keyframes: {
        glowLine: {
          "0%": { opacity: "0.3", transform: "scaleX(0.95)" },
          "100%": { opacity: "1", transform: "scaleX(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
