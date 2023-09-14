import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#423e37',
        secondary: '#6e675f',
        noticed: '#93783a',
        confirmed: '#e3b23c',
        textColor: '#edebd7',
        primaryDark: '#0c090d',
        secondaryDark: '#696d7d',
        noticedDark: '#f29602',
        confirmedDark: '#24a413',
        textColorDark: '#ece9ea',
      },
    },
  },
  safelist: [
    'bg-confirmed',
    'bg-noticed',
    'bg-confirmedDark',
    'bg-noticedDark',
  ],
  plugins: [],
}
export default config
