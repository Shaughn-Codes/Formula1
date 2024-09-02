/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        racing: ['"Racing Sans One"', 'sans-serif']
      },
      backgroundImage: {
        'hero': "url('/formula1logo.png')"
      },
      backgroundSize: {
        'custom': '500px auto',
      },
      backdropOpacity: {

      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["dim", "autumn"]
  }
}

