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
        background: "#111010",
        foreground: "#FFD800",
        purple: "#ab4bff",
        blue: "#5ca2ff",
      },
    },
  },
  plugins: [],
};
export default config;
