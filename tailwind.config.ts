import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#423e37',
        secondary: '#6e675f',
        used: '#a39594',
        noticed: '#93783a',
        confirmed: '#e3b23c',
        textColor: '#edebd7',
      },
    },
  },
  safelist: ['bg-confirmed', 'bg-noticed', 'bg-textColor'],
  plugins: [],
}
export default config
