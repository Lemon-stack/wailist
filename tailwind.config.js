/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/preline/dist/preline.js'
  ],
  theme: {
    extend: {
      colors: {
        'brown': '#eacdc2',
        'blk': '#0a0908',
      },
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

