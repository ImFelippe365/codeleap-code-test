/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx', './index.html'],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
    },
    colors: {
      white: '#ffffff',
      'light-gray': '#CCCCCC',
      'middle-gray': '#999999',
      gray: '#777777',
      black: '#000000',
      background: '#DDDDDD',
      'background-blur': '#777777CC',
    },
    extend: {},
  },
  plugins: [],
}
