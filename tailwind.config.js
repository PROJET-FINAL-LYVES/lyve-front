/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        '1/2': '50%',
        full: '100%',
      },
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
        'custom-gray': '#2c2a2a',
        'darkgray': '#1E1E1E',
        'darkestgray': '#0F0F0F',
        'black': '#000000',
        'white': '#FFFFFF',
        'fadestart':'#545454',
        'fadeend': '#3C382C'
      },
      fontSize: {
        'xxs': '.625rem',
      },
      height: {
        'menu' : '80px',
        'app': 'calc(100vh - 80px)',
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
