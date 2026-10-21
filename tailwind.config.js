/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07111f',
        slate: '#9aa8bb',
        electric: '#59b9ff',
        violet: '#8b7dff',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 55px rgba(89,185,255,.16)',
      },
    },
  },
  plugins: [],
}
