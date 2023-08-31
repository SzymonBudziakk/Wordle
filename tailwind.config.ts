import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0C090A',
        default: '#818384',
        used: '#3A3A3C',
        noticed: '#B59F3B',
        confirmed: '#538D4E',
      },
    },
  },
  safelist: ['bg-confirmed', 'bg-noticed'],
  plugins: [],
}
export default config
