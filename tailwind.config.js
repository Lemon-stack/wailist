/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/preline.js'
  ],
  theme: {
    extend: {
      colors: {
        'brown': '#da7e37',
        'blk': '#0a0908',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    require('@tailwindcss/line-clamp'),
  ],
}

