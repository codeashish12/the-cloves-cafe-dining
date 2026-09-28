import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: { colors: { espresso: '#271b16', cream: '#f4f0e8', champagne: '#bd9c68', clay: '#a65f42' } } },
  plugins: [],
};
export default config;
