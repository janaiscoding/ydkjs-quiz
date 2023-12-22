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
        codeGreen: "#91d076", 
        codeBlue: "#111b27", 
        codeError: "#e9ae7e", 
        codePurple: "#c699e3"
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
