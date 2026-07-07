import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      },
      boxShadow: {
        blue: "0 18px 44px rgba(47, 107, 255, 0.22)",
        soft: "0 18px 50px rgba(24, 24, 27, 0.07)"
      }
    }
  },
  plugins: []
};

export default config;
