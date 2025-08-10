import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#121212',
        'card-dark': '#1E1E1E',
        'text-light': '#E0E0E0',
        'accent-blue': '#4169E1', // Royal Blue
      },
    },
  },
  plugins: [],
}
export default config
