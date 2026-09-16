/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        serif: ['"Cormorant Garamond"', "serif"],
        cormorant: ['"Cormorant Garamond"', "serif"],
        manrope: ["Manrope", "sans-serif"],
      },
      scrollBehavior: ["smooth"],
    },
  },
  plugins: [],
};
