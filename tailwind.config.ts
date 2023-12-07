import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        foreground: "#FFD800",
        border: "#404040",
        purple: "#ab4bff",
        blue: "#5ca2ff",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
