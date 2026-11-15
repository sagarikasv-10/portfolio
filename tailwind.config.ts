import type { Config } from "tailwindcss";

// Design tokens live here AND as CSS variables in globals.css (single source: tokens below).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: { marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-33.3333%)" } } },
      animation: { marquee: "marquee 28s linear infinite" },
      screens: {
        // painting hero + editorial bands from 1024px; stacked below
        desk: { raw: "(min-width: 1024px)" },
        short: { raw: "(max-height: 760px)" },
      },
      colors: {
        paper: "rgb(var(--paper-rgb) / <alpha-value>)",
        cream: "#F4EFE6",
        olive: "#6F7B3C",
        forest: "#4F6B3E",
        ochre: "#C8932E",
        terracotta: "#A8603C",
        dustyblue: "#8FA9B5",
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
