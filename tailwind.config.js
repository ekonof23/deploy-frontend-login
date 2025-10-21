module.exports = {
  darkMode: "class", // aktifkan dark mode berdasarkan class
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],

  extend: {
  keyframes: {
    slide: {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
  },
  animation: {
    slide: 'slide 1.5s linear infinite',
  },
}

};
