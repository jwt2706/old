export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      scale: {
        '130': '1.3',
      },
      animation: {
        'fade-in': 'fade-in 2s',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      }
    },
  },
  variants: {},
  plugins: [],
};