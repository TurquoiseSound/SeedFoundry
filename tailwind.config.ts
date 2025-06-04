import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'bg-green-400',
    'bg-red-400',
    'bg-yellow-400',
    'animate-pulse',
    'skeleton'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          900: 'var(--primary-900)',
          800: 'var(--primary-800)',
          700: 'var(--primary-700)',
          600: 'var(--primary-600)',
          500: 'var(--primary-500)',
          400: 'var(--primary-400)',
          300: 'var(--primary-300)',
          200: 'var(--primary-200)',
          100: 'var(--primary-100)',
        },
        earth: {
          deep: 'var(--earth-deep)',
          rich: 'var(--earth-rich)',
          medium: 'var(--earth-medium)',
          light: 'var(--earth-light)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          dark: 'var(--accent-dark)',
          light: 'var(--accent-light)',
        },
        neutral: {
          900: 'rgb(var(--neutral-900-rgb) / <alpha-value>)',
          800: 'rgb(var(--neutral-800-rgb) / <alpha-value>)',
          700: 'rgb(var(--neutral-700-rgb) / <alpha-value>)',
          600: 'rgb(var(--neutral-600-rgb) / <alpha-value>)',
          500: 'rgb(var(--neutral-500-rgb) / <alpha-value>)',
          400: 'rgb(var(--neutral-400-rgb) / <alpha-value>)',
          300: 'rgb(var(--neutral-300-rgb) / <alpha-value>)',
          200: 'rgb(var(--neutral-200-rgb) / <alpha-value>)',
          100: 'rgb(var(--neutral-100-rgb) / <alpha-value>)',
          50: 'rgb(var(--neutral-50-rgb) / <alpha-value>)',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;