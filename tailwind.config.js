module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: '#051948',
      }
    },
  },

  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
  },
}