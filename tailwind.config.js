/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        red: {
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b', // Primary color for the site
          900: '#7f1d1d',
        },
      },
    },
  },
  plugins: [],
};