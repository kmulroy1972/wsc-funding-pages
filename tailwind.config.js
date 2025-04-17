/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      colors: {
        'wsc-blue': '#0057A8',
        'wsc-light-blue': '#77B5DD',
        'wsc-dark': '#212529',
        'wsc-gray': '#6c757d',
        'wsc-light': '#f8f9fa',
        'wsc-accent': '#e63946',
        'wsc-success': '#28a745',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'wsc-sm': '0 2px 10px rgba(0,0,0,0.05)',
        'wsc-md': '0 5px 20px rgba(0,0,0,0.1)',
      },
      gradientColorStops: {
        'wsc-gradient-start': '#f8f9fa',
        'wsc-gradient-end': '#e9ecef',
      },
      spacing: {
        xs: 'var(--spacing-xs)',
        sm: 'var(--spacing-sm)',
        md: 'var(--spacing-md)',
        lg: 'var(--spacing-lg)',
        xl: 'var(--spacing-xl)',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-wsc-blue',
    'bg-wsc-light-blue',
    'text-wsc-blue',
    'text-wsc-light-blue',
    'text-white',
    'hover:bg-[#004b91]',
    'active:bg-[#004b91]',
  ],
} 