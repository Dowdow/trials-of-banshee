/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './assets/**/*.{js,jsx,ts,tsx}',
    './templates/base.html.twig',
  ],
  theme: {
    animation: {
      bounty: 'bounty 300ms ease-in-out normal forwards',
      'completed-in': 'fade-in 100ms ease-out normal forwards',
      'completed-out': 'fade-out 100ms ease-out normal forwards',
      fade: 'fade 1s ease-in-out normal forwards',
      'fade-short': 'fade-out 200ms ease-in-out normal forwards',
      'fade-out': 'fade-out 300ms ease-in-out normal forwards',
      launch: 'launch 1.6s ease-in-out infinite',
      'slide-in': 'slide-in 150ms ease-in-out normal forwards',
      'slide-out': 'slide-out 150ms ease-in-out normal forwards',
      spin: 'spin 5s linear infinite',
      'spin-back': 'spin-back 5s linear infinite',
      'spin-big': 'spin-big 20s linear infinite',
      zoom: 'zoom 1s ease-in normal forwards',
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      blue: '#265086',
      dark: '#101113',
      'dark-grey': '#1C1D1F',
      green: '#3E6442',
      'light-blue': '#8ECACB',
      'light-grey': '#28292B',
      pink: '#aa52ba',
      purple: '#5e4373',
      red: '#FF4136',
      white: '#f3f3f3',
      yellow: '#cfbd47',
    },
    extend: {
      fontFamily: {
        'neue-haas-display-bold': 'Neue Haas Display Bold',
        'neue-haas-display-roman': 'Neue Haas Display Roman',
      },
      gridTemplateColumns: {
        triumph: '2.5rem 1fr 2.5rem',
      },
      gridTemplateRows: {
        triumph: '3rem 1fr',
      },
      keyframes: {
        bounty: {
          '0%': { scale: '1.5' },
          '50%': { scale: '1', translate: '0 0', opacity: '1' },
          '100%': { translate: '0 20px', opacity: '0' },
        },
        fade: {
          '0%': { opacity: '1' },
          '30%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'fade-out': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        launch: {
          '0%, 100%': { background: '#3E6442' },
          '50%': { background: '#3E6442E5' },
        },
        'slide-in': {
          '0%': { opacity: 0, translate: '50px 0px' },
          '100%': { opacity: 1, translate: '0px 0px' },
        },
        'slide-out': {
          '0%': { opacity: 1, translate: '0px 0px' },
          '100%': { opacity: 0, translate: '50px 0px' },
        },
        spin: {
          '0%, 12.5%': { transform: 'rotate(0deg)' },
          '37.5%, 62.5%': { transform: 'rotate(45deg)' },
          '87.5%, 100%': { transform: 'rotate(90deg)' },
        },
        'spin-back': {
          '0%, 12.5%': { transform: 'rotate(45deg)' },
          '37.5%, 62.5%': { transform: 'rotate(0deg)' },
          '87.5%, 100%': { transform: 'rotate(-45deg)' },
        },
        'spin-big': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
        zoom: {
          '0%': { transform: 'scale(1) rotate(0)', opacity: 1 },
          '100%': { transform: 'scale(2.5) rotate(15deg)', opacity: 0 },
        },
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 2px var(--tw-shadow-color)',
        lg: '0 4px 4px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      );
    }),
  ],
};
