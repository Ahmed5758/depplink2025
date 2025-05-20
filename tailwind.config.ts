import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      'transparent': 'transparent',
      'primary': '#004B7A',
      'secondary': '#f0660c',
      'orange': '#ff7849',
      'green': '#13ce66',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'white': '#FFFFFF',
      'dark': '#000000',
      'red': "#EA4335",
      'greenDark': "#14AE5C",
      'specialDarkYellow': "#E89B3B",
      'orangePrice': "#F0660C",
    },
    rounded: {
      'none': '0',
      'sm': '0.125rem',
      'DEFAULT': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-ibmPlexSansArabic)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'brandShadow': '6px -8px 15px 1px rgba(255, 255, 255, 0.8)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  variants: {
    fill: ['hover', 'focus'], // this line does the trick
    extend: {
      animation: ['group-hover'],
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class', // only generate classes
    }),
    // autofixer: {}
  ],
}
export default config