/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      zIndex: {
        100: "100",
        1030: "1030"
      },
      width: {
        350: '21.875rem',
      },
      height: {
        350: '21.875rem',
      },
      colors: {
        'main': '#EC1B90',
        'white': '#ffffff',
        'black': '#000000',
        'success': '#32A336',
        'info': '#17a2b8',
        'warning': '#ffc107',
        'danger': '#c82333',
        'primary': '#3B0066',
        'midnight': '#121212',
        'widget': '#262626',
        'input': '#393939'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, visibility: "hidden" },
          '100%': { opacity: 1 },
        },
        fadeIn: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0, visibility: "hidden" },
        },
      },
      animation: {
        'fade-in': 'fadeIn .5s linear 1 normal forwards',
        'fade-out': 'fadeOut .5s linear 1 normal forwards',
      },
      zIndex: {
        '100': 100,
        '1030': 1030
      },
      width: {
        350: '21.875rem',
        500: '31.25rem',
      },
      height: {
        350: '21.875rem',
        500: '31.25rem',
      },
      minHeight: {
        350: '21.875rem',
        500: '31.25rem',
      },
      minWidth: {
        350: '21.875rem',
        500: '31.25rem',
      },
      maxHeight: {
        'lg': '32rem',
        'xl': '36rem',
        '1xl': '39rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        350: '21.875rem',
        500: '31.25rem',
      },
      maxWidth: {
        350: '21.875rem',
        500: '31.25rem',
      },
    },
  },
  plugins: [],
}