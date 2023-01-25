/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './assets/**/*.{js,jsx,ts,tsx}',
    './templates/base.html.twig',
  ],
  theme: {
    animation: {
      launch: 'launch 1.6s ease-in-out infinite',
    },
    colors: {
      transparent: 'transparent',
      black: '#414142',
      green: '#3E6442',
      white: '#f3f3f3',
    },
    extend: {
      fontFamily: {
        'neue-haas-display-bold': 'Neue Haas Display Bold',
        'neue-haas-display-roman': 'Neue Haas Display Roman',
      },
      keyframes: {
        launch: {
          '0%, 100%': { background: '#3E6442' },
          '50%': { background: '#3E6442E5' },
        },
      },
    },
  },
  plugins: [],
};
