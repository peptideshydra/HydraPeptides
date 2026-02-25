/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Inter Tight"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        teal: '#1BB5DD',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        shimmer: 'shimmer 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.7s ease-out forwards',
        'fade-in-up-delay': 'fade-in-up 0.7s ease-out 0.15s forwards',
        'fade-in-up-delay2': 'fade-in-up 0.7s ease-out 0.3s forwards',
      },
    },
  },
  plugins: [],
}
