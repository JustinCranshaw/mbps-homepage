/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'old-growth': '#1B4332',
        'fern': '#52734D',
        'morning-mist': '#F0F4F5',
        'puget-sound': '#5C7A8B',
        'granite': '#8B8680',
        'salmon': '#E07B39',
        'rain-cloud': '#A8B5BB',
        'bark': '#3E2723',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['"Amatic SC"', 'cursive'],
      },
    },
  },
  plugins: [],
}
