/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#475569',
          dark: '#334155',
          light: '#64748B',
        },
        secondary: {
          DEFAULT: '#1E293B',
          dark: '#0F172A',
          light: '#334155',
        },
        accent: {
          DEFAULT: '#64748B',
          dark: '#475569',
          light: '#94A3B8',
        },
        bgSec: '#FFF9F6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
