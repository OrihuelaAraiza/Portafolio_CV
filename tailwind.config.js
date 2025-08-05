/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark': '#161616',
        'darker': '#232323',
        'accent': '#FF4747',
        'orange': '#FF7F11',
        'light': '#E5E7EB',
      },
      fontFamily: {
        'display': ['Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
} 