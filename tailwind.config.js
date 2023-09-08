/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '292f7b': '#292f7b',
        '4975bc': '#4975bc',
        '25306e': '#25306e',
      }
    },
  },
  plugins: [],
}
