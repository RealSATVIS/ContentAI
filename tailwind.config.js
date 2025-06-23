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
          DEFAULT: '#8B5CF6',
          50: '#F3F0FF',
          100: '#E9E2FF',
          500: '#8B5CF6',
          600: '#7C3AED',
        }
      }
    },
  },
  plugins: [],
}