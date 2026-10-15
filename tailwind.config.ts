import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        orchard: {
          50: '#f6fdf4',
          100: '#eafbe6',
          500: '#53a640',
          600: '#3d8d35',
          700: '#2d6b2a',
        },
      },
      boxShadow: {
        soft: '0 16px 32px rgba(32, 66, 18, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
