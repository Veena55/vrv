/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: '#F5F6FB',
        theme: '#4848FE',
        light_theme: '#d7d7fd97',
        light_title: '#9a989a',
        successBg: '#D7F4D8',
        succesText: '#44824C'
      }
    },
  },
  plugins: [],
}

