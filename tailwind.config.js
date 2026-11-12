/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    colors: {
      ink: '#102333', navy: '#071522', canvas: '#f6f8fd',
      brand: '#17364a', gold: '#d2ae38', softblue: '#e8efff',
      wine: '#9e3158', mint: '#168b69'
    },
    boxShadow: { soft: '0 4px 18px rgba(23, 39, 63, 0.06)' }
  }},
  plugins: []
}