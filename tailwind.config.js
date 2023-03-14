/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
     
      fontFamily: {
        title: ['Poppins', 'sans-serif'],
        primary: ['Roboto', 'sans-serif'],
      },
      colors: {
        'gold': '#CBB26B',
        'lightgray': '#707070',
        'darkgray': '#1E1E1E',
        'black': '#000000',
        'white': '#FFFFFF',
      },
      fontSize: {
        'xxs': '.625rem',
      },

      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'normal': '10px',
      }
    },
  },
  plugins: [],
}
