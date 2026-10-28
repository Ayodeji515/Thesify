import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f6fc",
          100: "#e0ecf8",
          200: "#c7dcf1",
          300: "#9fc3e6",
          400: "#6fa4d8",
          500: "#4484c6",
          600: "#2d69ad",
          700: "#1e4d8a",
          800: "#163a6b",
          900: "#122a4c",
          950: "#0c1a30",
        },
        navy: {
          950: "#070e1b",
          900: "#0b192c",
          800: "#102a45",
          700: "#1e3e62",
        },
        forest: {
          50: "#f0fdf4",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
        },
        amber: {
          50: "#fffbeb",
          500: "#f59e0b",
          700: "#b45309",
          800: "#92400e",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      borderRadius: {
        button: "6px",
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      perspective: {
        '1000': '1000px',
        '2000': '2000px',
      },
    },
  },
  plugins: [],
};
export default config;
